export async function POST(req) {
  try {
    const body = await req.json();

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Missing OPENAI_API_KEY",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const rawText = body.rawText ?? "";
    const sourceUrl = body.source_url ?? "";

    if (!rawText.trim()) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Missing rawText",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const prompt = `
Extract structured job data from the following raw job advertisement.

Return ONLY valid JSON with this exact shape:
{
  "title": "",
  "specialty": "",
  "location": "",
  "company_name": "",
  "source_name": "",
  "source_url": "",
  "summary": "",
  "requirements": "",
  "license_required": "",
  "job_type": ""
}

Rules:
- Do not include markdown
- Do not include explanations
- Keep summary concise and useful
- Keep requirements concise
- If a field is missing, return an empty string
- source_url must be "${sourceUrl}"

Raw job ad:
${rawText}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You extract structured job data and return valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: data,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const content = data?.choices?.[0]?.message?.content ?? "";

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "AI did not return valid JSON",
          raw: content,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        job: parsed,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error?.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

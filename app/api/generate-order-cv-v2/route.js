function buildFallbackCv(order) {
  return `
${order.fullName || "Your Name"}
${order.jobTitle || "Professional Title"}

PROFILE
${order.summary || "Professional summary not provided."}

EXPERIENCE
${order.experience || "Experience not provided."}

EDUCATION
${order.education || "Education not provided."}

SKILLS
${order.skills || "Skills not provided."}

LANGUAGES
${order.languages || "Languages not provided."}

CONTACT
Email: ${order.email || "-"}
Phone: ${order.phone || "-"}
`.trim();
}

async function rewriteCvWithAI(order, apiKey) {
  const prompt = `
You are a professional CV writer.

Rewrite the following user information into a polished, ATS-friendly CV text.

Return plain text only.
Do not use markdown.
Make it clean, professional, and suitable for job applications.

User data:
Full Name: ${order.fullName || ""}
Job Title: ${order.jobTitle || ""}
Email: ${order.email || ""}
Phone: ${order.phone || ""}
Summary: ${order.summary || ""}
Experience: ${order.experience || ""}
Education: ${order.education || ""}
Skills: ${order.skills || ""}
Languages: ${order.languages || ""}
Template: ${order.template || "medical_pro"}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer. Return plain text only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Invalid JSON returned from OpenAI");
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenAI request failed");
  }

  const content = data?.choices?.[0]?.message?.content || "";
  if (!content.trim()) {
    throw new Error("Empty AI response");
  }

  return content.trim();
}

export async function POST(req) {
  try {
    const body = await req.json();

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Missing Supabase environment variables",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const orderId = String(body.orderId || "").trim();

    if (!orderId) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Missing orderId",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}&select=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : [];
    } catch {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Invalid JSON returned from Supabase",
          raw: text,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

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

    const row = Array.isArray(data) ? data[0] : data;

    if (!row) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Order not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const normalized = {
      id: row.id || null,
      fullName: row.fullName || "",
      jobTitle: row.jobTitle || "",
      email: row.email || "",
      phone: row.phone || "",
      summary: row.summary || "",
      experience: row.experience || "",
      education: row.education || "",
      skills: row.skills || "",
      languages: row.languages || "",
      template: row.template || "medical_pro",
      status: row.status || "",
      payment_status: row.payment_status || "",
    };

    let cvText = buildFallbackCv(normalized);
    let aiUsed = false;
    let aiError = "";

    if (OPENAI_API_KEY) {
      try {
        cvText = await rewriteCvWithAI(normalized, OPENAI_API_KEY);
        aiUsed = true;
      } catch (err) {
        aiError = err?.message || "AI generation failed";
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        cvText,
        cv: normalized,
        aiUsed,
        aiError,
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


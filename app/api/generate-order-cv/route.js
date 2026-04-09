import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function supabaseHeaders() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  };
}

function extractJson(text) {
  if (!text) return {};
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {}

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) {
    return JSON.parse(fenced[1].trim());
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
  }

  throw new Error("Could not extract valid JSON from AI response");
}

async function generateCvFromOrder(order) {
  const prompt = `
Create a complete professional CV for the following candidate.

Return JSON only with these exact keys:
- professional_summary
- core_skills
- professional_experience
- education
- certifications
- languages

Rules:
- Make it ATS-friendly
- Make it professional and strong
- Do not invent fake experience
- Improve wording and structure
- Use the user's information only
- professional_experience should be rewritten as polished CV bullet points
- core_skills should be a clean list in text form

Candidate details:
Full name: ${order.full_name || ""}
Target role: ${order.target_role || ""}
Years of experience: ${order.years_experience || ""}
Location: ${order.location || ""}
Phone: ${order.phone || ""}
Email: ${order.email || ""}
Summary notes: ${order.summary_notes || ""}
Work experience: ${order.work_experience || ""}
Education: ${order.education || ""}
Skills: ${order.skills || ""}
Certifications: ${order.certifications || ""}
Languages: ${order.languages || ""}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert professional CV writer. Return JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenAI generation failed");
  }

  const content = data?.choices?.[0]?.message?.content || "";
  return extractJson(content);
}

export async function POST(req) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { ok: false, error: "Missing orderId" },
        { status: 400 }
      );
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing environment variables" },
        { status: 500 }
      );
    }

    const orderRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}&select=*`,
      {
        headers: supabaseHeaders(),
      }
    );

    const orderData = await orderRes.json();

    if (!orderRes.ok || !Array.isArray(orderData) || orderData.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Order not found", details: orderData },
        { status: 404 }
      );
    }

    const order = orderData[0];

    if (order.result_json) {
      return NextResponse.json({ ok: true, result: order.result_json });
    }

    const resultJson = await generateCvFromOrder(order);

    const updateRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}`,
      {
        method: "PATCH",
        headers: {
          ...supabaseHeaders(),
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          result_json: resultJson,
          status: "completed",
        }),
      }
    );

    const updated = await updateRes.json();

    if (!updateRes.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to save generated CV", details: updated },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, result: resultJson });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Generation failed" },
      { status: 500 }
    );
  }
}

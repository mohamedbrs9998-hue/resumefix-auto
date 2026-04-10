import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function supabaseHeaders() {
  return {
    "Content-Type": "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY},
  };
}

async function generateCvText(order) {
  const prompt = `
Write a complete, polished, ATS-friendly professional CV in plain text for this candidate.

Do NOT return JSON.
Do NOT use markdown code fences.
Return only the final CV text.

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

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert professional CV writer. Return only plain text CV content.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.4,
  });

  return (completion.choices?.[0]?.message?.content || "").trim();
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

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !process.env.OPENAI_API_KEY) {
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

    if (order.result_json?.cv_text) {
      return NextResponse.json({
        ok: true,
        result: order.result_json,
      });
    }

    const cvText = await generateCvText(order);
    const resultJson = { cv_text: cvText };

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

    return NextResponse.json({
      ok: true,
      result: resultJson,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Generation failed" },
      { status: 500 }
    );
  }
}

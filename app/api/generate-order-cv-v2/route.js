import OpenAI from "openai";
import { NextResponse } from "next/server";

function pick(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }
  return "";
}

function supabaseHeaders(serviceRoleKey) {
  return {
    "Content-Type": "application/json",
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
  };
}

function buildPrompt(order) {
  const fullName = pick(order.fullName, order.full_name, "Candidate");
  const jobTitle = pick(
    order.jobTitle,
    order.job_title,
    order.target_role,
    "Professional"
  );
  const email = pick(order.email);
  const phone = pick(order.phone);
  const summary = pick(order.summary, order.summary_notes);
  const experience = pick(order.experience, order.work_experience);
  const education = pick(order.education);
  const skills = pick(order.skills);
  const languages = pick(order.languages);
  const yearsExperience = pick(order.years_experience);
  const location = pick(order.location);
  const certifications = pick(order.certifications);

  return `
Write a complete, polished, ATS-friendly professional CV in plain text for this candidate.

Rules:
- Return plain text only.
- Do not return JSON.
- Do not use markdown code fences.
- Make it professional, concise, and recruiter-friendly.
- Use strong action-oriented wording.
- If some information is missing, work professionally with what is available and do not invent specific facts.

Candidate details:
Full name: ${fullName}
Target title: ${jobTitle}
Email: ${email}
Phone: ${phone}
Location: ${location}
Years of experience: ${yearsExperience}
Professional summary / notes: ${summary}
Work experience: ${experience}
Education: ${education}
Skills: ${skills}
Languages: ${languages}
Certifications: ${certifications}

Output structure:
${fullName}
${jobTitle}

CONTACT
- Email
- Phone
- Location

PROFESSIONAL SUMMARY

CORE SKILLS

PROFESSIONAL EXPERIENCE

EDUCATION

CERTIFICATIONS
(if available)

LANGUAGES
(if available)
`.trim();
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

    const SUPABASE_URL =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      "";

    const SUPABASE_SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    const OPENAI_API_KEY =
      process.env.OPENAI_API_KEY ||
      process.env.OPENAI_KEY ||
      "";

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_API_KEY) {
      return NextResponse.json(
        {
          ok: false,
          error: `Missing environment variables | hasOpenAIKey=${!!OPENAI_API_KEY} | hasSupabaseUrl=${!!SUPABASE_URL} | hasServiceRoleKey=${!!SUPABASE_SERVICE_ROLE_KEY}`,
        },
        { status: 500 }
      );
    }

    const orderRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}&select=*`,
      {
        method: "GET",
        headers: supabaseHeaders(SUPABASE_SERVICE_ROLE_KEY),
      }
    );

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json(
        { ok: false, error: JSON.stringify(orderData) },
        { status: orderRes.status }
      );
    }

    const order = Array.isArray(orderData) ? orderData[0] : orderData;

    if (!order) {
      return NextResponse.json(
        { ok: false, error: "Order not found" },
        { status: 404 }
      );
    }

    const client = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const prompt = buildPrompt(order);

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are an expert executive CV writer. Produce a high-quality ATS-friendly professional CV in plain text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const cvText = completion.choices?.[0]?.message?.content?.trim();

    if (!cvText) {
      return NextResponse.json(
        { ok: false, error: "OpenAI returned empty content" },
        { status: 500 }
      );
    }

    const updateRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}`,
      {
        method: "PATCH",
        headers: {
          ...supabaseHeaders(SUPABASE_SERVICE_ROLE_KEY),
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          result_json: cvText,
        }),
      }
    );

    const updateData = await updateRes.json();

    if (!updateRes.ok) {
      return NextResponse.json(
        { ok: false, error: JSON.stringify(updateData) },
        { status: updateRes.status }
      );
    }

    return NextResponse.json({
      ok: true,
      orderId,
      cvText,
      updated: updateData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}

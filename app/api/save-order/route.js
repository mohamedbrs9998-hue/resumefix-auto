import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { ok: false, error: "Missing Supabase environment variables" },
        { status: 500 }
      );
    }

    const response = await fetch(${supabaseUrl}/rest/v1/orders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey,
        Authorization: Bearer ${serviceRoleKey},
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        full_name: body.fullName || "",
        email: body.email || "",
        target_role: body.targetRole || "",
        years_experience: body.yearsExperience || "",
        location: body.location || "",
        phone: body.phone || "",
        summary_notes: body.summaryNotes || "",
        work_experience: body.workExperience || "",
        education: body.education || "",
        skills: body.skills || "",
        certifications: body.certifications || "",
        languages: body.languages || "",
        status: "pending_payment",
        payment_status: "unpaid",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: data?.message  data?.error  "Failed to save order",
          details: data,
        },
        { status: 500 }
      );
    }

    const row = Array.isArray(data) ? data[0] : data;

    return NextResponse.json({
      ok: true,
      orderId: row?.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message || "Unexpected save-order failure",
      },
      { status: 500 }
    );
  }
}

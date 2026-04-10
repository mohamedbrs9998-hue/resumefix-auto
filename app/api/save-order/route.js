export async function POST(req) {
  try {
    const body = await req.json();

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

    const payload = {
      fullName: body.fullName ?? "",
      jobTitle: body.jobTitle ?? "",
      email: body.email ?? "",
      phone: body.phone ?? "",
      summary: body.summary ?? "",
      experience: body.experience ?? "",
      education: body.education ?? "",
      skills: body.skills ?? "",
      languages: body.languages ?? "",
      status: "pending_payment",
      payment_status: "unpaid",
    };

    const response = await fetch(${SUPABASE_URL}/rest/v1/orders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY},
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
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

    const row = Array.isArray(data) ? data[0] : data;

    return new Response(
      JSON.stringify({
        ok: true,
        orderId: row?.id || null,
        row,
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
        error: error.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

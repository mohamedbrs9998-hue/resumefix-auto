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
      title: body.title ?? "",
      specialty: body.specialty ?? "",
      location: body.location ?? "",
      company_name: body.company_name ?? "",
      source_name: body.source_name ?? "",
      source_url: body.source_url ?? "",
      summary: body.summary ?? "",
      requirements: body.requirements ?? "",
      license_required: body.license_required ?? "",
      job_type: body.job_type ?? "",
      posted_at: body.posted_at ?? new Date().toISOString(),
    };

    const response = await fetch(${SUPABASE_URL}/rest/v1/jobs, {
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

    return new Response(
      JSON.stringify({
        ok: true,
        job: Array.isArray(data) ? data[0] : data,
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
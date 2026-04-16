export async function GET() {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Missing Supabase environment variables"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const url = `${SUPABASE_URL}/rest/v1/jobs?select=*&order=created_at.desc`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
      },
      cache: "no-store"
    });

    const text = await res.text();

    let data = [];
    try {
      data = text ? JSON.parse(text) : [];
    } catch {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "Invalid JSON returned from Supabase",
          raw: text
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: data
        }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        jobs: Array.isArray(data) ? data : []
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error?.message || "Internal server error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

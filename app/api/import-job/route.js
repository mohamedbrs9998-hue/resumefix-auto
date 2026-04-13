export async function POST(req) {
  try {
    const body = await req.json();

    const rawText = body.rawText ?? "";
    const source_url = body.source_url ?? "";
    const source_name = body.source_name ?? "Imported";

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

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://resumefix-auto-finalnew.vercel.app";

    const parseRes = await fetch(`${baseUrl}/api/parse-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rawText,
        source_url,
      }),
    });

    const parseData = await parseRes.json();

    if (!parseRes.ok || !parseData?.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          step: "parse-job",
          error: parseData?.error || "Failed to parse job",
          raw: parseData?.raw || null,
        }),
        {
          status: parseRes.status || 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const parsedJob = {
      ...parseData.job,
      source_name: parseData.job?.source_name || source_name,
      source_url: parseData.job?.source_url || source_url,
    };

    const addRes = await fetch(`${baseUrl}/api/add-job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedJob),
    });

    const addData = await addRes.json();

    if (!addRes.ok || !addData?.ok) {
      return new Response(
        JSON.stringify({
          ok: false,
          step: "add-job",
          error: addData?.error || "Failed to save job",
          parsedJob,
        }),
        {
          status: addRes.status || 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        parsedJob,
        savedJob: addData.job,
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

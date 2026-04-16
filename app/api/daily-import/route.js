export async function GET() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://resumefix-auto-finalnew.vercel.app";

    const samples = [
      {
        source_name: "Daily Auto Import",
        source_url: https://example.com/pediatric-gp-abu-dhabi-daily-${new Date()
          .toISOString()
          .slice(0, 10)},
        rawText:
          "We are hiring a Pediatric General Practitioner in Abu Dhabi for a full-time role in an outpatient medical center. The doctor will assess pediatric patients, diagnose and manage common childhood illnesses, provide follow-up plans, and coordinate referrals when needed. Candidates should have prior GP experience, pediatric background, excellent communication skills, and a valid DOH license.",
      },
    ];

    const results = [];

    for (const item of samples) {
      const res = await fetch(${baseUrl}/api/import-job, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await res.json();
      results.push(data);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        imported: results.length,
        results,
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
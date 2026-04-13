async function getJobs() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { jobs: [], error: "Missing Supabase environment variables" };
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/jobs?select=*&order=created_at.desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { jobs: [], error: JSON.stringify(data) };
    }

    return { jobs: Array.isArray(data) ? data : [], error: "" };
  } catch (error) {
    return {
      jobs: [],
      error: error?.message || "Failed to load jobs",
    };
  }
}

export default async function JobsPage() {
  const { jobs, error } = await getJobs();

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px 72px",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            padding: 28,
            borderRadius: 28,
            border: "1px solid rgba(148,163,184,0.16)",
            background: "rgba(15,23,42,0.88)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              marginBottom: 18,
              padding: "10px 16px",
              borderRadius: 999,
              background: "rgba(96,165,250,0.14)",
              color: "#dbeafe",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Jobs Board
          </div>

          <h1
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(38px, 7vw, 64px)",
              lineHeight: 1,
              fontWeight: 800,
            }}
          >
            Available Jobs
          </h1>

          <p
            style={{
              margin: "0 0 28px",
              maxWidth: 760,
              color: "#dbe4f0",
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.7,
            }}
          >
            Browse job opportunities collected and organized inside your site.
          </p>

          {error ? (
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(244,114,182,0.24)",
                background: "rgba(127,29,29,0.18)",
                padding: 22,
                color: "#fecdd3",
                fontSize: 17,
                lineHeight: 1.7,
                marginBottom: 22,
              }}
            >
              Error loading jobs: {error}
            </div>
          ) : null}

          {jobs.length === 0 ? (
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(148,163,184,0.14)",
                background: "rgba(8,16,24,0.55)",
                padding: 22,
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              No jobs found yet.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: 18,
              }}
            >
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    borderRadius: 22,
                    border: "1px solid rgba(148,163,184,0.14)",
                    background: "rgba(8,16,24,0.55)",
                    padding: 22,
                  }}
                >
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "#f8fafc",
                      marginBottom: 8,
                    }}
                  >
                    {job.title || "Untitled Job"}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    {job.location ? (
                      <span style={tagStyle}>{job.location}</span>
                    ) : null}

                    {job.specialty ? (
                      <span style={tagStyle}>{job.specialty}</span>
                    ) : null}

                    {job.job_type ? (
                      <span style={tagStyle}>{job.job_type}</span>
                    ) : null}
                  </div>

                  {job.company_name ? (
                    <div
                      style={{
                        color: "#93c5fd",
                        fontWeight: 700,
                        marginBottom: 10,
                        fontSize: 16,
                      }}
                    >
                      {job.company_name}
                    </div>
                  ) : null}

                  {job.summary ? (
                    <div
                      style={{
                        color: "#dbe4f0",
                        lineHeight: 1.7,
                        fontSize: 16,
                        marginBottom: 12,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {job.summary}
                    </div>
                  ) : null}

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    {job.source_url ? (
                      <a
                        href={job.source_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "12px 16px",
                          borderRadius: 14,
                          textDecoration: "none",
                          fontWeight: 800,
                          background:
                            "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
                          color: "#081018",
                        }}
                      >
                        View Job
                      </a>
                    ) : null}

                    {job.source_name ? (
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: 14,
                        }}
                      >
                        Source: {job.source_name}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const tagStyle = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(96,165,250,0.14)",
  color: "#dbeafe",
  fontSize: 13,
  fontWeight: 700,
};

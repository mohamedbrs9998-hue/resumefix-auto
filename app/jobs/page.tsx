import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function JobsPage() {
  const { data: jobs, error } = await supabase
    .from("Jobs")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>Latest Jobs</h1>
        <p style={{ color: "red" }}>Error loading jobs: {error.message}</p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8ff",
        padding: "30px 16px",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "950px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <a
            href="/"
            style={{
              padding: "14px 20px",
              borderRadius: "14px",
              background: "white",
              textDecoration: "none",
              color: "#111827",
              fontWeight: "bold",
              border: "1px solid #e5e7eb",
            }}
          >
            الصفحة الرئيسية
          </a>

          <a
            href="/jobs"
            style={{
              padding: "14px 20px",
              borderRadius: "14px",
              background: "#eaf3ff",
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: "bold",
              border: "1px solid #bfdbfe",
            }}
          >
            الوظائف
          </a>
        </div>

        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Latest UAE Jobs
        </h1>

        <p style={{ color: "#555", marginBottom: "25px", fontSize: "17px" }}>
          Apply to real job opportunities and prepare your CV before applying.
        </p>

        <p
          style={{
            background: "#e0f2fe",
            color: "#075985",
            padding: "14px",
            borderRadius: "12px",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          عدد الوظائف المتاحة الآن: {jobs?.length || 0}
        </p>

        <div style={{ display: "grid", gap: "22px" }}>
          {jobs && jobs.length > 0 ? (
            jobs.map((job: any) => (
              <div
                key={job.id}
                style={{
                  border: "1px solid #e5e7eb",
                  padding: "24px",
                  borderRadius: "20px",
                  background: "white",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.06)",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    fontSize: "28px",
                    color: "#111827",
                    lineHeight: 1.2,
                  }}
                >
                  {job.title}
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    margin: "14px 0",
                  }}
                >
                  <span
                    style={{
                      background: "#eef6ff",
                      color: "#2563eb",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      fontWeight: "bold",
                    }}
                  >
                    {job.job_type || "Full-time"}
                  </span>

                  <span
                    style={{
                      background: "#eef6ff",
                      color: "#2563eb",
                      padding: "8px 12px",
                      borderRadius: "999px",
                      fontWeight: "bold",
                    }}
                  >
                    {job.location}
                  </span>
                </div>

                <p>
                  <strong>Company:</strong> {job.company}
                </p>

                <p>
                  <strong>Category:</strong> {job.category || "Not specified"}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary || "Not specified"}
                </p>

                <p style={{ lineHeight: 1.7, color: "#374151" }}>
                  {job.description}
                </p>

                {job.apply_url && (
                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      background: "#16a34a",
                      color: "white",
                      padding: "16px 20px",
                      borderRadius: "14px",
                      textDecoration: "none",
                      fontWeight: "bold",
                      fontSize: "18px",
                      marginTop: "20px",
                    }}
                  >
                    قدّم الآن على الموقع الرسمي
                  </a>
                )}

                <a
                  href="/generate"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    background: "#2563eb",
                    color: "white",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginTop: "12px",
                  }}
                >
                  أنشئ CV لهذه الوظيفة الآن
                </a>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "16px",
                  }}
                >
                  Disclaimer: We are not the hiring company. Applications are
                  submitted through the official employer or job platform
                  website.
                </p>
              </div>
            ))
          ) : (
            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "18px",
                textAlign: "center",
              }}
            >
              <h2>No jobs found</h2>
              <p>Please check Supabase table or RLS policy.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

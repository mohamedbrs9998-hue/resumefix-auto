export default function JobsPage() {
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
            Browse job opportunities that will be imported automatically and organized clearly inside your site.
          </p>

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
            Jobs section is ready.  
            Next step: connect this page to your Supabase jobs table and display real job listings automatically.
          </div>
        </div>
      </div>
    </main>
  );
}
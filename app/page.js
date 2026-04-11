import Link from "next/link";

export default function HomePage() {
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
            Fill details → Pay → Get your CV
          </div>

          <h1
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(42px, 7vw, 76px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 800,
            }}
          >
            ResumeFix AI
          </h1>

          <p
            style={{
              margin: 0,
              maxWidth: 760,
              color: "#dbe4f0",
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.7,
            }}
          >
            Generate a stronger ATS-friendly CV with a cleaner, professional
            structure and wording.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 28,
            }}
          >
            <Link
              href="/generate"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 210,
                padding: "16px 24px",
                borderRadius: 18,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 18,
                background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
                color: "#081018",
              }}
            >
              Start My CV
            </Link>

            <Link
              href="/result"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 180,
                padding: "16px 24px",
                borderRadius: 18,
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 18,
                border: "1px solid rgba(148,163,184,0.22)",
                background: "rgba(15,23,42,0.66)",
                color: "#f8fafc",
              }}
            >
              Open Result
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

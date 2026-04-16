import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px 72px",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #081018 0%, #020817 100%)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(96,165,250,0.14)",
                color: "#dbeafe",
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              CV Builder + Jobs Board
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(42px, 7vw, 76px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 800,
              }}
            >
              ResumeFix AI
            </h1>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/generate" style={primaryBtn}>
              Start My CV
            </Link>
            <Link href="/jobs" style={secondaryBtn}>
              Browse Jobs
            </Link>
          </div>
        </div>

        <p
          style={{
            margin: "0 0 28px",
            maxWidth: 820,
            color: "#dbe4f0",
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.7,
          }}
        >
          Build a stronger ATS-friendly CV, choose a professional template,
          complete payment, download PDF, and explore real job opportunities in
          one place.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginBottom: 30,
          }}
        >
          <FeatureCard
            title="Create Your CV"
            text="Enter your details, improve wording, and generate a cleaner professional CV."
          />
          <FeatureCard
            title="Pay & Download PDF"
            text="Complete payment and get a ready-to-use PDF CV instantly."
          />
          <FeatureCard
            title="Explore Jobs"
            text="Browse organized job listings and open real application links."
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 22,
          }}
        >
          <div style={panelStyle}>
            <div style={panelBadge}>How it works</div>
            <h2 style={panelTitle}>Simple hiring-ready flow</h2>
            <div style={{ display: "grid", gap: 14 }}>
              <Step title="1. Fill your details" text="Add your information and choose the right template." />
              <Step title="2. Complete payment" text="Finish payment securely and continue to your result page." />
              <Step title="3. Download your PDF" text="Copy, review, and export your CV in a polished format." />
            </div>
          </div>

          <div style={panelStyle}>
            <div style={panelBadge}>Jobs</div>
            <h2 style={panelTitle}>Real opportunities in one place</h2>
            <p style={panelText}>
              Your site supports job listings in a dedicated jobs board while
              keeping your CV creation and payment flow unchanged.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <Link href="/jobs" style={primaryBtn}>
                Open Jobs Board
              </Link>
              <Link href="/result" style={secondaryBtn}>
                Open Result
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div
      style={{
        padding: 22,
        borderRadius: 24,
        border: "1px solid rgba(148,163,184,0.14)",
        background: "rgba(15,23,42,0.88)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.24)",
      }}
    >
      <div
        style={{
          fontSize: 21,
          fontWeight: 800,
          marginBottom: 10,
          color: "#f8fafc",
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "#cbd5e1",
          fontSize: 16,
          lineHeight: 1.7,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function Step({ title, text }) {
  return (
    <div
      style={{
        borderRadius: 18,
        padding: 16,
        background: "rgba(8,16,24,0.55)",
        border: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "#cbd5e1", lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 190,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 18,
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 170,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 18,
  border: "1px solid rgba(148,163,184,0.22)",
  background: "rgba(15,23,42,0.66)",
  color: "#f8fafc",
};

const panelStyle = {
  padding: 26,
  borderRadius: 28,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.88)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
};

const panelBadge = {
  display: "inline-block",
  marginBottom: 14,
  padding: "10px 16px",
  borderRadius: 999,
  background: "rgba(96,165,250,0.14)",
  color: "#dbeafe",
  fontSize: 14,
  fontWeight: 700,
};

const panelTitle = {
  margin: "0 0 10px",
  fontSize: 30,
  fontWeight: 800,
};

const panelText = {
  color: "#cbd5e1",
  fontSize: 17,
  lineHeight: 1.8,
};

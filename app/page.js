"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at top left, rgba(96,165,250,0.20), transparent 22%), radial-gradient(circle at top right, rgba(59,130,246,0.18), transparent 20%), linear-gradient(180deg, #06111f 0%, #020817 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "24px 20px 70px",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            paddingTop: 10,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              padding: "14px 16px",
              borderRadius: 18,
              border: "1px solid rgba(148,163,184,0.14)",
              background: "rgba(6,17,31,0.72)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 50%, #2563eb 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#081018",
                  fontWeight: 900,
                  fontSize: 18,
                  boxShadow: "0 8px 24px rgba(96,165,250,0.35)",
                }}
              >
                R
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>ResumeFix AI</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>
                  CV Builder • Payment • Jobs
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#cv" style={navBtn}>
                CV Builder
              </a>
              <a href="#payment" style={navBtn}>
                Payment
              </a>
              <a href="#jobs" style={navBtn}>
                Jobs
              </a>
              <Link href="/result" style={navBtn}>
                Result
              </Link>
            </div>
          </div>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 22,
            alignItems: "stretch",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              padding: 30,
              borderRadius: 30,
              border: "1px solid rgba(148,163,184,0.14)",
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(8,16,24,0.95) 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
            }}
          >
            <div style={badge}>ALL-IN-ONE PLATFORM</div>

            <h1
              style={{
                margin: "0 0 14px",
                fontSize: "clamp(42px, 8vw, 78px)",
                lineHeight: 0.95,
                fontWeight: 900,
                letterSpacing: "-0.05em",
              }}
            >
              ResumeFix AI
            </h1>

            <p
              style={{
                margin: "0 0 24px",
                color: "#dbe4f0",
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.75,
                maxWidth: 720,
              }}
            >
              Create a professional CV, complete payment, download your result,
              and browse real job opportunities from one clean modern interface.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#cv" style={primaryBtn}>
                Start My CV
              </a>
              <a href="#jobs" style={secondaryBtn}>
                Browse Jobs
              </a>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 12,
                marginTop: 26,
              }}
            >
              <MiniStat title="Templates" value="3" />
              <MiniStat title="PDF" value="Ready" />
              <MiniStat title="Jobs" value="Live" />
            </div>
          </div>

          <div
            style={{
              padding: 22,
              borderRadius: 30,
              border: "1px solid rgba(148,163,184,0.14)",
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(8,16,24,0.95) 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: 24,
                padding: 22,
                background:
                  "linear-gradient(135deg, rgba(125,211,252,0.18) 0%, rgba(37,99,235,0.15) 100%)",
                border: "1px solid rgba(125,211,252,0.14)",
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 15, color: "#dbeafe", fontWeight: 700 }}>
                Smart flow
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  marginTop: 8,
                  lineHeight: 1.2,
                }}
              >
                Fill details → Pay → Get your CV
              </div>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <FeatureCard
                title="Create Your CV"
                text="Build a stronger, cleaner ATS-friendly CV with a professional structure."
              />
              <FeatureCard
                title="Pay & Download"
                text="Save your details, complete payment, and open your final result page."
              />
              <FeatureCard
                title="Jobs Board"
                text="Browse and filter real jobs without leaving the platform."
              />
            </div>
          </div>
        </section>

        <section id="cv" style={panel}>
          <div style={badge}>CV BUILDER</div>
          <h2 style={sectionTitle}>Create your CV</h2>
          <p style={sectionText}>
            Start your CV from the builder page, fill your details, and choose
            the best template for your role.
          </p>

          <div style={heroCard}>
            <div>
              <div style={heroCardTitle}>Professional CV builder</div>
              <div style={heroCardText}>
                Clean structure, better wording, template choice, and ready-to-use result page.
              </div>
            </div>

            <Link href="/generate" style={primaryBtn}>
              Open CV Builder
            </Link>
          </div>
        </section>

        <section id="payment" style={panel}>
          <div style={badge}>PAYMENT</div>
          <h2 style={sectionTitle}>Pay and unlock your final CV</h2>
          <p style={sectionText}>
            After completing your details, continue to payment and then review
            your result page and download the PDF.
          </p>

          <div style={grid2}>
            <InfoCard
              title="Step 1"
              text="Open the CV builder and enter your information."
            />
            <InfoCard
              title="Step 2"
              text="Complete payment securely to continue to the final result."
            />
            <InfoCard
              title="Step 3"
              text="Open the result page and download your CV as PDF."
            />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <Link href="/generate" style={primaryBtn}>
              Fill Details
            </Link>
            <Link href="/result" style={secondaryBtn}>
              Open Result
            </Link>
          </div>
        </section>

        <section id="jobs" style={panel}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <div>
              <div style={badge}>JOBS BOARD</div>
              <h2 style={sectionTitle}>Browse available jobs</h2>
              <p style={sectionText}>
                Explore real job listings in a dedicated, clean jobs board.
              </p>
            </div>

            <Link href="/jobs" style={primaryBtn}>
              Open Jobs Board
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 20,
        background: "rgba(8,16,24,0.52)",
        border: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{title}</div>
      <div style={{ color: "#cbd5e1", lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

function MiniStat({ title, value }) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 18,
        background: "rgba(8,16,24,0.5)",
        border: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 6 }}>{title}</div>
      <div style={{ fontWeight: 900, fontSize: 22 }}>{value}</div>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div
      style={{
        padding: 18,
        borderRadius: 20,
        background: "rgba(8,16,24,0.52)",
        border: "1px solid rgba(148,163,184,0.12)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{title}</div>
      <div style={{ color: "#cbd5e1", lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}

const panel = {
  padding: 26,
  borderRadius: 30,
  border: "1px solid rgba(148,163,184,0.16)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(8,16,24,0.95) 100%)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
  marginBottom: 24,
};

const badge = {
  display: "inline-block",
  marginBottom: 14,
  padding: "10px 16px",
  borderRadius: 999,
  background: "rgba(96,165,250,0.14)",
  color: "#dbeafe",
  fontSize: 14,
  fontWeight: 800,
  letterSpacing: "0.04em",
};

const sectionTitle = {
  margin: "0 0 10px",
  fontSize: 34,
  fontWeight: 900,
};

const sectionText = {
  margin: "0 0 18px",
  color: "#cbd5e1",
  fontSize: 17,
  lineHeight: 1.8,
};

const heroCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 18,
  flexWrap: "wrap",
  padding: 20,
  borderRadius: 22,
  background: "rgba(8,16,24,0.52)",
  border: "1px solid rgba(148,163,184,0.12)",
};

const heroCardTitle = {
  fontSize: 22,
  fontWeight: 900,
  marginBottom: 8,
};

const heroCardText = {
  color: "#cbd5e1",
  lineHeight: 1.8,
  maxWidth: 620,
};

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 190,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 17,
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
  boxShadow: "0 10px 28px rgba(96,165,250,0.32)",
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
  fontSize: 17,
  border: "1px solid rgba(148,163,184,0.22)",
  background: "rgba(15,23,42,0.66)",
  color: "#f8fafc",
};

const navBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 700,
  background: "rgba(15,23,42,0.66)",
  color: "#f8fafc",
  border: "1px solid rgba(148,163,184,0.18)",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: 14,
};

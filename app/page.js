"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "28px 18px 48px",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #081018 0%, #020817 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            marginBottom: 18,
            padding: 14,
            borderRadius: 18,
            border: "1px solid rgba(148,163,184,0.14)",
            background: "rgba(8,16,24,0.82)",
            backdropFilter: "blur(10px)",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <a href="#cv" style={navBtn}>CV Builder</a>
          <a href="#payment" style={navBtn}>Payment</a>
          <a href="#jobs" style={navBtn}>Jobs</a>
          <Link href="/result" style={navBtn}>Result</Link>
        </div>

        <section
          style={{
            padding: 26,
            borderRadius: 28,
            border: "1px solid rgba(148,163,184,0.16)",
            background: "rgba(15,23,42,0.88)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
            marginBottom: 22,
          }}
        >
          <div style={badge}>All-in-One CV + Jobs</div>
          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(40px, 8vw, 72px)",
              lineHeight: 0.95,
              fontWeight: 800,
            }}
          >
            ResumeFix AI
          </h1>
          <p
            style={{
              margin: "0 0 20px",
              color: "#dbe4f0",
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.7,
              maxWidth: 820,
            }}
          >
            Create your CV, complete payment, open your final result, and browse jobs from one page.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <div style={card}>
              <div style={cardTitle}>CV Builder</div>
              <div style={cardText}>Start your CV from the same page.</div>
              <a href="#cv" style={primaryBtn}>Go to CV</a>
            </div>

            <div style={card}>
              <div style={cardTitle}>Payment</div>
              <div style={cardText}>Save your details and continue to payment.</div>
              <a href="#payment" style={secondaryBtn}>Go to Payment</a>
            </div>

            <div style={card}>
              <div style={cardTitle}>Jobs</div>
              <div style={cardText}>Browse available jobs and apply.</div>
              <a href="#jobs" style={secondaryBtn}>Go to Jobs</a>
            </div>
          </div>
        </section>

        <section id="cv" style={panel}>
          <div style={badge}>CV Builder</div>
          <h2 style={sectionTitle}>Create Your CV</h2>
          <p style={sectionText}>
            Open the full CV builder here:
          </p>
          <Link href="/generate" style={primaryBtn}>
            Start My CV
          </Link>
        </section>

        <section id="payment" style={panel}>
          <div style={badge}>Payment</div>
          <h2 style={sectionTitle}>Complete Payment</h2>
          <p style={sectionText}>
            After filling your details, continue to payment, then open your result page and download PDF.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/generate" style={primaryBtn}>
              Fill Details First
            </Link>
            <Link href="/result" style={secondaryBtn}>
              Open Result
            </Link>
          </div>
        </section>

        <section id="jobs" style={panel}>
          <div style={badge}>Jobs Board</div>
          <h2 style={sectionTitle}>Browse Jobs</h2>
          <p style={sectionText}>
            Open the jobs board and explore available positions.
          </p>
          <Link href="/jobs" style={primaryBtn}>
            Open Jobs Board
          </Link>
        </section>
      </div>
    </main>
  );
}

const panel = {
  padding: 26,
  borderRadius: 28,
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.88)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
  marginBottom: 22,
};

const badge = {
  display: "inline-block",
  marginBottom: 14,
  padding: "10px 16px",
  borderRadius: 999,
  background: "rgba(96,165,250,0.14)",
  color: "#dbeafe",
  fontSize: 14,
  fontWeight: 700,
};

const sectionTitle = {
  margin: "0 0 10px",
  fontSize: 30,
  fontWeight: 800,
};

const sectionText = {
  margin: "0 0 16px",
  color: "#cbd5e1",
  fontSize: 17,
  lineHeight: 1.8,
};

const card = {
  padding: 18,
  borderRadius: 22,
  background: "rgba(8,16,24,0.55)",
  border: "1px solid rgba(148,163,184,0.12)",
};

const cardTitle = {
  fontSize: 20,
  fontWeight: 800,
  marginBottom: 8,
};

const cardText = {
  color: "#cbd5e1",
  lineHeight: 1.7,
  marginBottom: 14,
};

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 20px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 800,
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 20px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 800,
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

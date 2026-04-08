"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function generateCV() {
      try {
        const saved = localStorage.getItem("resumefix_form_data");

        if (!saved) {
          setError("No saved form data found.");
          setLoading(false);
          return;
        }

        const form = JSON.parse(saved);

        const res = await fetch("/api/generate-full-cv", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
          setError(data.error || "Failed to generate CV.");
          setLoading(false);
          return;
        }

        setResult(data.result);
        setLoading(false);
      } catch (err) {
        setError("Something went wrong while generating the CV.");
        setLoading(false);
      }
    }

    generateCV();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
        color: "#fff",
        padding: "32px 20px 60px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 8 }}>
          Your CV Result
        </h1>

        {loading ? (
          <p style={{ color: "#cbd5e1", fontSize: 18 }}>
            Generating your professional CV...
          </p>
        ) : error ? (
          <p style={{ color: "#fca5a5", fontSize: 18 }}>{error}</p>
        ) : (
          <div
            style={{
              marginTop: 24,
              padding: 20,
              borderRadius: 16,
              background: "#0f172a",
              border: "1px solid #334155",
            }}
          >
            <Section title="Professional Summary" text={result.professional_summary} />
            <Section title="Core Skills" text={result.core_skills} />
            <Section title="Professional Experience" text={result.professional_experience} />
            <Section title="Education" text={result.education} />
            <Section title="Certifications" text={result.certifications} />
            <Section title="Languages" text={result.languages} />
          </div>
        )}
      </div>
    </main>
  );
}

function Section({ title, text }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 24, marginBottom: 10 }}>{title}</h2>
      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8, color: "#e2e8f0" }}>
        {text}
      </div>
    </section>
  );
}

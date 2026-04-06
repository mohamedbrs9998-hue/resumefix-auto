"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [form, setForm] = useState({
    fullName: "",
    targetRole: "",
    yearsExperience: "",
    location: "",
    phone: "",
    email: "",
    summaryNotes: "",
    workExperience: "",
    education: "",
    skills: "",
    certifications: "",
    languages: "",
  });

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleContinue() {
    alert("Next step: payment will be connected here.");
  }

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
          Generate Full CV
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: 24, fontSize: 18 }}>
          Fill in the details below, then continue to payment.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <Input
            label="Full name"
            value={form.fullName}
            onChange={(v) => updateField("fullName", v)}
            placeholder="e.g. Enter your full name"
          />
          <Input
            label="Target role"
            value={form.targetRole}
            onChange={(v) => updateField("targetRole", v)}
            placeholder="e.g. Pediatric Specialist"
          />
          <Input
            label="Years of experience"
            value={form.yearsExperience}
            onChange={(v) => updateField("yearsExperience", v)}
            placeholder="e.g. 10"
          />
          <Input
            label="Location"
            value={form.location}
            onChange={(v) => updateField("location", v)}
            placeholder="e.g. Abu Dhabi, UAE"
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="e.g. +971..."
          />
          <I
nput
            label="Email"
            value={form.email}
            onChange={(v) => updateField("email", v)}
            placeholder="e.g. name@email.com"
          />
        </div>

        <TextArea
          label="Short background / summary notes"
          value={form.summaryNotes}
          onChange={(v) => updateField("summaryNotes", v)}
          placeholder="Write a few lines about your background and strengths..."
          rows={5}
        />

        <TextArea
          label="Work experience"
          value={form.workExperience}
          onChange={(v) => updateField("workExperience", v)}
          placeholder="Write your work experience here..."
          rows={9}
        />

        <TextArea
          label="Education"
          value={form.education}
          onChange={(v) => updateField("education", v)}
          placeholder="Write your education here..."
          rows={5}
        />

        <TextArea
          label="Skills"
          value={form.skills}
          onChange={(v) => updateField("skills", v)}
          placeholder="List your skills here..."
          rows={4}
        />

        <TextArea
          label="Certifications"
          value={form.certifications}
          onChange={(v) => updateField("certifications", v)}
          placeholder="List certifications here..."
          rows={4}
        />

        <TextArea
          label="Languages"
          value={form.languages}
          onChange={(v) => updateField("languages", v)}
          placeholder="e.g. Arabic, English"
          rows={3}
        />

        <div style={{ marginTop: 12 }}>
          <button
            onClick={handleContinue}
            style={{
              padding: "14px 22px",
              borderRadius: 12,
              border: "none",
              background: "#60a5fa",
              color: "#081018",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </main>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#0f172a",
          color: "#fff",
          fontSize: 16,
        }}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 6 }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#0f172a",
          color: "#fff",
          fontSize: 16,
          resize: "vertical",
        }}
      />
    </label>
  );
}

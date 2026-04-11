"use client";

import { useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";

export default function GeneratePage() {
  const [form, setForm] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    languages: "",
    template: "medical_pro",
  });

  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const raw = await res.text();

      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        alert(raw || "Invalid server response");
        setLoading(false);
        return;
      }

      if (!res.ok || !data?.ok || !data?.orderId) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || JSON.stringify(data?.error || data);

        alert(message || "Failed to save your details");
        setLoading(false);
        return;
      }

      localStorage.setItem(ORDER_KEY, data.orderId);
      localStorage.setItem(TEMPLATE_KEY, form.template);

      window.location.href = "https://payhip.com/order?link=J7W4G";
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || JSON.stringify(error);

      alert(message || "Something went wrong while saving your details.");
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
        color: "#f8fafc",
        padding: "32px 20px 60px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
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
            Fill details → Choose template → Pay → Get your CV
          </div>

          <h1
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(34px, 7vw, 56px)",
              lineHeight: 1.05,
              fontWeight: 800,
            }}
          >
            Build Your CV
          </h1>

          <p
            style={{
              margin: "0 0 28px",
              maxWidth: 760,
              color: "#cbd5e1",
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.7,
            }}
          >
            Enter your information, select the design template you prefer, then
            continue to payment.
          </p>

          <form onSubmit={handleSubmit}>
            <Field
              label="Full Name"
              value={form.fullName}
              onChange={(v) => updateField("fullName", v)}
              placeholder="Write your full name"
            />

            <Field
              label="Job Title"
              value={form.jobTitle}
              onChange={(v) => updateField("jobTitle", v)}
              placeholder="e.g. General Practitioner"
            />

            <Field
              label="Email"
              value={form.email}
              onChange={(v) => updateField("email", v)}
              placeholder="Write your email"
            />

            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => updateField("phone", v)}
              placeholder="Write your phone number"
            />

            <TextAreaField
              label="Professional Summary"
              value={form.summary}
              onChange={(v) => updateField("summary", v)}
              placeholder="Write a short summary about yourself"
            />

            <TextAreaField
              label="Experience"
              value={form.experience}
              onChange={(v) => updateField("experience", v)}
              placeholder="Write your work experience here..."
            />

            <TextAreaField
              label="Education"
              value={form.education}
              onChange={(v) => updateField("education", v)}
              placeholder="Write your education here..."
            />

            <TextAreaField
              label="Skills"
              value={form.skills}
              onChange={(v) => updateField("skills", v)}
              placeholder="List your skills here..."
            />

            <TextAreaField
              label="Languages"
              value={form.languages}
              onChange={(v) => updateField("languages", v)}
              placeholder="e.g. Arabic, English"
            />

            <div style={{ marginBottom: 22 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                Choose Your CV Template
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                }}
              >
                {[
                  {
                    key: "classic",
                    title: "Classic",
                    desc: "Clean and professional layout",
                  },
                  {
                    key: "modern",
                    title: "Modern",
                    desc: "Stylish and contemporary design",
                  },
                  {
                    key: "medical_pro",
                    title: "Medical Pro",
                    desc: "Best for healthcare and medical CVs",
                  },
                ].map((template) => {
                  const selected = form.template === template.key;

                  return (
                    <button
                      key={template.key}
                      type="button"
                      onClick={() => updateField("template", template.key)}
                      style={{
                        textAlign: "left",
                        padding: "18px",
                        borderRadius: 18,
                        border: selected
                          ? "2px solid #60a5fa"
                          : "1px solid rgba(148,163,184,0.18)",
                        background: selected
                          ? "rgba(96,165,250,0.12)"
                          : "#09111d",
                        color: "#f8fafc",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 800,
                          marginBottom: 6,
                        }}
                      >
                        {template.title}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#94a3b8",
                          lineHeight: 1.5,
                        }}
                      >
                        {template.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 24,
                border: "none",
                borderRadius: 18,
                padding: "16px 24px",
                minWidth: 220,
                fontSize: 18,
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
                color: "#081018",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : "Continue to Payment"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 16,
          fontWeight: 700,
          color: "#e2e8f0",
        }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "16px 18px",
          borderRadius: 16,
          border: "1px solid rgba(148,163,184,0.18)",
          background: "#09111d",
          color: "#f8fafc",
          fontSize: 16,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 16,
          fontWeight: 700,
          color: "#e2e8f0",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{
          width: "100%",
          padding: "16px 18px",
          borderRadius: 16,
          border: "1px solid rgba(148,163,184,0.18)",
          background: "#09111d",
          color: "#f8fafc",
          fontSize: 16,
          outline: "none",
          boxSizing: "border-box",
          resize: "vertical",
        }}
      />
    </div>
  );
}

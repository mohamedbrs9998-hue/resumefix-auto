"use client";

import { useState } from "react";

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

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

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
        setMessage(raw || "حدث خطأ في الاستجابة");
        setSaving(false);
        return;
      }

      if (!res.ok || !data?.ok || !data?.orderId) {
        const msg =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || JSON.stringify(data?.error || data);

        setMessage(msg || "تعذر حفظ البيانات");
        setSaving(false);
        return;
      }

      localStorage.setItem("resumefix_order_id", data.orderId);
      localStorage.setItem("resumefix_template", form.template);

      setMessage("تم حفظ البيانات بنجاح. جارٍ تحويلك إلى الدفع...");
      window.location.href = "https://payhip.com/order?link=J7W4G";
    } catch (error) {
      setMessage(error?.message || "حدث خطأ أثناء الحفظ");
      setSaving(false);
    }
  }

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(96,165,250,0.12), transparent 20%), linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
        color: "#0f172a",
        padding: "36px 20px 70px",
      }}
    >
      <div style={{ maxWidth: 950, margin: "0 auto" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
            marginBottom: 22,
          }}
        >
          <div style={badge}>إنشاء السيرة الذاتية</div>

          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(36px, 7vw, 58px)",
              lineHeight: 1.05,
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            أنشئ سيرتك الذاتية
          </h1>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: 18,
              lineHeight: 1.9,
            }}
          >
            أدخل معلوماتك، اختر القالب المناسب، ثم تابع إلى الدفع للحصول على السيرة النهائية.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <Field
              label="الاسم الكامل"
              value={form.fullName}
              onChange={(v) => updateField("fullName", v)}
              placeholder="اكتب اسمك الكامل"
            />
            <Field
              label="المسمى الوظيفي"
              value={form.jobTitle}
              onChange={(v) => updateField("jobTitle", v)}
              placeholder="مثال: محاسب"
            />
            <Field
              label="البريد الإلكتروني"
              value={form.email}
              onChange={(v) => updateField("email", v)}
              placeholder="اكتب بريدك الإلكتروني"
            />
            <Field
              label="رقم الهاتف"
              value={form.phone}
              onChange={(v) => updateField("phone", v)}
              placeholder="اكتب رقم الهاتف"
            />
          </div>

          <TextAreaField
            label="الملخص المهني"
            value={form.summary}
            onChange={(v) => updateField("summary", v)}
            placeholder="اكتب ملخصًا مهنيًا قصيرًا عنك"
          />

          <TextAreaField
            label="الخبرة"
            value={form.experience}
            onChange={(v) => updateField("experience", v)}
            placeholder="اكتب خبراتك العملية"
          />

          <TextAreaField
            label="التعليم"
            value={form.education}
            onChange={(v) => updateField("education", v)}
            placeholder="اكتب مؤهلاتك التعليمية"
          />

          <TextAreaField
            label="المهارات"
            value={form.skills}
            onChange={(v) => updateField("skills", v)}
            placeholder="اكتب المهارات"
          />

          <TextAreaField
            label="اللغات"
            value={form.languages}
            onChange={(v) => updateField("languages", v)}
            placeholder="العربية، الإنجليزية..."
          />

          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "block",
                marginBottom: 10,
                fontSize: 16,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              اختر قالب السيرة الذاتية
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              {[
                { key: "classic", title: "كلاسيك", desc: "تصميم بسيط ورسمي" },
                { key: "modern", title: "مودرن", desc: "تصميم عصري ونظيف" },
                { key: "medical_pro", title: "احترافي", desc: "تصميم قوي مناسب لمختلف المجالات" },
              ].map((template) => {
                const selected = form.template === template.key;

                return (
                  <button
                    key={template.key}
                    type="button"
                    onClick={() => updateField("template", template.key)}
                    style={{
                      textAlign: "right",
                      padding: "18px",
                      borderRadius: 18,
                      border: selected ? "2px solid #60a5fa" : "1px solid #dbeafe",
                      background: selected ? "#eff6ff" : "#ffffff",
                      color: "#0f172a",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>
                      {template.title}
                    </div>
                    <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.5 }}>
                      {template.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            style={{
              borderRadius: 22,
              padding: 18,
              background: "#f8fbff",
              border: "1px solid #dbeafe",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              الدفع
            </div>
            <div
              style={{
                color: "#475569",
                lineHeight: 1.8,
              }}
            >
              بعد حفظ البيانات سيتم تحويلك إلى صفحة الدفع، ثم يمكنك فتح صفحة النتيجة وتحميل ملف PDF.
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="submit" disabled={saving} style={primaryButton}>
              {saving ? "جارٍ الحفظ..." : "حفظ والمتابعة إلى الدفع"}
            </button>

            <a href="/" style={secondaryBtn}>
              العودة إلى الرئيسية
            </a>
          </div>

          {message ? (
            <div
              style={{
                marginTop: 16,
                color: "#475569",
                lineHeight: 1.8,
                fontSize: 16,
              }}
            >
              {message}
            </div>
          ) : null}
        </form>
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
          color: "#0f172a",
        }}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
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
          color: "#0f172a",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{ ...inputStyle, resize: "vertical" }}
      />
    </div>
  );
}

const badge = {
  display: "inline-block",
  marginBottom: 14,
  padding: "10px 16px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: 14,
  fontWeight: 800,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
};

const primaryButton = {
  border: "none",
  borderRadius: 18,
  padding: "16px 24px",
  minWidth: 220,
  fontSize: 18,
  fontWeight: 900,
  cursor: "pointer",
  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  color: "#ffffff",
  boxShadow: "0 12px 28px rgba(37,99,235,0.20)",
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 180,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 17,
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
};


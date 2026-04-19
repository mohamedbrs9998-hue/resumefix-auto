"use client";

import { useEffect, useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";

const i18n = {
  ar: {
    dir: "rtl",
    title: "أنشئ سيرتك الذاتية",
    subtitle:
      "أدخل معلوماتك، اختر القالب المناسب، ثم تابع إلى الدفع للحصول على السيرة النهائية.",
    langAr: "العربية",
    langEn: "English",
    fullName: "الاسم الكامل",
    fullNamePh: "اكتب اسمك الكامل",
    jobTitle: "المسمى الوظيفي",
    jobTitlePh: "مثال: محاسب",
    email: "البريد الإلكتروني",
    emailPh: "اكتب بريدك الإلكتروني",
    phone: "رقم الهاتف",
    phonePh: "اكتب رقم الهاتف",
    summary: "الملخص المهني",
    summaryPh: "اكتب ملخصًا مهنيًا قصيرًا عنك",
    experience: "الخبرة",
    experiencePh: "اكتب خبراتك العملية",
    education: "التعليم",
    educationPh: "اكتب مؤهلاتك التعليمية",
    skills: "المهارات",
    skillsPh: "اكتب المهارات",
    languages: "اللغات",
    languagesPh: "العربية، الإنجليزية...",
    chooseTemplate: "اختر قالب السيرة الذاتية",
    tplClassic: "كلاسيك",
    tplClassicDesc: "تصميم بسيط ورسمي",
    tplModern: "مودرن",
    tplModernDesc: "تصميم عصري ونظيف",
    tplPro: "احترافي",
    tplProDesc: "تصميم قوي مناسب لمختلف المجالات",
    paymentTitle: "الدفع",
    paymentDesc:
      "بعد حفظ البيانات سيتم تحويلك إلى صفحة الدفع، ثم يمكنك فتح صفحة النتيجة وتحميل ملف PDF.",
    savePay: "حفظ والمتابعة إلى الدفع",
    saving: "جارٍ الحفظ...",
    backHome: "العودة إلى الرئيسية",
    saveSuccess: "تم حفظ البيانات بنجاح. جارٍ تحويلك إلى الدفع...",
    saveFailed: "تعذر حفظ البيانات",
    badResponse: "حدث خطأ في الاستجابة",
    saveError: "حدث خطأ أثناء الحفظ",
  },
  en: {
    dir: "ltr",
    title: "Create Your CV",
    subtitle:
      "Enter your information, choose the right template, then continue to payment to get your final CV.",
    langAr: "العربية",
    langEn: "English",
    fullName: "Full Name",
    fullNamePh: "Write your full name",
    jobTitle: "Job Title",
    jobTitlePh: "e.g. Accountant",
    email: "Email",
    emailPh: "Write your email",
    phone: "Phone",
    phonePh: "Write your phone number",
    summary: "Professional Summary",
    summaryPh: "Write a short professional summary",
    experience: "Experience",
    experiencePh: "Write your work experience",
    education: "Education",
    educationPh: "Write your education background",
    skills: "Skills",
    skillsPh: "Write your skills",
    languages: "Languages",
    languagesPh: "Arabic, English...",
    chooseTemplate: "Choose your CV template",
    tplClassic: "Classic",
    tplClassicDesc: "Simple and formal design",
    tplModern: "Modern",
    tplModernDesc: "Clean and contemporary design",
    tplPro: "Professional",
    tplProDesc: "Strong layout suitable for many fields",
    paymentTitle: "Payment",
    paymentDesc:
      "After saving your details, you will be redirected to payment, then you can open the result page and download your PDF.",
    savePay: "Save & Continue to Payment",
    saving: "Saving...",
    backHome: "Back Home",
    saveSuccess: "Details saved successfully. Redirecting to payment...",
    saveFailed: "Failed to save details",
    badResponse: "Invalid server response",
    saveError: "An error occurred while saving",
  },
};

export default function GeneratePage() {
  const [lang, setLang] = useState("ar");
  const t = i18n[lang];

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

  useEffect(() => {
    const saved = localStorage.getItem("site_lang");
    if (saved === "ar" || saved === "en") {
      setLang(saved);
    }
  }, []);

  function changeLang(next) {
    setLang(next);
    localStorage.setItem("site_lang", next);
  }

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
        setMessage(raw || t.badResponse);
        setSaving(false);
        return;
      }

      if (!res.ok || !data?.ok || !data?.orderId) {
        const msg =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || JSON.stringify(data?.error || data);

        setMessage(msg || t.saveFailed);
        setSaving(false);
        return;
      }

      localStorage.setItem(ORDER_KEY, data.orderId);
      localStorage.setItem(TEMPLATE_KEY, form.template);

      setMessage(t.saveSuccess);
      window.location.href = "https://payhip.com/order?link=J7W4G";
    } catch (error) {
      setMessage(error?.message || t.saveError);
      setSaving(false);
    }
  }

  return (
    <main
      dir={t.dir}
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
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={badge}>{t.title}</div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => changeLang("ar")}
              style={lang === "ar" ? langActiveBtn : langBtn}
            >
              {t.langAr}
            </button>
            <button
              type="button"
              onClick={() => changeLang("en")}
              style={lang === "en" ? langActiveBtn : langBtn}
            >
              {t.langEn}
            </button>
          </div>
        </div>

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
          <h1
            style={{
              margin: "0 0 12px",
              fontSize: "clamp(36px, 7vw, 58px)",
              lineHeight: 1.05,
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: 18,
              lineHeight: 1.9,
            }}
          >
            {t.subtitle}
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
              label={t.fullName}
              value={form.fullName}
              onChange={(v) => updateField("fullName", v)}
              placeholder={t.fullNamePh}
            />
            <Field
              label={t.jobTitle}
              value={form.jobTitle}
              onChange={(v) => updateField("jobTitle", v)}
              placeholder={t.jobTitlePh}
            />
            <Field
              label={t.email}
              value={form.email}
              onChange={(v) => updateField("email", v)}
              placeholder={t.emailPh}
            />
            <Field
              label={t.phone}
              value={form.phone}
              onChange={(v) => updateField("phone", v)}
              placeholder={t.phonePh}
            />
          </div>

          <TextAreaField
            label={t.summary}
            value={form.summary}
            onChange={(v) => updateField("summary", v)}
            placeholder={t.summaryPh}
          />

          <TextAreaField
            label={t.experience}
            value={form.experience}
            onChange={(v) => updateField("experience", v)}
            placeholder={t.experiencePh}
          />

          <TextAreaField
            label={t.education}
            value={form.education}
            onChange={(v) => updateField("education", v)}
            placeholder={t.educationPh}
          />

          <TextAreaField
            label={t.skills}
            value={form.skills}
            onChange={(v) => updateField("skills", v)}
            placeholder={t.skillsPh}
          />

          <TextAreaField
            label={t.languages}
            value={form.languages}
            onChange={(v) => updateField("languages", v)}
            placeholder={t.languagesPh}
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
              {t.chooseTemplate}
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              {[
                { key: "classic", title: t.tplClassic, desc: t.tplClassicDesc },
                { key: "modern", title: t.tplModern, desc: t.tplModernDesc },
                { key: "medical_pro", title: t.tplPro, desc: t.tplProDesc },
              ].map((template) => {
                const selected = form.template === template.key;

                return (
                  <button
                    key={template.key}
                    type="button"
                    onClick={() => updateField("template", template.key)}
                    style={{
                      textAlign: t.dir === "rtl" ? "right" : "left",
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
              {t.paymentTitle}
            </div>
            <div
              style={{
                color: "#475569",
                lineHeight: 1.8,
              }}
            >
              {t.paymentDesc}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="submit" disabled={saving} style={primaryButton}>
              {saving ? t.saving : t.savePay}
            </button>

            <a href="/" style={secondaryBtn}>
              {t.backHome}
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

const langBtn = {
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
};

const langActiveBtn = {
  border: "1px solid #60a5fa",
  background: "#eff6ff",
  color: "#2563eb",
  padding: "10px 14px",
  borderRadius: 12,
  fontWeight: 800,
  cursor: "pointer",
};


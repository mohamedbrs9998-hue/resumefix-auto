"use client";

import { useEffect, useMemo, useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";
const PHOTO_KEY = "resumefix_photo_dataurl";
const JOB_ID_KEY = "resumefix_job_id";

const i18n = {
  ar: {
    dir: "rtl",
    pageBadge: "إنشاء السيرة الذاتية",
    title: "أنشئ سيرتك الذاتية باحتراف",
    subtitle:
      "أدخل بياناتك، ارفع صورتك، اختر قالبًا مناسبًا، ثم تابع إلى الدفع للحصول على النتيجة النهائية.",
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
    uploadPhoto: "رفع الصورة الشخصية",
    removePhoto: "حذف الصورة",
    chooseTemplate: "اختر قالب السيرة الذاتية",
    preview: "معاينة أولية",
    forThisJob: "سيرة ذاتية مخصصة لهذه الوظيفة",
    paymentTitle: "الدفع",
    paymentDesc:
      "بعد حفظ البيانات سيتم تحويلك إلى صفحة الدفع. بعدها يمكنك فتح صفحة النتيجة وتحميل PDF.",
    savePay: "حفظ والمتابعة إلى الدفع",
    saving: "جارٍ الحفظ...",
    backHome: "العودة إلى الرئيسية",
    saveSuccess: "تم حفظ البيانات بنجاح. جارٍ تحويلك إلى الدفع...",
    saveFailed: "تعذر حفظ البيانات",
    badResponse: "حدث خطأ في الاستجابة",
    saveError: "حدث خطأ أثناء الحفظ",
    photoHint: "يفضل صورة رسمية بخلفية واضحة",
    template1: "كلاسيك",
    template1Desc: "تصميم رسمي بسيط",
    template2: "مودرن",
    template2Desc: "تصميم عصري ونظيف",
    template3: "Sidebar Pro",
    template3Desc: "تصميم احترافي مع شريط جانبي",
    contact: "التواصل",
    profile: "الملف الشخصي",
    work: "الخبرة العملية",
    educationTitle: "التعليم",
    skillsTitle: "المهارات",
    languagesTitle: "اللغات",
  },
  en: {
    dir: "ltr",
    pageBadge: "CV Builder",
    title: "Build Your Professional CV",
    subtitle:
      "Enter your details, upload your photo, choose a template, then continue to payment to get your final result.",
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
    uploadPhoto: "Upload Photo",
    removePhoto: "Remove Photo",
    chooseTemplate: "Choose your CV template",
    preview: "Live Preview",
    forThisJob: "CV tailored for this job",
    paymentTitle: "Payment",
    paymentDesc:
      "After saving your details, you will be redirected to payment. Then you can open the result page and download your PDF.",
    savePay: "Save & Continue to Payment",
    saving: "Saving...",
    backHome: "Back Home",
    saveSuccess: "Details saved successfully. Redirecting to payment...",
    saveFailed: "Failed to save details",
    badResponse: "Invalid server response",
    saveError: "An error occurred while saving",
    photoHint: "A professional portrait works best",
    template1: "Classic",
    template1Desc: "Simple formal layout",
    template2: "Modern",
    template2Desc: "Clean modern design",
    template3: "Sidebar Pro",
    template3Desc: "Professional sidebar layout",
    contact: "Contact",
    profile: "Profile",
    work: "Work History",
    educationTitle: "Education",
    skillsTitle: "Skills",
    languagesTitle: "Languages",
  },
};

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 14,
        fontWeight: 800,
        color: "#2563eb",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </div>
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

function TextAreaField({ label, value, onChange, placeholder, rows = 5 }) {
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
        rows={rows}
        style={{ ...inputStyle, resize: "vertical" }}
      />
    </div>
  );
}

function TemplateCard({ selected, title, desc, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "start",
        width: "100%",
        padding: 16,
        borderRadius: 22,
        border: selected ? "2px solid #60a5fa" : "1px solid #dbeafe",
        background: selected ? "#eff6ff" : "#ffffff",
        color: "#0f172a",
        cursor: "pointer",
        boxShadow: selected ? "0 10px 28px rgba(37,99,235,0.12)" : "none",
      }}
    >
      <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.5, marginBottom: 14 }}>
        {desc}
      </div>
      {children}
    </button>
  );
}

function MiniPreviewClassic() {
  return (
    <div style={miniShell}>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={line(70)} />
        <div style={line(40)} />
        <div style={line(90)} />
        <div style={line(78)} />
      </div>
    </div>
  );
}

function MiniPreviewModern() {
  return (
    <div style={miniShell}>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ ...line(75), height: 12 }} />
        <div style={line(45)} />
        <div style={{ display: "grid", gap: 6, marginTop: 6 }}>
          <div style={line(95)} />
          <div style={line(88)} />
          <div style={line(76)} />
        </div>
      </div>
    </div>
  );
}

function MiniPreviewSidebar() {
  return (
    <div style={miniShell}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "68px 1fr",
          gap: 10,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            borderRadius: 12,
            background: "linear-gradient(180deg, #1e3a8a 0%, #2563eb 100%)",
            minHeight: 96,
          }}
        />
        <div style={{ display: "grid", gap: 7 }}>
          <div style={line(72)} />
          <div style={line(42)} />
          <div style={line(92)} />
          <div style={line(86)} />
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ t, form, photoPreview, jobId }) {
  const skills = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);

  const languages = form.languages
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  if (form.template === "sidebar_pro") {
    return (
      <div style={previewWrapper}>
        <div style={sidebarPreviewLayout}>
          <div style={sidebarPreviewAside}>
            <div style={photoFrame}>
              {photoPreview ? (
                <img src={photoPreview} alt="profile" style={photoStyle} />
              ) : (
                <div style={photoPlaceholder}>Photo</div>
              )}
            </div>

            <div style={previewName}>{form.fullName || "Your Name"}</div>
            <div style={previewRole}>{form.jobTitle || "Job Title"}</div>

            <div style={{ marginTop: 18 }}>
              <SectionLabel>{t.contact}</SectionLabel>
              <div style={smallText}>{form.email || "email@example.com"}</div>
              <div style={smallText}>{form.phone || "+971..."}</div>
            </div>

            <div style={{ marginTop: 18 }}>
              <SectionLabel>{t.skillsTitle}</SectionLabel>
              <div style={{ display: "grid", gap: 6 }}>
                {(skills.length ? skills : ["Skill 1", "Skill 2", "Skill 3"]).map((item, idx) => (
                  <div key={idx} style={smallText}>• {item}</div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <SectionLabel>{t.languagesTitle}</SectionLabel>
              <div style={{ display: "grid", gap: 6 }}>
                {(languages.length ? languages : ["Arabic", "English"]).map((item, idx) => (
                  <div key={idx} style={smallText}>• {item}</div>
                ))}
              </div>
            </div>
          </div>

          <div style={sidebarPreviewMain}>
            {jobId ? <div style={jobHint}>{t.forThisJob}</div> : null}

            <SectionLabel>{t.profile}</SectionLabel>
            <div style={previewParagraph}>
              {form.summary ||
                "Write a concise professional summary that highlights your strongest achievements and value."}
            </div>

            <SectionLabel>{t.work}</SectionLabel>
            <div style={previewParagraph}>
              {form.experience ||
                "Add your work history, responsibilities, and achievements here."}
            </div>

            <SectionLabel>{t.educationTitle}</SectionLabel>
            <div style={previewParagraph}>
              {form.education || "Add your education background here."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={previewWrapper}>
      <div style={standardPreviewCard}>
        {jobId ? <div style={jobHint}>{t.forThisJob}</div> : null}

        <div style={standardTop}>
          <div style={{ flex: 1 }}>
            <div style={previewName}>{form.fullName || "Your Name"}</div>
            <div style={previewRole}>{form.jobTitle || "Job Title"}</div>
            <div style={previewContactRow}>
              <span>{form.email || "email@example.com"}</span>
              <span>{form.phone || "+971..."}</span>
            </div>
          </div>

          <div style={standardPhotoWrap}>
            {photoPreview ? (
              <img src={photoPreview} alt="profile" style={photoStyle} />
            ) : (
              <div style={photoPlaceholder}>Photo</div>
            )}
          </div>
        </div>

        <SectionLabel>{t.profile}</SectionLabel>
        <div style={previewParagraph}>
          {form.summary ||
            "Write a concise professional summary that highlights your strongest achievements and value."}
        </div>

        <SectionLabel>{t.work}</SectionLabel>
        <div style={previewParagraph}>
          {form.experience || "Add your work history, responsibilities, and achievements here."}
        </div>

        <SectionLabel>{t.educationTitle}</SectionLabel>
        <div style={previewParagraph}>
          {form.education || "Add your education background here."}
        </div>

        <SectionLabel>{t.skillsTitle}</SectionLabel>
        <div style={chipRow}>
          {(skills.length ? skills : ["Communication", "Leadership", "Planning"]).map((item, idx) => (
            <span key={idx} style={skillChip}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  const [jobId, setJobId] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedLang = localStorage.getItem("site_lang");
    if (savedLang === "ar" || savedLang === "en") {
      setLang(savedLang);
    }

    const savedPhoto = localStorage.getItem(PHOTO_KEY);
    if (savedPhoto) setPhotoPreview(savedPhoto);

    const params = new URLSearchParams(window.location.search);
    const incomingJobId = params.get("jobId");
    if (incomingJobId) {
      setJobId(incomingJobId);
      localStorage.setItem(JOB_ID_KEY, incomingJobId);
    }
  }, []);

  function changeLang(next) {
    setLang(next);
    localStorage.setItem("site_lang", next);
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setPhotoPreview(result);
      localStorage.setItem(PHOTO_KEY, result);
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhotoPreview("");
    localStorage.removeItem(PHOTO_KEY);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      localStorage.setItem(TEMPLATE_KEY, form.template);
      if (jobId) localStorage.setItem(JOB_ID_KEY, jobId);

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

  const templates = useMemo(
    () => [
      {
        key: "classic",
        title: t.template1,
        desc: t.template1Desc,
        preview: <MiniPreviewClassic />,
      },
      {
        key: "modern",
        title: t.template2,
        desc: t.template2Desc,
        preview: <MiniPreviewModern />,
      },
      {
        key: "sidebar_pro",
        title: t.template3,
        desc: t.template3Desc,
        preview: <MiniPreviewSidebar />,
      },
    ],
    [t]
  );

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
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
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
          <div style={badge}>{t.pageBadge}</div>

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
            display: "grid",
            gridTemplateColumns: "minmax(320px, 1.1fr) minmax(320px, 0.9fr)",
            gap: 22,
          }}
        >
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
            <h1
              style={{
                margin: "0 0 12px",
                fontSize: "clamp(34px, 6vw, 52px)",
                lineHeight: 1.05,
                fontWeight: 900,
                color: "#0f172a",
              }}
            >
              {t.title}
            </h1>

            <p
              style={{
                margin: "0 0 20px",
                color: "#475569",
                fontSize: 17,
                lineHeight: 1.9,
              }}
            >
              {t.subtitle}
            </p>

            <div
              style={{
                borderRadius: 22,
                padding: 18,
                background: "#f8fbff",
                border: "1px solid #dbeafe",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: 10,
                }}
              >
                {t.uploadPhoto}
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <label style={uploadBtn}>
                  {t.uploadPhoto}
                  <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                </label>

                {photoPreview ? (
                  <button type="button" onClick={removePhoto} style={removeBtn}>
                    {t.removePhoto}
                  </button>
                ) : null}

                <span style={{ color: "#64748b", fontSize: 14 }}>{t.photoHint}</span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
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
              rows={4}
            />

            <TextAreaField
              label={t.experience}
              value={form.experience}
              onChange={(v) => updateField("experience", v)}
              placeholder={t.experiencePh}
              rows={5}
            />

            <TextAreaField
              label={t.education}
              value={form.education}
              onChange={(v) => updateField("education", v)}
              placeholder={t.educationPh}
              rows={4}
            />

            <TextAreaField
              label={t.skills}
              value={form.skills}
              onChange={(v) => updateField("skills", v)}
              placeholder={t.skillsPh}
              rows={3}
            />

            <TextAreaField
              label={t.languages}
              value={form.languages}
              onChange={(v) => updateField("languages", v)}
              placeholder={t.languagesPh}
              rows={2}
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
                {templates.map((template) => {
                  const selected = form.template === template.key;

                  return (
                    <TemplateCard
                      key={template.key}
                      selected={selected}
                      title={template.title}
                      desc={template.desc}
                      onClick={() => updateField("template", template.key)}
                    >
                      {template.preview}
                    </TemplateCard>
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

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 32,
              padding: 22,
              boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
              height: "fit-content",
              position: "sticky",
              top: 20,
            }}
          >
            <div style={badge}>{t.preview}</div>
            <PreviewPanel
              t={t}
              form={form}
              photoPreview={photoPreview}
              jobId={jobId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

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

const badge = {
  display: "inline-block",
  padding: "10px 16px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: 14,
  fontWeight: 800,
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

const uploadBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 14,
  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  color: "#ffffff",
  fontWeight: 800,
  cursor: "pointer",
  border: "none",
};

const removeBtn = {
  border: "1px solid #fecaca",
  background: "#fff1f2",
  color: "#be123c",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 800,
  cursor: "pointer",
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

const miniShell = {
  borderRadius: 18,
  background: "#f8fbff",
  border: "1px solid #dbeafe",
  padding: 12,
  minHeight: 120,
};

const line = (w) => ({
  width: `${w}%`,
  height: 10,
  borderRadius: 999,
  background: "#dbeafe",
});

const previewWrapper = {
  borderRadius: 24,
  overflow: "hidden",
  background: "#f8fbff",
  border: "1px solid #dbeafe",
};

const standardPreviewCard = {
  padding: 18,
  background: "#ffffff",
};

const standardTop = {
  display: "flex",
  gap: 16,
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 16,
};

const standardPhotoWrap = {
  width: 96,
  height: 96,
  borderRadius: 20,
  overflow: "hidden",
  border: "1px solid #dbeafe",
  flexShrink: 0,
  background: "#eff6ff",
};

const sidebarPreviewLayout = {
  display: "grid",
  gridTemplateColumns: "240px 1fr",
  minHeight: 560,
};

const sidebarPreviewAside = {
  background: "linear-gradient(180deg, #1e3a8a 0%, #2563eb 100%)",
  color: "#ffffff",
  padding: 22,
};

const sidebarPreviewMain = {
  background: "#ffffff",
  padding: 22,
};

const photoFrame = {
  width: 140,
  height: 140,
  borderRadius: 24,
  overflow: "hidden",
  border: "2px solid rgba(255,255,255,0.25)",
  background: "rgba(255,255,255,0.12)",
  marginBottom: 18,
};

const photoStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const photoPlaceholder = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748b",
  fontWeight: 700,
  background: "#eff6ff",
};

const previewName = {
  fontSize: 28,
  fontWeight: 900,
  color: "#0f172a",
  lineHeight: 1.1,
  marginBottom: 6,
};

const previewRole = {
  fontSize: 16,
  color: "#2563eb",
  fontWeight: 700,
  marginBottom: 10,
};

const previewContactRow = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  color: "#64748b",
  fontSize: 14,
};

const previewParagraph = {
  color: "#475569",
  lineHeight: 1.8,
  fontSize: 15,
  marginBottom: 16,
  whiteSpace: "pre-wrap",
};

const chipRow = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const skillChip = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: 13,
  fontWeight: 700,
};

const smallText = {
  color: "rgba(255,255,255,0.92)",
  fontSize: 14,
  lineHeight: 1.7,
};

const jobHint = {
  display: "inline-block",
  marginBottom: 12,
  padding: "8px 12px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: 12,
  fontWeight: 800,
};


"use client";

import { useEffect, useMemo, useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";
const PHOTO_KEY = "resumefix_photo_dataurl";
const JOB_ID_KEY = "resumefix_job_id";

const i18n = {
  ar: {
    dir: "rtl",
    pageBadge: "النتيجة النهائية",
    title: "السيرة الذاتية النهائية",
    subtitle: "راجع النتيجة، ثم قم بالتحميل أو النسخ أو التقديم على الوظيفة.",
    langAr: "العربية",
    langEn: "English",
    loading: "جارٍ تحميل النتيجة...",
    noData: "لا توجد بيانات محفوظة لعرض النتيجة.",
    backHome: "العودة إلى الرئيسية",
    backGenerate: "العودة إلى إنشاء السيرة",
    downloadPdf: "تحميل PDF",
    copyText: "نسخ النص",
    copied: "تم نسخ النص بنجاح",
    profile: "الملف الشخصي",
    work: "الخبرة العملية",
    education: "التعليم",
    skills: "المهارات",
    languages: "اللغات",
    contact: "التواصل",
    tailored: "سيرة مخصصة لوظيفة محفوظة",
    previewOnly: "هذه معاينة نهائية لشكل السيرة قبل التقديم.",
  },
  en: {
    dir: "ltr",
    pageBadge: "FINAL RESULT",
    title: "Your Final CV",
    subtitle: "Review your result, then download, copy, or apply for the job.",
    langAr: "العربية",
    langEn: "English",
    loading: "Loading result...",
    noData: "No saved data found to display the result.",
    backHome: "Back Home",
    backGenerate: "Back to CV Builder",
    downloadPdf: "Download PDF",
    copyText: "Copy Text",
    copied: "Text copied successfully",
    profile: "Profile",
    work: "Work History",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    contact: "Contact",
    tailored: "CV tailored for a saved job",
    previewOnly: "This is your final CV preview before applying.",
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

function sidebarTemplate(t, data, photoPreview, hasJob) {
  const skills = splitList(data.skills, 6);
  const languages = splitList(data.languages, 5);

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

          <div style={sidebarName}>{data.fullName || "Your Name"}</div>
          <div style={sidebarRole}>{data.jobTitle || "Job Title"}</div>

          <div style={{ marginTop: 20 }}>
            <SectionLabel>{t.contact}</SectionLabel>
            <div style={smallAsideText}>{data.email || "email@example.com"}</div>
            <div style={smallAsideText}>{data.phone || "+971..."}</div>
          </div>

          <div style={{ marginTop: 20 }}>
            <SectionLabel>{t.skills}</SectionLabel>
            <div style={{ display: "grid", gap: 6 }}>
              {(skills.length ? skills : ["Skill 1", "Skill 2", "Skill 3"]).map((item, idx) => (
                <div key={idx} style={smallAsideText}>• {item}</div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <SectionLabel>{t.languages}</SectionLabel>
            <div style={{ display: "grid", gap: 6 }}>
              {(languages.length ? languages : ["Arabic", "English"]).map((item, idx) => (
                <div key={idx} style={smallAsideText}>• {item}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={sidebarPreviewMain}>
          {hasJob ? <div style={jobHint}>{t.tailored}</div> : null}

          <SectionLabel>{t.profile}</SectionLabel>
          <div style={previewParagraph}>
            {data.summary || "Professional summary will appear here."}
          </div>

          <SectionLabel>{t.work}</SectionLabel>
          <div style={previewParagraph}>
            {data.experience || "Work experience will appear here."}
          </div>

          <SectionLabel>{t.education}</SectionLabel>
          <div style={previewParagraph}>
            {data.education || "Education details will appear here."}
          </div>
        </div>
      </div>
    </div>
  );
}

function standardTemplate(t, data, photoPreview, hasJob) {
  const skills = splitList(data.skills, 8);

  return (
    <div style={previewWrapper}>
      <div style={standardPreviewCard}>
        {hasJob ? <div style={jobHint}>{t.tailored}</div> : null}

        <div style={standardTop}>
          <div style={{ flex: 1 }}>
            <div style={previewName}>{data.fullName || "Your Name"}</div>
            <div style={previewRole}>{data.jobTitle || "Job Title"}</div>
            <div style={previewContactRow}>
              <span>{data.email || "email@example.com"}</span>
              <span>{data.phone || "+971..."}</span>
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
          {data.summary || "Professional summary will appear here."}
        </div>

        <SectionLabel>{t.work}</SectionLabel>
        <div style={previewParagraph}>
          {data.experience || "Work experience will appear here."}
        </div>

        <SectionLabel>{t.education}</SectionLabel>
        <div style={previewParagraph}>
          {data.education || "Education details will appear here."}
        </div>

        <SectionLabel>{t.skills}</SectionLabel>
        <div style={chipRow}>
          {(skills.length ? skills : ["Communication", "Leadership", "Planning"]).map((item, idx) => (
            <span key={idx} style={skillChip}>{item}</span>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <SectionLabel>{t.languages}</SectionLabel>
          <div style={previewParagraph}>
            {data.languages || "Arabic, English"}
          </div>
        </div>
      </div>
    </div>
  );
}

function splitList(value, limit = 6) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, limit);
}

export default function ResultPage() {
  const [lang, setLang] = useState("ar");
  const t = i18n[lang];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [template, setTemplate] = useState("medical_pro");
  const [hasJob, setHasJob] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  useEffect(() => {
    const savedLang = localStorage.getItem("site_lang");
    if (savedLang === "ar" || savedLang === "en") {
      setLang(savedLang);
    }

    const savedPhoto = localStorage.getItem(PHOTO_KEY);
    if (savedPhoto) setPhotoPreview(savedPhoto);

    const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
    if (savedTemplate) setTemplate(savedTemplate);

    const jobId = localStorage.getItem(JOB_ID_KEY);
    if (jobId) setHasJob(true);

    async function loadResult() {
      try {
        const orderId = localStorage.getItem(ORDER_KEY);
        if (!orderId) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/generate-order-cv-v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        });

        const raw = await res.text();

        let parsed;
        try {
          parsed = raw ? JSON.parse(raw) : {};
        } catch {
          setLoading(false);
          return;
        }

        const cvData =
          parsed?.cv ||
          parsed?.data ||
          parsed?.result ||
          parsed;

        setData({
          fullName: cvData?.fullName || cvData?.name || "",
          jobTitle: cvData?.jobTitle || "",
          email: cvData?.email || "",
          phone: cvData?.phone || "",
          summary: cvData?.summary || "",
          experience: cvData?.experience || "",
          education: cvData?.education || "",
          skills: cvData?.skills || "",
          languages: cvData?.languages || "",
        });

        setLoading(false);
      } catch {
        setLoading(false);
      }
    }

    loadResult();
  }, []);

  function changeLang(next) {
    setLang(next);
    localStorage.setItem("site_lang", next);
  }

  async function copyText() {
    if (!data) return;

    const text = `
${data.fullName || ""}
${data.jobTitle || ""}

${t.profile}
${data.summary || ""}

${t.work}
${data.experience || ""}

${t.education}
${data.education || ""}

${t.skills}
${data.skills || ""}

${t.languages}
${data.languages || ""}

${t.contact}
${data.email || ""}
${data.phone || ""}
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg(t.copied);
      setTimeout(() => setCopyMsg(""), 2000);
    } catch {}
  }

  function downloadPdf() {
    window.print();
  }

  const preview =
    template === "sidebar_pro"
      ? sidebarTemplate(t, data || {}, photoPreview, hasJob)
      : standardTemplate(t, data || {}, photoPreview, hasJob);

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
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
              margin: 0,
              color: "#475569",
              fontSize: 17,
              lineHeight: 1.9,
            }}
          >
            {t.subtitle}
          </p>
        </div>

        {loading ? (
          <div style={panel}>
            <div style={infoText}>{t.loading}</div>
          </div>
        ) : !data ? (
          <div style={panel}>
            <div style={infoText}>{t.noData}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <a href="/generate" style={primaryBtn}>{t.backGenerate}</a>
              <a href="/" style={secondaryBtn}>{t.backHome}</a>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 32,
                padding: 22,
                boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
                marginBottom: 22,
              }}
            >
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" onClick={downloadPdf} style={primaryButton}>
                  {t.downloadPdf}
                </button>
                <button type="button" onClick={copyText} style={secondaryButton}>
                  {t.copyText}
                </button>
                <a href="/generate" style={secondaryBtn}>
                  {t.backGenerate}
                </a>
                <a href="/" style={secondaryBtn}>
                  {t.backHome}
                </a>
              </div>

              {copyMsg ? (
                <div style={{ marginTop: 14, color: "#2563eb", fontWeight: 700 }}>
                  {copyMsg}
                </div>
              ) : null}
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 32,
                padding: 22,
                boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
              }}
            >
              <div style={{ marginBottom: 14, color: "#64748b", fontSize: 14 }}>
                {t.previewOnly}
              </div>
              {preview}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

const panel = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 32,
  padding: 28,
  boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
};

const infoText = {
  color: "#475569",
  fontSize: 18,
  lineHeight: 1.8,
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
  minWidth: 180,
  fontSize: 18,
  fontWeight: 900,
  cursor: "pointer",
  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  color: "#ffffff",
  boxShadow: "0 12px 28px rgba(37,99,235,0.20)",
};

const secondaryButton = {
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
  padding: "16px 24px",
  borderRadius: 18,
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 17,
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

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 220,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 17,
  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  color: "#ffffff",
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

const sidebarName = {
  fontSize: 30,
  fontWeight: 900,
  color: "#ffffff",
  lineHeight: 1.1,
  marginBottom: 6,
};

const previewRole = {
  fontSize: 16,
  color: "#2563eb",
  fontWeight: 700,
  marginBottom: 10,
};

const sidebarRole = {
  fontSize: 16,
  color: "#dbeafe",
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

const smallAsideText = {
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


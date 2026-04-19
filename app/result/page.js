"use client";

import { useEffect, useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";
const PHOTO_KEY = "resumefix_photo_dataurl";
const JOB_ID_KEY = "resumefix_job_id";

const i18n = {
  ar: {
    dir: "rtl",
    badge: "النتيجة النهائية",
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
    tailored: "سيرة ذاتية مخصصة لوظيفة محفوظة",
    previewOnly: "هذه النسخة النهائية الجاهزة للطباعة أو الحفظ بصيغة PDF.",
    noPhoto: "صورة",
    present: "حتى الآن",
  },
  en: {
    dir: "ltr",
    badge: "FINAL RESULT",
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
    tailored: "CV tailored for a saved role",
    previewOnly: "This is the final print-ready version of your CV.",
    noPhoto: "Photo",
    present: "Present",
  },
};

function formatName(name) {
  return String(name || "")
    .replace(/\b(mrcpch|rcpch|mbbs|md|dr\.?|doctor|candidate|die)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function formatRole(jobTitle) {
  return String(jobTitle || "").trim();
}

function formatSubtitle(jobTitle, lang) {
  const value = String(jobTitle || "").toLowerCase();

  if (value.includes("general practitioner") && value.includes("pediatric")) {
    return lang === "ar"
      ? "مرخص DOH | مرشح MRCPCH"
      : "DOH Licensed | MRCPCH Candidate";
  }

  if (value.includes("general practitioner")) {
    return lang === "ar"
      ? "ممارس طبي مرخص"
      : "Licensed Medical Professional";
  }

  if (value.includes("pediatric")) {
    return lang === "ar"
      ? "متخصص في طب الأطفال"
      : "Pediatrics Professional";
  }

  return lang === "ar"
    ? "سيرة ذاتية احترافية"
    : "Professional Curriculum Vitae";
}

function splitList(value, limit = 8) {
  return String(value || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function createPlainText(t, data) {
  return `
${formatName(data.fullName || "")}
${formatRole(data.jobTitle || "")}

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
}

function SectionTitle({ children }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 800,
        color: "#2563eb",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

function Toolbar({ t, lang, setLang, onDownload, onCopy, copyMsg }) {
  function changeLang(next) {
    setLang(next);
    localStorage.setItem("site_lang", next);
  }

  return (
    <div className="no-print" style={styles.toolbar}>
      <div style={styles.badge}>{t.badge}</div>

      <div style={styles.toolbarActions}>
        <button
          type="button"
          onClick={() => changeLang("ar")}
          style={lang === "ar" ? styles.langBtnActive : styles.langBtn}
        >
          {t.langAr}
        </button>
        <button
          type="button"
          onClick={() => changeLang("en")}
          style={lang === "en" ? styles.langBtnActive : styles.langBtn}
        >
          {t.langEn}
        </button>

        <button type="button" onClick={onDownload} style={styles.primaryButton}>
          {t.downloadPdf}
        </button>

        <button type="button" onClick={onCopy} style={styles.secondaryButton}>
          {t.copyText}
        </button>

        <a href="/generate" style={styles.secondaryBtn}>
          {t.backGenerate}
        </a>

        <a href="/" style={styles.secondaryBtn}>
          {t.backHome}
        </a>
      </div>

      {copyMsg ? <div style={styles.copyMsg}>{copyMsg}</div> : null}
    </div>
  );
}

function SidebarTemplate({ t, data, photoPreview, hasJob, lang }) {
  const skills = splitList(data.skills, 6);
  const languages = splitList(data.languages, 5);

  return (
    <div className="cv-sheet" style={styles.sidebarSheet}>
      <div style={styles.sidebarAside}>
        <div style={styles.sidebarPhotoWrap}>
          {photoPreview ? (
            <img src={photoPreview} alt="profile" className="cv-photo" style={styles.photo} />
          ) : (
            <div style={styles.sidebarPhotoPlaceholder}>{t.noPhoto}</div>
          )}
        </div>

        <div className="cv-name" style={styles.sidebarName}>
          {formatName(data.fullName) || "Your Name"}
        </div>

        <div className="cv-role" style={styles.sidebarRole}>
          {formatRole(data.jobTitle) || "General Practitioner | Pediatrics"}
        </div>

        <div style={styles.sidebarSubtitleLine}>
          {formatSubtitle(data.jobTitle, lang)}
        </div>

        <div className="cv-section" style={{ marginTop: 22 }}>
          <SectionTitle>{t.contact}</SectionTitle>
          <div style={styles.asideText}>{data.email || "email@example.com"}</div>
          <div style={styles.asideText}>{data.phone || "+971..."}</div>
        </div>

        <div className="cv-section" style={{ marginTop: 22 }}>
          <SectionTitle>{t.skills}</SectionTitle>
          <div style={{ display: "grid", gap: 6 }}>
            {(skills.length ? skills : ["Communication", "Leadership", "Planning"]).map(
              (item, idx) => (
                <div key={idx} style={styles.asideText}>• {item}</div>
              )
            )}
          </div>
        </div>

        <div className="cv-section" style={{ marginTop: 22 }}>
          <SectionTitle>{t.languages}</SectionTitle>
          <div style={{ display: "grid", gap: 6 }}>
            {(languages.length ? languages : ["Arabic", "English"]).map(
              (item, idx) => (
                <div key={idx} style={styles.asideText}>• {item}</div>
              )
            )}
          </div>
        </div>
      </div>

      <div style={styles.sidebarMain}>
        {hasJob ? <div style={styles.jobHint}>{t.tailored}</div> : null}

        <div className="cv-section" style={styles.section}>
          <SectionTitle>{t.profile}</SectionTitle>
          <div style={styles.profileCard}>
            <div className="cv-text" style={styles.paragraphStrong}>
              {data.summary || "Professional summary will appear here."}
            </div>
          </div>
        </div>

        <div className="cv-section" style={styles.section}>
          <SectionTitle>{t.work}</SectionTitle>
          <div style={styles.timelineCard}>
            <div style={styles.timelineLine} />
            <div style={styles.timelineContent}>
              <div style={styles.timelineItem}>
                <div style={styles.timelineDot} />
                <div style={styles.timelineBody}>
                  <div style={styles.timelineTopRow}>
                    <div className="cv-role" style={styles.timelineRole}>
                      {formatRole(data.jobTitle) || "Professional Role"}
                    </div>
                    <div style={styles.timelineDate}>
                      2022 — {t.present}
                    </div>
                  </div>
                  <div className="cv-text" style={styles.paragraph}>
                    {data.experience || "Work experience will appear here."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="cv-section" style={styles.section}>
          <SectionTitle>{t.education}</SectionTitle>
          <div style={styles.cleanCard}>
            <div className="cv-text" style={styles.paragraph}>
              {data.education || "Education details will appear here."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StandardTemplate({ t, data, photoPreview, hasJob, lang }) {
  const skills = splitList(data.skills, 8);

  return (
    <div className="cv-sheet" style={styles.sheet}>
      <div style={styles.standardHeader}>
        <div style={{ flex: 1 }}>
          {hasJob ? <div style={styles.jobHint}>{t.tailored}</div> : null}

          <div className="cv-name" style={styles.name}>
            {formatName(data.fullName) || "Your Name"}
          </div>

          <div className="cv-role" style={styles.role}>
            {formatRole(data.jobTitle) || "General Practitioner | Pediatrics"}
          </div>

          <div style={styles.subtitleLine}>
            {formatSubtitle(data.jobTitle, lang)}
          </div>

          <div style={styles.contactRow}>
            <span>{data.email || "email@example.com"}</span>
            <span>{data.phone || "+971..."}</span>
          </div>
        </div>

        <div style={styles.photoWrap}>
          {photoPreview ? (
            <img src={photoPreview} alt="profile" className="cv-photo" style={styles.photo} />
          ) : (
            <div style={styles.photoPlaceholder}>{t.noPhoto}</div>
          )}
        </div>
      </div>

      <div className="cv-section" style={styles.section}>
        <SectionTitle>{t.profile}</SectionTitle>
        <div style={styles.profileCard}>
          <div className="cv-text" style={styles.paragraphStrong}>
            {data.summary || "Professional summary will appear here."}
          </div>
        </div>
      </div>

      <div className="cv-section" style={styles.section}>
        <SectionTitle>{t.work}</SectionTitle>
        <div style={styles.timelineCard}>
          <div style={styles.timelineLine} />
          <div style={styles.timelineContent}>
            <div style={styles.timelineItem}>
              <div style={styles.timelineDot} />
              <div style={styles.timelineBody}>
                <div style={styles.timelineTopRow}>
                  <div className="cv-role" style={styles.timelineRole}>
                    {formatRole(data.jobTitle) || "Professional Role"}
                  </div>
                  <div style={styles.timelineDate}>
                    2022 — {t.present}
                  </div>
                </div>
                <div className="cv-text" style={styles.paragraph}>
                  {data.experience || "Work experience will appear here."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cv-section" style={styles.section}>
        <SectionTitle>{t.education}</SectionTitle>
        <div style={styles.cleanCard}>
          <div className="cv-text" style={styles.paragraph}>
            {data.education || "Education details will appear here."}
          </div>
        </div>
      </div>

      <div className="cv-section" style={styles.section}>
        <SectionTitle>{t.skills}</SectionTitle>
        <div style={styles.skillRow}>
          {(skills.length ? skills : ["Communication", "Leadership", "Planning"]).map(
            (item, idx) => (
              <span key={idx} className="cv-chip" style={styles.skillChip}>
                {item}
              </span>
            )
          )}
        </div>
      </div>

      <div className="cv-section" style={styles.section}>
        <SectionTitle>{t.languages}</SectionTitle>
        <div className="cv-text" style={styles.paragraph}>
          {data.languages || "Arabic, English"}
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  const [lang, setLang] = useState("ar");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [template, setTemplate] = useState("medical_pro");
  const [hasJob, setHasJob] = useState(false);
  const [copyMsg, setCopyMsg] = useState("");

  const t = i18n[lang];

  useEffect(() => {
    const savedLang = localStorage.getItem("site_lang");
    if (savedLang === "ar" || savedLang === "en") setLang(savedLang);

    const savedPhoto = localStorage.getItem(PHOTO_KEY);
    if (savedPhoto) setPhotoPreview(savedPhoto);

    const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
    if (savedTemplate) setTemplate(savedTemplate);

    const jobId = localStorage.getItem(JOB_ID_KEY);
    if (jobId) setHasJob(true);

    async function loadResult() {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryOrderId = params.get("orderId");
        const storedOrderId = localStorage.getItem(ORDER_KEY);
        const orderId = queryOrderId || storedOrderId;

        if (queryOrderId) {
          localStorage.setItem(ORDER_KEY, queryOrderId);
        }

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

        const cvData = parsed?.cv || parsed?.data || parsed?.result || parsed;

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

  async function copyText() {
    if (!data) return;

    try {
      await navigator.clipboard.writeText(createPlainText(t, data));
      setCopyMsg(t.copied);
      setTimeout(() => setCopyMsg(""), 2000);
    } catch {}
  }

  function downloadPdf() {
    window.print();
  }

  const preview =
    template === "sidebar_pro" ? (
      <SidebarTemplate
        t={t}
        data={data || {}}
        photoPreview={photoPreview}
        hasJob={hasJob}
        lang={lang}
      />
    ) : (
      <StandardTemplate
        t={t}
        data={data || {}}
        photoPreview={photoPreview}
        hasJob={hasJob}
        lang={lang}
      />
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
      <style>{`
        @page {
          size: A4;
          margin: 12mm;
        }

        html, body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        @media print {
          body {
            background: #ffffff !important;
          }

          .no-print {
            display: none !important;
          }

          .cv-sheet {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 210mm !important;
            min-height: 267mm !important;
            background: #ffffff !important;
            overflow: hidden !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .cv-section {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .cv-name {
            font-size: 30px !important;
            line-height: 1.05 !important;
          }

          .cv-role {
            font-size: 16px !important;
          }

          .cv-text {
            font-size: 13.5px !important;
            line-height: 1.7 !important;
          }

          .cv-chip {
            font-size: 11px !important;
            padding: 6px 10px !important;
          }

          .cv-photo {
            object-fit: cover !important;
          }

          main {
            padding: 0 !important;
            background: #ffffff !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Toolbar
          t={t}
          lang={lang}
          setLang={setLang}
          onDownload={downloadPdf}
          onCopy={copyText}
          copyMsg={copyMsg}
        />

        <div className="no-print" style={styles.topIntro}>
          <h1 style={styles.pageTitle}>{t.title}</h1>
          <p style={styles.pageSubtitle}>{t.subtitle}</p>
        </div>

        {loading ? (
          <div style={styles.panel}>
            <div style={styles.infoText}>{t.loading}</div>
          </div>
        ) : !data ? (
          <div style={styles.panel}>
            <div style={styles.infoText}>{t.noData}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
              <a href="/generate" style={styles.primaryBtn}>
                {t.backGenerate}
              </a>
              <a href="/" style={styles.secondaryBtn}>
                {t.backHome}
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="no-print" style={styles.panel}>
              <div style={styles.previewNotice}>{t.previewOnly}</div>
            </div>
            {preview}
          </>
        )}
      </div>
    </main>
  );
}

const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 16,
  },
  toolbarActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  copyMsg: {
    width: "100%",
    color: "#2563eb",
    fontWeight: 700,
  },
  topIntro: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 32,
    padding: 28,
    boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
    marginBottom: 22,
  },
  pageTitle: {
    margin: "0 0 12px",
    fontSize: "clamp(34px, 6vw, 52px)",
    lineHeight: 1.05,
    fontWeight: 900,
    color: "#0f172a",
  },
  pageSubtitle: {
    margin: 0,
    color: "#475569",
    fontSize: 17,
    lineHeight: 1.9,
  },
  panel: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 32,
    padding: 22,
    boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
    marginBottom: 22,
  },
  infoText: {
    color: "#475569",
    fontSize: 18,
    lineHeight: 1.8,
  },
  previewNotice: {
    color: "#64748b",
    fontSize: 14,
  },
  badge: {
    display: "inline-block",
    padding: "10px 16px",
    borderRadius: 999,
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: 14,
    fontWeight: 800,
  },
  primaryButton: {
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
  },
  secondaryButton: {
    border: "1px solid #dbeafe",
    background: "#ffffff",
    color: "#0f172a",
    padding: "16px 24px",
    borderRadius: 18,
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 17,
  },
  secondaryBtn: {
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
  },
  primaryBtn: {
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
  },
  langBtn: {
    border: "1px solid #dbeafe",
    background: "#ffffff",
    color: "#0f172a",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 700,
    cursor: "pointer",
  },
  langBtnActive: {
    border: "1px solid #60a5fa",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "10px 14px",
    borderRadius: 12,
    fontWeight: 800,
    cursor: "pointer",
  },
  sheet: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 28,
    padding: 30,
    boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
    width: "100%",
    maxWidth: "210mm",
    minHeight: "267mm",
    margin: "0 auto",
  },
  sidebarSheet: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 28,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    width: "100%",
    maxWidth: "210mm",
    minHeight: "267mm",
    margin: "0 auto",
  },
  standardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 22,
    paddingBottom: 18,
    borderBottom: "1px solid #e5e7eb",
  },
  photoWrap: {
    width: 110,
    height: 110,
    borderRadius: 24,
    overflow: "hidden",
    background: "#eff6ff",
    border: "1px solid #dbeafe",
    flexShrink: 0,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  photoPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    fontWeight: 700,
    background: "#eff6ff",
  },
  name: {
    fontSize: 38,
    fontWeight: 900,
    color: "#0f172a",
    lineHeight: 1,
    marginBottom: 8,
    letterSpacing: "-0.03em",
  },
  role: {
    fontSize: 20,
    color: "#2563eb",
    fontWeight: 800,
    marginBottom: 8,
    lineHeight: 1.2,
  },
  subtitleLine: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: 600,
    marginBottom: 12,
  },
  contactRow: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    color: "#64748b",
    fontSize: 14,
  },
  section: {
    marginTop: 20,
  },
  paragraph: {
    color: "#475569",
    lineHeight: 1.85,
    fontSize: 15,
    whiteSpace: "pre-wrap",
  },
  paragraphStrong: {
    color: "#334155",
    lineHeight: 1.85,
    fontSize: 15.5,
    whiteSpace: "pre-wrap",
    fontWeight: 500,
  },
  profileCard: {
    borderRadius: 18,
    padding: 18,
    background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
    border: "1px solid #dbeafe",
  },
  timelineCard: {
    position: "relative",
    borderRadius: 18,
    padding: "10px 0 0 0",
  },
  timelineLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 2,
    background: "#dbeafe",
    insetInlineStart: "10px",
  },
  timelineContent: {
    position: "relative",
  },
  timelineItem: {
    position: "relative",
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    paddingInlineStart: 0,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    background: "#2563eb",
    marginTop: 10,
    marginInlineStart: 5,
    flexShrink: 0,
    boxShadow: "0 0 0 4px #eff6ff",
  },
  timelineBody: {
    flex: 1,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
  },
  timelineTopRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 8,
  },
  timelineRole: {
    fontSize: 18,
    color: "#0f172a",
    fontWeight: 800,
    lineHeight: 1.2,
  },
  timelineDate: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: 700,
  },
  cleanCard: {
    borderRadius: 18,
    padding: 16,
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(15,23,42,0.04)",
  },
  skillRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  skillChip: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: 13,
    fontWeight: 700,
  },
  sidebarAside: {
    background: "linear-gradient(180deg, #0f2f6b 0%, #2563eb 100%)",
    color: "#ffffff",
    padding: 24,
  },
  sidebarMain: {
    background: "#ffffff",
    padding: 24,
  },
  sidebarPhotoWrap: {
    width: 150,
    height: 150,
    borderRadius: 24,
    overflow: "hidden",
    background: "rgba(255,255,255,0.12)",
    border: "2px solid rgba(255,255,255,0.25)",
    marginBottom: 18,
  },
  sidebarPhotoPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: 700,
  },
  sidebarName: {
    fontSize: 34,
    fontWeight: 900,
    color: "#ffffff",
    lineHeight: 1,
    marginBottom: 8,
    letterSpacing: "-0.03em",
  },
  sidebarRole: {
    fontSize: 18,
    color: "#dbeafe",
    fontWeight: 800,
    marginBottom: 8,
    lineHeight: 1.2,
  },
  sidebarSubtitleLine: {
    fontSize: 13,
    color: "#dbeafe",
    fontWeight: 600,
    marginBottom: 12,
  },
  asideText: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 14,
    lineHeight: 1.8,
  },
  jobHint: {
    display: "inline-block",
    marginBottom: 12,
    padding: "8px 12px",
    borderRadius: 999,
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: 12,
    fontWeight: 800,
  },
};


"use client";

import { useEffect, useMemo, useState } from "react";

const translations = {
  ar: {
    dir: "rtl",
    brandSub: "إنشاء سيرة ذاتية • دفع • وظائف",
    langAr: "العربية",
    langEn: "English",

    navHome: "الرئيسية",
    navCv: "إنشاء السيرة",
    navPayment: "الدفع",
    navJobs: "الوظائف",
    navResult: "النتيجة",

    heroBadge: "منصة متكاملة",
    heroTitle: "ResumeFix AI",
    heroDesc:
      "أنشئ سيرة ذاتية احترافية، أكمل الدفع، نزّل النتيجة، وتصفح الوظائف من واجهة واحدة جميلة وعصرية.",
    heroStart: "ابدأ إنشاء السيرة",
    heroJobs: "تصفح الوظائف",

    statTemplates: "قوالب",
    statPdf: "تحميل جاهز",
    statJobs: "وظائف مباشرة",

    featureCvTitle: "إنشاء السيرة الذاتية",
    featureCvText: "أنشئ سيرة ذاتية احترافية بخطوات سهلة وواضحة.",
    featurePayTitle: "الدفع",
    featurePayText: "بعد تعبئة البيانات أكمل الدفع بسهولة وأمان.",
    featureJobsTitle: "لوحة الوظائف",
    featureJobsText: "تصفح الوظائف المتاحة من نفس المنصة بدون تعقيد.",

    cvBadge: "إنشاء السيرة الذاتية",
    cvTitle: "املأ بياناتك",
    cvDesc: "أدخل بياناتك الأساسية ثم تابع إلى الدفع لإنشاء السيرة النهائية.",

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

    paymentBadge: "الدفع",
    paymentTitle: "أكمل الدفع",
    paymentDesc:
      "بعد حفظ البيانات سيتم تحويلك إلى صفحة الدفع، ثم يمكنك فتح صفحة النتيجة وتحميل ملف PDF.",
    savePay: "حفظ والمتابعة إلى الدفع",
    saving: "جارٍ الحفظ...",
    backHome: "العودة إلى الرئيسية",

    jobsBadge: "الوظائف",
    jobsTitle: "الوظائف المتاحة",
    jobsDesc: "تصفح الوظائف واطلع على التفاصيل داخل نفس الصفحة.",
    jobsSearch: "ابحث بعنوان الوظيفة أو الشركة",
    allLocations: "كل الأماكن",
    allSpecialties: "كل التخصصات",
    allTypes: "كل الأنواع",
    loadingJobs: "جارٍ تحميل الوظائف...",
    noJobs: "لا توجد وظائف حاليًا.",
    jobsErrorPrefix: "خطأ في تحميل الوظائف:",

    detailsBtn: "تفاصيل الوظيفة",
    hideDetailsBtn: "إخفاء التفاصيل",
    applyWhatsapp: "التقديم عبر واتساب",
    viewJob: "عرض الوظيفة",
    source: "المصدر",
    requirements: "المتطلبات",
    license: "الترخيص",

    jobCtaTitle: "هل تريد التقديم على هذه الوظيفة؟",
    jobCtaDesc: "أنشئ سيرة ذاتية مناسبة لهذه الوظيفة أولًا، ثم قدّم مباشرة.",
    createCvForJob: "أنشئ CV لهذه الوظيفة",
    applicationLink: "رابط التقديم",

    resultBadge: "النتيجة",
    resultTitle: "النتيجة النهائية",
    resultDesc:
      "بعد الدفع يمكنك فتح صفحة النتيجة لتحميل السيرة الذاتية بصيغة PDF.",
    openResult: "فتح النتيجة",

    smartFlow: "تجربة سلسة",
    smartFlowTitle: "املأ البيانات ← ادفع ← احصل على السيرة",

    saveSuccess: "تم حفظ البيانات بنجاح. جارٍ تحويلك إلى الدفع...",
    saveFailed: "تعذر حفظ البيانات",
    badResponse: "حدث خطأ في الاستجابة",
    saveError: "حدث خطأ أثناء الحفظ",
  },
  en: {
    dir: "ltr",
    brandSub: "CV Builder • Payment • Jobs",
    langAr: "العربية",
    langEn: "English",

    navHome: "Home",
    navCv: "CV Builder",
    navPayment: "Payment",
    navJobs: "Jobs",
    navResult: "Result",

    heroBadge: "ALL-IN-ONE PLATFORM",
    heroTitle: "ResumeFix AI",
    heroDesc:
      "Create a professional CV, complete payment, download your result, and browse jobs from one beautiful modern interface.",
    heroStart: "Start My CV",
    heroJobs: "Browse Jobs",

    statTemplates: "Templates",
    statPdf: "PDF Ready",
    statJobs: "Live Jobs",

    featureCvTitle: "CV Builder",
    featureCvText: "Create a professional CV with a clear and simple workflow.",
    featurePayTitle: "Payment",
    featurePayText: "Complete payment easily and securely after filling your details.",
    featureJobsTitle: "Jobs Board",
    featureJobsText: "Browse available jobs from the same platform with no hassle.",

    cvBadge: "CV BUILDER",
    cvTitle: "Fill in your details",
    cvDesc: "Enter your core details, then continue to payment to generate your final CV.",

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

    paymentBadge: "PAYMENT",
    paymentTitle: "Complete payment",
    paymentDesc:
      "After saving your details, you will be redirected to payment, then you can open the result page and download your PDF.",
    savePay: "Save & Continue to Payment",
    saving: "Saving...",
    backHome: "Back Home",

    jobsBadge: "JOBS",
    jobsTitle: "Available Jobs",
    jobsDesc: "Browse jobs and view details inside the same page.",
    jobsSearch: "Search by title or company",
    allLocations: "All Locations",
    allSpecialties: "All Specialties",
    allTypes: "All Types",
    loadingJobs: "Loading jobs...",
    noJobs: "No jobs available right now.",
    jobsErrorPrefix: "Error loading jobs:",

    detailsBtn: "Job Details",
    hideDetailsBtn: "Hide Details",
    applyWhatsapp: "Apply on WhatsApp",
    viewJob: "View Job",
    source: "Source",
    requirements: "Requirements",
    license: "License",

    jobCtaTitle: "Want to apply for this job?",
    jobCtaDesc: "Create a CV tailored for this job first, then apply directly.",
    createCvForJob: "Create CV for this Job",
    applicationLink: "Application Link",

    resultBadge: "RESULT",
    resultTitle: "Final Result",
    resultDesc: "After payment, open the result page to download your CV as PDF.",
    openResult: "Open Result",

    smartFlow: "Smooth experience",
    smartFlowTitle: "Fill details → Pay → Get your CV",

    saveSuccess: "Details saved successfully. Redirecting to payment...",
    saveFailed: "Failed to save details",
    badResponse: "Invalid server response",
    saveError: "An error occurred while saving",
  },
};

function isWhatsAppJob(job) {
  const url = job?.source_url || "";
  const source = job?.source_name || "";
  return (
    url.includes("wa.me") ||
    url.includes("whatsapp.com") ||
    source.toLowerCase().includes("whatsapp")
  );
}

function FeatureCard({ title, text, icon }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 24,
        padding: 24,
        boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
      }}
    >
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
          fontSize: 24,
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "#475569",
          lineHeight: 1.8,
          fontSize: 16,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 22,
        padding: 22,
        boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
          color: "#fff",
          fontWeight: 900,
          marginBottom: 14,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ color: "#475569", lineHeight: 1.8 }}>{text}</div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div
      style={{
        borderRadius: 22,
        padding: 18,
        background: "#f8fbff",
        border: "1px solid #dbeafe",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 900, color: "#0f172a" }}>{value}</div>
      <div style={{ color: "#64748b", marginTop: 6 }}>{label}</div>
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

function InfoBox({ text, error = false }) {
  return (
    <div
      style={{
        borderRadius: 22,
        border: error ? "1px solid #fecdd3" : "1px solid #dbeafe",
        background: error ? "#fff1f2" : "#f8fbff",
        padding: 22,
        color: error ? "#be123c" : "#475569",
        fontSize: 18,
        lineHeight: 1.7,
      }}
    >
      {text}
    </div>
  );
}

function JobCard({ job, t }) {
  const whatsapp = isWhatsAppJob(job);
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 24,
        padding: 22,
        boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: 10,
          lineHeight: 1.3,
        }}
      >
        {job.title || "Job"}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 14,
        }}
      >
        {job.location ? <span style={tagStyle}>{job.location}</span> : null}
        {job.specialty ? <span style={tagStyle}>{job.specialty}</span> : null}
        {job.job_type ? <span style={tagStyle}>{job.job_type}</span> : null}
      </div>

      {job.company_name ? (
        <div
          style={{
            color: "#2563eb",
            fontWeight: 700,
            marginBottom: 10,
            fontSize: 17,
          }}
        >
          {job.company_name}
        </div>
      ) : null}

      {job.summary ? (
        <div
          style={{
            color: "#475569",
            lineHeight: 1.9,
            fontSize: 16,
            marginBottom: 14,
            whiteSpace: "pre-wrap",
          }}
        >
          {job.summary}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={secondaryButton}
        >
          {open ? t.hideDetailsBtn : t.detailsBtn}
        </button>

        {job.source_url ? (
          <a
            href={job.source_url}
            target="_blank"
            rel="noreferrer"
            style={whatsapp ? whatsappBtn : primarySmallBtn}
          >
            {whatsapp ? t.applyWhatsapp : t.viewJob}
          </a>
        ) : null}

        {job.source_name ? (
          <span
            style={{
              color: "#64748b",
              fontSize: 14,
            }}
          >
            {t.source}: {job.source_name}
          </span>
        ) : null}
      </div>

      {open ? (
        <div
          style={{
            marginTop: 18,
            borderTop: "1px solid #e5e7eb",
            paddingTop: 18,
          }}
        >
          {job.requirements ? (
            <div
              style={{
                marginBottom: 14,
                color: "#475569",
                fontSize: 15,
                lineHeight: 1.9,
              }}
            >
              <strong style={{ color: "#0f172a" }}>{t.requirements}:</strong>{" "}
              {job.requirements}
            </div>
          ) : null}

          {job.license_required ? (
            <div
              style={{
                marginBottom: 14,
                color: "#475569",
                fontSize: 15,
                lineHeight: 1.9,
              }}
            >
              <strong style={{ color: "#0f172a" }}>{t.license}:</strong>{" "}
              {job.license_required}
            </div>
          ) : null}

          <div
            style={{
              borderRadius: 20,
              padding: 18,
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              marginTop: 14,
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
              {t.jobCtaTitle}
            </div>

            <div
              style={{
                color: "#334155",
                lineHeight: 1.8,
                fontSize: 16,
                marginBottom: 16,
              }}
            >
              {t.jobCtaDesc}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#cv" style={primaryBtn}>
                {t.createCvForJob}
              </a>

              {job.source_url ? (
                <a
                  href={job.source_url}
                  target="_blank"
                  rel="noreferrer"
                  style={whatsapp ? whatsappBtn : secondaryBtn}
                >
                  {whatsapp ? t.applyWhatsapp : t.applicationLink}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState("ar");
  const t = translations[lang];

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
  const [saveMessage, setSaveMessage] = useState("");

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState("");

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

  useEffect(() => {
    const stored = localStorage.getItem("site_lang");
    if (stored === "ar" || stored === "en") {
      setLang(stored);
    }
  }, []);

  function switchLang(nextLang) {
    setLang(nextLang);
    localStorage.setItem("site_lang", nextLang);
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSaveAndPay(e) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");

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
        setSaveMessage(raw || t.badResponse);
        setSaving(false);
        return;
      }

      if (!res.ok || !data?.ok || !data?.orderId) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || JSON.stringify(data?.error || data);

        setSaveMessage(message || t.saveFailed);
        setSaving(false);
        return;
      }

      localStorage.setItem("resumefix_order_id", data.orderId);
      localStorage.setItem("resumefix_template", form.template);

      setSaveMessage(t.saveSuccess);
      window.location.href = "https://payhip.com/order?link=J7W4G";
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || JSON.stringify(error);

      setSaveMessage(message || t.saveError);
      setSaving(false);
    }
  }

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch("/api/jobs-list", {
          cache: "no-store",
        });

        const raw = await res.text();

        let data;
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          setJobsError(raw || "Invalid jobs response");
          setJobsLoading(false);
          return;
        }

        if (!res.ok || !data?.ok) {
          setJobsError(
            typeof data?.error === "string"
              ? data.error
              : JSON.stringify(data?.error || data)
          );
          setJobsLoading(false);
          return;
        }

        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
        setJobsLoading(false);
      } catch (err) {
        setJobsError(err?.message || "Failed to load jobs");
        setJobsLoading(false);
      }
    }

    loadJobs();
  }, []);

  const locations = useMemo(
    () => ["all", ...new Set(jobs.map((job) => job.location).filter(Boolean))],
    [jobs]
  );

  const specialties = useMemo(
    () => ["all", ...new Set(jobs.map((job) => job.specialty).filter(Boolean))],
    [jobs]
  );

  const jobTypes = useMemo(
    () => ["all", ...new Set(jobs.map((job) => job.job_type).filter(Boolean))],
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        (job.title || "").toLowerCase().includes(q) ||
        (job.company_name || "").toLowerCase().includes(q) ||
        (job.summary || "").toLowerCase().includes(q);

      const matchesLocation =
        locationFilter === "all" || job.location === locationFilter;

      const matchesSpecialty =
        specialtyFilter === "all" || job.specialty === specialtyFilter;

      const matchesJobType =
        jobTypeFilter === "all" || job.job_type === jobTypeFilter;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesSpecialty &&
        matchesJobType
      );
    });
  }, [jobs, search, locationFilter, specialtyFilter, jobTypeFilter]);

  return (
    <main
      dir={t.dir}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(96,165,250,0.12), transparent 20%), radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 18%), linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 70px" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            marginBottom: 24,
            paddingTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
              padding: "14px 16px",
              borderRadius: 20,
              border: "1px solid #dbeafe",
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
                  color: "#fff",
                  fontWeight: 900,
                  fontSize: 20,
                  boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
                }}
              >
                R
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>ResumeFix AI</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>{t.brandSub}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <a href="#hero" style={secondaryBtn}>{t.navHome}</a>
              <a href="#cv" style={secondaryBtn}>{t.navCv}</a>
              <a href="#payment" style={secondaryBtn}>{t.navPayment}</a>
              <a href="#jobs" style={secondaryBtn}>{t.navJobs}</a>
              <a href="#result" style={secondaryBtn}>{t.navResult}</a>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => switchLang("ar")}
                  style={lang === "ar" ? langActiveBtn : langBtn}
                >
                  {t.langAr}
                </button>
                <button
                  type="button"
                  onClick={() => switchLang("en")}
                  style={lang === "en" ? langActiveBtn : langBtn}
                >
                  {t.langEn}
                </button>
              </div>
            </div>
          </div>
        </div>

        <section
          id="hero"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 24,
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 32,
              padding: 30,
              boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
            }}
          >
            <div style={badge}>{t.heroBadge}</div>

            <h1
              style={{
                margin: "0 0 16px",
                fontSize: "clamp(42px, 8vw, 76px)",
                lineHeight: 0.95,
                fontWeight: 900,
                letterSpacing: "-0.05em",
                color: "#0f172a",
              }}
            >
              {t.heroTitle}
            </h1>

            <p
              style={{
                margin: "0 0 24px",
                color: "#475569",
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.9,
              }}
            >
              {t.heroDesc}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
              <a href="#cv" style={primaryBtn}>{t.heroStart}</a>
              <a href="#jobs" style={outlineBtn}>{t.heroJobs}</a>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 12,
              }}
            >
              <Stat value="3" label={t.statTemplates} />
              <Stat value="PDF" label={t.statPdf} />
              <Stat value="Jobs" label={t.statJobs} />
            </div>
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
            <div
              style={{
                borderRadius: 24,
                padding: 22,
                background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                border: "1px solid #bfdbfe",
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 15, color: "#1d4ed8", fontWeight: 700 }}>
                {t.smartFlow}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  marginTop: 8,
                  lineHeight: 1.3,
                  color: "#0f172a",
                }}
              >
                {t.smartFlowTitle}
              </div>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <FeatureCard icon="📝" title={t.featureCvTitle} text={t.featureCvText} />
              <FeatureCard icon="💳" title={t.featurePayTitle} text={t.featurePayText} />
            </div>
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <FeatureCard icon="📄" title={t.featureCvTitle} text={t.featureCvText} />
          <FeatureCard icon="⚡" title={t.featurePayTitle} text={t.featurePayText} />
          <FeatureCard icon="💼" title={t.featureJobsTitle} text={t.featureJobsText} />
        </section>

        <section
          id="cv"
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
            marginBottom: 28,
          }}
        >
          <div style={badge}>{t.cvBadge}</div>
          <h2 style={sectionTitle}>{t.cvTitle}</h2>
          <p style={sectionText}>{t.cvDesc}</p>

          <form onSubmit={handleSaveAndPay}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
              }}
            >
              <Field label={t.fullName} value={form.fullName} onChange={(v) => updateField("fullName", v)} placeholder={t.fullNamePh} />
              <Field label={t.jobTitle} value={form.jobTitle} onChange={(v) => updateField("jobTitle", v)} placeholder={t.jobTitlePh} />
              <Field label={t.email} value={form.email} onChange={(v) => updateField("email", v)} placeholder={t.emailPh} />
              <Field label={t.phone} value={form.phone} onChange={(v) => updateField("phone", v)} placeholder={t.phonePh} />
            </div>

            <TextAreaField label={t.summary} value={form.summary} onChange={(v) => updateField("summary", v)} placeholder={t.summaryPh} />
            <TextAreaField label={t.experience} value={form.experience} onChange={(v) => updateField("experience", v)} placeholder={t.experiencePh} />
            <TextAreaField label={t.education} value={form.education} onChange={(v) => updateField("education", v)} placeholder={t.educationPh} />
            <TextAreaField label={t.skills} value={form.skills} onChange={(v) => updateField("skills", v)} placeholder={t.skillsPh} />
            <TextAreaField label={t.languages} value={form.languages} onChange={(v) => updateField("languages", v)} placeholder={t.languagesPh} />

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

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="submit" disabled={saving} style={primaryButton}>
                {saving ? t.saving : t.savePay}
              </button>
              <a href="#payment" style={outlineBtn}>{t.navPayment}</a>
            </div>

            {saveMessage ? (
              <div style={{ marginTop: 16, color: "#475569", lineHeight: 1.8, fontSize: 16 }}>
                {saveMessage}
              </div>
            ) : null}
          </form>
        </section>

        <section
          id="payment"
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
            marginBottom: 28,
          }}
        >
          <div style={badge}>{t.paymentBadge}</div>
          <h2 style={sectionTitle}>{t.paymentTitle}</h2>
          <p style={sectionText}>{t.paymentDesc}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <StepCard number="1" title={t.navCv} text={t.featureCvText} />
            <StepCard number="2" title={t.navPayment} text={t.featurePayText} />
            <StepCard number="3" title={t.navResult} text={t.resultDesc} />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <a href="#cv" style={primaryBtn}>{t.navCv}</a>
            <a href="#result" style={outlineBtn}>{t.navResult}</a>
          </div>
        </section>

        <section
          id="jobs"
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
            marginBottom: 28,
          }}
        >
          <div style={badge}>{t.jobsBadge}</div>
          <h2 style={sectionTitle}>{t.jobsTitle}</h2>
          <p style={sectionText}>{t.jobsDesc}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginBottom: 24,
            }}
          >
            <input
              value={search}
              onChange={(e) => set



"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const i18n = {
  ar: {
    dir: "rtl",
    title: "الوظائف المتاحة",
    subtitle: "تصفح الوظائف واطلع على التفاصيل داخل نفس الصفحة.",
    backHome: "الصفحة الرئيسية",
    langAr: "العربية",
    langEn: "English",
    search: "ابحث بعنوان الوظيفة أو الشركة",
    allLocations: "كل الأماكن",
    allSpecialties: "كل التخصصات",
    allTypes: "كل الأنواع",
    loading: "جارٍ تحميل الوظائف...",
    noJobs: "لا توجد وظائف حاليًا.",
    errorPrefix: "خطأ في تحميل الوظائف:",
    detailsBtn: "تفاصيل الوظيفة",
    hideDetailsBtn: "إخفاء التفاصيل",
    applyWhatsapp: "التقديم عبر واتساب",
    viewJob: "عرض الوظيفة",
    source: "المصدر",
    requirements: "المتطلبات",
    license: "الترخيص",
    ctaTitle: "جاهز للتقديم على هذه الوظيفة؟",
    ctaDesc:
      "أنشئ سيرة ذاتية احترافية ومناسبة لهذه الوظيفة أولًا، ثم استخدمها مباشرة للتقديم وزيادة فرص قبولك.",
    createCv: "أنشئ CV لهذه الوظيفة الآن",
    applicationLink: "رابط التقديم",
    jobsBadge: "الوظائف",
    whyBox: "خطوة ذكية قبل التقديم",
  },
  en: {
    dir: "ltr",
    title: "Available Jobs",
    subtitle: "Browse jobs and view details inside the same page.",
    backHome: "Back Home",
    langAr: "العربية",
    langEn: "English",
    search: "Search by title or company",
    allLocations: "All Locations",
    allSpecialties: "All Specialties",
    allTypes: "All Types",
    loading: "Loading jobs...",
    noJobs: "No jobs available right now.",
    errorPrefix: "Error loading jobs:",
    detailsBtn: "Job Details",
    hideDetailsBtn: "Hide Details",
    applyWhatsapp: "Apply on WhatsApp",
    viewJob: "View Job",
    source: "Source",
    requirements: "Requirements",
    license: "License",
    ctaTitle: "Ready to apply for this role?",
    ctaDesc:
      "Create a professional CV tailored for this job first, then use it immediately to apply with stronger impact.",
    createCv: "Create CV for This Job Now",
    applicationLink: "Application Link",
    jobsBadge: "JOBS",
    whyBox: "Smart step before applying",
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
              borderRadius: 22,
              padding: 20,
              background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
              border: "1px solid #bfdbfe",
              marginTop: 16,
              boxShadow: "0 10px 24px rgba(37,99,235,0.08)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                marginBottom: 10,
                padding: "8px 12px",
                borderRadius: 999,
                background: "#ffffff",
                color: "#2563eb",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              {t.whyBox}
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: "#0f172a",
                marginBottom: 10,
                lineHeight: 1.3,
              }}
            >
              {t.ctaTitle}
            </div>

            <div
              style={{
                color: "#334155",
                lineHeight: 1.85,
                fontSize: 16,
                marginBottom: 18,
              }}
            >
              {t.ctaDesc}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={`/generate?jobId=${job.id}`} style={jobCtaBtn}>
                {t.createCv}
              </Link>

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

export default function JobsPage() {
  const [lang, setLang] = useState("ar");
  const t = i18n[lang];

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

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
          setError(raw || "Invalid jobs response");
          setLoading(false);
          return;
        }

        if (!res.ok || !data?.ok) {
          setError(
            typeof data?.error === "string"
              ? data.error
              : JSON.stringify(data?.error || data)
          );
          setLoading(false);
          return;
        }

        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
        setLoading(false);
      } catch (err) {
        setError(err?.message || "Failed to load jobs");
        setLoading(false);
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
          "radial-gradient(circle at top left, rgba(96,165,250,0.12), transparent 20%), linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
        color: "#0f172a",
        padding: "40px 20px 70px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <div style={badge}>{t.jobsBadge}</div>
            <h1 style={titleStyle}>{t.title}</h1>
            <p style={sectionText}>{t.subtitle}</p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/" style={secondaryBtn}>
              {t.backHome}
            </Link>

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
            borderRadius: 28,
            padding: 24,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
          }}
        >
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search}
              style={inputStyle}
            />

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={inputStyle}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? t.allLocations : item}
                </option>
              ))}
            </select>

            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              style={inputStyle}
            >
              {specialties.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? t.allSpecialties : item}
                </option>
              ))}
            </select>

            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              style={inputStyle}
            >
              {jobTypes.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? t.allTypes : item}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <InfoBox text={t.loading} />
          ) : error ? (
            <InfoBox text={`${t.errorPrefix} ${error}`} error />
          ) : filteredJobs.length === 0 ? (
            <InfoBox text={t.noJobs} />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 18,
              }}
            >
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} t={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
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

const titleStyle = {
  margin: "0 0 10px",
  fontSize: "clamp(38px, 7vw, 64px)",
  lineHeight: 1,
  fontWeight: 800,
  color: "#0f172a",
};

const sectionText = {
  margin: 0,
  maxWidth: 760,
  color: "#475569",
  fontSize: "18px",
  lineHeight: 1.8,
};

const tagStyle = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: 13,
  fontWeight: 700,
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

const primarySmallBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  color: "#ffffff",
};

const whatsappBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#ffffff",
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 20px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 800,
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
};

const secondaryButton = {
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 800,
  cursor: "pointer",
};

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 240,
  padding: "18px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 17,
  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  color: "#ffffff",
  boxShadow: "0 14px 30px rgba(37,99,235,0.20)",
};

const jobCtaBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 270,
  padding: "18px 26px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 18,
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "#ffffff",
  boxShadow: "0 16px 36px rgba(37,99,235,0.24)",
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

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function isWhatsAppJob(job) {
  const url = job?.source_url || "";
  const source = job?.source_name || "";
  return (
    url.includes("wa.me") ||
    url.includes("whatsapp.com") ||
    source.toLowerCase().includes("whatsapp")
  );
}

function JobCard({ job }) {
  const whatsapp = isWhatsAppJob(job);

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
        {job.title || "وظيفة"}
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

      {job.requirements ? (
        <div
          style={{
            marginBottom: 14,
            color: "#475569",
            fontSize: 15,
            lineHeight: 1.9,
          }}
        >
          <strong style={{ color: "#0f172a" }}>المتطلبات:</strong>{" "}
          {job.requirements}
        </div>
      ) : null}

      {job.license_required ? (
        <div
          style={{
            marginBottom: 16,
            color: "#475569",
            fontSize: 15,
            lineHeight: 1.9,
          }}
        >
          <strong style={{ color: "#0f172a" }}>الترخيص:</strong>{" "}
          {job.license_required}
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
        <Link href={`/jobs/${job.id}`} style={secondaryBtn}>
          تفاصيل الوظيفة
        </Link>

        {job.source_url ? (
          <a
            href={job.source_url}
            target="_blank"
            rel="noreferrer"
            style={whatsapp ? whatsappBtn : primarySmallBtn}
          >
            {whatsapp ? "التقديم عبر واتساب" : "عرض الوظيفة"}
          </a>
        ) : null}

        {job.source_name ? (
          <span
            style={{
              color: "#64748b",
              fontSize: 14,
            }}
          >
            المصدر: {job.source_name}
          </span>
        ) : null}
      </div>
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
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

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
          setError(raw || "استجابة الوظائف غير صحيحة");
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
        setError(err?.message || "تعذر تحميل الوظائف");
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
      dir="rtl"
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
            <div style={badge}>الوظائف</div>
            <h1 style={titleStyle}>الوظائف المتاحة</h1>
            <p style={sectionText}>
              تصفح الوظائف وادخل إلى صفحة كل وظيفة داخل موقعك أولًا.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/" style={secondaryBtn}>
              الصفحة الرئيسية
            </Link>
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
              placeholder="ابحث بعنوان الوظيفة أو الشركة"
              style={inputStyle}
            />

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={inputStyle}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "كل الأماكن" : item}
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
                  {item === "all" ? "كل التخصصات" : item}
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
                  {item === "all" ? "كل الأنواع" : item}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <InfoBox text="جارٍ تحميل الوظائف..." />
          ) : error ? (
            <InfoBox text={`خطأ في تحميل الوظائف: ${error}`} error />
          ) : filteredJobs.length === 0 ? (
            <InfoBox text="لا توجد وظائف حاليًا." />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 18,
              }}
            >
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
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


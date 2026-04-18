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
        borderRadius: 26,
        border: "1px solid rgba(148,163,184,0.14)",
        background: "rgba(8,16,24,0.6)",
        padding: 24,
        boxShadow: "0 18px 50px rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#f8fafc",
          marginBottom: 10,
          lineHeight: 1.2,
        }}
      >
        {job.title || "Untitled Job"}
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
            color: "#93c5fd",
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
            color: "#dbe4f0",
            lineHeight: 1.8,
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
            color: "#cbd5e1",
            fontSize: 15,
            lineHeight: 1.8,
          }}
        >
          <strong style={{ color: "#f8fafc" }}>Requirements:</strong>{" "}
          {job.requirements}
        </div>
      ) : null}

      {job.license_required ? (
        <div
          style={{
            marginBottom: 16,
            color: "#cbd5e1",
            fontSize: 15,
            lineHeight: 1.8,
          }}
        >
          <strong style={{ color: "#f8fafc" }}>License:</strong>{" "}
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
        {job.source_url ? (
          <a
            href={job.source_url}
            target="_blank"
            rel="noreferrer"
            style={whatsapp ? whatsappBtn : primaryBtn}
          >
            {whatsapp ? "التقديم عبر واتساب" : "عرض الوظيفة"}
          </a>
        ) : null}

        {job.source_name ? (
          <span
            style={{
              color: "#94a3b8",
              fontSize: 14,
            }}
          >
            Source: {job.source_name}
          </span>
        ) : null}
      </div>
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
        const res = await fetch("/api/jobs-list", { cache: "no-store" });
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
      style={{
        minHeight: "100vh",
        padding: "40px 24px 72px",
        color: "#f8fafc",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #081018 0%, #020817 100%)",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div>
            <div style={badgeStyle}>Jobs Board</div>
            <h1
              style={{
                margin: "0 0 10px",
                fontSize: "clamp(38px, 7vw, 64px)",
                lineHeight: 1,
                fontWeight: 800,
              }}
            >
              Available Jobs
            </h1>
            <p
              style={{
                margin: 0,
                maxWidth: 760,
                color: "#dbe4f0",
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.7,
              }}
            >
              Browse job opportunities collected and organized inside your site.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/" style={secondaryBtn}>
              Back Home
            </Link>
            <Link href="/generate" style={primaryBtn}>
              Create CV
            </Link>
          </div>
        </div>

        <div
          style={{
            padding: 24,
            borderRadius: 28,
            border: "1px solid rgba(148,163,184,0.16)",
            background: "rgba(15,23,42,0.88)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
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
              placeholder="Search by title, company, or keyword"
              style={inputStyle}
            />

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              style={inputStyle}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "All Locations" : item}
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
                  {item === "all" ? "All Specialties" : item}
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
                  {item === "all" ? "All Job Types" : item}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <InfoBox text="Loading jobs..." />
          ) : error ? (
            <InfoBox text={`Error loading jobs: ${error}`} error />
          ) : filteredJobs.length === 0 ? (
            <InfoBox text="No jobs found yet." />
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

function InfoBox({ text, error = false }) {
  return (
    <div
      style={{
        borderRadius: 22,
        border: error
          ? "1px solid rgba(244,114,182,0.24)"
          : "1px solid rgba(148,163,184,0.14)",
        background: error ? "rgba(127,29,29,0.18)" : "rgba(8,16,24,0.55)",
        padding: 22,
        color: error ? "#fecdd3" : "#cbd5e1",
        fontSize: 18,
        lineHeight: 1.7,
      }}
    >
      {text}
    </div>
  );
}

const badgeStyle = {
  display: "inline-block",
  marginBottom: 14,
  padding: "10px 16px",
  borderRadius: 999,
  background: "rgba(96,165,250,0.14)",
  color: "#dbeafe",
  fontSize: 14,
  fontWeight: 700,
};

const tagStyle = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "rgba(96,165,250,0.14)",
  color: "#dbeafe",
  fontSize: 13,
  fontWeight: 700,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 16,
  border: "1px solid rgba(148,163,184,0.18)",
  background: "#09111d",
  color: "#f8fafc",
  fontSize: 16,
  outline: "none",
  boxSizing: "border-box",
};

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 20px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 800,
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 20px",
  borderRadius: 16,
  textDecoration: "none",
  fontWeight: 800,
  border: "1px solid rgba(148,163,184,0.22)",
  background: "rgba(15,23,42,0.66)",
  color: "#f8fafc",
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

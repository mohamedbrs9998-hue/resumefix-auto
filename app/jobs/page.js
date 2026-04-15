"use client";

import { useEffect, useMemo, useState } from "react";

function JobCard({ job }) {
  return (
    <div
      style={{
        borderRadius: 22,
        border: "1px solid rgba(148,163,184,0.14)",
        background: "rgba(8,16,24,0.55)",
        padding: 22,
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#f8fafc",
          marginBottom: 8,
        }}
      >
        {job.title || "Untitled Job"}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 12,
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
            fontSize: 16,
          }}
        >
          {job.company_name}
        </div>
      ) : null}

      {job.summary ? (
        <div
          style={{
            color: "#dbe4f0",
            lineHeight: 1.7,
            fontSize: 16,
            marginBottom: 12,
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
          marginTop: 12,
        }}
      >
        {job.source_url ? (
          <a
            href={job.source_url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 16px",
              borderRadius: 14,
              textDecoration: "none",
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
              color: "#081018",
            }}
          >
            View Job
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
        const res = await fetch("/api/jobs-list", {
          cache: "no-store",
        });

        const data = await res.json();

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

  const locations = useMemo(() => {
    return [
      "all",
      ...new Set(jobs.map((job) => job.location).filter(Boolean)),
    ];
  }, [jobs]);

  const specialties = useMemo(() => {
    return [
      "all",
      ...new Set(jobs.map((job) => job.specialty).filter(Boolean)),
    ];
  }, [jobs]);

  const jobTypes = useMemo(() => {
    return [
      "all",
      ...new Set(jobs.map((job) => job.job_type).filter(Boolean)),
    ];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search.trim() ||
        (job.title || "").toLowerCase().includes(search.toLowerCase()) ||
        (job.company_name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (job.summary || "").toLowerCase().includes(search.toLowerCase());

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
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
            Jobs Board
          </div>

          <h1
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(38px, 7vw, 64px)",
              lineHeight: 1,
              fontWeight: 800,
            }}
          >
            Available Jobs
          </h1>

          <p
            style={{
              margin: "0 0 28px",
              maxWidth: 760,
              color: "#dbe4f0",
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.7,
            }}
          >
            Browse job opportunities collected and organized inside your site.
          </p>

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
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(148,163,184,0.14)",
                background: "rgba(8,16,24,0.55)",
                padding: 22,
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              Loading jobs...
            </div>
          ) : error ? (
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(244,114,182,0.24)",
                background: "rgba(127,29,29,0.18)",
                padding: 22,
                color: "#fecdd3",
                fontSize: 17,
                lineHeight: 1.7,
              }}
            >
              Error loading jobs: {error}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div
              style={{
                borderRadius: 22,
                border: "1px solid rgba(148,163,184,0.14)",
                background: "rgba(8,16,24,0.55)",
                padding: 22,
                color: "#cbd5e1",
                fontSize: 18,
                lineHeight: 1.7,
              }}
            >
              No jobs match your filters.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
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
  fontSize

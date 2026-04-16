"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";

function isWhatsAppLink(url) {
  if (!url) return false;
  return url.includes("wa.me") || url.includes("whatsapp.com");
}

function JobCard({ job }) {
  const whatsapp = isWhatsAppLink(job.source_url);

  return (
    <div
      style={{
        borderRadius: 24,
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
        {job.source_url && !job.source_url.includes("example.com") ? (
          <a
            href={job.source_url}
            target="_blank"
            rel="noreferrer"
            style={whatsapp ? whatsappBtn : primarySmallBtn}
          >
            {whatsapp ? "Apply on WhatsApp" : "View Job"}
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

function FeatureCard({ title, text }) {
  return (
    <div
      style={{
        padding: 22,
        borderRadius: 24,
        border: "1px solid rgba(148,163,184,0.14)",
        background: "rgba(15,23,42,0.88)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.24)",
      }}
    >
      <div
        style={{
          fontSize: 21,
          fontWeight: 800,
          marginBottom: 10,
          color: "#f8fafc",
        }}
      >
        {title}
      </div>
      <div
        style={{
          color: "#cbd5e1",
          fontSize: 16,
          lineHeight: 1.7,
        }}
      >
        {text}
      </div>
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
          color: "#e2e8f0",
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
          color: "#e2e8f0",
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

export default function HomePage() {
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
        setSaveMessage(raw || "Invalid server response");
        setSaving(false);
        return;
      }

      if (!res.ok || !data?.ok || !data?.orderId) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || JSON.stringify(data?.error || data);

        setSaveMessage(message || "Failed to save your details");
        setSaving(false);
        return;
      }

      localStorage.setItem(ORDER_KEY, data.orderId);
      localStorage.setItem(TEMPLATE_KEY, form.template);

      setSaveMessage("Details saved successfully. Redirecting to payment...");
      window.location.href = "https://payhip.com/order?link=J7W4G";
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || JSON.stringify(error);

      setSaveMessage(message || "Something went wrong while saving.");
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
            marginBottom: 20,
          }}
        >
          <div>
            <div style={badgeStyle}>One Page CV + Jobs Platform</div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(42px, 7vw, 76px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                fontWeight: 800,
              }}
            >
              ResumeFix AI
            </h1>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#cv-builder" style={primaryBtn}>
              Start My CV
            </a>
            <a href="#jobs-board" style={secondaryBtn}>
              Browse Jobs
            </a>
          </div>
        </div>

        <p
          style={{
            margin: "0 0 28px",
            maxWidth: 850,
            color: "#dbe4f0",
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.7,
          }}
        >
          Create your professional ATS-friendly CV, complete payment, download
          your PDF, and explore real jobs from the same page.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginBottom: 30,
          }}
        >
          <FeatureCard
            title="Create Your CV"
            text="Add your details, improve wording, and build a clean professional CV."
          />
          <FeatureCard
            title="Pay & Get PDF"
            text="Complete payment and access your ready-to-download PDF CV."
          />
          <FeatureCard
            title="Browse Real Jobs"
            text="Explore job opportunities from the same site without leaving the platform."
          />
        </div>

        <section
          id="cv-builder"
          style={{
            padding: 26,
            borderRadius: 28,
            border: "1px solid rgba(148,163,184,0.16)",
            background: "rgba(15,23,42,0.88)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
            marginBottom: 28,
          }}
        >
          <div style={badgeStyle}>CV Builder</div>
          <h2 style={sectionTitle}>Create and pay for your CV</h2>
          <p style={sectionText}>
            Fill in your information, choose your template, then continue to
            payment to generate your final CV.
          </p>

          <form onSubmit={handleSaveAndPay}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 18,
              }}
            >
              <Field
                label="Full Name"
                value={form.fullName}
                onChange={(v) => updateField("fullName", v)}
                placeholder="Write your full name"
              />
              <Field
                label="Job Title"
                value={form.jobTitle}
                onChange={(v) => updateField("jobTitle", v)}
                placeholder="e.g. Accountant"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                placeholder="Write your email"
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                placeholder="Write your phone number"
              />
            </div>

            <TextAreaField
              label="Professional Summary"
              value={form.summary}
              onChange={(v) => updateField("summary", v)}
              placeholder="Write a short summary about yourself"
            />

            <TextAreaField
              label="Experience"
              value={form.experience}
              onChange={(v) => updateField("experience", v)}
              placeholder="Write your work experience"
            />

            <TextAreaField
              label="Education"
              value={form.education}
              onChange={(v) => updateField("education", v)}
              placeholder="Write your education"
            />

            <TextAreaField
              label="Skills"
              value={form.skills}
              onChange={(v) => updateField("skills", v)}
              placeholder="Write your skills"
            />

            <TextAreaField
              label="Languages"
              value={form.languages}
              onChange={(v) => updateField("languages", v)}
              placeholder="Arabic, English..."
            />

            <div style={{ marginBottom: 22 }}>
              <label
                style={{
                  display: "block",
                  marginBottom: 10,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#e2e8f0",
                }}
              >
                Choose Your CV Template
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                }}
              >
                {[
                  {
                    key: "classic",
                    title: "Classic",
                    desc: "Clean and formal layout",
                  },
                  {
                    key: "modern",
                    title: "Modern",
                    desc: "Contemporary style and cleaner look",
                  },
                  {
                    key: "medical_pro",
                    title: "Professional",
                    desc: "Strong all-purpose professional layout",
                  },
                ].map((template) => {
                  const selected = form.template === template.key;

                  return (
                    <button
                      key={template.key}
                      type="button"
                      onClick={() => updateField("template", template.key)}
                      style={{
                        textAlign: "left",
                        padding: "18px",
                        borderRadius: 18,
                        border: selected
                          ? "2px solid #60a5fa"
                          : "1px solid rgba(148,163,184,0.18)",
                        background: selected
                          ? "rgba(96,165,250,0.12)"
                          : "#09111d",
                        color: "#f8fafc",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 800,
                          marginBottom: 6,
                        }}
                      >
                        {template.title}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#94a3b8",
                          lineHeight: 1.5,
                        }}
                      >
                        {template.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                padding: 18,
                borderRadius: 20,
                background: "rgba(8,16,24,0.55)",
                border: "1px solid rgba(148,163,184,0.14)",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  marginBottom: 8,
                }}
              >
                Payment
              </div>
              <div
                style={{
                  color: "#cbd5e1",
                  lineHeight: 1.7,
                }}
              >
                Save your details, continue to payment, then open your result
                page to review and download your CV as PDF.
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="submit" disabled={saving} style={primaryButton}>
                {saving ? "Saving..." : "Save & Continue to Payment"}
              </button>

              <Link href="/result" style={secondaryBtn}>
                Open Result
              </Link>
            </div>

            {saveMessage ? (
              <div
                style={{
                  marginTop: 16,
                  color: "#cbd5e1",
                  lineHeight: 1.7,
                }}
              >
                {saveMessage}
              </div>
            ) : null}
          </form>
        </section>

        <section
          id="jobs-board"
          style={{
            padding: 26,
            borderRadius: 28,
            border: "1px solid rgba(148,163,184,0.16)",
            background: "rgba(15,23,42,0.88)",
            boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
          }}
        >
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
              <h2 style={sectionTitle}>Browse available jobs</h2>
              <p style={sectionText}>
                Search and filter jobs while keeping your CV builder in the same
                page.
              </p>
            </div>

            <Link href="/jobs" style={secondaryBtn}>
              Full Jobs Page
            </Link>
          </div>

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

          {jobsLoading ? (
            <InfoBox text="Loading jobs..." />
          ) : jobsError ? (
            <InfoBox text={`Error loading jobs: ${jobsError}`} error />
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
        </section>
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

const sectionTitle = {
  margin: "0 0 10px",
  fontSize: 34,
  fontWeight: 800,
};

const sectionText = {
  margin: 0,
  color: "#cbd5e1",
  fontSize: 17,
  lineHeight: 1.8,
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
  minWidth: 190,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 18,
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 170,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 18,
  border: "1px solid rgba(148,163,184,0.22)",
  background: "rgba(15,23,42,0.66)",
  color: "#f8fafc",
};

const primarySmallBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 800,
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
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

const primaryButton = {
  border: "none",
  borderRadius: 18,
  padding: "16px 24px",
  minWidth: 220,
  fontSize: 18,
  fontWeight: 800,
  cursor: "pointer",
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
};

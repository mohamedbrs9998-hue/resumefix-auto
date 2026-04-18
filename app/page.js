"use client";

import { useEffect, useMemo, useState } from "react";

function isWhatsAppLink(url) {
  if (!url) return false;
  return url.includes("wa.me") || url.includes("whatsapp.com");
}

function JobCard({ job }) {
  const whatsapp = isWhatsAppLink(job.source_url);

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
      <div style={{ fontSize: 28, fontWeight: 900, color: "#0f172a" }}>
        {value}
      </div>
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
        setSaveMessage(raw || "حدث خطأ في الاستجابة");
        setSaving(false);
        return;
      }

      if (!res.ok || !data?.ok || !data?.orderId) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || JSON.stringify(data?.error || data);

        setSaveMessage(message || "تعذر حفظ البيانات");
        setSaving(false);
        return;
      }

      localStorage.setItem("resumefix_order_id", data.orderId);
      localStorage.setItem("resumefix_template", form.template);

      setSaveMessage("تم حفظ البيانات بنجاح. جارٍ تحويلك إلى الدفع...");
      window.location.href = "https://payhip.com/order?link=J7W4G";
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || JSON.stringify(error);

      setSaveMessage(message || "حدث خطأ أثناء الحفظ");
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
          setJobsError(raw || "استجابة الوظائف غير صحيحة");
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
        setJobsError(err?.message || "تعذر تحميل الوظائف");
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
      dir="rtl"
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
                <div style={{ color: "#64748b", fontSize: 13 }}>
                  إنشاء سيرة ذاتية • دفع • وظائف
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#cv" style={secondaryBtn}>إنشاء السيرة</a>
              <a href="#payment" style={secondaryBtn}>الدفع</a>
              <a href="#jobs" style={secondaryBtn}>الوظائف</a>
              <a href="#result" style={secondaryBtn}>النتيجة</a>
            </div>
          </div>
        </div>

        <section
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
            <div style={badge}>منصة متكاملة</div>

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
              ResumeFix AI
            </h1>

            <p
              style={{
                margin: "0 0 24px",
                color: "#475569",
                fontSize: "clamp(18px, 2vw, 22px)",
                lineHeight: 1.9,
              }}
            >
              أنشئ سيرة ذاتية احترافية، أكمل الدفع، نزّل النتيجة، وتصفح الوظائف من واجهة واحدة جميلة وعصرية.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
              <a href="#cv" style={primaryBtn}>ابدأ إنشاء السيرة</a>
              <a href="#jobs" style={outlineBtn}>تصفح الوظائف</a>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 12,
              }}
            >
              <Stat value="3" label="قوالب" />
              <Stat value="PDF" label="تحميل جاهز" />
              <Stat value="Jobs" label="وظائف مباشرة" />
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
                تجربة سلسة
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
                املأ البيانات ← ادفع ← احصل على السيرة
              </div>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              <FeatureCard
                title="إنشاء السيرة الذاتية"
                text="نموذج منظم وسهل، يساعدك على بناء سيرة احترافية بسرعة."
                icon="📝"
              />
              <FeatureCard
                title="الدفع والنتيجة"
                text="أكمل الدفع ثم افتح صفحة النتيجة لتحميل ملفك بصيغة PDF."
                icon="💳"
              />
            </div>
          </div>
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
          <div style={badge}>إنشاء السيرة الذاتية</div>
          <h2 style={sectionTitle}>املأ بياناتك</h2>
          <p style={sectionText}>
            أدخل بياناتك الأساسية ثم تابع إلى الدفع لإنشاء السيرة النهائية.
          </p>

          <form onSubmit={handleSaveAndPay}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
              }}
            >
              <Field label="الاسم الكامل" value={form.fullName} onChange={(v) => updateField("fullName", v)} placeholder="اكتب اسمك الكامل" />
              <Field label="المسمى الوظيفي" value={form.jobTitle} onChange={(v) => updateField("jobTitle", v)} placeholder="مثال: محاسب" />
              <Field label="البريد الإلكتروني" value={form.email} onChange={(v) => updateField("email", v)} placeholder="اكتب بريدك الإلكتروني" />
              <Field label="رقم الهاتف" value={form.phone} onChange={(v) => updateField("phone", v)} placeholder="اكتب رقم الهاتف" />
            </div>

            <TextAreaField label="الملخص المهني" value={form.summary} onChange={(v) => updateField("summary", v)} placeholder="اكتب ملخصًا قصيرًا عنك" />
            <TextAreaField label="الخبرة" value={form.experience} onChange={(v) => updateField("experience", v)} placeholder="اكتب خبراتك العملية" />
            <TextAreaField label="التعليم" value={form.education} onChange={(v) => updateField("education", v)} placeholder="اكتب تعليمك" />
            <TextAreaField label="المهارات" value={form.skills} onChange={(v) => updateField("skills", v)} placeholder="اكتب المهارات" />
            <TextAreaField label="اللغات" value={form.languages} onChange={(v) => updateField("languages", v)} placeholder="العربية، الإنجليزية..." />

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
                اختر قالب السيرة الذاتية
              </label>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 14,
                }}
              >
                {[
                  { key: "classic", title: "كلاسيك", desc: "تصميم بسيط ورسمي" },
                  { key: "modern", title: "مودرن", desc: "تصميم عصري ونظيف" },
                  { key: "medical_pro", title: "احترافي", desc: "تصميم قوي مناسب لمختلف المجالات" },
                ].map((template) => {
                  const selected = form.template === template.key;

                  return (
                    <button
                      key={template.key}
                      type="button"
                      onClick={() => updateField("template", template.key)}
                      style={{
                        textAlign: "right",
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
                {saving ? "جارٍ الحفظ..." : "حفظ والمتابعة إلى الدفع"}
              </button>
              <a href="#payment" style={outlineBtn}>الانتقال إلى الدفع</a>
            </div>

            {saveMessage ? (
              <div style={{ marginTop: 16, color: "#475569", lineHeight: 1.7 }}>
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
          <div style={badge}>الدفع</div>
          <h2 style={sectionTitle}>أكمل الدفع وافتح النتيجة</h2>
          <p style={sectionText}>
            بعد حفظ البيانات، أكمل الدفع، ثم افتح النتيجة لتحميل السيرة بصيغة PDF.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <StepCard number="1" title="أدخل البيانات" text="ابدأ من قسم السيرة الذاتية واملأ المعلومات." />
            <StepCard number="2" title="أكمل الدفع" text="تابع إلى صفحة الدفع لإتمام العملية." />
            <StepCard number="3" title="افتح النتيجة" text="حمّل ملفك النهائي وابدأ التقديم." />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <a href="#cv" style={primaryBtn}>العودة إلى البيانات</a>
            <a href="#result" style={outlineBtn}>الذهاب إلى النتيجة</a>
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
          <div style={badge}>الوظائف</div>
          <h2 style={sectionTitle}>الوظائف المتاحة</h2>
          <p style={sectionText}>
            تصفح الوظائف وقدم مباشرة على الفرص المناسبة لك.
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
              placeholder="ابحث بعنوان الوظيفة أو الشركة"
              style={inputStyle}
            />

            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} style={inputStyle}>
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "كل الأماكن" : item}
                </option>
              ))}
            </select>

            <select value={specialtyFilter} onChange={(e) => setSpecialtyFilter(e.target.value)} style={inputStyle}>
              {specialties.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "كل التخصصات" : item}
                </option>
              ))}
            </select>

            <select value={jobTypeFilter} onChange={(e) => setJobTypeFilter(e.target.value)} style={inputStyle}>
              {jobTypes.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "كل الأنواع" : item}
                </option>
              ))}
            </select>
          </div>

          {jobsLoading ? (
            <InfoBox text="جارٍ تحميل الوظائف..." />
          ) : jobsError ? (
            <InfoBox text={`خطأ في تحميل الوظائف: ${jobsError}`} error />
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
        </section>

        <section
          id="result"
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
          }}
        >
          <div style={badge}>النتيجة</div>
          <h2 style={sectionTitle}>تحميل النتيجة النهائية</h2>
          <p style={sectionText}>
            بعد الدفع، افتح صفحة النتيجة لتحميل السيرة الذاتية بصيغة PDF.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/result" style={primaryBtn}>فتح النتيجة</Link>
            <Link href="/jobs" style={secondaryBtn}>صفحة الوظائف الكاملة</Link>
          </div>
        </section>
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
  letterSpacing: "0.04em",
};

const sectionTitle = {
  margin: "0 0 18px",
  fontSize: 34,
  fontWeight: 900,
  color: "#0f172a",
};

const sectionText = {
  margin: "0 0 18px",
  color: "#475569",
  fontSize: 17,
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

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 190,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 17,
  background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
  color: "#ffffff",
  boxShadow: "0 12px 28px rgba(37,99,235,0.20)",
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
  fontSize: 17,
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
};

const outlineBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 170,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 17,
  border: "1px solid #bfdbfe",
  background: "#eff6ff",
  color: "#1d4ed8",
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

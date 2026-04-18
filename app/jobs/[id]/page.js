import Link from "next/link";

async function getJob(id) {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return { error: "Missing Supabase environment variables" };
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/jobs?id=eq.${id}&select=*`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      cache: "no-store",
    }
  );

  const text = await res.text();

  let data = [];
  try {
    data = text ? JSON.parse(text) : [];
  } catch {
    return { error: "Invalid response", raw: text };
  }

  if (!res.ok) {
    return { error: "Failed to load job", details: data };
  }

  return { job: Array.isArray(data) ? data[0] : null };
}

function isWhatsAppLink(url) {
  if (!url) return false;
  return url.includes("wa.me") || url.includes("whatsapp.com");
}

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const { job, error } = await getJob(id);

  if (error || !job) {
    return (
      <main dir="rtl" style={{ minHeight: "100vh", background: "#f8fbff", padding: "40px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 28, padding: 28 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>تعذر العثور على الوظيفة</h1>
          <p style={{ color: "#475569", lineHeight: 1.8 }}>لم يتم العثور على الوظيفة المطلوبة أو حدث خطأ أثناء تحميلها.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <Link href="/jobs" style={secondaryBtn}>العودة إلى الوظائف</Link>
            <Link href="/" style={outlineBtn}>الصفحة الرئيسية</Link>
          </div>
        </div>
      </main>
    );
  }

  const whatsapp = isWhatsAppLink(job.source_url);

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "#f8fbff", padding: "40px 20px 70px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 30, padding: 30, boxShadow: "0 20px 60px rgba(15,23,42,0.07)" }}>
          <div style={badge}>تفاصيل الوظيفة</div>

          <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, color: "#0f172a", margin: "0 0 14px" }}>
            {job.title || "وظيفة"}
          </h1>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
            {job.location ? <span style={tagStyle}>{job.location}</span> : null}
            {job.specialty ? <span style={tagStyle}>{job.specialty}</span> : null}
            {job.job_type ? <span style={tagStyle}>{job.job_type}</span> : null}
          </div>

          {job.company_name ? (
            <div style={{ color: "#2563eb", fontWeight: 800, fontSize: 18, marginBottom: 14 }}>
              {job.company_name}
            </div>
          ) : null}

          {job.summary ? (
            <div style={{ marginBottom: 18 }}>
              <div style={sectionLabel}>وصف مختصر</div>
              <div style={textStyle}>{job.summary}</div>
            </div>
          ) : null}

          {job.requirements ? (
            <div style={{ marginBottom: 18 }}>
              <div style={sectionLabel}>المتطلبات</div>
              <div style={textStyle}>{job.requirements}</div>
            </div>
          ) : null}

          {job.license_required ? (
            <div style={{ marginBottom: 18 }}>
              <div style={sectionLabel}>الترخيص</div>
              <div style={textStyle}>{job.license_required}</div>
            </div>
          ) : null}

          <div style={{ marginTop: 26, borderRadius: 24, padding: 22, background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", marginBottom: 10 }}>
              هل تريد التقديم على هذه الوظيفة؟
            </div>

            <div style={{ color: "#334155", fontSize: 17, lineHeight: 1.9, marginBottom: 18 }}>
              أنشئ سيرة ذاتية احترافية ومناسبة لهذه الوظيفة أولًا، ثم استخدمها للتقديم مباشرة.
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={`/generate?jobId=${job.id}`} style={primaryBtn}>
                أنشئ CV لهذه الوظيفة
              </Link>

              {job.source_url ? (
                <a
                  href={job.source_url}
                  target="_blank"
                  rel="noreferrer"
                  style={whatsapp ? whatsappBtn : secondaryBtn}
                >
                  {whatsapp ? "التقديم عبر واتساب" : "رابط التقديم"}
                </a>
              ) : null}

              <Link href="/jobs" style={outlineBtn}>
                العودة إلى الوظائف
              </Link>
            </div>
          </div>
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

const sectionLabel = {
  fontSize: 18,
  fontWeight: 800,
  color: "#0f172a",
  marginBottom: 8,
};

const textStyle = {
  color: "#475569",
  lineHeight: 1.9,
  fontSize: 17,
  whiteSpace: "pre-wrap",
};

const tagStyle = {
  padding: "8px 12px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: 13,
  fontWeight: 700,
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

const whatsappBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 180,
  padding: "16px 24px",
  borderRadius: 18,
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 17,
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#ffffff",
};


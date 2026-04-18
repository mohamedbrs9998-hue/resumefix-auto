"use client";

import Link from "next/link";

function Card({ title, text, icon }) {
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

function Step({ number, title, text }) {
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

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(96,165,250,0.12), transparent 20%), radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 18%), linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
        color: "#0f172a",
      }}
      dir="rtl"
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
              <Link href="/generate" style={secondaryBtn}>إنشاء السيرة</Link>
              <Link href="/result" style={secondaryBtn}>النتيجة</Link>
              <Link href="/jobs" style={secondaryBtn}>الوظائف</Link>
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
              <Link href="/generate" style={primaryBtn}>ابدأ إنشاء السيرة</Link>
              <Link href="/jobs" style={outlineBtn}>تصفح الوظائف</Link>
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
              <Card
                icon="📝"
                title="إنشاء السيرة الذاتية"
                text="نموذج منظم وسهل، يساعدك على بناء سيرة احترافية بسرعة."
              />
              <Card
                icon="💳"
                title="الدفع والنتيجة"
                text="أكمل الدفع ثم افتح صفحة النتيجة لتحميل ملفك بصيغة PDF."
              />
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
          <Card
            icon="📄"
            title="سيرة ذاتية احترافية"
            text="تنسيق نظيف، صياغة أقوى، واختيار قالب مناسب للمجال الوظيفي."
          />
          <Card
            icon="⚡"
            title="نتيجة سريعة"
            text="احفظ بياناتك، أكمل الدفع، ثم راجع النتيجة مباشرة."
          />
          <Card
            icon="💼"
            title="لوحة وظائف"
            text="تصفح الوظائف من نفس المنصة مع إمكانية التقديم مباشرة."
          />
        </section>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
            marginBottom: 28,
          }}
        >
          <div style={badge}>كيف يعمل</div>
          <h2 style={sectionTitle}>خطوات بسيطة وواضحة</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <Step number="1" title="املأ بياناتك" text="ادخل معلوماتك واختر القالب الأنسب." />
            <Step number="2" title="أكمل الدفع" text="تابع إلى الدفع ثم ارجع إلى صفحة النتيجة." />
            <Step number="3" title="نزّل وتقدّم" text="نزّل السيرة وتصفح الوظائف من نفس المنصة." />
          </div>
        </section>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 28,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
          }}
        >
          <div style={badge}>الوصول السريع</div>
          <h2 style={sectionTitle}>ابدأ الآن</h2>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/generate" style={primaryBtn}>إنشاء السيرة الذاتية</Link>
            <Link href="/result" style={secondaryBtn}>فتح النتيجة</Link>
            <Link href="/jobs" style={outlineBtn}>الوظائف</Link>
          </div>
        </section>
      </div>
    </main>
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


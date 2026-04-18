"use client";

export default function HomePage() {
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
              <a href="#hero" style={secondaryBtn}>الرئيسية</a>
              <a href="#cv" style={secondaryBtn}>إنشاء السيرة</a>
              <a href="#payment" style={secondaryBtn}>الدفع</a>
              <a href="#jobs" style={secondaryBtn}>الوظائف</a>
              <a href="#result" style={secondaryBtn}>النتيجة</a>
            </div>
          </div>
        </div>

        <section
          id="hero"
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 32,
            padding: 30,
            boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
            marginBottom: 24,
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
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <Card icon="📝" title="إنشاء السيرة الذاتية" text="أنشئ سيرة ذاتية احترافية بخطوات سهلة وواضحة." />
          <Card icon="💳" title="الدفع" text="بعد تعبئة البيانات أكمل الدفع بسهولة وأمان." />
          <Card icon="💼" title="لوحة الوظائف" text="تصفح الوظائف المتاحة من نفس المنصة بدون تعقيد." />
        </section>

        <section id="cv" style={panel}>
          <div style={badge}>إنشاء السيرة الذاتية</div>
          <h2 style={sectionTitle}>قسم إنشاء السيرة</h2>
          <p style={sectionText}>
            هذا هو مكان إنشاء السيرة الذاتية. استخدم زر إنشاء السيرة من الموقع كما هو مفعّل لديك.
          </p>
          <div style={noteBox}>
            إذا أردت، يمكننا لاحقًا نقل نموذج إنشاء السيرة الكامل إلى هذه الصفحة نفسها بدل الصفحة المنفصلة.
          </div>
        </section>

        <section id="payment" style={panel}>
          <div style={badge}>الدفع</div>
          <h2 style={sectionTitle}>قسم الدفع</h2>
          <p style={sectionText}>
            بعد حفظ البيانات، أكمل الدفع ثم ارجع لعرض النتيجة وتحميل ملف PDF.
          </p>
          <div style={stepsGrid}>
            <Step n="1" title="املأ البيانات" text="ابدأ بإنشاء السيرة الذاتية." />
            <Step n="2" title="أكمل الدفع" text="اتبع زر الدفع بعد الحفظ." />
            <Step n="3" title="حمّل النتيجة" text="راجع السيرة ثم حمّل ملف PDF." />
          </div>
        </section>

        <section id="jobs" style={panel}>
          <div style={badge}>الوظائف</div>
          <h2 style={sectionTitle}>قسم الوظائف</h2>
          <p style={sectionText}>
            هنا تظهر الوظائف المتاحة. يمكننا لاحقًا نقل بطاقات الوظائف الكاملة إلى هذه الصفحة نفسها.
          </p>
          <div style={noteBox}>
            إذا ضغطت على الوظيفة الآن، لن تنتقل من الصفحة الرئيسية عبر الأزرار العلوية، لأننا أوقفنا فتح الصفحات القديمة من الواجهة الرئيسية.
          </div>
        </section>

        <section id="result" style={panel}>
          <div style={badge}>النتيجة</div>
          <h2 style={sectionTitle}>قسم النتيجة</h2>
          <p style={sectionText}>
            بعد الدفع افتح النتيجة لمراجعة السيرة وتحميل PDF.
          </p>
          <div style={noteBox}>
            إذا أردت، الخطوة التالية يمكن أن تكون دمج صفحة النتيجة أيضًا داخل هذه الصفحة نفسها.
          </div>
        </section>
      </div>
    </main>
  );
}

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

function Step({ n, title, text }) {
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
        {n}
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

const panel = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 32,
  padding: 28,
  boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
  marginBottom: 28,
};

const noteBox = {
  borderRadius: 20,
  padding: 18,
  background: "#f8fbff",
  border: "1px solid #dbeafe",
  color: "#475569",
  lineHeight: 1.8,
};

const stepsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 14,
};

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

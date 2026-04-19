"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const i18n = {
  ar: {
    dir: "rtl",
    brand: "ResumeFix AI",
    subtitle: "إنشاء سيرة ذاتية • دفع • وظائف",
    home: "الرئيسية",
    cv: "إنشاء السيرة",
    jobs: "الوظائف",
    result: "النتيجة",
    langAr: "العربية",
    langEn: "English",
    badge: "منصة احترافية متكاملة",
    title: "أنشئ سيرتك الذاتية وابدأ التقديم بثقة",
    desc: "أنشئ سيرة ذاتية احترافية، اختر القالب المناسب، أكمل الدفع، حمّل النتيجة، وتصفح الوظائف من موقع واحد بشكل أنيق وسريع.",
    primary: "ابدأ إنشاء السيرة",
    secondary: "تصفح الوظائف",
    feature1Title: "سيرة ذاتية احترافية",
    feature1Text: "أنشئ CV منظم وواضح ومناسب للتقديم على الوظائف.",
    feature2Title: "دفع بسيط وآمن",
    feature2Text: "احفظ بياناتك ثم أكمل الدفع بسهولة للحصول على النتيجة النهائية.",
    feature3Title: "وظائف جاهزة للتقديم",
    feature3Text: "تصفح الوظائف، افتح التفاصيل، ثم أنشئ CV مناسبًا لكل وظيفة.",
    stepBadge: "كيف يعمل",
    stepTitle: "3 خطوات بسيطة",
    step1Title: "أدخل بياناتك",
    step1Text: "ابدأ من صفحة إنشاء السيرة وأدخل معلوماتك الأساسية.",
    step2Title: "أكمل الدفع",
    step2Text: "تابع إلى الدفع بعد الحفظ للحصول على السيرة النهائية.",
    step3Title: "حمّل وقدّم",
    step3Text: "حمّل PDF وابدأ التقديم على الوظائف المناسبة.",
    ctaBadge: "ابدأ الآن",
    ctaTitle: "كل ما تحتاجه في مكان واحد",
    ctaText: "واجهة واضحة، أزرار مباشرة، وتجربة مناسبة للعميل من بداية التصفح حتى التقديم.",
    openCv: "فتح صفحة السيرة",
    openJobs: "فتح صفحة الوظائف",
    openResult: "فتح صفحة النتيجة",
    stats1: "قوالب جاهزة",
    stats2: "نتيجة PDF",
    stats3: "وظائف مباشرة",
  },
  en: {
    dir: "ltr",
    brand: "ResumeFix AI",
    subtitle: "CV Builder • Payment • Jobs",
    home: "Home",
    cv: "Build CV",
    jobs: "Jobs",
    result: "Result",
    langAr: "العربية",
    langEn: "English",
    badge: "All-in-one professional platform",
    title: "Build your CV and start applying with confidence",
    desc: "Create a professional CV, choose the right template, complete payment, download your result, and browse jobs from one clean and elegant website.",
    primary: "Start Building CV",
    secondary: "Browse Jobs",
    feature1Title: "Professional CV",
    feature1Text: "Create a clean, structured CV ready for job applications.",
    feature2Title: "Simple Secure Payment",
    feature2Text: "Save your details, then complete payment easily to get your final result.",
    feature3Title: "Jobs Ready to Apply",
    feature3Text: "Browse jobs, open details, then create a tailored CV for each role.",
    stepBadge: "How it works",
    stepTitle: "3 simple steps",
    step1Title: "Enter your details",
    step1Text: "Start from the CV page and fill in your main information.",
    step2Title: "Complete payment",
    step2Text: "Proceed to payment after saving your details.",
    step3Title: "Download and apply",
    step3Text: "Download your PDF and apply for suitable jobs.",
    ctaBadge: "Get started",
    ctaTitle: "Everything you need in one place",
    ctaText: "Clear interface, direct actions, and a smooth user journey from browsing to applying.",
    openCv: "Open CV Page",
    openJobs: "Open Jobs Page",
    openResult: "Open Result Page",
    stats1: "Ready Templates",
    stats2: "PDF Result",
    stats3: "Live Jobs",
  },
};

function FeatureCard({ icon, title, text }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureIcon}>{icon}</div>
      <div style={styles.featureTitle}>{title}</div>
      <div style={styles.featureText}>{text}</div>
    </div>
  );
}

function StepCard({ number, title, text }) {
  return (
    <div style={styles.stepCard}>
      <div style={styles.stepNumber}>{number}</div>
      <div style={styles.stepTitle}>{title}</div>
      <div style={styles.stepText}>{text}</div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [lang, setLang] = useState("ar");

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

  const t = i18n[lang];

  return (
    <main dir={t.dir} style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.brandWrap}>
            <div style={styles.logo}>R</div>
            <div>
              <div style={styles.brand}>{t.brand}</div>
              <div style={styles.subtitle}>{t.subtitle}</div>
            </div>
          </div>

          <div style={styles.headerRight}>
            <nav style={styles.nav}>
              <Link href="/" style={styles.navBtn}>{t.home}</Link>
              <Link href="/generate" style={styles.navBtn}>{t.cv}</Link>
              <Link href="/jobs" style={styles.navBtn}>{t.jobs}</Link>
              <Link href="/result" style={styles.navBtn}>{t.result}</Link>
            </nav>

            <div style={styles.langWrap}>
              <button
                type="button"
                onClick={() => changeLang("ar")}
                style={lang === "ar" ? styles.langBtnActive : styles.langBtn}
              >
                {t.langAr}
              </button>
              <button
                type="button"
                onClick={() => changeLang("en")}
                style={lang === "en" ? styles.langBtnActive : styles.langBtn}
              >
                {t.langEn}
              </button>
            </div>
          </div>
        </header>

        <section style={styles.heroSection}>
          <div style={styles.heroLeft}>
            <div style={styles.badge}>{t.badge}</div>
            <h1 style={styles.heroTitle}>{t.title}</h1>
            <p style={styles.heroDesc}>{t.desc}</p>

            <div style={styles.heroActions}>
              <Link href="/generate" style={styles.primaryBtn}>
                {t.primary}
              </Link>
              <Link href="/jobs" style={styles.secondaryBtn}>
                {t.secondary}
              </Link>
            </div>

            <div style={styles.statsGrid}>
              <StatCard value="3" label={t.stats1} />
              <StatCard value="PDF" label={t.stats2} />
              <StatCard value="Jobs" label={t.stats3} />
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.previewCard}>
              <div style={styles.previewTop}>
                <div>
                  <div style={styles.previewLabel}>Resume Preview</div>
                  <div style={styles.previewTitle}>Modern Professional Layout</div>
                </div>
                <div style={styles.previewChip}>ATS Ready</div>
              </div>

              <div style={styles.previewBody}>
                <div style={styles.previewSidebar} />
                <div style={styles.previewLines}>
                  <div style={styles.lineLg} />
                  <div style={styles.lineMd} />
                  <div style={styles.lineSm} />
                  <div style={styles.lineLg} />
                  <div style={styles.lineMd} />
                  <div style={styles.lineSm} />
                </div>
              </div>

              <div style={styles.previewBottom}>
                <div style={styles.previewJobCard}>
                  <div style={styles.previewJobTitle}>Job Match</div>
                  <div style={styles.previewJobText}>Create CV → Pay → Apply</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.featuresGrid}>
          <FeatureCard icon="📄" title={t.feature1Title} text={t.feature1Text} />
          <FeatureCard icon="💳" title={t.feature2Title} text={t.feature2Text} />
          <FeatureCard icon="💼" title={t.feature3Title} text={t.feature3Text} />
        </section>

        <section style={styles.sectionCard}>
          <div style={styles.badge}>{t.stepBadge}</div>
          <h2 style={styles.sectionTitle}>{t.stepTitle}</h2>

          <div style={styles.stepsGrid}>
            <StepCard number="1" title={t.step1Title} text={t.step1Text} />
            <StepCard number="2" title={t.step2Title} text={t.step2Text} />
            <StepCard number="3" title={t.step3Title} text={t.step3Text} />
          </div>
        </section>

        <section style={styles.sectionCard}>
          <div style={styles.badge}>{t.ctaBadge}</div>
          <h2 style={styles.sectionTitle}>{t.ctaTitle}</h2>
          <p style={styles.sectionText}>{t.ctaText}</p>

          <div style={styles.ctaButtons}>
            <Link href="/generate" style={styles.primaryBtn}>
              {t.openCv}
            </Link>
            <Link href="/jobs" style={styles.secondaryBtn}>
              {t.openJobs}
            </Link>
            <Link href="/result" style={styles.secondaryBtn}>
              {t.openResult}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, rgba(96,165,250,0.12), transparent 20%), radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 18%), linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
    color: "#0f172a",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "24px 20px 70px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    flexWrap: "wrap",
    padding: "16px 18px",
    borderRadius: 22,
    border: "1px solid #dbeafe",
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 12px 30px rgba(15,23,42,0.06)",
    marginBottom: 24,
  },
  brandWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
    color: "#fff",
    fontWeight: 900,
    fontSize: 22,
    boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
  },
  brand: {
    fontWeight: 900,
    fontSize: 22,
    color: "#0f172a",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 13,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  navBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 700,
    border: "1px solid #dbeafe",
    background: "#ffffff",
    color: "#0f172a",
  },
  langWrap: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  langBtn: {
    border: "1px solid #dbeafe",
    background: "#ffffff",
    color: "#0f172a",
    padding: "12px 14px",
    borderRadius: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  langBtnActive: {
    border: "1px solid #60a5fa",
    background: "#eff6ff",
    color: "#2563eb",
    padding: "12px 14px",
    borderRadius: 14,
    fontWeight: 800,
    cursor: "pointer",
  },
  heroSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: 24,
    alignItems: "center",
    marginBottom: 28,
  },
  heroLeft: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 32,
    padding: 30,
    boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
  },
  heroRight: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 32,
    padding: 22,
    boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
  },
  badge: {
    display: "inline-block",
    marginBottom: 14,
    padding: "10px 16px",
    borderRadius: 999,
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: 14,
    fontWeight: 800,
  },
  heroTitle: {
    margin: "0 0 16px",
    fontSize: "clamp(42px, 8vw, 76px)",
    lineHeight: 0.95,
    fontWeight: 900,
    letterSpacing: "-0.05em",
    color: "#0f172a",
  },
  heroDesc: {
    margin: "0 0 24px",
    color: "#475569",
    fontSize: "clamp(18px, 2vw, 22px)",
    lineHeight: 1.9,
  },
  heroActions: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 22,
  },
  primaryBtn: {
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
  },
  secondaryBtn: {
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
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
  },
  previewCard: {
    borderRadius: 26,
    background: "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
    border: "1px solid #dbeafe",
    padding: 18,
  },
  previewTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
    flexWrap: "wrap",
  },
  previewLabel: {
    color: "#64748b",
    fontSize: 13,
    marginBottom: 4,
  },
  previewTitle: {
    fontWeight: 800,
    color: "#0f172a",
    fontSize: 20,
  },
  previewChip: {
    padding: "10px 14px",
    borderRadius: 999,
    background: "#eff6ff",
    color: "#2563eb",
    fontWeight: 700,
    fontSize: 13,
  },
  previewBody: {
    display: "grid",
    gridTemplateColumns: "120px 1fr",
    gap: 16,
    marginBottom: 18,
  },
  previewSidebar: {
    borderRadius: 20,
    background: "linear-gradient(180deg, #1d4ed8 0%, #60a5fa 100%)",
    minHeight: 220,
  },
  previewLines: {
    display: "grid",
    gap: 12,
    alignContent: "start",
  },
  lineLg: {
    height: 16,
    width: "100%",
    borderRadius: 999,
    background: "#e2e8f0",
  },
  lineMd: {
    height: 14,
    width: "80%",
    borderRadius: 999,
    background: "#dbeafe",
  },
  lineSm: {
    height: 14,
    width: "60%",
    borderRadius: 999,
    background: "#e5e7eb",
  },
  previewBottom: {
    marginTop: 10,
  },
  previewJobCard: {
    borderRadius: 20,
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    padding: 16,
  },
  previewJobTitle: {
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 6,
  },
  previewJobText: {
    color: "#475569",
    lineHeight: 1.7,
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 18,
    marginBottom: 28,
  },
  featureCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
  },
  featureIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    fontSize: 24,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 10,
  },
  featureText: {
    color: "#475569",
    lineHeight: 1.8,
    fontSize: 16,
  },
  sectionCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 32,
    padding: 28,
    boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
    marginBottom: 28,
  },
  sectionTitle: {
    margin: "0 0 18px",
    fontSize: 34,
    fontWeight: 900,
    color: "#0f172a",
  },
  sectionText: {
    margin: "0 0 18px",
    color: "#475569",
    fontSize: 17,
    lineHeight: 1.8,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
  },
  stepCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
  },
  stepNumber: {
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
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 8,
  },
  stepText: {
    color: "#475569",
    lineHeight: 1.8,
  },
  ctaButtons: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  statCard: {
    borderRadius: 22,
    padding: 18,
    background: "#f8fbff",
    border: "1px solid #dbeafe",
    textAlign: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: 900,
    color: "#0f172a",
  },
  statLabel: {
    color: "#64748b",
    marginTop: 6,
  },
};


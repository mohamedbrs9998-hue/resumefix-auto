"use client";

import { useEffect, useState } from "react";

const T = {
  ar: {
    dir: "rtl",
    brand: "ResumeFix AI",
    sub: "إنشاء سيرة ذاتية • دفع • وظائف",
    home: "الرئيسية",
    cv: "إنشاء السيرة",
    payment: "الدفع",
    jobs: "الوظائف",
    result: "النتيجة",
    badge: "منصة متكاملة",
    title: "ResumeFix AI",
    desc: "أنشئ سيرة ذاتية احترافية، أكمل الدفع، نزّل النتيجة، وتصفح الوظائف من واجهة واحدة جميلة وعصرية.",
    start: "ابدأ إنشاء السيرة",
    browse: "تصفح الوظائف",
    langAr: "العربية",
    langEn: "English"
  },
  en: {
    dir: "ltr",
    brand: "ResumeFix AI",
    sub: "CV Builder • Payment • Jobs",
    home: "Home",
    cv: "CV Builder",
    payment: "Payment",
    jobs: "Jobs",
    result: "Result",
    badge: "ALL-IN-ONE PLATFORM",
    title: "ResumeFix AI",
    desc: "Create a professional CV, complete payment, download your result, and browse jobs from one beautiful modern interface.",
    start: "Start My CV",
    browse: "Browse Jobs",
    langAr: "العربية",
    langEn: "English"
  }
};

export default function HomePage() {
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const saved = window.localStorage.getItem("site_lang");
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  function changeLang(next) {
    setLang(next);
    window.localStorage.setItem("site_lang", next);
  }

  const t = T[lang];

  return (
    <main
      dir={t.dir}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(96,165,250,0.12), transparent 20%), radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 18%), linear-gradient(180deg, #f8fbff 0%, #eef5ff 100%)",
        color: "#0f172a"
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 70px" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            marginBottom: 24,
            paddingTop: 10
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
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 12px 30px rgba(15,23,42,0.06)"
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
                  boxShadow: "0 10px 25px rgba(37,99,235,0.25)"
                }}
              >
                R
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 20 }}>{t.brand}</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>{t.sub}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <a href="#hero" style={navBtn}>{t.home}</a>
              <a href="#cv" style={navBtn}>{t.cv}</a>
              <a href="#payment" style={navBtn}>{t.payment}</a>
              <a href="#jobs" style={navBtn}>{t.jobs}</a>
              <a href="#result" style={navBtn}>{t.result}</a>

              <button type="button" onClick={() => changeLang("ar")} style={lang === "ar" ? langActiveBtn : langBtn}>
                {T.ar.langAr}
              </button>
              <button type="button" onClick={() => changeLang("en")} style={lang === "en" ? langActiveBtn : langBtn}>
                {T.en.langEn}
              </button>
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
            marginBottom: 24
          }}
        >
          <div style={badge}>{t.badge}</div>
          <h1
            style={{
              margin: "0 0 16px",
              fontSize: "clamp(42px, 8vw, 76px)",
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#0f172a"
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              margin: "0 0 24px",
              color: "#475569",
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.9
            }}
          >
            {t.desc}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#cv" style={primaryBtn}>{t.start}</a>
            <a href="#jobs" style={outlineBtn}>{t.browse}</a>
          </div>
        </section>

        <section id="cv" style={panel}>
          <h2 style={sectionTitle}>{t.cv}</h2>
          <p style={sectionText}>
            {lang === "ar"
              ? "هذا قسم إنشاء السيرة داخل الصفحة الرئيسية."
              : "This is the CV builder section inside the homepage."}
          </p>
        </section>

        <section id="payment" style={panel}>
          <h2 style={sectionTitle}>{t.payment}</h2>
          <p style={sectionText}>
            {lang === "ar"
              ? "هذا قسم الدفع داخل الصفحة الرئيسية."
              : "This is the payment section inside the homepage."}
          </p>
        </section>

        <section id="jobs" style={panel}>
          <h2 style={sectionTitle}>{t.jobs}</h2>
          <p style={sectionText}>
            {lang === "ar"
              ? "هذا قسم الوظائف داخل الصفحة الرئيسية."
              : "This is the jobs section inside the homepage."}
          </p>
        </section>

        <section id="result" style={panel}>
          <h2 style={sectionTitle}>{t.result}</h2>
          <p style={sectionText}>
            {lang === "ar"
              ? "هذا قسم النتيجة داخل الصفحة الرئيسية."
              : "This is the result section inside the homepage."}
          </p>
        </section>
      </div>
    </main>
  );
}

const panel = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: 32,
  padding: 28,
  boxShadow: "0 20px 60px rgba(15,23,42,0.07)",
  marginBottom: 24
};

const badge = {
  display: "inline-block",
  marginBottom: 14,
  padding: "10px 16px",
  borderRadius: 999,
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: 14,
  fontWeight: 800
};

const sectionTitle = {
  margin: "0 0 12px",
  fontSize: 32,
  fontWeight: 900,
  color: "#0f172a"
};

const sectionText = {
  margin: 0,
  color: "#475569",
  fontSize: 17,
  lineHeight: 1.8
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
  boxShadow: "0 12px 28px rgba(37,99,235,0.20)"
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
  color: "#1d4ed8"
};

const navBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a"
};

const langBtn = {
  border: "1px solid #dbeafe",
  background: "#ffffff",
  color: "#0f172a",
  padding: "12px 14px",
  borderRadius: 14,
  fontWeight: 700,
  cursor: "pointer"
};

const langActiveBtn = {
  border: "1px solid #60a5fa",
  background: "#eff6ff",
  color: "#2563eb",
  padding: "12px 14px",
  borderRadius: 14,
  fontWeight: 800,
  cursor: "pointer"
};

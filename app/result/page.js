"use client";

import { useEffect, useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [cvText, setCvText] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("medical_pro");

  useEffect(() => {
    async function run() {
      try {
        const savedOrderId =
          typeof window !== "undefined"
            ? localStorage.getItem(ORDER_KEY) || ""
            : "";

        const savedTemplate =
          typeof window !== "undefined"
            ? localStorage.getItem(TEMPLATE_KEY) || "medical_pro"
            : "medical_pro";

        setOrderId(savedOrderId);
        setSelectedTemplate(savedTemplate);

        if (!savedOrderId) {
          setError("No order ID found.");
          setLoading(false);
          return;
        }

        const res = await fetch("/api/generate-order-cv-v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: savedOrderId }),
        });

        const raw = await res.text();

        let data;
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch {
          setError(raw || "Invalid server response");
          setLoading(false);
          return;
        }

        if (!res.ok || !data?.ok) {
          const message =
            typeof data?.error === "string"
              ? data.error
              : JSON.stringify(data?.error || data);

          setError(message || "Failed to generate CV");
          setLoading(false);
          return;
        }

        setCvText(
          data?.cvText || "CV generated successfully, but no text was returned."
        );
        setLoading(false);
      } catch (err) {
        const message =
          typeof err === "string" ? err : err?.message || JSON.stringify(err);
        setError(message || "Something went wrong.");
        setLoading(false);
      }
    }

    run();
  }, []);

  async function handleCopy() {
    if (!cvText) return;
    try {
      await navigator.clipboard.writeText(cvText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      alert("Could not copy the CV text.");
    }
  }

  function handleDownloadPdf() {
    window.print();
  }

  const styles = getTemplateStyles(selectedTemplate);

  return (
    <>
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }

          body {
            background: white !important;
          }

          .print-card {
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .print-text {
            white-space: pre-wrap !important;
            word-break: break-word !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: styles.pageBackground,
          color: "#f8fafc",
          padding: "24px 16px 80px",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div
            className="no-print"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 14,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 16px",
                borderRadius: 999,
                background: styles.badgeBg,
                color: styles.badgeColor,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Template: {getTemplateLabel(selectedTemplate)}
            </div>

            <button
              onClick={handleDownloadPdf}
              style={{
                border: "none",
                borderRadius: 16,
                padding: "16px 22px",
                fontSize: 17,
                fontWeight: 800,
                cursor: "pointer",
                background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
                color: "#111827",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              }}
            >
              Download PDF
            </button>
          </div>

          <h1
            className="no-print"
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(34px, 7vw, 64px)",
              lineHeight: 1.05,
              fontWeight: 800,
            }}
          >
            Your CV Result
          </h1>

          <div
            className="no-print"
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 22,
            }}
          >
            <button onClick={handleDownloadPdf} style={primaryButtonStyle}>
              Download PDF
            </button>

            <button onClick={handleCopy} style={secondaryButtonStyle}>
              {copied ? "Copied" : "Copy Text"}
            </button>

            <button
              onClick={() => (window.location.href = "/generate")}
              style={secondaryButtonStyle}
            >
              Back
            </button>
          </div>

          {loading && (
            <div
              style={{
                border: "1px solid rgba(148,163,184,0.16)",
                background: "rgba(15,23,42,0.88)",
                borderRadius: 24,
                padding: 24,
                color: "#cbd5e1",
                fontSize: 18,
              }}
            >
              Generating your CV...
            </div>
          )}

          {!loading && error && (
            <div
              style={{
                border: "1px solid rgba(244,114,182,0.22)",
                background: "rgba(15,23,42,0.88)",
                borderRadius: 24,
                padding: 24,
              }}
            >
              <div
                style={{
                  color: "#fda4af",
                  fontWeight: 800,
                  fontSize: 22,
                  marginBottom: 12,
                }}
              >
                Generation failed
              </div>

              <div
                style={{
                  color: "#cbd5e1",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontSize: 18,
                  lineHeight: 1.7,
                }}
              >
                {error}
              </div>

              {orderId ? (
                <div style={{ marginTop: 16, color: "#94a3b8", fontSize: 17 }}>
                  Order ID: {orderId}
                </div>
              ) : null}
            </div>
          )}

          {!loading && !error && (
            <div
              className="print-card"
              style={{
                background: styles.cardBg,
                color: styles.textColor,
                borderRadius: 24,
                padding: 36,
                border: styles.cardBorder,
                boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
              }}
            >
              <div
                className="no-print"
                style={{
                  marginBottom: 22,
                  paddingBottom: 16,
                  borderBottom: styles.divider,
                }}
              >
                <div
                  style={{
                    color: styles.headingColor,
                    fontSize: 24,
                    fontWeight: 800,
                  }}
                >
                  CV generated successfully
                </div>
                <div style={{ color: styles.subtleColor, marginTop: 4 }}>
                  Order ID: {orderId}
                </div>
              </div>

              <pre
                className="print-text"
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: styles.textColor,
                  fontSize: styles.fontSize,
                  lineHeight: styles.lineHeight,
                  fontFamily: styles.fontFamily,
                }}
              >
                {cvText}
              </pre>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function getTemplateLabel(template) {
  if (template === "classic") return "Classic";
  if (template === "modern") return "Modern";
  return "Medical Pro";
}

function getTemplateStyles(template) {
  if (template === "classic") {
    return {
      pageBackground: "#eef3f8",
      badgeBg: "#dbeafe",
      badgeColor: "#1e3a8a",
      cardBg: "#ffffff",
      cardBorder: "1px solid #d6dee8",
      textColor: "#111827",
      headingColor: "#1d4ed8",
      subtleColor: "#64748b",
      divider: "1px solid #d6dee8",
      fontSize: 17,
      lineHeight: 1.85,
      fontFamily: 'Georgia, "Times New Roman", Times, serif',
    };
  }

  if (template === "modern") {
    return {
      pageBackground:
        "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
      badgeBg: "rgba(125,211,252,0.18)",
      badgeColor: "#bae6fd",
      cardBg: "linear-gradient(180deg, #111827 0%, #0b1220 100%)",
      cardBorder: "1px solid rgba(125,211,252,0.22)",
      textColor: "#e5f3ff",
      headingColor: "#7dd3fc",
      subtleColor: "#94a3b8",
      divider: "1px solid rgba(125,211,252,0.16)",
      fontSize: 17,
      lineHeight: 1.9,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    };
  }

  return {
    pageBackground:
      "radial-gradient(circle at top left, rgba(34,197,94,0.16), transparent 28%), linear-gradient(180deg, #052e16 0%, #0b1220 100%)",
    badgeBg: "rgba(34,197,94,0.18)",
    badgeColor: "#bbf7d0",
    cardBg: "linear-gradient(180deg, #071a12 0%, #0b1220 100%)",
    cardBorder: "2px solid rgba(34,197,94,0.28)",
    textColor: "#ecfdf5",
    headingColor: "#86efac",
    subtleColor: "#94a3b8",
    divider: "1px solid rgba(34,197,94,0.18)",
    fontSize: 17,
    lineHeight: 1.9,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };
}
  if (template === "classic") {
    return {
      pageBackground: "#f3f6fb",
      badgeBg: "#dbeafe",
      badgeColor: "#1e3a8a",
      cardBg: "#ffffff",
      cardBorder: "1px solid #dbe4ee",
      textColor: "#111827",
      headingColor: "#1d4ed8",
      subtleColor: "#64748b",
      divider: "1px solid #dbe4ee",
      fontSize: 17,
      lineHeight: 1.8,
      fontFamily: 'Georgia, "Times New Roman", Times, serif',
    };
  }

  if (template === "modern") {
    return {
      pageBackground:
        "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
      badgeBg: "rgba(125,211,252,0.18)",
      badgeColor: "#bae6fd",
      cardBg: "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
      cardBorder: "1px solid rgba(125,211,252,0.22)",
      textColor: "#e5f3ff",
      headingColor: "#7dd3fc",
      subtleColor: "#94a3b8",
      divider: "1px solid rgba(125,211,252,0.15)",
      fontSize: 17,
      lineHeight: 1.85,
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    };
  }

  return {
    pageBackground:
      "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
    badgeBg: "rgba(34,197,94,0.18)",
    badgeColor: "#bbf7d0",
    cardBg: "linear-gradient(180deg, #0b1220 0%, #0f172a 100%)",
    cardBorder: "2px solid rgba(34,197,94,0.24)",
    textColor: "#e2e8f0",
    headingColor: "#86efac",
    subtleColor: "#94a3b8",
    divider: "1px solid rgba(34,197,94,0.14)",
    fontSize: 17,
    lineHeight: 1.85,
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };
}

const primaryButtonStyle = {
  border: "none",
  borderRadius: 16,
  padding: "14px 20px",
  fontSize: 16,
  fontWeight: 800,
  cursor: "pointer",
  background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
  color: "#111827",
};

const secondaryButtonStyle = {
  border: "1px solid rgba(148,163,184,0.22)",
  borderRadius: 16,
  padding: "14px 20px",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  background: "rgba(15,23,42,0.88)",
  color: "#e2e8f0",
};

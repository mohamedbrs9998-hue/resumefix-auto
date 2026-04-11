"use client";

import { useEffect, useState } from "react";

const ORDER_KEY = "resumefix_order_id";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [cvText, setCvText] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function run() {
      try {
        const savedOrderId =
          typeof window !== "undefined"
            ? localStorage.getItem(ORDER_KEY) || ""
            : "";

        setOrderId(savedOrderId);

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

          const debug = data?.debug ? `\n\nDebug: ${JSON.stringify(data.debug)}` : "";
          setError((message || "Failed to generate CV") + debug);
          setLoading(false);
          return;
        }

        setCvText(data?.cvText || "CV generated successfully, but no text was returned.");
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

  return (
    <>
      <style>{`
        @media print {
          body {
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .print-shell {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .print-card {
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            padding: 0 !important;
          }

          .print-text {
            color: black !important;
            white-space: pre-wrap !important;
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>

      <main
        className="print-shell"
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
          color: "#f8fafc",
          padding: "32px 20px 60px",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="no-print" style={{ marginBottom: 18 }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(96,165,250,0.14)",
                color: "#dbeafe",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              ATS-friendly CV result
            </div>
          </div>

          <h1
            className="no-print"
            style={{
              margin: "0 0 24px",
              fontSize: "clamp(34px, 7vw, 64px)",
              lineHeight: 1.05,
              fontWeight: 800,
            }}
          >
            Your CV Result
          </h1>

          {loading && (
            <div
              className="print-card"
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
              className="print-card"
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
            <>
              <div
                className="no-print"
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 18,
                }}
              >
                <button
                  onClick={handleDownloadPdf}
                  style={primaryButtonStyle}
                >
                  Download PDF
                </button>

                <button
                  onClick={handleCopy}
                  style={secondaryButtonStyle}
                >
                  {copied ? "Copied" : "Copy Text"}
                </button>

                <button
                  onClick={() => window.location.href = "/generate"}
                  style={secondaryButtonStyle}
                >
                  Back to Form
                </button>
              </div>

              <div
                className="print-card"
                style={{
                  border: "1px solid rgba(148,163,184,0.16)",
                  background: "rgba(15,23,42,0.88)",
                  borderRadius: 28,
                  padding: 28,
                  boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
                }}
              >
                <div
                  className="no-print"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: 20,
                    paddingBottom: 18,
                    borderBottom: "1px solid rgba(148,163,184,0.14)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        color: "#93c5fd",
                        fontWeight: 800,
                        fontSize: 21,
                        marginBottom: 4,
                      }}
                    >
                      CV generated successfully
                    </div>
                    <div style={{ color: "#94a3b8", fontSize: 16 }}>
                      Order ID: {orderId}
                    </div>
                  </div>
                </div>

                <pre
                  className="print-text"
                  style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    color: "#e2e8f0",
                    fontSize: 17,
                    lineHeight: 1.8,
                    fontFamily:
                      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  }}
                >
                  {cvText}
                </pre>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

const primaryButtonStyle = {
  border: "none",
  borderRadius: 16,
  padding: "14px 20px",
  fontSize: 16,
  fontWeight: 800,
  cursor: "pointer",
  background: "linear-gradient(135deg, #7dd3fc 0%, #60a5fa 100%)",
  color: "#081018",
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

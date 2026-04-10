"use client";

import { useEffect, useState } from "react";

const ORDER_KEY = "resumefix_order_id";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [cvText, setCvText] = useState("");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

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

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
        color: "#f8fafc",
        padding: "32px 20px 60px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1
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
                fontSize: 20,
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
                lineHeight: 1.6,
              }}
            >
              {error}
            </div>
            {orderId ? (
              <div style={{ marginTop: 16, color: "#94a3b8", fontSize: 18 }}>
                Order ID: {orderId}
              </div>
            ) : null}
          </div>
        )}

        {!loading && !error && (
          <div
            style={{
              border: "1px solid rgba(148,163,184,0.16)",
              background: "rgba(15,23,42,0.88)",
              borderRadius: 24,
              padding: 24,
            }}
          >
            <div
              style={{
                color: "#93c5fd",
                fontWeight: 800,
                fontSize: 20,
                marginBottom: 16,
              }}
            >
              CV generated successfully
            </div>
            <pre
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#e2e8f0",
                fontSize: 17,
                lineHeight: 1.7,
                fontFamily: "inherit",
              }}
            >
              {cvText}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}

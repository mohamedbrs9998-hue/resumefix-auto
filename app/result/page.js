"use client";

import { useEffect, useState } from "react";

const ORDER_KEY = "resumefix_order_id_v2";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadAndGenerate() {
      try {
        const savedOrderId = localStorage.getItem(ORDER_KEY);

        if (!savedOrderId) {
          setError("No saved order found.");
          setLoading(false);
          return;
        }

        setOrderId(savedOrderId);

        const res = await fetch("/api/generate-order-cv-v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId: savedOrderId }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok || !data.result) {
          setError(data.error || "Failed to generate CV.");
          setLoading(false);
          return;
        }

        setResult(data.result);
        setLoading(false);
      } catch (err) {
        setError("Could not generate your CV.");
        setLoading(false);
      }
    }

    loadAndGenerate();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(59,130,246,0.16), transparent 28%), linear-gradient(180deg, #0b1220 0%, #081018 100%)",
        color: "#fff",
        padding: "32px 20px 60px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 44, fontWeight: 800, marginBottom: 8 }}>
          Your CV Result
        </h1>

        {loading ? (
          <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: "#0f172a", border: "1px solid #334155" }}>
            <p style={{ color: "#cbd5e1", fontSize: 18 }}>
              Generating your professional CV...
            </p>
            <p style={{ color: "#94a3b8", fontSize: 16, marginTop: 8 }}>
              Order ID: {orderId}
            </p>
          </div>
        ) : error ? (
          <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: "#0f172a", border: "1px solid #334155" }}>
            <p style={{ color: "#fca5a5", fontSize: 18 }}>{error}</p>
            <p style={{ color: "#94a3b8", fontSize: 16, marginTop: 8 }}>
              Order ID: {orderId}
            </p>
          </div>
        ) : (
          <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: "#0f172a", border: "1px solid #334155" }}>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.9, color: "#e2e8f0", fontSize: 16 }}>
              {result.cv_text}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

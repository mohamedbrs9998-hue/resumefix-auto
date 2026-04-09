"use client";

import { useEffect, useState } from "react";

const ORDER_KEY = "resumefix_order_id_v2";

export default function ResultPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    try {
      const savedOrderId = localStorage.getItem(ORDER_KEY);

      if (!savedOrderId) {
        setError("No saved order found.");
        setLoading(false);
        return;
      }

      setOrderId(savedOrderId);
      setLoading(false);
    } catch (err) {
      setError("Could not load your order.");
      setLoading(false);
    }
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
          <p style={{ color: "#cbd5e1", fontSize: 18 }}>
            Loading your order...
          </p>
        ) : error ? (
          <p style={{ color: "#fca5a5", fontSize: 18 }}>{error}</p>
        ) : (
          <div
            style={{
              marginTop: 24,
              padding: 20,
              borderRadius: 16,
              background: "#0f172a",
              border: "1px solid #334155",
            }}
          >
            <p style={{ fontSize: 18, color: "#cbd5e1" }}>
              Your order was found successfully.
            </p>

            <p style={{ fontSize: 18, color: "#fff", marginTop: 12 }}>
              Order ID: <strong>{orderId}</strong>
            </p>

            <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 18 }}>
              Next step: AI generation will be connected to this saved order.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

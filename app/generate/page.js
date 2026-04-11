"use client";

import { useState } from "react";

const ORDER_KEY = "resumefix_order_id";
const TEMPLATE_KEY = "resumefix_template";

export default function GeneratePage() {
  const [form, setForm] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    languages: "",
    template: "medical_pro",
  });

  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const raw = await res.text();

      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        alert(raw || "Invalid server response");
        setLoading(false);
        return;
      }

      if (!res.ok || !data?.ok || !data?.orderId) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : data?.error?.message || JSON.stringify(data?.error || data);

        alert(message || "Failed to save your details");
        setLoading(false);
        return;
      }

      localStorage.setItem(ORDER_KEY, data.orderId);
      localStorage.setItem(TEMPLATE_KEY, form.template);
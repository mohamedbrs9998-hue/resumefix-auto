export default function GeneratePage() {
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
          Generate Full CV
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: 24, fontSize: 18 }}>
          Fill in the details below, then continue to payment.
        </p>

        <Field label="Full name" placeholder="Enter your full name" />
        <Field label="Target role" placeholder="Enter your target role" />
        <Field label="Years of experience" placeholder="Enter years of experience" />
        <Field label="Location" placeholder="Enter your location" />
        <Field label="Phone" placeholder="Enter your phone number" />
        <Field label="Email" placeholder="Enter your email" />

        <TextField
          label="Short background / summary notes"
          placeholder="Write a few lines about your background and strengths..."
          rows={5}
        />

        <TextField
          label="Work experience"
          placeholder="Write your work experience here..."
          rows={8}
        />

        <TextField
          label="Education"
          placeholder="Write your education here..."
          rows={5}
        />

        <TextField
          label="Skills"
          placeholder="List your skills here..."
          rows={4}
        />

        <TextField
          label="Certifications"
          placeholder="List certifications here..."
          rows={4}
        />

        <TextField
          label="Languages"
          placeholder="e.g. Arabic, English"
          rows={3}
        />

        <div style={{ marginTop: 20 }}>
          <a
            href="https://payhip.com/order?link=J7W4G"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "14px 22px",
              borderRadius: 12,
              background: "#60a5fa",
              color: "#081018",
              fontWeight: 800,
              fontSize: 18,
              textDecoration: "none",
            }}
          >
            Continue to Payment
          </a>
        </div>
      </div>
    </main>
  );
}

function Field({ label, placeholder }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>
        {label}
      </span>
      <input
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#0f172a",
          color: "#fff",
          fontSize: 16,
        }}
      />
    </label>
  );
}

function TextField({ label, placeholder, rows = 6 }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>
        {label}
      </span>
      <textarea
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#0f172a",
          color: "#fff",
          fontSize: 16,
          resize: "vertical",
        }}
      />
    </label>
  );
}

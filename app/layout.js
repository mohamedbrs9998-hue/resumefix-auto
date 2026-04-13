import "./globals.css";

export const metadata = {
  title: "ResumeFix AI",
  description: "Create a professional ATS-friendly CV with multiple templates and PDF download.",
  verification: {
    google: "pOiIJbi4dfpIUm4ZGtySlhPJk_VnaXoOW7xLJSNVFig",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

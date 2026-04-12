import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ResumeFix AI",
  description: "Create a professional ATS-friendly CV with multiple templates and PDF download.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={${geistSans.variable} ${geistMono.variable}}>
      <head>
        <meta
          name="google-site-verification"
          content="pOiIJbi4dfpIUm4ZGtySlhPJk_VnaXoOW7xLJSNVFig"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
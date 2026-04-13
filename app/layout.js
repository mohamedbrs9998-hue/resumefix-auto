import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata = {
  title: "ResumeFix AI",
  description:
    "Create a professional ATS-friendly CV with multiple templates and PDF download.",
  verification: {
    google: "pOiIJbi4dfpIUm4ZGtySlhPJk_VnaXoOW7xLJSNVFig",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={${geistSans.className} ${geistMono.className}}>
        {children}
      </body>
    </html>
  );
}
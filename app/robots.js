export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://resumefix-autobuild.vercel.app/sitemap.xml",
  };
}

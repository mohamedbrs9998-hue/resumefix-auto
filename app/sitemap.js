export default function sitemap() {
  const baseUrl = "https://resumefix-auto-finalnew.vercel.app";

  return [
    {
      url: ${baseUrl}/,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: ${baseUrl}/generate,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: ${baseUrl}/jobs,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: ${baseUrl}/result,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}

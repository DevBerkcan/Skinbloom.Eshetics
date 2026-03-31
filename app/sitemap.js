import { blogPosts } from "./data/blogPosts";
import { treatments } from "./data/treatments";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skinbloom-aesthetics.ch";

const staticRoutes = [
  { url: "", changeFrequency: "weekly", priority: 1.0 },
  { url: "/kontakt", changeFrequency: "monthly", priority: 0.8 },
  { url: "/preise", changeFrequency: "monthly", priority: 0.9 },
  { url: "/behandlungen", changeFrequency: "weekly", priority: 0.9 },
  { url: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { url: "/impressum", changeFrequency: "yearly", priority: 0.3 },
  { url: "/datenschutzrichtlinien", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap() {
  const now = new Date();

  const static_ = staticRoutes.map(({ url, changeFrequency, priority }) => ({
    url: `${SITE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const treatmentPages = treatments.map(({ slug }) => ({
    url: `${SITE_URL}/behandlungen/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogPages = blogPosts.map(({ slug }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...static_, ...treatmentPages, ...blogPages];
}

import { getTranslations } from "next-intl/server";
import BlogPageClient from "./BlogPageClient";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: "Blog – Ästhetische Behandlungen & Tipps | Skinbloom Aesthetics Basel",
    description:
      "Expertenwissen rund um ästhetische Behandlungen, Hautpflege und natürliche Schönheit – direkt aus unserer Praxis in Basel. HIFU, Hyaluron, Microneedling und mehr.",
    alternates: {
      canonical: `https://www.skinbloom-aesthetics.ch/${locale}/blog`,
    },
    openGraph: {
      title: "Blog | Skinbloom Aesthetics Basel",
      description: "Tipps, Erklärungen und Wissen rund um ästhetische Behandlungen.",
      url: `https://www.skinbloom-aesthetics.ch/${locale}/blog`,
      type: "website",
    },
  };
}

export default function BlogPage() {
  return <BlogPageClient />;
}

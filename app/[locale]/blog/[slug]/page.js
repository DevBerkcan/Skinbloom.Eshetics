import { notFound } from "next/navigation";
import { blogPosts } from "../../../data/blogPosts";
import BlogPost from "../../../components/Blog/BlogPost";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

export async function generateStaticParams() {
  return ["de", "en"].flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    openGraph: {
      type: "article",
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [{ url: `https://www.skinbloom-aesthetics.ch${post.coverImage}` }],
      publishedTime: post.date,
      authors: [post.author.name],
      siteName: "Skinbloom Aesthetics",
    },
    alternates: {
      canonical: `https://www.skinbloom-aesthetics.ch/blog/${post.slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `https://www.skinbloom-aesthetics.ch${post.coverImage}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: {
        "@type": "Organization",
        name: "Skinbloom Aesthetics",
        url: "https://www.skinbloom-aesthetics.ch",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "Skinbloom Aesthetics",
      url: "https://www.skinbloom-aesthetics.ch",
      logo: {
        "@type": "ImageObject",
        url: "https://www.skinbloom-aesthetics.ch/assets/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.skinbloom-aesthetics.ch/blog/${post.slug}`,
    },
  };

  return (
    <main style={{ background: "#fff" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container pt-4">
        <Breadcrumb
          items={[
            { label: "Startseite", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
      </div>
      <BlogPost post={post} />
    </main>
  );
}

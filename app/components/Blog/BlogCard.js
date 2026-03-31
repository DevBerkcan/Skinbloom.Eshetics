"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function BlogCard({ post }) {
  const locale = useLocale();
  const href = `/${locale}/blog/${post.slug}`;

  return (
    <motion.div variants={cardVariants}>
      <Link href={href} className="blog-card">
        <div className="blog-card-img-wrap">
          <Image
            src={post.coverImage}
            alt={post.title}
            className="blog-card-img"
            width={800}
            height={450}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="blog-card-body">
          <span className="blog-card-category">{post.category}</span>
          <h2 className="blog-card-title">{post.title}</h2>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <div className="blog-card-meta">
            <Image
              src={post.author.image}
              alt={post.author.name}
              className="blog-author-img"
              width={32}
              height={32}
            />
            <span className="blog-author-name">{post.author.name}</span>
            <span className="blog-meta-dot">·</span>
            <span>{post.date}</span>
            <span className="blog-meta-dot">·</span>
            <span>{post.readingTime} Lesezeit</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

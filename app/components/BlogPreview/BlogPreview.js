"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BlogCard from "../Blog/BlogCard";
import { blogPosts } from "../../data/blogPosts";
import { useLocale } from "next-intl";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

export default function BlogPreview() {
  const locale = useLocale();

  return (
    <section className="blog-section">
      <div className="container-fluid">

        <motion.div
          className="blog-header d-flex justify-content-between align-items-end flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="section-eyebrow">SKINBLOOM AESTHETICS</span>
            <h2 className="title mb-0">
              Unser <span className="text-brown">Blog</span>
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="btn-behandlung btn-outline-mauve"
            style={{ flexShrink: 0 }}
          >
            Alle Artikel →
          </Link>
        </motion.div>

        <motion.div
          className="blog-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

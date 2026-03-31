"use client";

import { motion } from "framer-motion";
import BlogCard from "../../components/Blog/BlogCard";
import { blogPosts } from "../../data/blogPosts";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function BlogPageClient() {
  return (
    <main style={{ background: "#f9f6f3", minHeight: "100vh" }}>
      <section className="blog-section">
        <div className="container-fluid">

          <motion.div
            className="blog-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">SKINBLOOM AESTHETICS</span>
            <h1 className="title">
              Unser <span className="text-brown">Blog</span>
            </h1>
            <p style={{ maxWidth: 560, marginTop: 12, color: "#5a6a7a", fontFamily: "Lato, sans-serif", fontSize: "1rem", lineHeight: 1.7 }}>
              Expertenwissen rund um ästhetische Behandlungen, Hautpflege und natürliche Schönheit – direkt aus unserer Praxis in Basel.
            </p>
          </motion.div>

          <motion.div
            className="blog-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </motion.div>

        </div>
      </section>
    </main>
  );
}

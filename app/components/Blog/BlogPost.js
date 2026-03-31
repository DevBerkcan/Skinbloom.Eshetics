"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogPost({ post }) {
  return (
    <article className="blog-article-section">
      <div className="container">

        {/* Article header */}
        <motion.div
          className="blog-article-header"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="blog-article-category">{post.category}</span>
          <h1 className="blog-article-title">{post.title}</h1>
          <div className="blog-article-meta">
            <Image src={post.author.image} alt={post.author.name} className="blog-author-img" width={36} height={36} />
            <span style={{ fontWeight: 600, color: "#1f2d3e" }}>{post.author.name}</span>
            <span className="blog-meta-dot">·</span>
            <span>{post.date}</span>
            <span className="blog-meta-dot">·</span>
            <span>{post.readingTime} Lesezeit</span>
          </div>
        </motion.div>

        {/* Cover image */}
        <motion.div
          className="blog-article-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Image src={post.coverImage} alt={post.title} width={1200} height={630} style={{ width: "100%", height: "auto" }} />
        </motion.div>

        {/* Article body */}
        <motion.div
          className="blog-article-body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {post.sections.map((section, i) => (
            <div key={i}>
              <h2>{section.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}

          {/* FAQ */}
          {post.faq && post.faq.length > 0 && (
            <div className="blog-article-faq">
              <h2>Häufig gestellte Fragen</h2>
              {post.faq.map((item, i) => (
                <div key={i} className="blog-article-faq-item">
                  <p className="blog-article-faq-q">{item.q}</p>
                  <p className="blog-article-faq-a">{item.a}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Author box */}
        <motion.div
          className="blog-author-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
        >
          <Image
            src={post.author.image}
            alt={post.author.name}
            className="blog-author-box-img"
            width={80}
            height={80}
          />
          <div>
            <p className="blog-author-box-name">{post.author.name}</p>
            <p className="blog-author-box-role">{post.author.role}</p>
            <p className="blog-author-box-bio">{post.author.bio}</p>
          </div>
        </motion.div>

      </div>
    </article>
  );
}

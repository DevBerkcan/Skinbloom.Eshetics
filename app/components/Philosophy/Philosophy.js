"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const valContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const valItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function Philosophy() {
  const t = useTranslations("philosophy");
  const values = t.raw("faq");

  return (
    <section className="ph-section">
      <motion.div
        className="ph-left-col"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <span className="ph-eyebrow">SKINBLOOM AESTHETICS</span>
        <h2 className="ph-title">
          {t("title")} <em>{t("titleBrown")}</em>
        </h2>
        <p className="ph-desc">{t("description")}</p>
      </motion.div>
      <motion.div
        className="ph-values-col"
        variants={valContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {values.map((v, i) => (
          <motion.div key={i} className="ph-value-item" variants={valItem}>
            <span className="ph-num">0{i + 1}</span>
            <div>
              <h4 className="ph-value-title">{v.question}</h4>
              <p className="ph-value-desc">{v.answer}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Philosophy;

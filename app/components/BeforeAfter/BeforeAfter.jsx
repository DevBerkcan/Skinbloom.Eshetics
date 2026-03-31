"use client";

import React from "react";
import { motion } from "framer-motion";
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from "react-compare-slider";
import { useTranslations } from "next-intl";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Placeholder pairs – replace with real images in public/assets/images/ba/
const pairs = [
  {
    before: "/assets/images/vorher_hifu.jpeg",
    after: "/assets/images/nachher_hifu.jpeg",
    fallbackBefore: "/assets/images/about1.png",
    fallbackAfter: "/assets/images/about2.png",
    label: "HIFU Ultraschall",
  },
  {
    before: "/assets/images/lippen-vorher.jpg",
    after: "/assets/images/lippen-nachher.jpg",
    fallbackBefore: "/assets/images/Hyaluron-img.png",
    fallbackAfter: "/assets/images/about1.png",
    label: "Lippenunterspritzung",
  },
  {
    before: "/assets/images/Nasolabiatfalte_vorher.jpeg",
    after: "/assets/images/nasolabiatfalte-nachher.jpeg",
    fallbackBefore: "/assets/images/about2.png",
    fallbackAfter: "/assets/images/Weitere.png",
    label: "Nasolabialfalte",
  },
];

function BACard({ pair, labelBefore, labelAfter }) {
  const [useFallback, setUseFallback] = React.useState(false);

  const beforeSrc = useFallback ? pair.fallbackBefore : pair.before;
  const afterSrc = useFallback ? pair.fallbackAfter : pair.after;

  return (
    <div className="ba-card">
      <ReactCompareSlider
        onlyHandleDraggable={false}
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              background: "#017374",
              border: "3px solid #fff",
              boxShadow: "0 4px 16px rgba(1,115,116,0.35)",
            }}
            linesStyle={{ color: "#fff", opacity: 0.85 }}
          />
        }
        itemOne={
          <div className="ba-img-wrap">
            <ReactCompareSliderImage
              src={beforeSrc}
              alt="Vorher"
              onError={() => setUseFallback(true)}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <span className="ba-img-label ba-img-label--before">{labelBefore}</span>
          </div>
        }
        itemTwo={
          <div className="ba-img-wrap">
            <ReactCompareSliderImage
              src={afterSrc}
              alt="Nachher"
              onError={() => setUseFallback(true)}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <span className="ba-img-label ba-img-label--after">{labelAfter}</span>
          </div>
        }
        style={{ width: "100%", aspectRatio: "3/2", borderRadius: "16px", overflow: "hidden" }}
      />
      <p className="ba-treatment-label">{pair.label}</p>
      {useFallback && (
        <p className="ba-placeholder-note">Beispielbild – echte Ergebnisse folgen</p>
      )}
    </div>
  );
}

export default function BeforeAfter() {
  const t = useTranslations("beforeAfter");

  return (
    <section id="vorher-nachher" className="ba-section">
      <div className="container-fluid">
        <h2 className="title text-center">
          {t("sectionTitle")} <span className="text-brown">{t("sectionTitleBrown")}</span>
        </h2>
        <p className="ba-subtitle text-center">{t("sectionSubtitle")}</p>

        <motion.div
          className="ba-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {pairs.map((pair, i) => (
            <motion.div key={i} variants={cardVariants}>
              <BACard
                pair={pair}
                labelBefore={t("labelBefore")}
                labelAfter={t("labelAfter")}
              />
            </motion.div>
          ))}
        </motion.div>

        <p className="ba-disclaimer text-center">{t("disclaimer")}</p>
      </div>
    </section>
  );
}

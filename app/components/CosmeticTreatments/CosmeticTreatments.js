"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import KosmetikModal from "../Modals/KosmetikModal/KosmetikModal";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { treatments } from "../../data/treatments";

const menuContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const menuItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function CosmeticTreatments() {
  const [modalOpen, setModalOpen] = useState(false);
  const t = useTranslations("cosmeticTreatments");
  const locale = useLocale();
  const items = t.raw("items");

  const kosmetikSlugs = treatments
    .filter((tr) => tr.category === "kosmetik")
    .map((tr) => tr.slug);

  return (
    <>
      <motion.section
        className="behandlung-block bg-grey"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-fluid">
          <div className="behandlung-row">
            <div className="behandlung-col-img">
              <img
                className="behandlung-img"
                src="/assets/images/cosmetic.png"
                alt="Kosmetische Behandlungen bei Skinbloom Aesthetics"
              />
            </div>
            <div className="behandlung-col-content">
              <p className="behandlung-subtitle">{t("subtitle")}</p>
              <motion.div
                className="tr-menu"
                variants={menuContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {items.map((item, i) => (
                  <motion.div key={item} variants={menuItem}>
                    <Link href={`/${locale}/behandlungen/${kosmetikSlugs[i]}`} className="tr-menu-item">
                      <span className="tr-menu-name">{item}</span>
                      <span className="tr-menu-arrow">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <div className="behandlung-actions">
                <button type="button" className="btn-behandlung btn-primary-teal" onClick={() => setModalOpen(true)}>
                  {t("moreDetails")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <KosmetikModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default CosmeticTreatments;

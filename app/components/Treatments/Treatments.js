"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Hyaluron from "../../components/Modals/Hyaluron/Hyaluron";
import Botox from "../../components/Modals/Botox/Botox";
import WeitereBehandlungen from "../../components/Modals/WeitereBehandlungen/WeitereBehandlungen";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { treatments, CATEGORY_IMAGES } from "../../data/treatments";

const menuContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const menuItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function Treatments() {
  const [activeModal, setActiveModal] = useState(null);
  const t = useTranslations("treatments");
  const locale = useLocale();

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const hyaluronItems = Array.isArray(t.raw("hyaluron.items")) ? t.raw("hyaluron.items") : [];
  const botoxItems = Array.isArray(t.raw("botox.items")) ? t.raw("botox.items") : [];
  const weitereItems = Array.isArray(t.raw("weitere.items")) ? t.raw("weitere.items") : [];

  const hyaluronSlugs = treatments.filter((tr) => tr.category === "hyaluron").map((tr) => tr.slug);
  const botoxSlugs = treatments.filter((tr) => tr.category === "botox").map((tr) => tr.slug);
  const weitereSlugs = treatments.filter((tr) => tr.category === "weitere").map((tr) => tr.slug);

  return (
    <>
      <motion.section
        id="behandlungen"
        className="behandlungen-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-fluid">
          <span className="section-eyebrow">SKINBLOOM AESTHETICS</span>
          <h1 className="title behandlungen-title">
            {t("sectionTitle")} <span className="text-brown">{t("sectionTitleBrown")}</span>
          </h1>
        </div>
      </motion.section>

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
                src={CATEGORY_IMAGES.hyaluron}
                alt="Hyaluron Treatment"
              />
            </div>
            <div className="behandlung-col-content">
              <p className="behandlung-subtitle">{t("hyaluron.subtitle")}</p>
              <motion.div
                className="tr-menu"
                variants={menuContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {hyaluronItems.map((item, i) => (
                  <motion.div key={item} variants={menuItem}>
                    <Link href={`/${locale}/behandlungen/${hyaluronSlugs[i]}`} className="tr-menu-item">
                      <span className="tr-menu-name">{item}</span>
                      <span className="tr-menu-arrow">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <div className="behandlung-actions">
                <button type="button" className="btn-behandlung btn-primary-teal" onClick={() => openModal("hyaluron")}>
                  {t("moreDetails")}
                </button>
                <Link href={`/${locale}/preise`} className="btn-behandlung btn-outline-mauve">
                  {t("priceList")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="behandlung-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-fluid">
          <div className="behandlung-row behandlung-row--reverse">
            <div className="behandlung-col-img">
              <img
                className="behandlung-img"
                src={CATEGORY_IMAGES.botox}
                alt="Botox Treatment"
              />
            </div>
            <div className="behandlung-col-content">
              <p className="behandlung-subtitle">{t("botox.subtitle")}</p>
              <motion.div
                className="tr-menu"
                variants={menuContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {botoxItems.map((item, i) => (
                  <motion.div key={item} variants={menuItem}>
                    <Link href={`/${locale}/behandlungen/${botoxSlugs[i]}`} className="tr-menu-item">
                      <span className="tr-menu-name">{item}</span>
                      <span className="tr-menu-arrow">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <div className="behandlung-actions">
                <button type="button" className="btn-behandlung btn-primary-teal" onClick={() => openModal("botox")}>
                  {t("moreDetails")}
                </button>
                <Link href={`/${locale}/preise`} className="btn-behandlung btn-outline-mauve">
                  {t("priceList")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

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
                src={CATEGORY_IMAGES.weitere}
                alt="Additional Treatments"
              />
            </div>
            <div className="behandlung-col-content">
              <p className="behandlung-subtitle">{t("weitere.subtitle")}</p>
              <motion.div
                className="tr-menu"
                variants={menuContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {weitereItems.map((item, i) => (
                  <motion.div key={item} variants={menuItem}>
                    <Link href={`/${locale}/behandlungen/${weitereSlugs[i]}`} className="tr-menu-item">
                      <span className="tr-menu-name">{item}</span>
                      <span className="tr-menu-arrow">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <div className="behandlung-actions">
                <button type="button" className="btn-behandlung btn-primary-teal" onClick={() => openModal("weiterebehandlungen")}>
                  {t("moreDetails")}
                </button>
                <Link href={`/${locale}/preise`} className="btn-behandlung btn-outline-mauve">
                  {t("priceList")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Hyaluron isOpen={activeModal === "hyaluron"} handleClose={closeModal} />
      <Botox isOpen={activeModal === "botox"} handleClose={closeModal} />
      <WeitereBehandlungen isOpen={activeModal === "weiterebehandlungen"} handleClose={closeModal} />
    </>
  );
}

export default Treatments;

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Hyaluron from "../Modals/Hyaluron/Hyaluron";
import Botox from "../Modals/Botox/Botox";
import WeitereBehandlungen from "../Modals/WeitereBehandlungen/WeitereBehandlungen";
import KosmetikModal from "../Modals/KosmetikModal/KosmetikModal";
import { treatments } from "../../data/treatments";

const TreatmentOrbs = dynamic(() => import("../TreatmentOrbs/TreatmentOrbs"), { ssr: false });

const TABS = ["hyaluron", "botox", "weitere", "kosmetik"];

const TAB_IMAGES = {
  hyaluron: "/assets/images/Hyaluron-img.png",
  botox:    "/assets/images/botox.png",
  weitere:  "/assets/images/about2.png",
  kosmetik: "/assets/images/cosmetic.png",
};

const MODAL_KEY = {
  hyaluron: "hyaluron",
  botox:    "botox",
  weitere:  "weiterebehandlungen",
  kosmetik: "kosmetik",
};

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const listItem = {
  hidden:   { opacity: 0, x: -14 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

export default function Behandlungen() {
  const [activeTab, setActiveTab]     = useState("hyaluron");
  const [activeModal, setActiveModal] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoRotateViewport, setIsAutoRotateViewport] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const t  = useTranslations("treatments");
  const tC = useTranslations("cosmeticTreatments");
  const locale = useLocale();
  const interactionTimeoutRef = useRef(null);

  const slugsByCategory = {
    hyaluron: treatments.filter(tr => tr.category === "hyaluron").map(tr => tr.slug),
    botox:    treatments.filter(tr => tr.category === "botox").map(tr => tr.slug),
    weitere:  treatments.filter(tr => tr.category === "weitere").map(tr => tr.slug),
    kosmetik: treatments.filter(tr => tr.category === "kosmetik").map(tr => tr.slug),
  };

  const itemsByTab = {
    hyaluron: t.raw("hyaluron.items"),
    botox:    t.raw("botox.items"),
    weitere:  t.raw("weitere.items"),
    kosmetik: tC.raw("items"),
  };

  const subtitleByTab = {
    hyaluron: t("hyaluron.subtitle"),
    botox:    t("botox.subtitle"),
    weitere:  t("weitere.subtitle"),
    kosmetik: tC("subtitle"),
  };

  const items = itemsByTab[activeTab] || [];
  const slugs = slugsByCategory[activeTab] || [];
  const shouldAutoRotate = isAutoRotateViewport && !activeModal && !isHovered && !isInteracting;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateViewportState = () => setIsAutoRotateViewport(mediaQuery.matches);

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => mediaQuery.removeEventListener("change", updateViewportState);
  }, []);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldAutoRotate) return undefined;

    const interval = setInterval(() => {
      setActiveTab((currentTab) => {
        const currentIndex = TABS.indexOf(currentTab);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [shouldAutoRotate]);

  const pauseAutoRotation = (duration = 6000) => {
    if (!isAutoRotateViewport) return;

    setIsInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
      interactionTimeoutRef.current = null;
    }, duration);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    pauseAutoRotation();
  };

  const handleTouchPause = () => {
    pauseAutoRotation();
  };

  return (
    <section
      id="behandlungen"
      className="behandlungen-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchPause}
      onPointerDown={(event) => {
        if (event.pointerType === "touch" || event.pointerType === "pen") {
          handleTouchPause();
        }
      }}
    >
      <TreatmentOrbs />

      <div className="container-fluid behandlungen-content">
        {/* Header */}
        <motion.div
          className="behandlungen-header-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-eyebrow">SKINBLOOM AESTHETICS</span>
          <h2 className="title behandlungen-title">
            {t("sectionTitle")} <span className="text-brown">{t("sectionTitleBrown")}</span>
          </h2>
        </motion.div>

        {/* Two-column grid */}
        <div className="behandlungen-grid">

          {/* Left: animated image */}
          <div className="behandlungen-img-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                <Image
                  src={TAB_IMAGES[activeTab]}
                  alt={subtitleByTab[activeTab]}
                  className="behandlung-img"
                  width={600}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: tabs + list */}
          <div className="behandlungen-content-col">

            {/* Tab pills */}
            <div className="tab-pills">
              {TABS.map(tab => (
                <button
                  key={tab}
                  type="button"
                  className={`tab-pill${activeTab === tab ? " tab-pill--active" : ""}`}
                  onClick={() => handleTabClick(tab)}
                >
                  {activeTab === tab && (
                    <motion.span layoutId="pill-bg" className="tab-pill-bg" />
                  )}
                  <span className="tab-pill-label">{t(`categoryLabels.${tab}`)}</span>
                  <span className="tab-pill-indicator">
                    <motion.span
                      key={`${tab}-${activeTab === tab ? "active" : "idle"}-${shouldAutoRotate ? "running" : "paused"}`}
                      className={`tab-pill-indicator-dot${activeTab === tab ? " tab-pill-indicator-dot--active" : ""}`}
                      initial={false}
                      animate={
                        activeTab === tab
                          ? {
                              scale: shouldAutoRotate ? [1, 1.18, 1] : 1,
                              opacity: 1,
                            }
                          : {
                              scale: 1,
                              opacity: 0.38,
                            }
                      }
                      transition={
                        activeTab === tab && shouldAutoRotate
                          ? { duration: 4, ease: "linear", repeat: Infinity }
                          : { duration: 0.2, ease: "easeOut" }
                      }
                    />
                  </span>
                </button>
              ))}
            </div>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${activeTab}`}
                className="behandlung-subtitle"
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                {subtitleByTab[activeTab]}
              </motion.p>
            </AnimatePresence>

            {/* Treatment list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="tr-menu"
                variants={listContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeInOut" } }}
              >
                {items.map((item, i) => (
                  <motion.div key={`${activeTab}-${i}`} variants={listItem}>
                    <Link
                      href={`/${locale}/behandlungen/${slugs[i]}`}
                      className="tr-menu-item"
                    >
                      <span className="tr-menu-name">{item}</span>
                      <span className="tr-menu-arrow">→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Action buttons */}
            <div className="behandlung-actions">
              <button
                type="button"
                className="btn-behandlung btn-primary-teal"
                onClick={() => setActiveModal(MODAL_KEY[activeTab])}
              >
                {t("moreDetails")}
              </button>
              <Link href={`/${locale}/preise`} className="btn-behandlung btn-outline-mauve">
                {t("priceList")}
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Hyaluron isOpen={activeModal === "hyaluron"} handleClose={() => setActiveModal(null)} />
      <Botox isOpen={activeModal === "botox"} handleClose={() => setActiveModal(null)} />
      <WeitereBehandlungen isOpen={activeModal === "weiterebehandlungen"} handleClose={() => setActiveModal(null)} />
      <KosmetikModal isOpen={activeModal === "kosmetik"} handleClose={() => setActiveModal(null)} />
    </section>
  );
}

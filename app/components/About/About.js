"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function About() {
  const t = useTranslations("about");

  return (
    <section id="über-uns" className="about my-5 pt-4">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <span className="section-eyebrow">ÜBER UNS</span>
              <h2 className="title mb-0">
                <span className="text-brown">{t("titleBrown")}</span> {t("titleMain")}
              </h2>
              <p className="subtitle mb-5">{t("subtitle")}</p>
              <div className="about-text-block">
                <p className="border-text text-justify">{t("borderText")}</p>
                <p className="description text-justify">{t("description")}</p>
              </div>
              <div className="brand-badges">
                <span className="brand-badge">Teoxane®</span>
                <span className="brand-badge">Stylage®</span>
                <span className="brand-badge">Juvéderm®</span>
                <span className="brand-badge">Fillmed®</span>
              </div>
              <Image
                className="flower"
                src="/assets/images/flower.png"
                alt="Flower Decoration"
                width={100}
                height={100}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

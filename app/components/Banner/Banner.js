"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import BookingButton from "../BookingButton/BookingButton";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const BannerParticles = dynamic(() => import("../BannerParticles/BannerParticles"), {
  ssr: false,
});

const arrowAnimation = {
  animation: `bounce 2s infinite`,
  keyframes: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-20px); }
      60% { transform: translateY(-10px); }
    }
  `,
};

function Banner() {
  const t = useTranslations("banner");
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ["0%", "25%"]);

  return (
    <>
      <style>{arrowAnimation.keyframes}</style>

      <section className="banner position-relative">
        <BannerParticles />

        <motion.div className="banner-bg-img" style={{ backgroundPositionY: bgY }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 col-lg-6 hero-content-col">

                {/* Headline + subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                >
                  <span className="hero-eyebrow">Skinbloom Aesthetics Basel</span>
                  <h1 className="hero-headline">{t("title")}</h1>
                  <p className="hero-subtitle">{t("subtitle")}</p>
                </motion.div>

                {/* CTA + rating */}
                <motion.div
                  className="d-flex flex-wrap gap-3 align-items-center mt-4"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
                >
                  <BookingButton />
                  <div className="banner-rating-block">
                    <Image src="/assets/images/google.png" width={22} height={22} alt="Google" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <span className="fw-bold" style={{ color: "#fff", fontSize: "1rem" }}>4.8</span>
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#FFD700", fontSize: "12px" }} />
                        ))}
                      </div>
                      <Link href="/#reviews" className="text-light text-decoration-underline" style={{ fontSize: "12px" }}>
                        {t("allReviews")}
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  className="hero-trust-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                >
                  <span className="hero-trust-badge">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                    Elisabethenstrasse 41, Basel
                  </span>
                  <span className="hero-trust-badge">
                    <FontAwesomeIcon icon={faClock} className="me-1" />
                    Mo – Sa 09:00 – 20:00
                  </span>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll arrow */}
        <a
          href="#behandlungen"
          className="scroll-down-link"
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          <Image
            className="Transfer-down"
            src="/assets/images/Transfer-down.png"
            alt="Scroll Down"
            width={40}
            height={40}
            style={{
              animation: arrowAnimation.animation,
              height: "auto",
              transition: "opacity 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          />
        </a>
      </section>
    </>
  );
}

export default Banner;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items");

  return (
    <section id="reviews" className="reviews-section">
      <div className="container-fluid">
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">KUNDENSTIMMEN</span>
          <h2 className="title">
            {t("title")} <span className="text-brown">{t("titleBrown")}</span> {t("titleSuffix")}
          </h2>
        </motion.div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.1}
          centeredSlides={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            768: { slidesPerView: 1.4, spaceBetween: 28 },
            1200: { slidesPerView: 1.8, spaceBetween: 32 },
          }}
          className="reviews-swiper"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="review-card">
                <FontAwesomeIcon icon={faQuoteLeft} className="review-quote-icon" />
                <p className="review-text">{item.text}</p>
                <div className="review-footer">
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} />
                    ))}
                  </div>
                  <p className="review-author">{item.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

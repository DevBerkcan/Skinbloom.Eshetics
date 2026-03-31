"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BookingButton from "../BookingButton/BookingButton";

export default function PriceSection({ eyebrow, title, description, bullets, imageSrc, imageAlt, reverse, prices, priceNote }) {
  return (
    <section className={`ps-section${reverse ? " ps-section--reverse" : ""}`}>
      <motion.div
        className="ps-info-row container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className="ps-img-col">
          <Image src={imageSrc} alt={imageAlt} className="ps-img" width={600} height={750} style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="ps-content-col">
          <span className="ps-eyebrow">{eyebrow}</span>
          <h2 className="ps-title">{title}</h2>
          <div className="ps-divider" />
          <ul className="ps-bullets">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="ps-description">{description}</p>
          <BookingButton />
        </div>
      </motion.div>

      <motion.div
        className="ps-prices-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <div className="container">
          <p className="ps-prices-label">PREISE:</p>
          {priceNote && <p className="ps-price-note">{priceNote}</p>}
          <div className="ps-prices-grid">
            {prices.map(([name, price]) => (
              <div key={name} className="ps-price-item">
                <span className="ps-price-name">{name}</span>
                <span className="ps-price-val">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

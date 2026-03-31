"use client";

import Banner from "../components/Banner/Banner";
import TrustBar from "../components/TrustBar/TrustBar";
import About from "../components/About/About";
import Reviews from "../components/Reviews/Reviews";
import Team from "../components/Team/Team";
import Behandlungen from "../components/Behandlungen/Behandlungen";
import BeforeAfter from "../components/BeforeAfter/BeforeAfter";
import InstagramCTA from "../components/InstagramCTA/InstagramCTA";
import Philosophy from "../components/Philosophy/Philosophy";
import BlogPreview from "../components/BlogPreview/BlogPreview";
import FAQ from "../components/FAQ/FAQ";
import Contact from "../components/Contact/Contact";
import WhatsAppButton from "../components/WhatsAppButton/WhatsAppButton";

import React from "react";

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Skinbloom Aesthetics",
    description:
      "Skinbloom Aesthetics bietet professionelle ästhetische Behandlungen in Basel – Hyaluron, PRP, Microneedling, HIFU, Kosmetik und mehr. Individuelle Beratung und natürliche Ergebnisse.",
    url: "https://www.skinbloom-aesthetics.ch",
    image: "https://www.skinbloom-aesthetics.ch/assets/images/logo.png",
    email: "info@skinbloom-aesthetics.ch",
    telephone: "+41782418704",
    priceRange: "CHF 80 - CHF 900",
    areaServed: "Basel",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Elisabethenstrasse 41",
      addressLocality: "Basel",
      postalCode: "4051",
      addressCountry: "CH",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "30",
    },
    sameAs: [
      "https://www.instagram.com/skinbloom._aesthetics/",
      "https://www.facebook.com/profile.php?id=61565493292168",
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <WhatsAppButton />
      <Banner />
      <TrustBar />
      <Behandlungen />
      <BeforeAfter />
      <Reviews />
      <About />
      <Team />
      <Philosophy />
      <InstagramCTA />
      <BlogPreview />
      <FAQ />
      <Contact />
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers, faUserMd, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function AnimatedCounter({ target, duration = 1800, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
    </span>
  );
}

const items = [
  {
    icon: faStar,
    text: (
      <>
        <AnimatedCounter target={4.8} decimals={1} duration={1500} /> Google Bewertung
      </>
    ),
  },
  {
    icon: faUsers,
    text: (
      <>
        <AnimatedCounter target={500} duration={2000} />+ Zufriedene Kunden
      </>
    ),
  },
  { icon: faUserMd, text: "Medizinisch ausgebildetes Team" },
  { icon: faMapMarkerAlt, text: "Basel, Schweiz" },
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      {items.map(({ icon, text }, i) => (
        <div className="trust-bar-item" key={i}>
          <FontAwesomeIcon icon={icon} className="trust-bar-icon" />
          <span className="trust-bar-text">{text}</span>
        </div>
      ))}
    </div>
  );
}

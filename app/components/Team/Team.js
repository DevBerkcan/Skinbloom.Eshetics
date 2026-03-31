"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const memberImages = [
  "/assets/images/marianna.jpeg",
  "/assets/images/christina.jpg",
];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const badgeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const badgeItem = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function Team() {
  const t = useTranslations("team");
  const members = t.raw("members");

  const renderDescription = (text) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const paragraphs = lines.filter((line) => !line.startsWith("•"));
    const bullets = lines
      .filter((line) => line.startsWith("•"))
      .map((line) => line.replace(/^•\s*/, ""));

    return (
      <div className="team-desc">
        {paragraphs.map((paragraph, idx) => (
          <p
            className="team-desc-paragraph"
            key={`${idx}-${paragraph.slice(0, 24)}`}
          >
            {paragraph}
          </p>
        ))}
        {bullets.length > 0 && (
          <ul className="team-desc-list">
            {bullets.map((bullet, idx) => (
              <li key={`${idx}-${bullet.slice(0, 24)}`}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <section className="team-section my-5">
      <div className="container-fluid">
        <motion.div
          className="team-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="section-eyebrow">UNSER TEAM</span>
          <h2 className="title mb-2">
            {t("title")} <span className="text-brown">{t("titleBrown")}</span>
          </h2>
          <p className="team-section-subtitle">{t("subtitle")}</p>
        </motion.div>

        <div className="team-rows mt-5">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              className={`team-member-row${index % 2 === 1 ? " team-member-row--reverse" : ""}`}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="team-col-img">
                <div className="team-portrait-wrap">
                  <Image
                    className={`team-portrait-img${index === 0 ? " tm-marianna" : " tm-christina"}`}
                    src={memberImages[index]}
                    alt={member.imgAlt}
                    width={400}
                    height={533}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>

              <div className="team-col-content">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <div className="team-role-line" />
                <motion.div
                  className="team-badges mb-3"
                  variants={badgeContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {member.badges.map((badge) => (
                    <motion.span
                      className="team-badge"
                      key={badge}
                      variants={badgeItem}
                    >
                      {badge}
                    </motion.span>
                  ))}
                </motion.div>
                {renderDescription(member.description)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;

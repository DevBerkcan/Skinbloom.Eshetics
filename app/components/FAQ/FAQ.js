"use client";

import { Accordion } from "react-bootstrap";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" },
  }),
};

const FAQ = () => {
  const t = useTranslations("faq");
  const items = t.raw("items");

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
        >
          <span className="section-eyebrow">FAQ</span>
          <h2 className="faq-title">{t("title")}</h2>
        </motion.div>
        <Accordion defaultActiveKey="0" flush>
          {items.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Accordion.Item eventKey={String(index)}>
                <Accordion.Header className={index === 6 ? "text-break" : ""}>
                  {item.question}
                </Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;

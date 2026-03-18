"use client";

import React, { useState, useRef, useEffect } from "react";
import Hyaluron from "../../components/Modals/Hyaluron/Hyaluron";
import Botox from "../../components/Modals/Botox/Botox";
import WeitereBehandlungen from "../../components/Modals/WeitereBehandlungen/WeitereBehandlungen";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpa } from "@fortawesome/free-solid-svg-icons";
import { treatments, CATEGORY_IMAGES } from "../../data/treatments";

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

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

  const hyaluronRef = useScrollReveal();
  const botoxRef = useScrollReveal();
  const weitereRef = useScrollReveal();

  return (
    <>
      <section id="behandlungen" className="behandlungen-header">
        <div className="container-fluid">
          <h1 className="title behandlungen-title">
            {t("sectionTitle")} <span className="text-brown">{t("sectionTitleBrown")}</span>
          </h1>
        </div>
      </section>

      <section className="behandlung-block bg-grey" ref={hyaluronRef}>
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
              <ul className="behandlung-list">
                {hyaluronItems.map((item, i) => (
                  <li className="behandlung-list-item" key={item}>
                    <FontAwesomeIcon icon={faSpa} className="behandlung-check" />
                    <Link href={`/${locale}/behandlungen/${hyaluronSlugs[i]}`} className="behandlung-item-link">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="behandlung-actions">
                <a className="btn-behandlung btn-primary-teal" onClick={() => openModal("hyaluron")}>
                  {t("moreDetails")}
                </a>
                <Link href={`/${locale}/preise`} className="btn-behandlung btn-outline-mauve">
                  {t("priceList")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="behandlung-block" ref={botoxRef}>
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
              <ul className="behandlung-list">
                {botoxItems.map((item, i) => (
                  <li className="behandlung-list-item" key={item}>
                    <FontAwesomeIcon icon={faSpa} className="behandlung-check" />
                    <Link href={`/${locale}/behandlungen/${botoxSlugs[i]}`} className="behandlung-item-link">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="behandlung-actions">
                <a className="btn-behandlung btn-primary-teal" onClick={() => openModal("botox")}>
                  {t("moreDetails")}
                </a>
                <Link href={`/${locale}/preise`} className="btn-behandlung btn-outline-mauve">
                  {t("priceList")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="behandlung-block bg-grey" ref={weitereRef}>
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
              <ul className="behandlung-list">
                {weitereItems.map((item, i) => (
                  <li className="behandlung-list-item" key={item}>
                    <FontAwesomeIcon icon={faSpa} className="behandlung-check" />
                    <Link href={`/${locale}/behandlungen/${weitereSlugs[i]}`} className="behandlung-item-link">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="behandlung-actions">
                <a className="btn-behandlung btn-primary-teal" onClick={() => openModal("weiterebehandlungen")}>
                  {t("moreDetails")}
                </a>
                <Link href={`/${locale}/preise`} className="btn-behandlung btn-outline-mauve">
                  {t("priceList")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Hyaluron isOpen={activeModal === "hyaluron"} handleClose={closeModal} />
      <Botox isOpen={activeModal === "botox"} handleClose={closeModal} />
      <WeitereBehandlungen isOpen={activeModal === "weiterebehandlungen"} handleClose={closeModal} />
    </>
  );
}

export default Treatments;

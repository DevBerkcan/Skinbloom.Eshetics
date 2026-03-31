"use client";

import { useTranslations } from "next-intl";
import ContactPageFaq from "../../kontakt/Faq/Faq";
import ContactUsEmail from "../../kontakt/ContactUsEmail/ContactUsEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot, faClock, faComments, faShieldHeart } from "@fortawesome/free-solid-svg-icons";

export default function ContactUs() {
  const t = useTranslations("contact");

  return (
    <div>
      <section className="contact py-6">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-eyebrow">SKINBLOOM AESTHETICS</span>
            <h3 className="title">
              {t("contactTitle")} <span className="text-brown">{t("contactTitleBrown")}</span>
            </h3>
          </div>
          <div className="row justify-content-center align-items-stretch contact-main-row">
            <div className="col-lg-7">
              <p className="desc text-center text-lg-start mx-auto mx-lg-0 mb-5">{t("description")}</p>
              <div className="contact-form-shell">
                <div className="contact-badge-row">
                  <span className="contact-mini-badge">
                    <FontAwesomeIcon icon={faComments} />
                    {t("badges.consultation")}
                  </span>
                  <span className="contact-mini-badge">
                    <FontAwesomeIcon icon={faShieldHeart} />
                    {t("badges.discreet")}
                  </span>
                </div>
                <ContactUsEmail />
              </div>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              <div className="contact-side-card">
                <div className="contact-badge-row contact-badge-row--dark">
                  <span className="contact-mini-badge contact-mini-badge--dark">
                    <FontAwesomeIcon icon={faLocationDot} />
                    {t("badges.central")}
                  </span>
                  <span className="contact-mini-badge contact-mini-badge--dark">
                    <FontAwesomeIcon icon={faClock} />
                    {t("badges.response")}
                  </span>
                </div>
                <p className="contact-side-eyebrow">{t("contactTitle")}</p>
                <h3 className="contact-side-title">
                  {t("contactTitle")} <span>{t("contactTitleBrown")}</span>
                </h3>
                <p className="contact-side-text">{t("contactUsText")}</p>

                <div className="contact-side-list">
                  <div className="contact-info-item contact-info-item--card">
                    <FontAwesomeIcon icon={faPhone} className="contact-info-icon" />
                    <div>
                      <p className="contact-info-label">{t("info.phoneLabel")}</p>
                      <a className="contact-info-value contact-info-link" href="tel:+41782418704">+41 78 241 87 04</a>
                    </div>
                  </div>
                  <div className="contact-info-item contact-info-item--card">
                    <FontAwesomeIcon icon={faLocationDot} className="contact-info-icon" />
                    <div>
                      <p className="contact-info-label">{t("info.addressLabel")}</p>
                      <p className="contact-info-value">{t("info.addressValue")}, Schweiz</p>
                    </div>
                  </div>
                  <div className="contact-info-item contact-info-item--card">
                    <FontAwesomeIcon icon={faClock} className="contact-info-icon" />
                    <div>
                      <p className="contact-info-label">{t("info.openingHoursLabel")}</p>
                      <p className="contact-info-value">{t("info.openingHoursValue")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq py-5 bg-light-pink">
        <div className="container">
          <h3 className="title mb-4">
            {t("advantages")} <span className="text-brown">{t("advantagesBrown")}</span>
          </h3>
          <div className="row align-items-start g-4">
            <div className="col-md-6">
              <img
                className="w-100 rounded-4 object-fit-cover h-350"
                src="/assets/images/contact-page-img.png"
                alt="Kontakt Skinbloom Aesthetics Basel"
              />
            </div>
            <div className="col-md-6">
              <ContactPageFaq />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

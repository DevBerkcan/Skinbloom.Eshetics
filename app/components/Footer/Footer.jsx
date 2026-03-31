"use client";

import React from "react";
import Image from "next/image";
import { Link } from "../../../i18n/navigation";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faMapMarker, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <div>
      <footer className="text-lg-start py-5 bg-black" style={{ position: "relative" }}>
        <section>
          <div className="container text-md-start">
            <div className="row mt-3 mb-5">
              <div className="col-md-3 col-lg-4 col-xl-4 mx-auto mb-4">
                <Image
                  className="footer-logo mb-2"
                  src="/assets/images/footer-logo.png"
                  alt="Skinbloom Aesthetics Logo"
                  width={300}
                  height={100}
                  style={{ height: "auto" }}
                />
                <p>{t("description")}</p>
                <div className="mt-2 social-icon d-flex gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61565493292168"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-reset"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a
                    href="https://www.instagram.com/skinbloom._aesthetics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-reset"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 mx-auto mb-4"></div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="fw-bold mb-4">{t("quickLinks")}</h6>
                <p>
                  <Link href="/#über-uns" className="text-reset">
                    {t("aboutUs")}
                  </Link>
                </p>
                <p>
                  <Link href="/#behandlungen" className="text-reset">
                    {t("treatments")}
                  </Link>
                </p>
                <p>
                  <Link href="/kontakt" className="text-reset">
                    {t("contact")}
                  </Link>
                </p>
                <p>
                  <Link href="/#reviews" className="text-reset">
                    {t("reviews")}
                  </Link>
                </p>
                <p>
                  <Link href="/#faq" className="text-reset">
                    {t("faq")}
                  </Link>
                </p>
                <p>
                  <Link href="/blog" className="text-reset">
                    Blog
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="fw-bold mb-4">{t("legal")}</h6>
                <p>
                  <Link href="/impressum" className="text-reset">
                    {t("imprint")}
                  </Link>
                </p>
                <p>
                  <Link href="/datenschutzrichtlinien" className="text-reset">
                    {t("privacy")}
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="fw-bold mb-4">{t("contactTitle")}</h6>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="me-3" />
                  <a
                    className="text-reset"
                    href="mailto:info@skinbloom-aesthetics.ch"
                  >
                    info@skinbloom-aesthetics.ch
                  </a>
                </p>
                <p className="d-flex">
                  <FontAwesomeIcon icon={faMapMarker} className="me-3" />
                  Elisabethenstrasse 41, Basel Switzerland 4051
                </p>
                <p>
                  <FontAwesomeIcon icon={faPhone} className="me-3" />
                  <a className="text-reset" href="tel:+41782418704">
                    +41 78 241 87 04
                  </a>
                </p>
                <div className="footer-siegel-wrap">
                  <Image
                    src="/assets/images/img_siegel_v4_light.png"
                    alt="Rechtstexte Siegel"
                    className="footer-siegel-img"
                    width={270}
                    height={270}
                    style={{ height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="footer-copyright">
          {t("copyright")}
        </div>
      </footer>
    </div>
  );
}

"use client";

import { faPhone, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "../../../i18n/navigation";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useTranslations, useLocale } from "next-intl";
import { treatments } from "../../data/treatments";

const CATEGORIES = [
  { key: "hyaluron", labelKey: "catHyaluron" },
  { key: "botox", labelKey: "catBotox" },
  { key: "weitere", labelKey: "catWeitere" },
  { key: "kosmetik", labelKey: "catKosmetik" },
];

const GROUPED_PREFIXES = {
  weitere: [
    { prefix: "polynukleotide", label: "Polynukleotide" },
    { prefix: "skinbooster", label: "Skinbooster" },
    { prefix: "profhilo", label: "Profhilo" },
    { prefix: "fett-weg-spritze", label: "Fett-weg-Spritze" },
    { prefix: "radiofrequenz-microneedling", label: "Radiofrequenz-Microneedling" },
    { prefix: "hydrafacial", label: "Hydrafacial" },
        { prefix: "hifu", label: "HIFU" },
  ],
  kosmetik: [
    { prefix: "microneedling", label: "Microneedling" },
    { prefix: "skinbloom-signature", label: "Skinbloom Signature" },
    { prefix: "fruchtsaeurepeeling", label: "Fruchtsäurepeeling" },
  ],
};

function groupTreatments(categoryTreatments, categoryKey, tB) {
  const prefixes = GROUPED_PREFIXES[categoryKey] || [];
  const grouped = [];
  const usedSlugs = new Set();

  prefixes.forEach(({ prefix, label }) => {
    const children = categoryTreatments.filter((tr) => tr.slug.startsWith(prefix));
    if (children.length === 0) return;

    const exactMatch = children.find((tr) => tr.slug === prefix);
    const subItems = children.filter((tr) => tr.slug !== prefix);

    grouped.push({
      type: "group",
      prefix,
      label,
      exactMatch,
      subItems,
    });

    children.forEach((tr) => usedSlugs.add(tr.slug));
  });

  const standalone = categoryTreatments.filter((tr) => !usedSlugs.has(tr.slug));

  return { grouped, standalone };
}

function GroupedItem({ group, tB, locale, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mega-group">
      <div className="mega-group-header" onClick={() => setOpen((o) => !o)}>
        {group.exactMatch ? (
          <Link
            href={`/behandlungen/${group.exactMatch.slug}`}
            className="mega-item mega-group-label"
            onClick={onClose}
          >
            {tB(`items.${group.exactMatch.slug}.name`)}
          </Link>
        ) : (
          <span className="mega-item mega-group-label">{group.label}</span>
        )}
        <FontAwesomeIcon
          icon={faChevronRight}
          className={`mega-group-arrow${open ? " mega-group-arrow--open" : ""}`}
        />
      </div>
      {open && (
        <div className="mega-group-children">
          {group.subItems.map((tr) => (
            <Link
              key={tr.slug}
              href={`/behandlungen/${tr.slug}`}
              className="mega-item mega-item--child"
              onClick={onClose}
            >
              {tB(`items.${tr.slug}.name`)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const t = useTranslations("nav");
  const tB = useTranslations("behandlungen");
  const locale = useLocale();
  const pathname = usePathname();

  const openMegaMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  };

  const closeMegaMenuWithDelay = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
      closeTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      <div className="utility-bar">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a href="tel:+41782418704" className="utility-phone">
            <FontAwesomeIcon icon={faPhone} className="me-2" />
            +41 782 418 704
          </a>
          <div className="d-flex align-items-center gap-3">
            <div className="utility-lang">
              <Link
                href={pathname}
                locale="de"
                className={`lang-btn${locale === "de" ? " lang-active" : ""}`}
              >
                DE
              </Link>
              <span className="utility-divider">|</span>
              <Link
                href={pathname}
                locale="en"
                className={`lang-btn${locale === "en" ? " lang-active" : ""}`}
              >
                EN
              </Link>
            </div>
            <a
              href="https://skinbloombooking.gentlegroup.de/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="utility-booking-btn"
            >
              {t("bookNow")}
            </a>
          </div>
        </div>
      </div>

      <header>
        <Navbar expand="md" className="navbar-light" style={{ backgroundColor: "transparent" }}>
          <Container fluid>
            <Link href="/" className="navbar-brand d-md-none">
              <Image src="/assets/images/logo.png" alt="Logo" width={300} height={100} style={{ height: "auto" }} />
            </Link>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="mx-auto">
                <Nav.Item>
                  <Link href="/#über-uns" className="nav-link">{t("aboutUs")}</Link>
                </Nav.Item>

                <Nav.Item
                  className="mega-menu-wrapper"
                  onMouseEnter={openMegaMenu}
                  onMouseLeave={closeMegaMenuWithDelay}
                >
                  <button
                    type="button"
                    className={`nav-link mega-trigger${megaOpen ? " mega-trigger--open" : ""}`}
                    onClick={() => setMegaOpen((o) => !o)}
                    aria-expanded={megaOpen}
                  >
                    {t("treatments")}
                    <FontAwesomeIcon icon={faChevronDown} className="mega-chevron" />
                  </button>

                  {megaOpen && (
                    <div
                      className="mega-panel mega-panel--wide"
                      onMouseEnter={openMegaMenu}
                      onMouseLeave={closeMegaMenuWithDelay}
                    >
                      <div className="mega-grid mega-grid--4col">
                        {CATEGORIES.map((cat) => {
                          const categoryTreatments = treatments.filter(
                            (tr) => tr.category === cat.key
                          );
                          const { grouped, standalone } = groupTreatments(
                            categoryTreatments,
                            cat.key,
                            tB
                          );

                          return (
                            <div key={cat.key} className="mega-col">
                              <p className="mega-cat-title">
                                {tB(`categoryLabels.${cat.key}`)}
                              </p>

                              {standalone.map((tr) => (
                                <Link
                                  key={tr.slug}
                                  href={`/behandlungen/${tr.slug}`}
                                  className="mega-item"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  {tB(`items.${tr.slug}.name`)}
                                </Link>
                              ))}

                              {grouped.map((group) => (
                                <GroupedItem
                                  key={group.prefix}
                                  group={group}
                                  tB={tB}
                                  locale={locale}
                                  onClose={() => setMegaOpen(false)}
                                />
                              ))}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mega-footer">
                        <Link
                          href="/behandlungen"
                          className="mega-footer-link"
                          onClick={() => setMegaOpen(false)}
                        >
                          {t("allTreatments")} →
                        </Link>
                      </div>
                    </div>
                  )}
                </Nav.Item>

                <Nav.Item className="d-none d-md-block">
                  <Link href="/" className="navbar-brand">
                    <Image src="/assets/images/logo.png" alt="Logo" width={300} height={100} style={{ height: "auto" }} />
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/preise" className="nav-link">{t("prices")}</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/blog" className="nav-link">{t("blog")}</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link href="/kontakt" className="nav-link">{t("contact")}</Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { treatments, CATEGORY_IMAGES } from "../../../data/treatments";
import TreatmentCard from "../../../components/TreatmentCard/TreatmentCard";
import AccordionServer from "../../../components/AccordionServer/AccordionServer";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

const BOOKING_URL = "https://skinbloombooking.gentlegroup.de/booking";

export async function generateStaticParams() {
  return ["de", "en"].flatMap((locale) =>
    treatments.map((tr) => ({ locale, slug: tr.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const treatment = treatments.find((tr) => tr.slug === slug);
  if (!treatment) return {};

  const t = await getTranslations({ locale, namespace: "behandlungen" });
  return {
    title: t(`items.${slug}.metaTitle`),
    description: t(`items.${slug}.metaDescription`),
    alternates: { canonical: `/${locale}/behandlungen/${slug}` },
    openGraph: {
      title: t(`items.${slug}.metaTitle`),
      description: t(`items.${slug}.metaDescription`),
    },
  };
}

export default async function TreatmentPage({ params }) {
  const { locale, slug } = await params;
  const treatment = treatments.find((tr) => tr.slug === slug);
  if (!treatment) notFound();

  const t = await getTranslations({ locale, namespace: "behandlungen" });
  const tReviews = await getTranslations({ locale, namespace: "reviews" });

  const heroImage = CATEGORY_IMAGES[treatment.category];
  const categoryLabel = t(`categoryLabels.${treatment.category}`);
  const name = t(`items.${slug}.name`);
  const shortDescription = t(`items.${slug}.shortDescription`);
  const definition = t(`items.${slug}.definition`);
  const benefits = t.raw(`items.${slug}.benefits`);
  const duration = t(`items.${slug}.duration`);
  const longevity = t(`items.${slug}.longevity`);
  const downtime = t(`items.${slug}.downtime`);
  const process = t.raw(`items.${slug}.process`);
  const faq = t.raw(`items.${slug}.faq`);
  const idealFor = t.raw(`items.${slug}.idealFor`);
  const reviews = tReviews.raw("items").slice(0, 3);

  const relatedTreatments = (treatment.related || [])
    .map((s) => treatments.find((tr) => tr.slug === s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description: definition,
    procedureType: "Cosmetic",
    status: "EventScheduled",
    url: `https://www.skinbloom-aesthetics.ch/${locale}/behandlungen/${slug}`,
    performer: {
      "@type": "MedicalBusiness",
      name: "Skinbloom Aesthetics",
      url: "https://www.skinbloom-aesthetics.ch",
      telephone: "+41782418704",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Elisabethenstrasse 41",
        addressLocality: "Basel",
        postalCode: "4051",
        addressCountry: "CH",
      },
    },
  };

  return (
    <main>
      {/* SCHEMA.ORG JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BREADCRUMB */}
      <div className="container pt-4">
        <Breadcrumb
          items={[
            { label: "Startseite", href: "/" },
            { label: "Behandlungen", href: "/behandlungen" },
            { label: name },
          ]}
        />
      </div>

      {/* HERO */}
      <section
        className="treatment-hero"
        style={{ backgroundImage: `url('/${heroImage}')` }}
      >
        <div className="container">
          <div className="treatment-hero-content">
            <span className="treatment-badge mb-3 d-inline-block">{categoryLabel}</span>
            <h1 className="treatment-hero-title">{name}</h1>
            <p className="treatment-hero-subtitle">{shortDescription}</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn treatment-hero-btn mt-3"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </section>

      {/* QUICKINFO BADGES */}
      <section className="treatment-quickinfo-section">
        <div className="container">
          <div className="treatment-quickinfo-row">
            <div className="treatment-quickinfo-item">
              <span className="treatment-quickinfo-icon">⏱</span>
              <span className="treatment-quickinfo-label">{t("quickinfoLabels.duration")}</span>
              <span className="treatment-quickinfo-value">{duration}</span>
            </div>
            <div className="treatment-quickinfo-item">
              <span className="treatment-quickinfo-icon">📅</span>
              <span className="treatment-quickinfo-label">{t("quickinfoLabels.longevity")}</span>
              <span className="treatment-quickinfo-value">{longevity}</span>
            </div>
            <div className="treatment-quickinfo-item">
              <span className="treatment-quickinfo-icon">🛡</span>
              <span className="treatment-quickinfo-label">{t("quickinfoLabels.downtime")}</span>
              <span className="treatment-quickinfo-value">{downtime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* DEFINITION */}
      <section className="treatment-definition-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-7">
              <h2 className="treatment-section-title">
                {t("definitionTitle")}{" "}
                <span className="text-brown">{name}?</span>
              </h2>
              <p className="treatment-definition-text">{definition}</p>
            </div>
            <div className="col-md-5 text-center">
              <Image
                src="/assets/images/contact-img.png"
                alt={name}
                className="treatment-definition-img"
                width={400}
                height={400}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FÜR WEN GEEIGNET */}
      <section className="treatment-idealfor-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="treatment-section-title text-center mb-4">{t("idealForTitle")}</h2>
              <ul className="treatment-idealfor-list">
                {idealFor.map((item, i) => (
                  <li key={i}>
                    <span className="treatment-idealfor-check">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      <section className="treatment-process-section py-5">
        <div className="container">
          <h2 className="treatment-section-title text-center mb-5">{t("processTitle")}</h2>
          <div className="treatment-process-row">
            {process.map((step, i) => (
              <div key={i} className="treatment-process-step">
                <div className="treatment-process-number">{i + 1}</div>
                <p className="treatment-process-text">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORTEILE */}
      <section className="treatment-benefits-section py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="treatment-section-title text-center mb-4">
                {t("benefitsTitle")}
              </h2>
              <ul className="treatment-benefits-list">
                {benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA STRIP */}
      <section className="treatment-midcta-strip">
        <div className="container">
          <div className="treatment-midcta-inner">
            <p className="treatment-midcta-text">
              {t("midCtaText")} <strong>{name}</strong>?
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="treatment-midcta-btn"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </section>

      {/* VORHER & NACHHER */}
      <section className="treatment-before-after-section py-5">
        <div className="container">
          <h2 className="treatment-section-title text-center mb-4">
            {t("beforeAfterTitle")}
          </h2>
          <div className="before-after-placeholder">
            <p className="mb-0">{t("beforeAfterPlaceholder")}</p>
          </div>
        </div>
      </section>

      {/* BEWERTUNGEN */}
      <section className="treatment-reviews-section py-5">
        <div className="container">
          <h2 className="treatment-section-title text-center mb-4">
            {t("reviewsTitle")}
          </h2>
          <div className="row g-4 justify-content-center">
            {reviews.map((review, i) => (
              <div className="col-md-4" key={i}>
                <div className="treatment-review-card">
                  <div className="treatment-stars mb-2">★★★★★</div>
                  <p className="treatment-review-text">"{review.text}"</p>
                  <p className="treatment-review-name">— {review.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="treatment-faq-section py-5">
        <div className="container">
          <h2 className="treatment-section-title text-center mb-4">{t("faqTitle")}</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <AccordionServer items={faq} />
            </div>
          </div>
        </div>
      </section>

      {/* VERWANDTE BEHANDLUNGEN */}
      {relatedTreatments.length > 0 && (
        <section className="treatment-related-section py-5">
          <div className="container">
            <h2 className="treatment-section-title text-center mb-4">{t("relatedTitle")}</h2>
            <div className="row g-4 justify-content-center">
              {relatedTreatments.map((tr) => (
                <div key={tr.slug} className="col-md-4 col-sm-6">
                  <TreatmentCard
                    slug={tr.slug}
                    name={t(`items.${tr.slug}.name`)}
                    shortDescription={t(`items.${tr.slug}.shortDescription`)}
                    categoryLabel={t(`categoryLabels.${tr.category}`)}
                    locale={locale}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOOKING CTA */}
      <section className="py-5">
        <div className="container">
          <div className="treatment-cta-block">
            <h2 className="treatment-cta-title">{t("ctaTitle")}</h2>
            <p className="treatment-cta-text">{t("ctaText")}</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn treatment-cta-btn mt-3"
            >
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </section>

      {/* BACK LINK */}
      <div className="container pb-4">
        <Link href={`/${locale}/behandlungen`} className="treatment-back-link">
          ← {t("backLink")}
        </Link>
      </div>
    </main>
  );
}

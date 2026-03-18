import { getTranslations } from "next-intl/server";
import { treatments } from "../../data/treatments";
import TreatmentCard from "../../components/TreatmentCard/TreatmentCard";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === "de" ? "Unsere Behandlungen | Skinbloom Aesthetics" : "Our Treatments | Skinbloom Aesthetics",
    description: locale === "de"
      ? "Alle Ästhetik-Behandlungen bei Skinbloom Aesthetics Basel – Hyaluron, Anti-Aging, Skinbooster, Microneedling und mehr."
      : "All aesthetic treatments at Skinbloom Aesthetics Basel – hyaluronic acid, anti-aging, skinbooster, microneedling and more.",
    alternates: { canonical: `/${locale}/behandlungen` },
  };
}

export default async function BehandlungenPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "behandlungen" });

  const categories = ["hyaluron", "weitere", "kosmetik"];

  return (
    <main className="behandlungen-overview">
      <section className="behandlungen-hero-simple py-5">
        <div className="container text-center">
          <h1 className="title">{t("pageTitle")}</h1>
          <p className="team-section-subtitle">{t("pageSubtitle")}</p>
        </div>
      </section>

      {categories.map((category) => {
        const categoryTreatments = treatments.filter((tr) => tr.category === category);
        return (
          <section key={category} id={category} className="behandlungen-category-section py-5">
            <div className="container">
              <h2 className="behandlungen-category-title">
                {t(`categoryLabels.${category}`)}
              </h2>
              <div className="row g-4 mt-2">
                {categoryTreatments.map((tr) => (
                  <div className="col-md-4 col-sm-6" key={tr.slug}>
                    <TreatmentCard
                      slug={tr.slug}
                      name={t(`items.${tr.slug}.name`)}
                      shortDescription={t(`items.${tr.slug}.shortDescription`)}
                      categoryLabel={t(`categoryLabels.${category}`)}
                      locale={locale}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

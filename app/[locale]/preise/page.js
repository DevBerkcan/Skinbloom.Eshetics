import { getTranslations } from "next-intl/server";
import BookingButton from "../../components/BookingButton/BookingButton";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "preisseite" });
  return {
    title: t("heroTitle") + " | Skinbloom Aesthetics",
    description: t("heroSubtitle"),
  };
}

function PriceSection({ eyebrow, title, description, bullets, imageSrc, imageAlt, reverse, prices }) {
  return (
    <section className={`ps-section${reverse ? " ps-section--reverse" : ""}`}>
      <div className="ps-info-row container">
        <div className="ps-img-col">
          <img src={imageSrc} alt={imageAlt} className="ps-img" />
        </div>
        <div className="ps-content-col">
          <span className="ps-eyebrow">{eyebrow}</span>
          <h2 className="ps-title">{title}</h2>
          <div className="ps-divider" />
          <ul className="ps-bullets">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="ps-description">{description}</p>
          <BookingButton />
        </div>
      </div>

      <div className="ps-prices-wrap">
        <div className="container">
          <p className="ps-prices-label">PREISE:</p>
          <div className="ps-prices-grid">
            {prices.map(([name, price]) => (
              <div key={name} className="ps-price-item">
                <span className="ps-price-name">{name}</span>
                <span className="ps-price-val">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function PreisePage({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "preisseite" });

  return (
    <main style={{ background: "#f9f6f3" }}>

      {/* Hero */}
      <section className="ps-hero">
        <div className="container text-center">
          <span className="ps-eyebrow d-block mb-2">SKINBLOOM AESTHETICS</span>
          <h1 className="ps-hero-title">{t("heroTitle").toUpperCase()}</h1>
          <div className="ps-divider mx-auto my-4" />
          <p className="ps-hero-sub">{t("heroSubtitle")}</p>
          <div className="mt-4">
            <BookingButton />
          </div>
        </div>
      </section>

      {/* 1 — Hyaluron */}
      <PriceSection
        eyebrow="ÄSTHETISCHE BEHANDLUNG"
        title="Hyaluron"
        description="Hyaluronsäure-Behandlungen polstern die Haut auf, glätten Falten und spenden intensive Feuchtigkeit. Wir verwenden ausschließlich hochwertige Qualitätsprodukte wie Teoxane®, Stylage® und Juvéderm® für natürliche, strahlende Ergebnisse."
        bullets={[
          "HAUT SANFT AUFFÜLLEN",
          "FALTEN SICHTBAR GLÄTTEN",
          "SOFORT SICHTBARE ERGEBNISSE",
        ]}
        imageSrc="/assets/images/Hyaluron-img.png"
        imageAlt="Hyaluron Behandlung"
        reverse={false}
        prices={[
          ["Hyaluron 1 ml", ""],
          ["Lippenaufbau / Unterspritzung", "CHF 249.-"],
          ["Jawline", "CHF 249.-"],
          ["Kinnaufbau", "CHF 249.-"],
          ["Wangenaufbau", "CHF 249.-"],
          ["Nasolabialfalte", "CHF 249.-"],
          ["Russian Lips", "CHF 299.-"],
          ["Augenringe", "CHF 299.-"],
          ["Hylase - Hyaluron auflösen", "CHF 150.-"],
        ]}
      />

      {/* 2 — Botox */}
      <PriceSection
        eyebrow="MEDIZINISCHE ÄSTHETIK"
        title="Botox®"
        description="Botulinum-Toxin entspannt gezielt überaktive Muskeln und glättet dynamische Falten auf natürliche Weise. Die Behandlung ist minimal-invasiv, schnell und erzielt ein frisches, ausgeruhtes Erscheinungsbild ohne eingefrorene Mimik."
        bullets={[
          "DYNAMISCHE FALTEN REDUZIEREN",
          "NATÜRLICHES ERGEBNIS",
          "BEWÄHRTE SICHERHEIT",
        ]}
        imageSrc="/assets/images/Weitere.png"
        imageAlt="Botox Behandlung"
        reverse={true}
        prices={[
          ["Zornesfalte", "CHF 150.-"],
          ["Stirnfalten", "CHF 150.-"],
          ["Krähenfüße", "CHF 150.-"],
          ["Mundwinkel", "CHF 150.-"],
          ["Lipflip", "CHF 150.-"],
          ["Erdbeerkinn", "CHF 150.-"],
          ["Bunny Lines", "CHF 150.-"],
          ["Browlift", "CHF 150.-"],
          ["Baby BTX", "CHF 150.-"],
          ["Migräne", "CHF 299.-"],
          ["Schweißdrüsenbehandlung", "CHF 350.-"],
          ["Face Slimming / Verschmälerung", "CHF 389.-"],
          ["Masseter / Zähneknirschen", "CHF 400.-"],
        ]}
      />

      {/* 3 — Fettreduktion */}
      <PriceSection
        eyebrow="KÖRPERBEHANDLUNG"
        title="Fettreduktion"
        description="Die Injektionslipolyse löst hartnäckige Fettpolster gezielt und schonend auf. Mit phosphatidylcholinhaltigen Wirkstoffen werden Fettzellen dauerhaft abgebaut – ganz ohne Operation, Vollnarkose oder lange Ausfallzeiten."
        bullets={[
          "HARTNÄCKIGE FETTPOLSTER REDUZIEREN",
          "OHNE OPERATION",
          "DAUERHAFTER EFFEKT",
        ]}
        imageSrc="/assets/images/treatment-img.png"
        imageAlt="Fettreduktion Behandlung"
        reverse={false}
        prices={[
          ["Kleine Zone", "CHF 279.-"],
          ["Mittlere Zone", "CHF 400.-"],
          ["Große Zone", "CHF 600.-"],
        ]}
      />

      {/* 4 — HIFU */}
      <PriceSection
        eyebrow="HAUTSTRAFFUNG"
        title="HIFU"
        description="High Intensity Focused Ultrasound (HIFU) stimuliert die Kollagenproduktion tief im Gewebe und strafft die Haut ohne Nadeln und ohne Ausfallzeiten. Sichtbare Lifting-Effekte, die sich über Monate weiterentwickeln."
        bullets={[
          "NICHT-INVASIVES LIFTING",
          "KOLLAGEN STIMULIEREN",
          "LANGANHALTEND STRAFF",
        ]}
        imageSrc="/assets/images/nachher_hifu.jpeg"
        imageAlt="HIFU Hautstraffung"
        reverse={true}
        prices={[
          ["Kleine Bereiche (z. B. Browlift)", "CHF 249.-"],
          ["Hals", "CHF 449.-"],
          ["Dekolleté", "CHF 449.-"],
          ["Kinnlinie / Doppelkinn", "CHF 449.-"],
          ["Wangen & Kinnlinie", "CHF 449.-"],
          ["Oberarme", "CHF 499.-"],
          ["Oberschenkel", "CHF 499.-"],
          ["Bauch", "CHF 499.-"],
        ]}
      />

      {/* 5 — PRP */}
      <PriceSection
        eyebrow="EIGENBLUTTHERAPIE"
        title="PRP"
        description="Platelet Rich Plasma (PRP) nutzt die körpereigenen Wachstumsfaktoren aus Ihrem Blut zur natürlichen Regeneration. Die Behandlung fördert die Kollagenbildung, verbessert die Hautstruktur und wirkt revitalisierend – ganz ohne Fremdstoffe."
        bullets={[
          "KÖRPEREIGENE REGENERATION",
          "100% NATÜRLICH",
          "HAUT & HAARE REVITALISIEREN",
        ]}
        imageSrc="/assets/images/about2.png"
        imageAlt="PRP Eigenbluttherapie"
        reverse={false}
        prices={[
          ["PRP Gesicht (Vampire Lifting)", "CHF 400.-"],
          ["PRP Haare", "CHF 450.-"],
        ]}
      />

      {/* 6 — Hautregeneration & Biostimulatoren */}
      <PriceSection
        eyebrow="BIOSTIMULATOREN"
        title="Hautregeneration"
        description="Modernste Biostimulatoren und Skinbooster wie Profhilo®, Polynukleotide und NCTF aktivieren die Hauterneuerung von innen. Sie verbessern Elastizität, Feuchtigkeit und Leuchtkraft für eine nachhaltig jugendliche Haut."
        bullets={[
          "TIEFE FEUCHTIGKEITSVERSORGUNG",
          "ELASTIZITÄT VERBESSERN",
          "HAUTERNEUERUNG AKTIVIEREN",
        ]}
        imageSrc="/assets/images/contact-img.png"
        imageAlt="Hautregeneration Behandlung"
        reverse={true}
        prices={[
          ["BCN Revita HA", "CHF 199.-"],
          ["Mesotherapie", "CHF 199.-"],
          ["Skinbooster Aknenarben", "CHF 259.-"],
          ["Skinbooster Gesicht", "CHF 299.-"],
          ["Fillmed NCTF 135 HA", "CHF 300.-"],
          ["Profhilo Gesicht", "CHF 349.-"],
          ["Profhilo Hals", "CHF 349.-"],
          ["Profhilo Dekolleté", "CHF 349.-"],
          ["Profhilo Hände", "CHF 349.-"],
          ["Polynukleotide Eyes", "CHF 359.-"],
          ["Polynukleotide Gesicht", "CHF 400.-"],
          ["Profhilo Kombi Gesicht / Hals / Dekolleté", "CHF 799.-"],
        ]}
      />

      {/* 7 — Microneedling */}
      <PriceSection
        eyebrow="MICRONEEDLING"
        title="Microneedling"
        description="Microneedling stimuliert durch feinste Mikrokanäle die natürliche Kollagenproduktion und verbessert Hautstruktur, Poren und Narben. In Kombination mit PRP, Skinboostern oder Exosomen werden die Ergebnisse deutlich intensiviert."
        bullets={[
          "KOLLAGEN AUFBAUEN",
          "POREN VERFEINERN",
          "NARBEN REDUZIEREN",
        ]}
        imageSrc="/assets/images/about1.png"
        imageAlt="Microneedling Behandlung"
        reverse={false}
        prices={[
          ["Microneedling Gesicht", "CHF 279.-"],
          ["Microneedling mit PRP", "CHF 379.-"],
          ["Microneedling mit Skinbooster", "CHF 379.-"],
          ["Microneedling mit Exosomen", "CHF 399.-"],
          ["RF-Microneedling Gesicht", "CHF 299.-"],
          ["RF-Microneedling Gesicht, Hals & Dekolleté", "CHF 399.-"],
          ["RF-Microneedling Bauch", "CHF 230.-"],
        ]}
      />

      {/* 8 — Gesichtsbehandlungen */}
      <PriceSection
        eyebrow="MEDIZINISCHE KOSMETIK"
        title="Gesichtsbehandlungen"
        description="Unsere professionellen Gesichtsbehandlungen vereinen modernste Technologie mit individueller Hautpflege. Von HydraFacial über unsere exklusiven Skinbloom Signature Treatments bis hin zu Dermalogica – für jeden Hauttyp die perfekte Lösung."
        bullets={[
          "INDIVIDUELLE HAUTPFLEGE",
          "SOFORTIGE GLOW-WIRKUNG",
          "PROFESSIONELLE TECHNOLOGIE",
        ]}
        imageSrc="/assets/images/cosmetic.png"
        imageAlt="Gesichtsbehandlungen"
        reverse={true}
        prices={[
          ["HydraFacial Basic", "CHF 189.-"],
          ["HydraFacial Deluxe", "CHF 199.-"],
          ["HydraFacial Platinum", "CHF 229.-"],
          ["Oxygen Behandlung", "CHF 300.-"],
          ["Skinbloom Signature Cleanse", "CHF 219.-"],
          ["Skinbloom Signature Peel", "CHF 230.-"],
          ["Skinbloom Signature Glow", "CHF 449.-"],
          ["Skinbloom Signature Lift", "CHF 449.-"],
          ["Skinbloom Signature Contour", "CHF 499.-"],
          ["Fruchtsäurepeeling Gesicht", "CHF 199.-"],
          ["Fruchtsäurepeeling Gesicht & Hals", "CHF 219.-"],
          ["Dermalogica Lunch Time Express", "CHF 150.-"],
          ["Dermalogica Detox & Relax", "CHF 179.-"],
          ["Dermalogica Anti-Aging Collagen Lift", "CHF 449.-"],
        ]}
      />

      {/* 9 — Hylase & Vitamin Infusion */}
      <section className="ps-section ps-section--small">
        <div className="ps-info-row container">
          <div className="ps-img-col">
            <img
              src="/assets/images/me.jpeg"
              alt="Weitere Behandlungen"
              className="ps-img"
            />
          </div>
          <div className="ps-content-col">
            <span className="ps-eyebrow">WEITERE LEISTUNGEN</span>
            <h2 className="ps-title">Infusionen</h2>
            <div className="ps-divider" />
            <ul className="ps-bullets">
              <li>KORREKTUREN & AUFLÖSUNG</li>
              <li>VITAMIN-INFUSIONSTHERAPIE</li>
            </ul>
            <p className="ps-description">
              Unsere maßgeschneiderte Vitamin-Infusionstherapie versorgt den Körper direkt mit essenziellen Nährstoffen für mehr Energie und Vitalität.
            </p>
            <BookingButton />
          </div>
        </div>
        <div className="ps-prices-wrap">
          <div className="container">
            <p className="ps-prices-label">PREISE:</p>
            <div className="ps-prices-grid">
              <div className="ps-price-item">
                <span className="ps-price-name">Vitamin Infusion / Infusionstherapie</span>
                <span className="ps-price-val">CHF 129.-</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="ps-cta">
        <div className="container text-center">
          <span className="ps-eyebrow d-block mb-3">{t("ctaTitle").toUpperCase()}</span>
          <h2 className="ps-cta-title">TERMIN VEREINBAREN</h2>
          <p className="ps-cta-sub mt-3 mb-4">{t("ctaSubtitle")}</p>
          <BookingButton />
          <p className="ps-hint mt-4">{t("hint")}</p>
        </div>
      </section>
    </main>
  );
}

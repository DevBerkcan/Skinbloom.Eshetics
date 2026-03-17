"use client";

import Modal from "react-bootstrap/Modal";
import BookingButton from "../../BookingButton/BookingButton";
import { useTranslations } from "next-intl";

function PriceRow({ name, price }) {
  return (
    <div className="preisliste-row">
      <span className="preisliste-name">{name}</span>
      <span className="preisliste-preis">{price}</span>
    </div>
  );
}

function PriceRowGroup({ name, subitems, price }) {
  return (
    <div className="preisliste-row preisliste-row--group">
      <div>
        <span className="preisliste-name">{name}</span>
        <ul className="preisliste-subitems">
          {subitems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <span className="preisliste-preis">{price}</span>
    </div>
  );
}

function Preisliste({ isOpen, handleClose }) {
  const t = useTranslations("modals.preisliste");

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      dialogClassName="modal-lg"
      aria-labelledby="preisliste-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="preisliste-modal-title" className="w-100 text-center fs-2 font-playfair">
          {t("title")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="preisliste-body">

        {/* KATEGORIE 1 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Hyaluron</h5>
          <div className="preisliste-divider" />
          <PriceRow name="Hyaluron 1 ml" price="CHF 249.-" />
          <PriceRow name="Lippenaufbau / Lippenunterspritzung" price="CHF 249.-" />
          <PriceRow name="Jawline" price="CHF 249.-" />
          <PriceRow name="Kinnaufbau" price="CHF 249.-" />
          <PriceRow name="Wangenaufbau" price="CHF 249.-" />
          <PriceRow name="Nasolabialfalte" price="CHF 249.-" />
          <PriceRow name="Russian Lips" price="CHF 299.-" />
          <PriceRow name="Augenringe" price="CHF 299.-" />
        </div>

        {/* KATEGORIE 2 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Botox®️ Behandlungen</h5>
          <div className="preisliste-divider" />
          <PriceRow name="Zornesfalte" price="CHF 150.-" />
          <PriceRow name="Stirnfalten" price="CHF 150.-" />
          <PriceRow name="Krähenfüße" price="CHF 150.-" />
          <PriceRow name="Mundwinkel" price="CHF 150.-" />
          <PriceRow name="Lipflip" price="CHF 150.-" />
          <PriceRow name="Erdbeerkinn" price="CHF 150.-" />
          <PriceRow name="Bunny Lines" price="CHF 150.-" />
          <PriceRow name="Browlift" price="CHF 150.-" />
          <PriceRow name="Baby BTX" price="CHF 150.-" />
          <PriceRow name="Migräne" price="CHF 299.-" />
          <PriceRow name="Schweißdrüsenbehandlung" price="CHF 350.-" />
          <PriceRow name="Face Slimming / Verschmälerung" price="CHF 389.-" />
          <PriceRow name="Masseter / Zähneknirschen" price="CHF 400.-" />
        </div>

        {/* KATEGORIE 3 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Fettreduktion - Fettwegspritze (Injektionslipolyse)</h5>
          <div className="preisliste-divider" />
          <PriceRowGroup
            name="Fettwegspritze (Injektionslipolyse)"
            subitems={[
              "Kleine Zone - CHF 279.-",
              "Mittlere Zone - CHF 400.-",
              "Große Zone - CHF 600.-",
            ]}
            price=""
          />
        </div>

        {/* KATEGORIE 4 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">HIFU - Hautstraffung</h5>
          <div className="preisliste-divider" />
          <PriceRowGroup
            name="HIFU - Hautstraffung"
            subitems={[
              "Kleine Bereiche (z. B. Browlift) - CHF 249.-",
              "Hals - CHF 449.-",
              "Dekolleté - CHF 449.-",
              "Kinnlinie / Doppelkinn - CHF 449.-",
              "Wangen & Kinnlinie - CHF 449.-",
              "Oberarme - CHF 499.-",
              "Oberschenkel - CHF 499.-",
              "Bauch - CHF 499.-",
            ]}
            price=""
          />
        </div>

        {/* KATEGORIE 5 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">PRP / Eigenbluttherapie</h5>
          <div className="preisliste-divider" />
          <PriceRow name="PRP Gesicht (Vampire Lifting)" price="CHF 400.-" />
          <PriceRow name="PRP Haare" price="CHF 450.-" />
        </div>

        {/* KATEGORIE 6 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Hautregeneration &amp; Biostimulatoren</h5>
          <div className="preisliste-divider" />
          <PriceRow name="BCN Revita HA" price="CHF 199.-" />
          <PriceRow name="Mesotherapie" price="CHF 199.-" />
          <PriceRow name="Skinbooster Aknenarben" price="CHF 259.-" />
          <PriceRow name="Skinbooster Gesicht" price="CHF 299.-" />
          <PriceRow name="Fillmed NCTF 135 HA" price="CHF 300.-" />
          <PriceRow name="Profhilo Gesicht" price="CHF 349.-" />
          <PriceRow name="Profhilo Hals" price="CHF 349.-" />
          <PriceRow name="Profhilo Dekolleté" price="CHF 349.-" />
          <PriceRow name="Profhilo Hände" price="CHF 349.-" />
          <PriceRow name="Polynukleotide Eyes" price="CHF 359.-" />
          <PriceRow name="Polynukleotide Gesicht" price="CHF 400.-" />
          <PriceRow name="Profhilo Kombi Gesicht / Hals / Dekolleté" price="CHF 799.-" />
        </div>

        {/* KATEGORIE 7 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Microneedling &amp; RF-Microneedling</h5>
          <div className="preisliste-divider" />
          <PriceRow name="Microneedling Gesicht" price="CHF 279.-" />
          <PriceRow name="Microneedling mit PRP" price="CHF 379.-" />
          <PriceRow name="Microneedling mit Skinbooster" price="CHF 379.-" />
          <PriceRow name="Microneedling mit Exosomen" price="CHF 399.-" />
          <PriceRowGroup
            name="Radiofrequenz-Microneedling"
            subitems={[
              "Gesicht - CHF 299.-",
              "Gesicht, Hals & Dekolleté - CHF 399.-",
              "Bauch - CHF 230.-",
            ]}
            price=""
          />
        </div>

        {/* KATEGORIE 8 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Gesichtsbehandlungen</h5>
          <div className="preisliste-divider" />
          <PriceRowGroup
            name="HydraFacial"
            subitems={[
              "HydraFacial Basic - CHF 189.-",
              "HydraFacial Deluxe - CHF 199.-",
              "HydraFacial Platinum - CHF 229.-",
            ]}
            price=""
          />
          <PriceRow name="Oxygen Behandlung" price="CHF 300.-" />
          <PriceRowGroup
            name="Skinbloom Signature Gesichtsbehandlungen"
            subitems={[
              "Skinbloom Signature Cleanse - CHF 219.-",
              "Skinbloom Signature Peel - CHF 230.-",
              "Skinbloom Signature Glow - CHF 449.-",
              "Skinbloom Signature Lift - CHF 449.-",
              "Skinbloom Signature Contour - CHF 499.-",
            ]}
            price=""
          />
          <PriceRowGroup
            name="Fruchtsäurepeeling Behandlungen"
            subitems={[
              "Fruchtsäurepeeling Gesicht - CHF 199.-",
              "Fruchtsäurepeeling Rücken - CHF 199.-",
              "Fruchtsäurepeeling Gesicht & Hals - CHF 219.-",
              "Fruchtsäurepeeling Gesicht, Hals & Dekolleté - CHF 229.-",
            ]}
            price=""
          />
          <PriceRowGroup
            name="Dermalogica - Individuelle Gesichtsbehandlungen"
            subitems={[
              "Lunch Time Express Facial - CHF 150.-",
              "Detox & Relax - CHF 179.-",
              "Luxury Glow Premium - CHF 179.-",
              "Anti-Aging Collagen Lift - CHF 449.-",
            ]}
            price=""
          />
        </div>

        {/* KATEGORIE 9 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Hylase - Hyaluron auflösen</h5>
          <div className="preisliste-divider" />
          <PriceRow name="Hylase" price="CHF 150.-" />
        </div>

        {/* KATEGORIE 10 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Vitamin Infusion / Infusionstherapie</h5>
          <div className="preisliste-divider" />
          <PriceRow name="Vitamin Infusion" price="CHF 129.-" />
        </div>

        <div className="d-flex justify-content-center mt-4">
          <BookingButton className="fs-5" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Preisliste;

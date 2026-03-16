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
          <h5 className="preisliste-kat-title">Hyaluron &amp; Injectables</h5>
          <div className="preisliste-divider" />
          <PriceRowGroup
            name="Hyaluron"
            subitems={["Jawline", "Kinn-Aufbau", "Augenringe", "Lippenfalten", "Lippenunterspritzung", "Russian Lips", "Marionettenfalte", "Wangenaufbau", "Nasolabialfalte"]}
            price="ab CHF 249.-"
          />
          <PriceRowGroup
            name="Botox®️"
            subitems={[
              "Zornesfalte - CHF 150.-",
              "Stirnfalten - CHF 150.-",
              "Krähenfüße - CHF 150.-",
              "Mundwinkel - CHF 150.-",
              "Lipflip - CHF 150.-",
              "Erdbeerkinn - CHF 150.-",
              "Bunny Lines - CHF 150.-",
              "Browlift - CHF 150.-",
              "Baby BTX - CHF 150.-",
              "Migräne - CHF 299.-",
              "Schweißdrüsenbehandlung - CHF 350.-",
              "Face Slimming / Verschmälerung - CHF 389.-",
              "Masseter / Zähneknirschen - CHF 400.-",
            ]}
            price=""
          />
          <PriceRow name="Hylase" price="ab CHF 150.-" />
          <PriceRow name="Mesotherapie" price="ab CHF 199.-" />
          <PriceRow name="Polynukleotide (PDRN)" price="CHF 399.-" />
          <PriceRow name="Skinbooster" price="ab CHF 199.-" />
          <PriceRow name="Profhilo" price="CHF 349.-" />
          <PriceRow name="Fettwegspritze" price="CHF 200.-" />
        </div>

        {/* KATEGORIE 2 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Bluttherapie &amp; Infusion</h5>
          <div className="preisliste-divider" />
          <PriceRow name="PRP bei Haarausfall / Eigenbluttherapie" price="ab CHF 450.-" />
          <PriceRow name="Vampire Lifting / PRP inkl. Maske 60 Min" price="ab CHF 450.-" />
          <PriceRow name="Infusionstherapie" price="ab CHF 129.-" />
        </div>

        {/* KATEGORIE 3 */}
        <div className="preisliste-kategorie">
          <h5 className="preisliste-kat-title">Apparative Behandlungen</h5>
          <div className="preisliste-divider" />
          <PriceRowGroup
            name="Radiofrequenz-Microneedling"
            subitems={["Gesicht – CHF 299.-", "Gesicht, Hals, Dekolleté – CHF 399.-"]}
            price=""
          />
          <PriceRow name="BioPeelX Gesicht inkl. Maske 60 Min" price="ab CHF 170.-" />
          <PriceRowGroup
            name="HydraFacial"
            subitems={["Basic – CHF 189.-", "MD – CHF 199.-", "Deluxe – CHF 229.-"]}
            price=""
          />
        </div>

        <div className="d-flex justify-content-center mt-4">
          <BookingButton className="fs-5" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Preisliste;

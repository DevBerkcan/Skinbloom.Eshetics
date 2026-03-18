"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Botox({ isOpen, handleClose }) {
  const t = useTranslations("treatments");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="modal-body">
          <h2 className="modal-title">{t("botox.modalTitle")}</h2>
          <p className="modal-description">{t("botox.modalDescription")}</p>
        </div>
      </div>
    </div>
  );
}

export default Botox;

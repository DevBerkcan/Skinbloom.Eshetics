"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt, faPhone, faEnvelope, faComments, faShieldHeart } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";
import { useLocale, useTranslations } from "next-intl";

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="contact-field-error">{message}</p>
  );
}

function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const schema = useMemo(
    () =>
      z.object({
        fname: z.string().min(2, t("validation.firstNameMin")),
        lname: z.string().min(2, t("validation.lastNameMin")),
        email: z.string().email(t("validation.emailInvalid")),
        phone: z
          .string()
          .min(1, t("validation.phoneRequired"))
          .refine((v) => /^[+\d][\d\s\-().]{6,19}$/.test(v.trim()), t("validation.phoneInvalid")),
        treatment: z.string().optional(),
        content: z
          .string()
          .min(10, t("validation.messageMin"))
          .max(1000, t("validation.messageMax")),
        privacyAccepted: z.literal(true, {
          errorMap: () => ({ message: t("validation.privacyRequired") }),
        }),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      treatment: "",
      content: "",
      privacyAccepted: false,
    },
  });

  const contentValue = watch("content", "");

  const formatPhoneInput = (value) => {
    let nextValue = value.replace(/[^\d+\s\-().]/g, "");
    nextValue = nextValue.replace(/\s{2,}/g, " ");

    if (nextValue.startsWith("00")) {
      nextValue = `+${nextValue.slice(2)}`;
    }

    return nextValue;
  };

  const onSubmit = async (data) => {
    const normalizedData = {
      ...data,
      phone: data.phone.replace(/\s+/g, " ").trim(),
    };

    setLoading(true);
    setSubmitSuccess("");
    setSubmitError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedData),
      });
      const payload = await res.json().catch(() => null);

      if (res.ok && res.status === 200) {
        setSubmitSuccess(t("alerts.successText"));
        reset();
      } else {
        let errorMessage = t("alerts.errorText");

        if (res.status === 400) {
          errorMessage = t("alerts.invalidRequestText");
        } else if (payload?.code === "mail_config_missing") {
          errorMessage = t("alerts.serverUnavailableText");
        } else if (payload?.message) {
          errorMessage = payload.message;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitError(error?.message || t("alerts.errorText"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact my-5 pt-5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <span className="section-eyebrow">KONTAKT</span>
          <h2 className="title">{t("title")}</h2>
        </motion.div>
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
            {submitError && (
              <div className="contact-inline-error" role="alert" aria-live="assertive">
                <strong>{t("alerts.errorTitle")}</strong>
                <span>{submitError}</span>
              </div>
            )}
            {submitSuccess && (
              <div className="contact-inline-success" role="status" aria-live="polite">
                <strong>{t("alerts.successTitle")}</strong>
                <span>{submitSuccess}</span>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="row mb-4 g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className={`form-control${errors.fname ? " is-invalid" : ""}`}
                    placeholder={t("form.firstName")}
                    {...register("fname")}
                  />
                  <FieldError message={errors.fname?.message} />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className={`form-control${errors.lname ? " is-invalid" : ""}`}
                    placeholder={t("form.lastName")}
                    {...register("lname")}
                  />
                  <FieldError message={errors.lname?.message} />
                </div>
              </div>
              <div className="row mb-4 g-3">
                <div className="col-md-6">
                  <input
                    type="email"
                    className={`form-control${errors.email ? " is-invalid" : ""}`}
                    placeholder={t("form.email")}
                    {...register("email")}
                  />
                  <FieldError message={errors.email?.message} />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    className={`form-control${errors.phone ? " is-invalid" : ""}`}
                    placeholder={t("form.phone")}
                    {...register("phone", {
                      onChange: (event) => {
                        event.target.value = formatPhoneInput(event.target.value);
                      },
                    })}
                  />
                  <FieldError message={errors.phone?.message} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <select
                    className="form-select"
                    {...register("treatment")}
                  >
                    <option value="">{t("form.treatmentPlaceholder")}</option>
                    <optgroup label={t("form.groupHyaluron")}>
                      {t.raw("form.hyaluronOptions").map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </optgroup>
                    <optgroup label={t("form.groupWeitere")}>
                      {t.raw("form.weitereOptions").map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </optgroup>
                    <optgroup label={t("form.groupKosmetik")}>
                      {t.raw("form.kosmetikOptions").map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <textarea
                    className={`form-control${errors.content ? " is-invalid" : ""}`}
                    placeholder={t("form.message")}
                    maxLength={1000}
                    rows={5}
                    {...register("content")}
                  />
                  <div className="contact-meta-row">
                    <FieldError message={errors.content?.message} />
                    <span className={`contact-char-count${contentValue.length > 900 ? " contact-char-count--warning" : ""}`}>
                      {contentValue.length}/1000
                    </span>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-check contact-privacy-check">
                    <input
                      className="form-check-input contact-privacy-input"
                      type="checkbox"
                      id="privacyAccepted"
                      {...register("privacyAccepted")}
                    />
                    <label className="form-check-label contact-privacy-label" htmlFor="privacyAccepted">
                      {t("form.privacy")}{" "}
                      <Link href={`/${locale}/datenschutzrichtlinien`}>{t("form.privacyLink")}</Link>{" "}
                      {t("form.privacySuffix")}
                    </label>
                  </div>
                  <FieldError message={errors.privacyAccepted?.message} />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <button type="submit" className="bg-green btn-submit" disabled={loading} aria-busy={loading}>
                    {loading ? <Loader /> : t("form.submit")}
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>

          <div className="col-lg-5 mt-4 mt-lg-0">
            <div className="contact-side-card">
              <div className="contact-badge-row contact-badge-row--dark">
                <span className="contact-mini-badge contact-mini-badge--dark">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
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
                  <FontAwesomeIcon icon={faClock} className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">{t("info.openingHoursLabel")}</p>
                    <p className="contact-info-value">{t("info.openingHoursValue")}</p>
                  </div>
                </div>
                <div className="contact-info-item contact-info-item--card">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">{t("info.addressLabel")}</p>
                    <p className="contact-info-value">{t("info.addressValue")}</p>
                  </div>
                </div>
                <div className="contact-info-item contact-info-item--card">
                  <FontAwesomeIcon icon={faPhone} className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">{t("info.phoneLabel")}</p>
                    <a href="tel:+41782418704" className="contact-info-value contact-info-link">+41 78 241 87 04</a>
                  </div>
                </div>
                <div className="contact-info-item contact-info-item--card">
                  <FontAwesomeIcon icon={faEnvelope} className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">{t("info.emailLabel")}</p>
                    <a href="mailto:info@skinbloom-aesthetics.ch" className="contact-info-value contact-info-link">info@skinbloom-aesthetics.ch</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-info-row">
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faClock} className="contact-info-icon" />
            <div>
              <p className="contact-info-label">{t("info.openingHoursLabel")}</p>
              <p className="contact-info-value">{t("info.openingHoursValue")}</p>
            </div>
          </div>
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-info-icon" />
            <div>
              <p className="contact-info-label">{t("info.addressLabel")}</p>
              <p className="contact-info-value">{t("info.addressValue")}</p>
            </div>
          </div>
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faPhone} className="contact-info-icon" />
            <div>
              <p className="contact-info-label">{t("info.phoneLabel")}</p>
              <a href="tel:+41782418704" className="contact-info-value contact-info-link">+41 78 241 87 04</a>
            </div>
          </div>
          <div className="contact-info-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-info-icon" />
            <div>
              <p className="contact-info-label">{t("info.emailLabel")}</p>
              <a href="mailto:info@skinbloom-aesthetics.ch" className="contact-info-value contact-info-link">info@skinbloom-aesthetics.ch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

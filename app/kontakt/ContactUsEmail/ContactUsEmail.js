"use client";

import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useTranslations } from "next-intl";

function ContactUsEmail() {
  const t = useTranslations("contact.form");
  const tAlerts = useTranslations("contact.alerts");
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");
    setSubmitSuccess("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = await res.json().catch(() => null);

      if (res.ok && res.status === 200) {
        setSubmitSuccess(tAlerts("successText"));
        setFormData({ fname: "", lname: "", email: "", phone: "", content: "" });
      } else {
        let errorMessage = tAlerts("errorText");

        if (res.status === 400) {
          errorMessage = tAlerts("invalidRequestText");
        } else if (payload?.code === "mail_config_missing") {
          errorMessage = tAlerts("serverUnavailableText");
        } else if (payload?.message) {
          errorMessage = payload.message;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitError(error?.message || tAlerts("errorText"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitError && (
        <div className="contact-inline-error mb-4" role="alert" aria-live="assertive">
          <strong>{tAlerts("errorTitle")}</strong>
          <span>{submitError}</span>
        </div>
      )}
      {submitSuccess && (
        <div className="contact-inline-success mb-4" role="status" aria-live="polite">
          <strong>{tAlerts("successTitle")}</strong>
          <span>{submitSuccess}</span>
        </div>
      )}
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            name="fname"
            className="form-control"
            placeholder={t("firstName")}
            value={formData.fname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="lname"
            className="form-control"
            placeholder={t("lastName")}
            value={formData.lname}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder={t("email")}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col">
          <input
            type="tel"
            name="phone"
            className="form-control"
            placeholder={t("phone")}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <textarea
            name="content"
            className="form-control"
            placeholder={t("message")}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <button type="submit" className="bg-green btn-submit" disabled={loading} aria-busy={loading}>
            {loading ? <Loader /> : t("submit")}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ContactUsEmail;

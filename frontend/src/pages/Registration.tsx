import styles from './Auth.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authClient } from "../lib/authClient";
import { useTranslation } from "react-i18next";

export default function Registration() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    if (password !== confirmPassword) {
      setError(t("passwordsMismatch"));
      return;
    }

    const { error } = await authClient.signUp.email({ name, email, password });

    if (error) {
      setError(error.message ?? t("unknownError"));
      return;
    }

    navigate('/');
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{t("createAccount")}</h2>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label className={styles.label}>{t("username")}</label>
          <input
            name="name"
            type="text"
            placeholder={t("usernamePlaceholder")}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("email")}</label>
          <input
            name="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("password")}</label>
          <input
            name="password"
            type="password"
            placeholder={t("passwordPlaceholder")}
            className={styles.input}
            required
            minLength={8}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("confirmPassword")}</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder={t("passwordPlaceholder")}
            className={styles.input}
            required
            minLength={8}
          />
        </div>

        <button className={styles.btn} type="submit">
          {t("registerButton")}
        </button>

        <p className={styles.footer}>
          {t("haveAccount")}{" "}
          <Link to="/login" className={styles.link}>
            {t("signIn")}
          </Link>
        </p>
      </form>
    </div>
  );
}
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authClient } from "../lib/authClient";
import { useTranslation } from "react-i18next";
import styles from './Auth.module.css';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setError(error.message || t("authError"));
      return;
    }

    navigate('/');
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{t("signIn")}</h2>

        {error && <p className={styles.error}>{error}</p>}

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

        <button className={styles.btn} type="submit">
          {t("signInButton")}
        </button>

        <p className={styles.footer}>
          {t("noAccount")}{" "}
          <Link to="/registration" className={styles.link}>
            {t("register")}
          </Link>
        </p>
      </form>
    </div>
  );
}
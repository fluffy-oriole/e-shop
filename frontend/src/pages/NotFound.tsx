import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <section className={styles.notFound}>
            <div className={styles.label}>ERROR / 404</div>

            <div className={styles.card}>
                <span className={styles.tag}>
                    {t("pageNotFound")}
                </span>

                <h1 className={styles.title}>
                    {t("pageNotFoundTitle")}
                </h1>

                <p className={styles.description}>
                    {t("pageNotFoundDescription")}
                </p>

                <Link
                    to="/home"
                    className={styles.link}
                >
                    ← {t("backToHome")}
                </Link>
            </div>
        </section>
    );
}
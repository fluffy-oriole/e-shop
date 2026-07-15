import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './OrderSuccess.module.css';

export default function OrderSuccess() {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>{t("orderSuccess")}</h1>
                <p className={styles.text}>{t("thanks")}</p>
                <Link to="/" className={styles.homeLink}>
                    {t("goHome")}
                </Link>
            </div>
        </div>
    );
}
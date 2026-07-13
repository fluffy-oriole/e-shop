import { Link } from 'react-router-dom';
import styles from './OrderSuccess.module.css';
import { useTranslation } from 'react-i18next';

export default function OrderSuccess() {
    const { i18n } = useTranslation();

    return (
        <div className={styles.container}>
            <h1>{i18n.t("orderSuccess")}</h1>
            <p>{i18n.t("thanks")}</p>
            <Link to="/">{i18n.t("goHome")}</Link>
        </div>
    );
}
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GreenButton from '../components/GreenButton';
import styles from './OrderSuccess.module.css';

export default function OrderSuccess() {
    const { i18n } = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>{i18n.t("orderSuccess")}</h1>
                <p>{i18n.t("thanks")}</p>

                <Link to="/">
                    <GreenButton
                        text={i18n.t("goHome")}
                        onClick={() => {}}
                    />
                </Link>
            </div>
        </div>
    );
}
import styles from './HeroPage.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function HeroPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>{t("heroPageTitle")}</h1>
                <p className={styles.subtitle}>{t("heroPageDescription")}</p>
                <div className={styles.actions}>
                    <button
                        className={styles.primaryBtn}
                        onClick={() => navigate("/catalog")}
                    >
                        {t("goShopping")}
                    </button>
                    <button
                        className={styles.secondaryBtn}
                        onClick={() => navigate("/registration")}
                    >
                        {t("register")}
                    </button>
                </div>
            </div>
        </div>
    );
}
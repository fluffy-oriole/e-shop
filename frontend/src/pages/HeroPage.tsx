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
            <div className={styles.illustration}>
                <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="200" cy="150" r="100" stroke="var(--color-circuit-teal)" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="200" cy="150" r="70" stroke="var(--color-circuit-teal)" strokeWidth="1.5" />
                    <circle cx="200" cy="150" r="8" fill="var(--color-signal-violet)" />
                    <line x1="130" y1="100" x2="170" y2="130" stroke="var(--color-circuit-teal)" strokeWidth="1.5" />
                    <line x1="270" y1="100" x2="230" y2="130" stroke="var(--color-circuit-teal)" strokeWidth="1.5" />
                    <line x1="130" y1="200" x2="170" y2="170" stroke="var(--color-circuit-teal)" strokeWidth="1.5" />
                    <line x1="270" y1="200" x2="230" y2="170" stroke="var(--color-circuit-teal)" strokeWidth="1.5" />
                    <circle cx="130" cy="100" r="4" fill="var(--color-circuit-teal)" />
                    <circle cx="270" cy="100" r="4" fill="var(--color-circuit-teal)" />
                    <circle cx="130" cy="200" r="4" fill="var(--color-circuit-teal)" />
                    <circle cx="270" cy="200" r="4" fill="var(--color-circuit-teal)" />
                    <rect x="184" y="134" width="32" height="32" rx="6" stroke="var(--color-circuit-teal)" strokeWidth="1.5" />
                    <path d="M192 150L200 142L208 150" stroke="var(--color-signal-violet)" strokeWidth="1.5" />
                </svg>
            </div>
        </div>
    );
}
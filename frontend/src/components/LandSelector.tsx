import styles from './LangSelector.module.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [langOpen, setLangOpen] = useState(false);
    const currentLang = i18n.language.toUpperCase();

    function handleLangSelect(lang: string) {
        i18n.changeLanguage(lang.toLowerCase());
        setLangOpen(false);
    }

    return (
        <div className={styles.selector}>
            <button
                className={styles.trigger}
                onClick={() => setLangOpen(!langOpen)}
                type="button"
            >
                <span className={styles.langText}>{currentLang}</span>
                <ChevronDown size={14} className={`${styles.chevron} ${langOpen ? styles.chevronOpen : ''}`} />
            </button>

            {langOpen && (
                <div className={styles.dropdown}>
                    <button
                        className={`${styles.option} ${currentLang === 'RU' ? styles.activeOption : ''}`}
                        onClick={() => handleLangSelect('RU')}
                    >
                        RU
                    </button>
                    <button
                        className={`${styles.option} ${currentLang === 'EN' ? styles.activeOption : ''}`}
                        onClick={() => handleLangSelect('EN')}
                    >
                        EN
                    </button>
                </div>
            )}
        </div>
    );
}
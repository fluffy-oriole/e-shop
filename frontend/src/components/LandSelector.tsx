import styles from './LangSelector.module.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function LanguageSelector() {
    const { i18n } = useTranslation();

    const [langOpen, setLangOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('RU');

    function handleLangSelect(lang: string) {
        setCurrentLang(lang);
        i18n.changeLanguage(lang.toLowerCase());
        setLangOpen(false);
    }

    return (
        <div className={styles.langSelector}>
            <button
                className={styles.langButton}
                onClick={() => setLangOpen(!langOpen)}
            >
                {currentLang}
                {langOpen ? (
                    <ChevronUp size={20} />
                ) : (
                    <ChevronDown size={20} />
                )}
            </button>

            {langOpen && (
                <div className={styles.langDropdown}>
                    <div
                        className={styles.langOption}
                        onClick={() => handleLangSelect('RU')}
                    >
                        RU
                    </div>

                    <div
                        className={styles.langOption}
                        onClick={() => handleLangSelect('EN')}
                    >
                        EN
                    </div>
                </div>
            )}
        </div>
    );
}
import styles from './HeroPage.module.css';
import { useTranslation } from 'react-i18next';

export default function HeroPage() {
    const { i18n } = useTranslation();
    return (
        <>
            <h1>{i18n.t("heroPageTitle")}</h1>
            <button>{i18n.t("register")}</button>
            <button>{i18n.t("goShopping")}</button>
        </>
    )
}
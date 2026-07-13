import styles from './HeroPage.module.css';
import { useTranslation } from 'react-i18next';
import GreenButton from '../components/GreenButton';
import EButton from '../components/EButton';
import indexImg from '../assets/indeximg.jpg';
import { useNavigate } from "react-router-dom";


export default function HeroPage() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    
    return (
        <>
            <div className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>
                        {i18n.t("heroPageTitle")}
                    </h1>

                    <p className={styles.subtitle}>
                        {i18n.t("heroPageDescription")}
                    </p>

                    <div className={styles.actions}>
                        <GreenButton
                            text={i18n.t("goShopping")}
                            onClick={() => {navigate("/home")}}
                        />

                        <EButton
                            text={i18n.t("register")}
                            onClick={() => navigate("/registration")}
                        />
                    </div>
                </div>

                <div className={styles.imageBlock}>
                    <img 
                        className={styles.heroImage}
                        src={indexImg}
                        alt="index image"
                    />
                </div>
            </div>
        </>
    )
}
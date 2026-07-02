import styles from './Profile.module.css';
import { authClient } from "../lib/authClient";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const i18n = useTranslation();
    const navigate = useNavigate();
    const data = authClient.useSession();

    const isLogged = (data.data === null ? false : true);

    if (data.isPending) {
        return (
            <div>Загрузка...</div>
        )
    }
    
    const userData = data.data.user;
    
    function loggingOutHandler() {
        authClient.signOut()
        navigate("/")
    }

    return (
        <div className={styles.mainContainer}>
            {isLogged ? 
            (<><div className={styles.infoBox}>
                <span className={styles.personalInfo}>{ userData.name }</span>
                <span className={styles.personalInfo}>{ userData.email }</span>
                <div className={styles.changePasswordBox}>
                    <div className={styles.privacyBlock}>   
                        <span>Безопасность</span>
                        <span>Изменить пароль</span>
                    </div>
                    <button className={styles.changePasswordButton}>{i18n.t("changePassword")}</button>
                </div>
            </div>
            <button className={styles.logOutBtn} onClick={loggingOutHandler}>{i18n.t("logout")}</button></>)
            :
            (<span>Войдите в аккаунт для того, чтобы просматривать профиль <Link to="/login">{i18n.t("login")}</Link></span>)
        } 
        </div>
    )
}
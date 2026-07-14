import styles from './Profile.module.css';
import { authClient } from "../lib/authClient";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import EButton from '../components/EButton';

export default function Profile() {
    const [isChangePasswordOpened, setPasswordOpened] = useState(false);
    const i18n = useTranslation();
    const navigate = useNavigate();
    const data = authClient.useSession();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const isLogged = (data.data === null ? false : true);

    if (data.isPending) {
        return (
            <div>Загрузка...</div>
        )
    }
    
    if (data.isPending) return <div>Загрузка...</div>;
    if (!data.data) return <div>Вы не вошли в аккаунт</div>;

    const userData = data.data.user;
    
    function loggingOutHandler() {
        authClient.signOut()
        navigate("/")
    }

    async function changePasswordHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (newPassword !== repeatPassword) {
            alert("Пароли не совпадают");
            return;
        }

        const { error } = await authClient.changePassword({ currentPassword, newPassword, });

        if (error) {
            alert(error.message);
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
    }

    function openChangePassword() {
        if (isChangePasswordOpened) {
            setPasswordOpened(false);
        }
        else {
            setPasswordOpened(true);
        }
    }

    return (
        <div className={styles.mainContainer}>
            {isLogged ? 
            (<><div className={styles.infoBox}>
                <span className={styles.personalInfo}>{ userData.name }</span>
                <span className={styles.personalInfo}>{ userData.email }</span>
                {
                    !isChangePasswordOpened &&
                    <div className={styles.changePasswordBox}>
                        <div className={styles.privacyBlock}>   
                            <span>{i18n.t("safety")}</span>
                            <span>{i18n.t("changePassword")}</span>
                        </div>
                        <button className={styles.changePasswordButton} onClick={openChangePassword}>{i18n.t("change")}</button>
                    </div>
                }
                {
                    isChangePasswordOpened &&
                    <form className={styles.changePasswordBlock} onSubmit={changePasswordHandler}>
                        <h3 className={styles.changePasswordTitle}>{i18n.t("changePassword")}</h3>
                        <input type="password" placeholder={i18n.t("currentPassword")} className={styles.passwordInput}
                        onChange={(e) => setCurrentPassword(e.target.value)}/>
                        <input type="password" placeholder={i18n.t("newPassword")} className={styles.passwordInput}
                        onChange={(e) => setNewPassword(e.target.value)}/>
                        <input type="password" placeholder={i18n.t("newPassword")} className={styles.passwordInput}
                        onChange={(e) => setRepeatPassword(e.target.value)}/>
                        <div className={styles.btnLine}>
                            <button type='button' className={`${styles.submitBtn} ${styles.redBtn}`}
                            onClick={openChangePassword}>{i18n.t("cancel")}</button>
                            <button type='submit' className={styles.submitBtn}>{i18n.t("change")}</button>
                        </div>
                    </form>
                }
                
            </div>
            <button className={styles.logOutBtn} onClick={loggingOutHandler}>{i18n.t("logout")}</button></>)
            :
            (<span>Войдите в аккаунт для того, чтобы просматривать профиль <Link to="/login">{i18n.t("login")}</Link></span>)
            }
        </div>
    )
}
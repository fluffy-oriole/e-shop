import styles from './Profile.module.css';
import { authClient } from "../lib/authClient";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Profile() {
    const [isChangePasswordOpened, setPasswordOpened] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const data = authClient.useSession();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const isLogged = (data.data === null ? false : true);

    if (data.isPending) {
        return (
            <div>{t("loading")}</div>
        )
    }
    
    if (data.isPending) return <div>{t("loading")}</div>;
    if (!data.data) return <div>{t("pleaseLogIn")}</div>;

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
        <div className={styles.page}>
            <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                    {userData.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <h1 className={styles.pageTitle}>{t("profile")}</h1>
            </div>

            <div className={styles.card}>
                <div className={styles.infoRow}>
                    <span className={styles.label}>{t("name")}</span>
                    <span className={styles.value}>{userData.name}</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>{t("email")}</span>
                    <span className={styles.value}>{userData.email}</span>
                </div>
            </div>

            <div className={styles.card}>
                <h3 className={styles.sectionTitle}>{t("safety")}</h3>

                {!isChangePasswordOpened ? (
                    <div className={styles.changePasswordBox}>
                        <span className={styles.privacyLabel}>{t("changePassword")}</span>
                        <button
                            className={styles.changeBtn}
                            onClick={openChangePassword}
                        >
                            {t("change")}
                        </button>
                    </div>
                ) : (
                    <form className={styles.changePasswordForm} onSubmit={changePasswordHandler}>
                        <input
                            type="password"
                            placeholder={t("currentPassword")}
                            className={styles.input}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder={t("newPassword")}
                            className={styles.input}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder={t("newPassword")}
                            className={styles.input}
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        <div className={styles.formActions}>
                            <button
                                type="button"
                                className={styles.cancelBtn}
                                onClick={openChangePassword}
                            >
                                {t("cancel")}
                            </button>
                            <button type="submit" className={styles.submitBtn}>
                                {t("change")}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <button className={styles.logoutBtn} onClick={loggingOutHandler}>
                {t("logout")}
            </button>
        </div>
    );
}
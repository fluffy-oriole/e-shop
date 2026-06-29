import styles from './Profile.module.css';
import { authClient } from "../lib/authClient";
import { useTranslation } from 'react-i18next';

export default function Profile() {
    const i18n = useTranslation();
    const data = authClient.useSession();

    if (data.isPending) {
        return (
            <div>Загрузка...</div>
        )
    }

    const userData = data.data.user;
    console.log(userData);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.infoBox}>
                <span className={styles.commonText}>{i18n.t("name")}</span>
                <span className={styles.personalInfo}>{ userData.name }</span>
                <span className={styles.commonText}>{i18n.t("email")}</span>
                <span className={styles.personalInfo}> {userData.email}</span>
                <span>{i18n.t("password")}</span>
                <button className={styles.changePasswordButton}>{i18n.t("changePassword")}</button>
            </div>
            <button className={styles.logOutBtn}>{i18n.t("logout")}</button>
        </div>
    )
}
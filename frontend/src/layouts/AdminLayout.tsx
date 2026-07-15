import styles from './AdminLayout.module.css';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { authClient } from '../lib/authClient';
import { ChevronLeft } from 'lucide-react';


export default function AdminLayout() {
    const { t } = useTranslation();

    const session = authClient.useSession();
    const i18n = useTranslation();

    const isLogged = session.data !== null;
    const isAdmin = session.data?.user.role === "admin";


    if (!isLogged) {
        return <p>{i18n.t("pleaseLogIn")}</p>;
    }

    if (!isAdmin) {
        return <p>{i18n.t("adminOnly")}</p>;
    }
     
    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <Link to="/" className={styles.link}><ChevronLeft size={14}/> {t("goHome")}</Link>
                <Link to="admin/users" className={styles.link}>{t("users")}</Link>
                <Link to="admin/orders" className={styles.link}>{t("orders")}</Link>
                <Link to="admin/carts" className={styles.link}>{t("carts")}</Link>
            </div>
            <div className={styles.contentContainer}>
                <Outlet />
            </div>
        </div>
    )
}
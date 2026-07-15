import styles from './AdminLayout.module.css';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { authClient } from '../lib/authClient';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LanguageSelector from '../components/LandSelector';


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
                <div className={styles.topRow}>   
                    <Link className={styles.link} to={"/"}><ChevronLeft size={16}></ChevronLeft>На сайт</Link>
                    <LanguageSelector />
                </div>
                
                <NavLink 
                    to="/admin/users" 
                    className={({ isActive }) => 
                        isActive ? styles.active_link : styles.link
                    }
                >
                    {t("users")}
                </NavLink>

                <NavLink 
                    to="/admin/orders" 
                    className={({ isActive }) => 
                        isActive ? styles.active_link : styles.link
                    }
                >
                    {t("orders")}
                </NavLink>

                <NavLink 
                    to="/admin/carts" 
                    className={({ isActive }) => 
                        isActive ? styles.active_link : styles.link
                    }
                >
                    {t("carts")}
                </NavLink>
            </div>
            <div className={styles.contentContainer}>
                <Outlet />
            </div>
        </div>
    )
}
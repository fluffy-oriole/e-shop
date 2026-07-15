import styles from './AdminLayout.module.css';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { authClient } from '../lib/authClient';
import { ChevronLeft, User } from 'lucide-react';
import LanguageSelector from '../components/LandSelector';

export default function AdminLayout() {
    const { t } = useTranslation();
    const session = authClient.useSession();

    const isLogged = session.data !== null;
    const isAdmin = session.data?.user.role === "admin";

    if (session.isPending) {
        return (
            <div className={styles.container}>
                <div className={styles.statusMessage}>{t("loading")}</div>
            </div>
        );
    }

    if (!isLogged) {
        return (
            <div className={styles.container}>
                <div className={styles.statusMessage}>
                    <div className={styles.row}>
                        <Link className={styles.backLink} to="/">
                            <User size={16} />
                            {t("login")}
                        </Link>
                        {t("pleaseLogIn")}
                        </div>
                    </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className={styles.container}>
                <div className={styles.statusMessage}>
                    <div className={styles.row}>
                        <Link className={styles.backLink} to="/">
                            <ChevronLeft size={16} />
                            {t("backToSite")}
                        </Link>
                        {t("adminOnly")}
                    </div>
                    </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.topRow}>
                    <Link className={styles.backLink} to="/">
                        <ChevronLeft size={16} />
                        {t("backToSite")}
                    </Link>
                    <LanguageSelector />
                </div>

                <nav className={styles.nav}>
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        {t("users")}
                    </NavLink>

                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        {t("orders")}
                    </NavLink>

                    <NavLink
                        to="/admin/carts"
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        {t("carts")}
                    </NavLink>
                </nav>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
}
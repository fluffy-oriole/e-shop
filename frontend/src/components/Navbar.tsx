import styles from './Navbar.module.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Catalog from './Catalog';
import LanguageSelector from '../components/LandSelector';
import React, { useState } from 'react';
import { authClient } from '../lib/authClient';
import { Menu, Search, ShoppingCart, User, Shield } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const data = authClient.useSession();
    const isLogged = data.data !== null;
    const isAdmin = data.data?.user.role === "admin";
    const { t } = useTranslation();

    const [catalogOpen, setCatalogOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") ?? "");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.set("q", search);
        params.set("page", "1");
        navigate(`/catalog?${params.toString()}`);
    };

    return (
        <div className={styles.navbarWrapper}>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>
                    E-SHOP
                </Link>

                <div className={styles.search}>
                    <button
                        className={styles.catalogBtn}
                        onClick={() => setCatalogOpen(!catalogOpen)}
                        aria-label={t("catalog")}
                    >
                        <Menu size={20} strokeWidth={2} />
                    </button>

                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            type="text"
                            value={search}
                            placeholder={t("search")}
                            className={styles.searchInput}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>

                <div className={styles.rightSide}>
                    {isAdmin && (
                        <Link to="/admin/users" className={styles.iconLink} aria-label={t("admin")}>
                            <Shield size={18} strokeWidth={1.5} />
                        </Link>
                    )}

                    <Link to="/cart" className={styles.iconLink} aria-label={t("cart")}>
                        <ShoppingCart size={18} strokeWidth={1.5} />
                    </Link>

                    {isLogged ? (
                        <Link to="/profile" className={styles.iconLink} aria-label={t("profile")}>
                            <User size={18} strokeWidth={1.5} />
                        </Link>
                    ) : (
                        <Link to="/login" className={styles.loginBtn}>
                            {t("login")}
                        </Link>
                    )}

                    <LanguageSelector />
                </div>
            </nav>

            {catalogOpen && <Catalog />}
        </div>
    );
}
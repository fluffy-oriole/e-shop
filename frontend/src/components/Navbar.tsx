import styles from './Navbar.module.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Catalog from './Catalog';
import LanguageSelector from '../components/LandSelector';
import React, { useState } from 'react';
import { authClient } from '../lib/authClient';
import { Menu } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const data = authClient.useSession();

    const isLogged = data.data !== null;
    const isAdmin = data.data?.user.role === "admin";

    const { i18n } = useTranslation();

    const [catalogOpen, setCatalogOpen] = useState(false);

    function openCatalog() {
        setCatalogOpen(!catalogOpen);
    }

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
        <>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.logo}>
                    E-SHOP
                </Link>

                <div className={styles.search}>
                    <button
                        className={styles.catalogButton}
                        onClick={openCatalog}
                    >
                        <Menu size={30} />
                    </button>

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={search}
                            placeholder={i18n.t("search")}
                            className={styles.searchInput}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>

                <div className={styles.rightSide}>
                    {isAdmin && (
                        <Link to="/admin/users" className={styles.profile}>
                            {i18n.t("admin")}
                        </Link>
                    )}

                    <Link to="/cart" className={styles.profile}>
                        {i18n.t("cart")}
                    </Link>

                    {isLogged ? (
                        <Link to="/profile" className={styles.profile}>
                            {i18n.t("profile")}
                        </Link>
                    ) : (
                        <Link to="/login" className={styles.profile}>
                            {i18n.t("login")}
                        </Link>
                    )}

                    <LanguageSelector />
                </div>
            </nav>

            {catalogOpen && <Catalog />}
        </>
    );
}
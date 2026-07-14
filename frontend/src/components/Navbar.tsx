import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Catalog from './Catalog.tsx';
import React, { useState } from 'react';
import { authClient } from '../lib/authClient';
import { Menu } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const data = authClient.useSession();
  const isLogged = (data.data === null ? false : true);
  const isAdmin = data.data?.user.role === "admin";

  const { i18n } = useTranslation();
  const [catalogOpen, setCatalogOpen] = useState(false);

  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('RU');

  function handleLangSelect(lang: string) {
      setCurrentLang(lang);
      i18n.changeLanguage(lang.toLowerCase());
      setLangOpen(false);
  }

  function openCatalog() {
    setCatalogOpen(!catalogOpen);
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("ent");
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    params.set("q", search);
    params.set("page", "1");
  
    navigate(`/catalog?${params.toString()}`);
  }
  
  return (
    <>
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>E-SHOP</Link>

      <div className={styles.search}>
        <button className={styles.catalogButton} onClick={openCatalog} ><Menu size={30}/></button>
        <form onSubmit={handleSearch}>
        <input type="text" value={search} placeholder={i18n.t("search")} className={styles.searchInput} onChange={(e) => setSearch(e.target.value)}/>
      </form>
      </div>
      

      <div className={styles.rightSide}>
        {isAdmin && 
        <Link to="/admin" className={styles.profile}>
          {i18n.t("admin")}
        </Link>
        }
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
        <div className={styles.langSelector}>
          <button className={styles.langButton} onClick={() => setLangOpen(!langOpen)}>
            {currentLang}
            {langOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {langOpen && (
              <div className={styles.langDropdown}>
                  <div className={styles.langOption} onClick={() => handleLangSelect('RU')}>RU</div>
                  <div className={styles.langOption} onClick={() => handleLangSelect('EN')}>EN</div>
              </div>
          )}
        </div>
      </div>
    </nav>
    {catalogOpen && <Catalog />}
    </>
  );
}
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Catalog from './Catalog.jsx'
import { useState } from 'react'
import { authClient } from "../lib/authClient";

export default function Navbar() {
  
  const data = authClient.useSession();
  const isLogged = (data.data === null ? false : true);

  const { i18n } = useTranslation();
  const [catalogOpen, setCatalogOpen] = useState(false);

  function changeLanguage(event) {
    const selectedLanguage = event.target.value;

    if (selectedLanguage === 'ru') {
      i18n.changeLanguage('ru')
    }
    else if (selectedLanguage === 'en') {
      i18n.changeLanguage('en')
    }
  }

  function openCatalog() {
    setCatalogOpen(!catalogOpen);
  }
  
  return (
    <>
    <nav className={styles.navbar}>
  <Link to="/" className={styles.logo}>
    E-SHOP
  </Link>
  {/*
  <svg className={styles.catalogButton} onClick={openCatalog} width="24" height="24" viewBox="0 0 24 24">
    <path d="../../public/catalog.svg" fill="currentColor" />
  </svg>
  */}
  <button className={styles.catalogButton} onClick={openCatalog} >{i18n.t("catalog")}</button>
  <div className={styles.search}>
    <input type="text" placeholder={i18n.t("search")} className={styles.searchInput}/>
  </div>
  <div className={styles.rightSide}>
    <Link to="/cart" className={styles.profile}>
      {i18n.t("cart")}
    </Link>
    <select className={styles.languageSelect} onChange={changeLanguage}>
      <option value="ru">RU</option>
      <option value="en">EN</option>
    </select>
    {isLogged ? (
      <Link to="/profile" className={styles.profile}>
        {i18n.t("profile")}
      </Link>
    ) : (
      <Link to="/login" className={styles.profile}>
        {i18n.t("login")}
      </Link>
    )}
  </div>
</nav>

{catalogOpen && <Catalog />}
    </>
  );
}
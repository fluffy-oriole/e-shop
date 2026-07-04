import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Catalog from './Catalog.jsx'
import { useState } from 'react'
import { authClient } from '../lib/authClient';
import { Menu } from 'lucide-react';

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
      <Link to="/" className={styles.logo}>E-SHOP</Link>

      <div className={styles.search}>
        <button className={styles.catalogButton} onClick={openCatalog} ><Menu size={30}/></button>
        <input type="text" placeholder={i18n.t("search")} className={styles.searchInput}/>
      </div>

      <div className={styles.rightSide}>
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
        <select className={styles.languageSelect} onChange={changeLanguage}>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>
    </nav>
    {catalogOpen && <Catalog />}
    </>
  );
}
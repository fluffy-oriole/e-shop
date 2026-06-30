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
      <div className={styles.logo}>
        <Link to="/">E-SHOP</Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/"> {i18n.t('main')} </Link></li> 
      </ul>

      <button onClick={openCatalog}>{i18n.t('catalog')}</button>
      <input type="text" className={styles.searchInput} />
      
      <div className={styles.navActions}>
        {isLogged ? (
          <Link to="/profile" className={styles.profile}>
            {i18n.t('profile')}
          </Link>
        ) :
        (
          <Link to="/login" className={styles.cartBtn}>
            {i18n.t('login')}
          </Link>
        )
        
        }
        

        
        
        <Link to="/cart" className={styles.cartBtn}>
          {i18n.t('cart')}
        </Link>

        

        <select className={styles.languageSelect} onChange={changeLanguage}>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>
    </nav>
    <Catalog style={{ display: catalogOpen ? 'flex' : 'none'}} />
    </>
  );
}
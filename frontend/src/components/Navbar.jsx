import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { i18n } = useTranslation();

  function changeLanguage(event) {
    const selectedLanguage = event.target.value;

    if (selectedLanguage === 'ru') {
      i18n.changeLanguage('ru')
    }
    else if (selectedLanguage === 'en') {
      i18n.changeLanguage('en')
    }
  }
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">E-shop</Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/"> {i18n.t('main')} </Link></li>
        <li><Link to="/catalog"> {i18n.t('catalog')} </Link></li>
      </ul>

      <input type="text" className={styles.searchInput} />

      <div className={styles.navActions}>
        <Link to="/profile" className={styles.profile}>
          {i18n.t('profile')}
        </Link>
        
        <Link to="/cart" className={styles.cartBtn}>
          {i18n.t('cart')} <span className={styles.cartCount}>0</span>
        </Link>

        <select className={styles.languageSelect} onChange={changeLanguage}>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
      </div>
    </nav>
  );
}
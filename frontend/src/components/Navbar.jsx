import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">E-shop</Link>
      </div>

      <ul className={styles.navLinks}>
        <li><Link to="/">Главная</Link></li>
        <li><Link to="/catalog">Каталог</Link></li>
      </ul>

      <input type="text" placeholder="Поиск..." className={styles.searchInput} />

      <div className={styles.navActions}>
        <Link to="/profile" className={styles.profile}>
          Профиль
        </Link>
        
        <Link to="/cart" className={styles.cartBtn}>
          Корзина <span className={styles.cartCount}>0</span>
        </Link>

        <button className={styles.changeLanguageBtn}>EN</button>
      </div>
    </nav>
  );
}
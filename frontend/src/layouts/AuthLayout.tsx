import styles from './AuthLayout.module.css'
import { Outlet, Link } from 'react-router-dom';
import LanguageSelector from '../components/LandSelector';

export default function AuthLayout() {
  return (
    <div>
      <div className={styles.topRow}>
        <Link to="/" className={styles.goBackButton}><img src="../../public/goBack.svg" className={styles.goBackIco}></img>На главную</Link>
        <LanguageSelector />
      </div>
      <div className={styles.mainContainer}>
        <Outlet />
      </div>
    </div>
  );
}
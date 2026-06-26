import styles from './AuthLayout.module.css'
import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className={styles.backgroundContainer}>
      <Link to="/" className={styles.goBackButton}>На главную</Link>
      <div className={styles.mainContainer}>
        <Outlet />
      </div>
    </div>
  );
}
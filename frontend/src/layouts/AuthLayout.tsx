import styles from './AuthLayout.module.css'
import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div>
      <Link to="/" className={styles.goBackButton}><img src="../../public/goBack.svg" className={styles.goBackIco}></img>На главную</Link>
      <div className={styles.mainContainer}>
        <Outlet />
      </div>
    </div>
  );
}
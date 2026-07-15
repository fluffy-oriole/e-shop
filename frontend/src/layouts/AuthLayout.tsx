import styles from './AuthLayout.module.css';
import { Outlet, Link } from 'react-router-dom';
import LanguageSelector from '../components/LandSelector';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';

export default function AuthLayout() {
  const { t } = useTranslation();

  return (
    <div className={styles.layout}>
      <div className={styles.topRow}>
        <Link to="/" className={styles.goBackButton}>
          <ChevronLeft size={20} />
          {t("goHome")}
        </Link>
        <LanguageSelector />
      </div>
      <div className={styles.mainContainer}>
        <Outlet />
      </div>
    </div>
  );
}
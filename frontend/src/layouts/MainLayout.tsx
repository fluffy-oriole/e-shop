import Navbar from '../components/Navbar';
import styles from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <div className={styles.mainLayout}>
            <Navbar />

            <main className={styles.page}>
                <div className={styles.container}>
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
        </div>
    );
}
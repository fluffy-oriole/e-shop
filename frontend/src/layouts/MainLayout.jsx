import Navbar from '../components/Navbar';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }) {
    return (
        <div className={styles.mainLayout}>
            <Navbar />
            <div className={styles.contentBlock}>
                { children }
            </div>
        </div>
    )

}
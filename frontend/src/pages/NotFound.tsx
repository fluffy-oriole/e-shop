import styles from './NotFound.module.css'
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.notFound}>Такой страницы не существует</h1>
            <Link to="/home" className={styles.link}>Вернуться на главную</Link>
        </div>
    )
}
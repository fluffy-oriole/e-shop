import styles from './Profile.module.css';

export default function Profile() {
    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.text}>Name: John Doe</h1>
            <p className={styles.email}>Email: john.doe@example.com</p>
            <button className={styles.changePasswordButton}>Change Password</button>
        </div>
    )
}
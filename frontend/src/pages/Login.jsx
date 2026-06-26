import { Link } from "react-router-dom"
import styles from './Auth.module.css'

export default function Login() {
    return (
        <form method="POST" className={styles.container}>
          <h2>Войти в аккаунт</h2>
    
          <div className={styles.form}>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" placeholder="name@example.com" />
            </div>
            <div className={styles.field}>
              <label>Пароль</label>
              <input type="password" placeholder="Минимум 8 символов" />
            </div>
            <button className={styles.btn}>Войти</button>
          </div>
    
          <p className={styles.login}>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
        </form>
    )
}   
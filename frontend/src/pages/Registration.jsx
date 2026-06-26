import styles from './Auth.module.css'
import { Link } from "react-router-dom";

export default function Registration() {
  return (
    <form method="POST" className={styles.container}>
      <h2>Создать аккаунт</h2>

      <div className={styles.form}>
        <div className={styles.field}>
          <label>Имя пользователя</label>
          <input type="text" placeholder="nickname" />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <input type="email" placeholder="name@example.com" />
        </div>
        <div className={styles.field}>
          <label>Пароль</label>
          <input type="password" placeholder="Минимум 8 символов" />
        </div>
        <div className={styles.field}>
          <label>Подтвердить пароль</label>
          <input type="password" placeholder="Минимум 8 символов" />
        </div>
        <button className={styles.btn}>Зарегистрироваться</button>
      </div>

      <p className={styles.login}>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </form>
  );
}
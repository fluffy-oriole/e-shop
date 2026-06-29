import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { authClient } from "../lib/authClient"
import styles from './Auth.module.css'

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      setError(error.message);
      return;
    }

    navigate('/');
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Войти в аккаунт</h2>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.form}>
        <div className={styles.field}>
          <label>Email</label>
          <input name="email" type="email" placeholder="name@example.com" />
        </div>
        <div className={styles.field}>
          <label>Пароль</label>
          <input name="password" type="password" placeholder="Минимум 8 символов" />
        </div>
        <button className={styles.btn}>Войти</button>
      </div>

      <p className={styles.login}>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
    </form>
  )
}
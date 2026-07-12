import styles from './Auth.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authClient } from "../lib/authClient";

export default function Registration() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

    if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
    }

    const { error } = await authClient.signUp.email({ name, email, password });

    if (error) {
        setError(error.message ?? 'Неизвестная ошибка');
        return;
    }

    navigate('/');
}

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Создать аккаунт</h2>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.form}>
        <div className={styles.field}>
          <label>Имя пользователя</label>
          <input name="name" type="text" placeholder="nickname" className={styles.input}/>
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <input name="email" type="email" placeholder="name@example.com" className={styles.input}/>
        </div>
        <div className={styles.field}>
          <label>Пароль</label>
          <input name="password" type="password" placeholder="Минимум 8 символов" className={styles.input}/>
        </div>
        <div className={styles.field}>
          <label>Подтвердить пароль</label>
          <input name="confirmPassword" type="password" placeholder="Минимум 8 символов" className={styles.input}/>
        </div>
        <button className={styles.btn}>Зарегистрироваться</button>
      </div>

      <p className={styles.login}>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </form>
  );
}
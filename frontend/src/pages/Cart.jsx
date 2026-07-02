import styles from "./Cart.module.css";
import { useState, useEffect } from "react";
import { authClient } from '../lib/authClient.js';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const session = authClient.useSession();

  useEffect(() => {
    fetch("http://localhost:3000/api/cart", {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((data) => setProducts(data)); 
  }, []);


  return (
    <div className={styles.mainContainer}>
      <div className={styles.productsContainer}>
        
        {products.length === 0 ? (
          <span>В корзине пока пусто</span>
        ) : (
          products.map((p) => (
            <div key={p.id} className={styles.frame}>
                        <img src={p.images[0]} className={styles.productImg}></img>
                        <p>{p.title}</p>
                        <p>{p.price}₽</p>
                        <button>Удалить</button>
                    </div>
          ))
        )}
      </div>
      <div className={styles.buyingBlock}>
        <button>Оплатить</button>
      </div>
    </div>
  )
}
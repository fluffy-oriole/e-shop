import styles from "./Cart.module.css";
import { useState, useEffect } from "react";
import { authClient } from '../lib/authClient';
import RedButton from '../components/RedButton';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const session = authClient.useSession();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleRemoveFromCart = async (productId: number) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId }),
        });
        setProducts(products.filter(item => item.id !== productId));
    }


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
                        <RedButton text={"Удалить"} width="100px" onClick={() => handleRemoveFromCart(p.id)} />
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
import styles from "./Cart.module.css";
import { useState, useEffect } from "react";
import { authClient } from '../lib/authClient';
import { Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
  stock: number;
}

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const session = authClient.useSession();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
        });
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

  const handleIncrease = async (productId: number, stock: number, quantity: number) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/increase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, stock }),
    });
    setProducts(products.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }

  const handleDecrease = async (productId: number) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/decrease`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId }),
    });
    setProducts(products.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0));
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
              <div className={styles.changeQuantityBlock}>
                <button className={styles.changeQuantityBtn} onClick={() => handleDecrease(p.id)} ><Minus color="white" size={16} /></button>
                  {p.quantity}
                <button className={styles.changeQuantityBtn}
                        onClick={() => handleIncrease(p.id, p.stock, p.quantity)} disabled={p.quantity >= p.stock}>
                          <Plus color="white" size={16} />
                </button>
              </div>
              <button className={styles.delBtn} onClick={() => handleRemoveFromCart(p.id)}>Удалить</button> 
            </div>
          ))
        )}
      </div>
      <div className={styles.buyingBlock}>
        <button className={styles.payBtn}>Оплатить</button>
      </div>
    </div>
  )
}
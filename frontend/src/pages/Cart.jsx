import styles from "./Cart.module.css"
import { useState, useEffect } from "react"
import CartElement from "../components/CartElement.jsx"

export default function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/cart")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
      
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.productsContainer}>
        {products.length === 0 ? (
          <span>В корзине пока пусто</span>
        ) : (
          products.map((p) => (
            <CartElement
              key={p.id}
              productTitle={p.title}
              productImage={p.image}
              productId={p.id}
              productPrice={p.price}
            />
          ))
        )}
      </div>
      <div className={styles.buyingBlock}>
        <button>Оплатить</button>
      </div>
    </div>
  )
}
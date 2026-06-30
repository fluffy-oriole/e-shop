import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import styles from "./Home.module.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data)
    );
  }, []);
  console.log(products);

  return (
      <div className={styles.productsList}>
        {products.map((p) => (
        <ProductCard
          key={p.id}
          productTitle={p.title}
          productImage={p.images[0]}
          productId={p.id}
          productPrice={p.price}
        />
      ))}
      </div>
  );
}

export default Home

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import styles from "./Home.module.css";
import Pagination from "../components/Pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [countOfProducts, setCountOfProducts] = useState(0);
  const productsPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products?page=${currentPage}&limit=${productsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setCountOfProducts(data.total);
        setProducts(data.products);
      });
  }, [currentPage]);

  let countOfPages = Math.ceil(countOfProducts / productsPerPage);
  
  if (!products) {
    return (
      <div className={styles.productsList}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div>
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
        <Pagination countOfPages={countOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
      
  );
}

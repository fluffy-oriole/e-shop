import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from 'react-router-dom';
import styles from "./Home.module.css";

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
}

export default function HomeFilteredByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data)});
  }, [category]);

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
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useParams } from 'react-router-dom';
import "./Home.css";


export default function HomeFilteredByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, [category]);

  return (
      <div className="products-list">
        {products.map((p) => (
        <ProductCard
          key={p.id}
          productTitle={p.title}
          productImage={p.image}
          productId={p.id}
          productPrice={p.price}
        />
      ))}
      </div>
  );
}

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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

export default Home

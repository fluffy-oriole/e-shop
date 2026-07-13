  import { useEffect, useState } from "react";
  import ProductCard from "../components/ProductCard";
  import styles from "./Home.module.css";
  import Pagination from "../components/Pagination";
  import { useSearchParams } from "react-router-dom";

  interface Products {
    id: number;
    title: string;
    images: string[];
    price: number;
  }

  export default function Home() {
    const [products, setProducts] = useState<Products[]>([]);
    const [countOfProducts, setCountOfProducts] = useState(0);
    const productsPerPage = 50;
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get("page") ?? "1");
    const searchQuery = searchParams.get("q") ?? "";

    useEffect(() => {
      const url =
      `${import.meta.env.VITE_API_URL}/api/products?page=${currentPage}&limit=${productsPerPage}&q=${encodeURIComponent(searchQuery)}`;

      fetch(url)
          .then((res) => res.json())
          .then((data) => {
              setCountOfProducts(data.total);
              setProducts(data.products);
          });

      }, [currentPage, searchQuery]);

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
          <Pagination
            currentPage={currentPage}
            countOfPages={countOfPages}
            setCurrentPage={(page) => {
              const params = new URLSearchParams(searchParams);

              params.set("page", page.toString());

              setSearchParams(params);
            }}
          />
      </div>
        
    );
  }

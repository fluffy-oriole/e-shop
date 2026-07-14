  import { useEffect, useState } from "react";
  import ProductCard from "../components/ProductCard";
  import styles from "./Catalog.module.css";
  import Pagination from "../components/Pagination";
  import { useSearchParams } from "react-router-dom";
  import { useParams } from "react-router-dom";
  import { useTranslation } from "react-i18next";

  interface Products {
    id: number;
    title: string;
    images: string[];
    price: number;
  }

  export default function Catalog() {
    const i18n = useTranslation();
    const [products, setProducts] = useState<Products[]>([]);
    const [countOfProducts, setCountOfProducts] = useState(0);
    const productsPerPage = 50;
    const [searchParams, setSearchParams] = useSearchParams();
    const { category } = useParams();


    const currentPage = Number(searchParams.get("page") ?? "1");
    const searchQuery = searchParams.get("q") ?? "";

    useEffect(() => {
      const params = new URLSearchParams();

      params.set("page", currentPage.toString());
      params.set("limit", productsPerPage.toString());

      if (searchQuery) {
        params.set("q", searchQuery);
      }

      if (category) {
        params.set("category", category);
      }

      const url = `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCountOfProducts(data.total);
          setProducts(data.products);
        });

    }, [currentPage, searchQuery, category]);

    let countOfPages = Math.ceil(countOfProducts / productsPerPage);
    const isPagesMoreThanOne = (countOfPages > 1);
    
    if (!products) {
      return (
        <div className={styles.productsList}>
          <p>{i18n.t("loading")}</p>
        </div>
      );
    }

    return (
      <div>
        <div className={styles.categoryTitle}>{category}</div>
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
        {isPagesMoreThanOne && 
          <Pagination
            currentPage={currentPage}
            countOfPages={countOfPages}
            setCurrentPage={(page) => {
              const params = new URLSearchParams(searchParams);

              params.set("page", page.toString());

              setSearchParams(params);
            }}
          />
        }
      </div>
        
    );
  }

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import styles from "./Catalog.module.css";

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
}

export default function Catalog() {
  const { t } = useTranslation();
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
    if (searchQuery) params.set("q", searchQuery);
    if (category) params.set("category", category);

    fetch(`${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        // Безопасное извлечение
        const items = Array.isArray(data.products) ? data.products : [];
        const total = typeof data.total === 'number' ? data.total : 0;
        setProducts(items);
        setCountOfProducts(total);
      })
      .catch(() => {
        setProducts([]);
        setCountOfProducts(0);
      });
  }, [currentPage, searchQuery, category]);

  const countOfPages = Math.ceil(countOfProducts / productsPerPage);
  const isPagesMoreThanOne = countOfPages > 1;


  if (!products.length && countOfProducts === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.statusMessage}>{t("loading")}</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {category && (
        <h1 className={styles.categoryTitle}>
          {t("catalog")} / {category}
        </h1>
      )}
      {searchQuery && (
        <p className={styles.searchInfo}>
          {t("searchResults")}: «{searchQuery}»
        </p>
      )}

      <div className={styles.productsGrid}>
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

      {isPagesMoreThanOne && (
        <Pagination
          currentPage={currentPage}
          countOfPages={countOfPages}
          setCurrentPage={(page) => {
            const params = new URLSearchParams(searchParams);
            params.set("page", page.toString());
            setSearchParams(params);
          }}
        />
      )}
    </div>
  );
}
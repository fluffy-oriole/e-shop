import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import styles from "./Catalog.module.css";
import { ChevronDown } from "lucide-react";
import Banner from "../components/Banner";

interface Products {
  id: number;
  title: string;
  images: string[];
  price: number;
  discountPercentage: number;
  category: string;
  brand: string;
  rating: number;
}

export default function Catalog() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Products[]>([]);
  const [countOfProducts, setCountOfProducts] = useState(0);
  const productsPerPage = 40;
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  const [sortOpen, setSortOpen] = useState(false);
  const [sortParam, setSortParam] = useState('По умолчанию');

  const currentPage = Number(searchParams.get("page") ?? "1");
  const searchQuery = searchParams.get("q") ?? "";

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("limit", productsPerPage.toString());
    if (searchQuery) params.set("q", searchQuery);
    if (category) params.set("category", category);
    if (sortParam != t('byDefault')){
      if (sortParam === t('cheaper')) {
        params.set('sortBy', 'price');
        params.set('order', 'asc');
      }
      else if (sortParam === t('moreExpensive')) {
        params.set('sortBy', 'price');
        params.set('order', 'desc');
      }
      else if (sortParam === t('byRate')) {
        params.set('sortBy', 'rating');
        params.set('order', 'desc');
      }
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data.products) ? data.products : [];
        const total = typeof data.total === 'number' ? data.total : 0;
        setProducts(items);
        setCountOfProducts(total);
      })
      .catch(() => {
        setProducts([]);
        setCountOfProducts(0);
      });
  }, [currentPage, searchQuery, category, sortParam]);

  const countOfPages = Math.ceil(countOfProducts / productsPerPage);
  const isPagesMoreThanOne = countOfPages > 1;


  if (!products.length && countOfProducts === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.statusMessage}>{t("loading")}</div>
      </div>
    );
  }

  function handleSortSelect(sortParam: string) {
    setSortParam(sortParam);
    setSortOpen(false);
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

      {(category || searchQuery) && (
        <div className={styles.sortSelector}>
          <button
            className={styles.sortTrigger}
            onClick={() => setSortOpen(!sortOpen)}
            type="button"
          >
            <span className={styles.sortLabel}>{sortParam}</span>
            <ChevronDown
              size={14}
              className={`${styles.sortChevron} ${sortOpen ? styles.sortChevronOpen : ''}`}
            />
          </button>

          {sortOpen && (
            <div className={styles.sortDropdown}>
              <button
                className={`${styles.sortOption} ${sortParam === t('byDefault') ? styles.sortActiveOption : ''}`}
                onClick={() => handleSortSelect(t('byDefault'))}
              >
                {t('byDefault')}
              </button>
              <button
                className={`${styles.sortOption} ${sortParam === t('moreExpensive') ? styles.sortActiveOption : ''}`}
                onClick={() => handleSortSelect(t('moreExpensive'))}
              >
                {t('moreExpensive')}
              </button>
              <button
                className={`${styles.sortOption} ${sortParam === t('cheaper') ? styles.sortActiveOption : ''}`}
                onClick={() => handleSortSelect(t('cheaper'))}
              >
                {t('cheaper')}
              </button>
              <button
                className={`${styles.sortOption} ${sortParam === t('byRate') ? styles.sortActiveOption : ''}`}
                onClick={() => handleSortSelect(t('byRate'))}
              >
                {t('byRate')}
              </button>
            </div>
          )}
        </div>
      )}

      {(!category || !searchQuery) && (
        <Banner />
      )}

      <div className={styles.productsGrid}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            productTitle={p.title}
            productImage={p.images[0]}
            productId={p.id}
            productPrice={p.price}
            category={p.category}
            brand={p.brand}
            rating={p.rating}
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
import styles from "./Pagination.module.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  countOfPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ countOfPages, currentPage, setCurrentPage }: PaginationProps) {
  const pages = Array.from({ length: countOfPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination}>
      <button
        className={styles.arrowBtn}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${page === currentPage ? styles.active : ""}`}
          onClick={() => setCurrentPage(page)}
          aria-label={`Страница ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.arrowBtn}
        onClick={() => currentPage < countOfPages && setCurrentPage(currentPage + 1)}
        disabled={currentPage === countOfPages}
        aria-label="Следующая страница"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
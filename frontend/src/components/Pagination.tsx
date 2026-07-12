import styles from "./Pagination.module.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  countOfPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ countOfPages, currentPage, setCurrentPage }: PaginationProps) {
    
    let pages = [];
    for (let i = 1; i <= countOfPages; i++) {
        pages.push(i);
    }

    function reduceCurrentPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function increaseCurrentPage() {
        if (currentPage < countOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className={styles.pagesBlock}>
            <div className={styles.pageButton} onClick={reduceCurrentPage}><ChevronLeft /></div>
            {pages.map((page, index) => (
                <div key={page} className={styles.pageButton + (page === currentPage ? ' ' + styles.currentPageButton : '')} onClick={() => setCurrentPage(page)}>
                    {page}
                </div>
            ))}
            <div className={styles.pageButton} onClick={increaseCurrentPage}><ChevronRight /></div>
        </div>
    )
}
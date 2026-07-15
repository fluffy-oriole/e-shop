import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';

interface ProductCardProps {
  productTitle: string;
  productImage: string;
  productId: number;
  productPrice: number;
  category?: string;
  brand?: string;
  rating?: number;
}

function ProductCard({ productTitle, productImage, productId, productPrice, category, brand, rating }: ProductCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ productId }),
    });
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageWrapper}>
        <img src={productImage} alt={productTitle} className={styles.image} />
        <div className={styles.imageOverlay} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{productTitle}</h3>
        {(brand || category) && (
          <div className={styles.metaRow}>
            {brand && <span className={styles.brand}>{brand}</span>}
            {brand && category && <span className={styles.metaSep}>·</span>}
            {category && <span className={styles.categoryLabel}>{category}</span>}
          </div>
        )}
        {rating !== undefined && rating !== null && (
          <div className={styles.ratingRow}>
            <Star size={12} fill="var(--color-signal-violet)" color="var(--color-signal-violet)" />
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
          </div>
        )}
        <div className={styles.priceRow}>
          <span className={styles.price}>{productPrice} ₽</span>
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            type="button"
            aria-label="Добавить в корзину"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
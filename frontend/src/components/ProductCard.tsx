import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  productTitle: string;
  productImage: string;
  productId: number;
  productPrice: number;
  discount?: number;      // процент скидки
  category?: string;
  brand?: string;
}

function ProductCard({ productTitle, productImage, productId, productPrice, discount, category, brand }: ProductCardProps) {
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

  // Вычисляем старую цену, если есть скидка
  const oldPrice = discount ? Math.round(productPrice / (1 - discount / 100)) : null;

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
        <div className={styles.priceRow}>
          <div className={styles.prices}>
            {discount && oldPrice && (
              <>
                <span className={styles.oldPrice}>{oldPrice} ₽</span>
                <span className={styles.discountBadge}>-{discount}%</span>
              </>
            )}
            <span className={styles.price}>{productPrice} ₽</span>
          </div>
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
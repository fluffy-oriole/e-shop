import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  productTitle: string;
  productImage: string;
  productId: number;
  productPrice: number;
}

function ProductCard({ productTitle, productImage, productId, productPrice }: ProductCardProps) {
  const { t } = useTranslation();
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
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{productTitle}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>{productPrice} ₽</span>
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            type="button"
            aria-label={t('addToCart')}
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
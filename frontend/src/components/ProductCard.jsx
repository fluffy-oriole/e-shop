import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ProductCard({ productTitle, productImage, productId, productPrice }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    alert('Товар добавлен в корзину');
  };

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <img src={productImage} alt={productTitle} className={styles.productImage} />
      <h3 className={styles.productTitle}>{productTitle}</h3>
      <p className={styles.productPrice}>{productPrice}₽</p>

      <button
        className={styles.addToCartBtn}
        onClick={handleAddToCart}
        type="button"
      >
        +
      </button>
    </div>
  );
}

export default ProductCard;
import styles from './ProductCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function ProductCard({ productTitle, productImage, productId, productPrice }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ productId }),
    });
  };

  return (
    <div className={styles.productCard} onClick={handleCardClick}>
      <img src={productImage} alt={productTitle} className={styles.productImage} />
      <h3 className={styles.productTitle}>{productTitle}</h3>
      <div className={styles.priceRow}>
        <p className={styles.productPrice}>{productPrice}₽</p>
        <button className={styles.addToCartBtn} onClick={handleAddToCart} type="button">+</button>
      </div>
    </div>
  );
}

export default ProductCard;
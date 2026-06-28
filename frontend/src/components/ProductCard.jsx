import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ProductCard({ productTitle, productImage, productId, productPrice }) {
    const { t } = useTranslation();

    return (
    <div className={styles.productCard}>
        <Link to={`/product/${productId}`}>
            <img src={productImage} alt={productTitle} className={styles.productImage}/>
            <h3 className={styles.productTitle} >{productTitle}</h3>
            <p className={styles.productPrice}>{productPrice}₽</p>
            
            <button className={styles.addToCartBtn}>+</button>
        </Link>
    </div>
    )
}

export default ProductCard
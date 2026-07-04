import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from "./Product.module.css";
import EButton from '../components/EButton.jsx';
import { useTranslation } from 'react-i18next';
import redButton from '../components/RedButton.jsx';
import RedButton from "../components/RedButton.jsx";

export default function Product( ) {
    const { i18n } = useTranslation();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
          method: 'GET',
          credentials: 'include',
        }).then((res) => res.json())
          .then((data) => setCart(data)); 
      }, []);

      let isAddedToCart = false;
      if (product) {
        cart.forEach(element => {
            if (element.id == product.id) {
                isAddedToCart = true;
            }
        });
      }
      
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }, []);

    const handleAddToCart = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: product?.id }),
        });
        setCart([...cart, product]);
    };

    const handleRemoveFromCart = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: product?.id }),
        });
        setCart(cart.filter(item => item.id !== product.id));
    }

    if (!product) {
        return <div>Загрузка...</div>
    }

    return (
        <div className={styles.productContainer}>
            <div className={styles.mainInformation}>
                <img className={styles.productImage} src={product?.images[0]} alt={product?.title} />
                
                <div className={styles.productInfo}>
                    <p className={styles.title}>{product?.title}</p>
                    
                    <div className={styles.meta}>
                        <span className={styles.badge}>{product?.category}</span>
                        <span className={styles.brand}>{product?.brand}</span>
                    </div>

                    <div className={styles.rating}>
                        <span>Рейтинг: </span>
                        <span>{product?.rating} / 5</span>
                    </div>

                    <p className={styles.description}>{product?.description}</p>

                    
                    <p className={styles.specsLabel}>Характеристики</p>
                    <div className={styles.specsGrid}>
                        <div className={styles.specItem}>
                            <p>Вес</p><p>{product?.weight} г</p>
                        </div>
                        <div className={styles.specItem}>
                            <p>Размеры</p>
                            <p>{product?.dimensions?.width} × {product?.dimensions?.height} × {product?.dimensions?.depth}</p>
                        </div>
                        <div className={styles.specItem}>
                            <p>Возврат</p><p>{product?.returnPolicy}</p>
                        </div>
                        <div className={styles.specItem}>
                            <p>SKU</p><p>{product?.sku}</p>
                        </div>
                        <div className={styles.specItem}>
                            <p>Гарантия</p><p>{product?.warrantyInformation}</p>
                        </div>
                    </div>
                </div>
                
                <div className={styles.buyingBlock}>
                    <p className={styles.price}>{product?.price} ₽</p>
                    <p className={styles.stockInformation}>В наличии: {product?.stock}</p>
                    {isAddedToCart ?
                        <RedButton width="100%" text={"Удалить из корзины"} onClick={handleRemoveFromCart} />
                        : <EButton width="100%" text={`Добавить в корзину`} onClick={handleAddToCart} />
                    }
                </div>
            </div>
            <div className={styles.reviewsBox}>
                <h3 className={styles.reviewsLabel}>Отзывы</h3>
                {product.reviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                        <div className={styles.reviewInformation}>
                            <div className={styles.specItem + " " + styles.reviewerName}>{review?.reviewerName}</div>
                            <div className={styles.specItem}>{new Date(review?.date).toLocaleDateString('ru-RU')}</div>
                        </div>
                        <div className={styles.specItem}>Рейтинг: {review?.rating}</div>
                        <div className={styles.specItem}>{review?.comment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
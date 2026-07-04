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
    };

    const handleRemoveFromCart = async () => {
        console.log("Удален из корзины");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId: product?.id }),
        });
    }

    return (
        <div className={styles.productContainer}>
            <div className={styles.mainInformation}>
                <img className={styles.productImage} src={product?.images[0]} alt={product?.title} />
                <div className={styles.productInfo}>
                    <h1 className={styles.title}>{product?.title}</h1>
                    <p className={styles.brand}>{product?.brand}</p>
                    <p className={styles.category}>{product?.category}</p>
                    <p>Rating {product?.rating}</p>
                </div>
                
                <div className={styles.buyingBlock}>
                    <div>{product?.price}₽</div>
                    <div className={styles.stockInformation}>В наличии: {product?.stock}</div>
                    {isAddedToCart ? <RedButton text={"Удалить из корзины"} onClick={handleRemoveFromCart} /> : <EButton text={`Добавить в корзину`} onClick={handleAddToCart} />}
                </div>
            </div>
                
            <div className={styles.descriptionBlock}>

            </div>
            <p className={styles.productDescription}>{product?.description}</p>
            <div>
                <h3>Отзывы</h3>
            </div>
            
        </div>
    )
}
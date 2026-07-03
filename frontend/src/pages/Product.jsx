import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from "./Product.module.css";

export default function Product( ) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }, []);

    console.log(product?.images);

    return (
        <div className={styles.productContainer}>
            <div className={styles.productFirstRow}>
                <img className={styles.productImage} src={product?.images[0]} alt={product?.title} />
                <h1>{product?.title}</h1>
            </div>
            <p className={styles.productDescription}>{product?.description}</p>
        </div>
    )
}
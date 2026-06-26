import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import styles from "./Product.module.css";

export default function Product( ) {
    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/product/${productId}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }, []);

    return (
        <div className={styles.productContainer}>
            <div className={styles.productFirstRow}>
                <img className={styles.productImage} src={product?.image} alt={product?.title} />
                <h1>{product?.title}</h1>
            </div>
            <p className={styles.productDescription}>{product?.description}</p>
        </div>
    )
}
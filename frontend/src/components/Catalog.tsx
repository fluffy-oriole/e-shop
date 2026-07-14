import styles from "./Catalog.module.css";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';



export default function Catalog({ style }: { style?: CSSProperties }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/categories`)
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }, []);
    
    return (
        <div className={styles.mainFrame} style={style}>
            {categories.map((category) => (
                
                <div key={category} className={styles.categoryContainer}>
                    <Link className={styles.categoryLink} to={`/catalog/${category}`} >{category}</Link>
                </div>
            ))}
        </div>
    )
}
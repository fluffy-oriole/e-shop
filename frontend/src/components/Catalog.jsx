import styles from "./Catalog.module.css"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

export default function Catalog() {
    const [categories, setCategories] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:3000/api/products/categories")
          .then((res) => res.json())
          .then((data) => setCategories(data));
      }, []);
    
    return (
        <div className={styles.mainFrame}>
            {categories.map((category) => (
                <div key={category}>
                <Link to={`/${category}`} >{category}</Link>
                </div>
            ))}
        </div>
    )
}
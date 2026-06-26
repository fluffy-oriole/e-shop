import styles from "./Catalog.module.css"
import { useState, useEffect } from "react"
import Category from "./Category.jsx"

export default function Catalog({style}) {
    const [categories, setCategories] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:3000/api/products/categories")
          .then((res) => res.json())
          .then((data) => setCategories(data));
      }, []);
    
    return (
        <div className={styles.mainFrame} style={style}>
            {categories.map((category) => (
                <Category key={category} category={category}/>
            ))}
        </div>
    )
}
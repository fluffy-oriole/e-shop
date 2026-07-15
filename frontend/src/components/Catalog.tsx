import styles from "./Catalog.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

export default function Catalog({ style }: { style?: CSSProperties }) {
    const [categories, setCategories] = useState<string[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products/categories`)
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    if (!categories.length) {
        return (
            <div className={styles.mainFrame} style={style}>
                <span className={styles.empty}>{t("loading")}</span>
            </div>
        );
    }

    return (
        <div className={styles.mainFrame} style={style}>
            {categories.map((category) => (
                <Link
                    key={category}
                    className={styles.categoryLink}
                    to={`/catalog/${category}`}
                >
                    {category}
                </Link>
            ))}
        </div>
    );
}
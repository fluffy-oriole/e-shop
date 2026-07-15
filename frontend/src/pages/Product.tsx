import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Product.module.css";
import { useTranslation } from "react-i18next";
import { Star, Minus, Plus } from "lucide-react";
import { authClient } from "../lib/authClient";

interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    returnPolicy: string;
    rating: number;
    stock: number;
    images: string[];
    reviews: Review[];
}

export default function Product() {
    const { t, i18n } = useTranslation();
    const { id } = useParams();
    const { data: session } = authClient.useSession();

    const [product, setProduct] = useState<Product | null>(null);
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        if (!session) return;
        fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {
            if (!res.ok) return [];
            return res.json();
        })
        .then((data) => setCart(Array.isArray(data) ? data : []));
    }, []);

    let isAddedToCart = false;
    if (product) {
        cart.forEach((element) => {
            if (element.id === product.id) isAddedToCart = true;
        });
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [id]);

    const handleAddToCart = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId: product?.id }),
        });
        if (product) setCart([...cart, product]);
    };

    const handleRemoveFromCart = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ productId: product?.id }),
        });
        if (product) setCart(cart.filter((item) => item.id !== product.id));
    };

    if (!product) {
        return (
            <div className={styles.page}>
                <div className={styles.statusMessage}>{t("loading")}</div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <nav className={styles.breadcrumbs}>

                <Link to="/catalog">{t("catalog")}</Link>
                <span className={styles.separator}>/</span>
                <span className={styles.current}>{product.title}</span>
            </nav>

            <div className={styles.mainGrid}>
                <div className={styles.gallery}>
                    <img
                        className={styles.mainImage}
                        src={product.images[0]}
                        alt={product.title}
                    />
                    {product.images.length > 1 && (
                        <div className={styles.thumbs}>
                            {product.images.slice(1, 4).map((img, idx) => (
                                <button key={idx} className={styles.thumb}>
                                    <img src={img} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.details}>
                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.meta}>
                        <span className={styles.brand}>{product.brand}</span>
                        <Link to={`/catalog/${product.category}`} className={styles.category}>
                            {product.category}
                        </Link>
                    </div>

                    <div className={styles.ratingRow}>
                        <div className={styles.stars}>
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    fill={i < Math.round(product.rating) ? "var(--color-signal-violet)" : "var(--color-graphite)"}
                                    color={i < Math.round(product.rating) ? "var(--color-signal-violet)" : "var(--color-graphite)"}
                                    size={16}
                                />
                            ))}
                        </div>
                        <span className={styles.ratingValue}>{product.rating} / 5</span>
                    </div>

                    <p className={styles.description}>{product.description}</p>

                    <div className={styles.buyBox}>
                        <div className={styles.priceRow}>
                            <p className={styles.price}>{product.price} ₽</p>
                            <span className={styles.stockBadge}>
                                {t("inStock")}: {product.stock}
                            </span>
                        </div>
                        {isAddedToCart ? (
                            <button className={styles.removeBtn} onClick={handleRemoveFromCart}>
                                <Minus size={16} strokeWidth={2} />
                                {t("removeFromCart")}
                            </button>
                        ) : (
                            <button className={styles.addBtn} onClick={handleAddToCart}>
                                <Plus size={16} strokeWidth={2} />
                                {t("addToCart")}
                            </button>
                        )}
                    </div>

                    <div className={styles.specs}>
                        <h3 className={styles.specsTitle}>{t("specifications")}</h3>
                        <dl className={styles.specsList}>
                            <div className={styles.specRow}>
                                <dt>{t("weight")}</dt>
                                <dd>{product.weight} {t("grams")}</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>{t("dimensions")}</dt>
                                <dd>{product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} см</dd>
                            </div>
                            <div className={styles.specRow}>
                                <dt>{t("sku")}</dt>
                                <dd>{product.sku}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <section className={styles.reviews}>
                <h2 className={styles.reviewsTitle}>{t("reviews")}</h2>
                {product.reviews.length === 0 ? (
                    <p className={styles.noReviews}>{t("noReviews", "Пока нет отзывов")}</p>
                ) : (
                    product.reviews.map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <span className={styles.reviewer}>{review.reviewerName}</span>
                                <time className={styles.date}>
                                    {new Date(review.date).toLocaleDateString(i18n.language)}
                                </time>
                            </div>
                            <div className={styles.stars}>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        fill={i < review.rating ? "var(--color-signal-violet)" : "var(--color-graphite)"}
                                        color={i < review.rating ? "var(--color-signal-violet)" : "var(--color-graphite)"}
                                        size={14}
                                    />
                                ))}
                            </div>
                            <p className={styles.comment}>{review.comment}</p>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}
import styles from "./Cart.module.css";
import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  quantity: number;
  stock: number;
}

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleRemoveFromCart = async (productId: number) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/cart/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });
    setProducts(products.filter((item) => item.id !== productId));
  };

  const handleIncrease = async (productId: number, stock: number) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/cart/increase`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, stock }),
    });
    setProducts((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = async (productId: number) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/cart/decrease`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });
    setProducts((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handlePurchase = async () => {
    if (products.length > 0) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ products }),
      });
      navigate("/cart/order-success");
    }
  };

  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.statusMessage}>{t("loading")}</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>{t("cartTitle")}</h1>

      {products.length === 0 ? (
        <div className={styles.emptyCart}>
          <ShoppingCart size={48} strokeWidth={1.5} color="var(--color-smoke)" />
          <p className={styles.emptyText}>{t("cartIsEmpty")}</p>
          <Link to="/catalog" className={styles.continueLink}>
            {t("continueShopping")}
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {products.map((p) => (
              <article key={p.id} className={styles.itemCard}>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <Link to={`/product/${p.id}`} className={styles.itemTitle}>
                    {p.title}
                  </Link>
                  <span className={styles.itemPrice}>{p.price} ₽</span>
                </div>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleDecrease(p.id)}
                    aria-label="Уменьшить"
                  >
                    <Minus size={14} strokeWidth={2} />
                  </button>
                  <span className={styles.qtyValue}>{p.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleIncrease(p.id, p.stock)}
                    disabled={p.quantity >= p.stock}
                    aria-label="Увеличить"
                  >
                    <Plus size={14} strokeWidth={2} />
                  </button>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleRemoveFromCart(p.id)}
                >
                  {t("delete")}
                </button>
              </article>
            ))}
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>{t("totalAmount")}</span>
              <span className={styles.totalPrice}>{total.toFixed(2)} ₽</span>
            </div>
            <button className={styles.payBtn} onClick={handlePurchase}>
              {t("pay")}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
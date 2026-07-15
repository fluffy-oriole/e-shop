import styles from './Admin.module.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CartItem {
    productId: number;
    quantity: number;
    addedAt: string;
}

interface UserCartResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    items: CartItem[];
}

export default function UserCart() {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const [cart, setCart] = useState<UserCartResponse | null>(null);
    const [error, setError] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        if (!user_id) return;
        const getCart = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/carts/${user_id}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
                return;
            }
            setCart(data);
        };
        getCart();
    }, [user_id]);

    if (error) {
        return <div className={styles.wrapper}><p className={styles.error}>{error}</p></div>;
    }

    if (!cart) {
        return <div className={styles.wrapper}><p className={styles.statusMessage}>{t("loading")}</p></div>;
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.backBtn} onClick={() => navigate("/admin/carts")}>
                <ChevronLeft size={16} />
                {t("backToCarts")}
            </button>
            <h1 className={styles.pageTitle}>{t("userCartDetail")}</h1>
            <div className={styles.userMeta}>
                <p>{t("userId")}: {cart.user.id}</p>
                <p>{t("name")}: {cart.user.name}</p>
                <p>{t("email")}: {cart.user.email}</p>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th>{t("productId")}</th>
                        <th>{t("quantity")}</th>
                        <th>{t("addedDate")}</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.items.map((item) => (
                        <tr key={item.productId} className={styles.tableRow}>
                            <td>{item.productId}</td>
                            <td>{item.quantity}</td>
                            <td>{new Date(item.addedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
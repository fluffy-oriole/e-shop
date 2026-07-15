import styles from './Admin.module.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

interface OrderResponse {
    id: number;
    date: string;
    status: string;
    totalPrice: number;
    user: {
        id: string;
        name: string;
        email: string;
    };
    items: OrderItem[];
}

export default function UserOrders() {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [error, setError] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        if (!user_id) return;
        const getOrder = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/orders/${user_id}`,
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
            setOrder(data);
        };
        getOrder();
    }, [user_id]);

    if (error) {
        return <div className={styles.wrapper}><p className={styles.error}>{error}</p></div>;
    }

    if (!order) {
        return <div className={styles.wrapper}><p className={styles.statusMessage}>{t("loading")}</p></div>;
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.backBtn} onClick={() => navigate("/admin/orders")}>
                <ChevronLeft size={16} />
                {t("backToOrders")}
            </button>
            <h1 className={styles.pageTitle}>{t("order")} №{order.id}</h1>
            <div className={styles.userMeta}>
                <p>{t("userId")}: {order.user.id}</p>
                <p>{t("name")}: {order.user.name}</p>
                <p>{t("email")}: {order.user.email}</p>
                <p>{t("date")}: {new Date(order.date).toLocaleString()}</p>
                <p>{t("status")}: {order.status}</p>
                <p>{t("totalPrice")}: {order.totalPrice} ₽</p>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th>{t("productId")}</th>
                        <th>{t("quantity")}</th>
                        <th>{t("price")}</th>
                        <th>{t("total")}</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item.productId} className={styles.tableRow}>
                            <td>{item.productId}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price} ₽</td>
                            <td>{item.price * item.quantity} ₽</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
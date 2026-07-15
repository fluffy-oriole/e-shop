import styles from './Admin.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Order {
    id: number;
    date: string;
    status: string;
    totalPrice: number;
    itemsCount: number;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface OrdersResponse {
    orders: Order[];
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<OrdersResponse | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const getAdminData = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/orders`,
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
            setOrders(data);
        };
        getAdminData();
    }, []);

    if (error) {
        return <div className={styles.wrapper}><p className={styles.error}>{error}</p></div>;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.pageTitle}>{t("ordersList")}</h1>
            {orders && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>ID</th>
                            <th>{t("customer")}</th>
                            <th>{t("email")}</th>
                            <th>{t("date")}</th>
                            <th>{t("products")}</th>
                            <th>{t("totalPrice")}</th>
                            <th>{t("status")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.orders.map((order) => (
                            <tr
                                key={order.id}
                                className={styles.tableRow}
                                onClick={() => navigate(`/admin/orders/${order.id}`)}
                            >
                                <td>{order.id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.user.email}</td>
                                <td>{new Date(order.date).toLocaleString()}</td>
                                <td>{order.itemsCount}</td>
                                <td>{order.totalPrice} ₽</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
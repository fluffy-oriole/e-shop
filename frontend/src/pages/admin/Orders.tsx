import styles from './Users.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

interface Order {
    id: number;
    date: string;
    totalPrice: number;
    status: string;

    user: {
        id: string;
        name: string;
        email: string;
    };

    items: OrderItem[];
}

interface OrdersResponse {
    orders: Order[];
}

export default function Admin() {
    const [orders, setUsers] = useState<OrdersResponse | null>(null);
    const [error, setError] = useState("");
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
            console.log("data" + data);

            if (!response.ok) {
                setError(data.error);
                return;
            }

            setUsers(data);
        };

        getAdminData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {orders && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Products</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.orders.map((order) => (
                            <tr key={order.id} className={styles.tableRow}>
                                <td>{order.id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.user.email}</td>
                                <td>{new Date(order.date).toLocaleString()}</td>
                                <td>
                                    {order.items.map((item) => (
                                        <div key={item.productId}>
                                            ID товара: {item.productId}
                                            <br />
                                            Количество: {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
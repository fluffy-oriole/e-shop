import styles from './Admin.module.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';


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


    useEffect(() => {
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


        if (user_id) {
            getOrder();
        }

    }, [user_id]);


    if (error) {
        return <p>{error}</p>;
    }


    if (!order) {
        return <p>Загрузка...</p>;
    }


    return (
        <div>
            <ChevronLeft 
                size={18} 
                onClick={() => navigate("/admin/orders")}
            />


            <h1 className={styles.title}>
                Заказ №{order.id}
            </h1>


            <div>
                <p>ID пользователя: {order.user.id}</p>
                <p>Имя: {order.user.name}</p>
                <p>Email: {order.user.email}</p>

                <p>
                    Дата:
                    {" "}
                    {new Date(order.date).toLocaleString()}
                </p>

                <p>
                    Статус: {order.status}
                </p>

                <p>
                    Сумма: {order.totalPrice} ₽
                </p>
            </div>


            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>


                <tbody>
                    {order.items.map((item) => (
                        <tr 
                            key={item.productId}
                            className={styles.tableRow}
                        >
                            <td>
                                {item.productId}
                            </td>

                            <td>
                                {item.quantity}
                            </td>

                            <td>
                                {item.price} ₽
                            </td>

                            <td>
                                {item.price * item.quantity} ₽
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
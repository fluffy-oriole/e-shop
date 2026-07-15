import styles from './Admin.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


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


    useEffect(() => {
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


        if (user_id) {
            getCart();
        }

    }, [user_id]);


    if (error) {
        return <p>{error}</p>;
    }


    if (!cart) {
        return <p>Загрузка...</p>;
    }


    return (
        <div>
            <ChevronLeft size={18} onClick={() => {navigate("/admin/carts")}}></ChevronLeft>
            <h1 className={styles.title}>
                Корзина пользователя
            </h1>


            <div>
                <p>ID: {cart.user.id}</p>
                <p>Name: {cart.user.name}</p>
                <p>Email: {cart.user.email}</p>
            </div>


            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHead}>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Added date</th>
                    </tr>
                </thead>


                <tbody>
                    {cart.items.map((item) => (
                        <tr 
                            key={item.productId}
                            className={styles.tableRow}
                        >
                            <td>{item.productId}</td>
                            <td>{item.quantity}</td>
                            <td>
                                {new Date(item.addedAt).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
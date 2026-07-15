import styles from './Admin.module.css';
import { useEffect, useState } from 'react';

interface CartItem {
    productId: number;
    quantity: number;
    addedAt: string;
}

interface Cart {
    user: {
        id: string;
        name: string;
        email: string;
    };
    items: CartItem[];
}

interface CartsResponse {
    carts: Cart[];
}

export default function Admin() {
    const [carts, setCarts] = useState<CartsResponse | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const getAdminData = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/carts`,
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

            setCarts(data);
        };

        getAdminData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1 className={styles.title}>Корзины</h1>
            {carts && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Products</th>
                        </tr>
                    </thead>

                    <tbody>
                        {carts.carts.map((cart) => (
                            <tr key={cart.user.id} className={styles.tableRow}>
                                <td>{cart.user.id}</td>
                                <td>{cart.user.name}</td>
                                <td>{cart.user.email}</td>

                                <td>
                                    {cart.items.map((item) => (
                                        <div key={item.productId}>
                                            <p>
                                                Product ID: {item.productId}
                                            </p>
                                            <p>
                                                Quantity: {item.quantity}
                                            </p>
                                            <p>
                                                Added: {new Date(item.addedAt).toLocaleString()}
                                            </p>
                                            <hr />
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
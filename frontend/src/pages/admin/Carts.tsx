import styles from './Admin.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface Cart {
    user_id: string;
    name: string;
    email: string;
    items_count: number;
}

interface CartsResponse {
    carts: Cart[];
}

export default function Admin() {
    const [carts, setCarts] = useState<CartsResponse | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();


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
            <h1 className={styles.title}>
                Корзины пользователей
            </h1>

            {carts && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Products count</th>
                        </tr>
                    </thead>

                    <tbody>
                        {carts.carts.map((cart) => (
                            <tr 
                                key={cart.user_id}
                                className={styles.tableRow}
                                onClick={() => navigate(`/admin/carts/${cart.user_id}`)}
                            >
                                <td>{cart.user_id}</td>
                                <td>{cart.name}</td>
                                <td>{cart.email}</td>
                                <td>{cart.items_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
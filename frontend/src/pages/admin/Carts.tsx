import styles from './Admin.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Cart {
    user_id: string;
    name: string;
    email: string;
    items_count: number;
}

interface CartsResponse {
    carts: Cart[];
}

export default function AdminCarts() {
    const [carts, setCarts] = useState<CartsResponse | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        return <div className={styles.wrapper}><p className={styles.error}>{error}</p></div>;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.pageTitle}>{t("userCarts")}</h1>
            {carts && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>{t("userId")}</th>
                            <th>{t("name")}</th>
                            <th>{t("email")}</th>
                            <th>{t("productsCount")}</th>
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
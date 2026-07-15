import styles from './Admin.module.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    emailVerified: boolean;
    banned: boolean;
    createdAt: string;
    updatedAt: string;
    image: string | null;
    banReason: string | null;
    banExpires: string | null;
}

interface UsersResponse {
    users: User[];
}

export default function AdminUsers() {
    const [users, setUsers] = useState<UsersResponse | null>(null);
    const [error, setError] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        const getAdminData = async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/admin/users`,
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
            setUsers(data);
        };
        getAdminData();
    }, []);

    if (error) {
        return <div className={styles.wrapper}><p className={styles.error}>{error}</p></div>;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.pageTitle}>{t("users")}</h1>
            {users && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>ID</th>
                            <th>{t("name")}</th>
                            <th>{t("email")}</th>
                            <th>{t("role")}</th>
                            <th>{t("verified")}</th>
                            <th>{t("banned")}</th>
                            <th>{t("created")}</th>
                            <th>{t("updated")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users.map((user) => (
                            <tr key={user.id} className={styles.tableRow}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.emailVerified ? (
                                        <Check size={14} className={styles.iconVerified} />
                                    ) : (
                                        <X size={14} className={styles.iconNotVerified} />
                                    )}
                                </td>
                                <td>
                                    {user.banned ? (
                                        <Check size={14} className={styles.iconVerified} />
                                    ) : (
                                        <X size={14} className={styles.iconNotVerified} />
                                    )}
                                </td>
                                <td>{new Date(user.createdAt).toLocaleString()}</td>
                                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
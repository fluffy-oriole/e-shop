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

export default function Admin() {
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
            <h1 className={styles.title}>Пользователи</h1>
            {users && (
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.tableHead}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Verified</th>
                            <th>Banned</th>
                            <th>Created</th>
                            <th>Updated</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.users.map((user: any) => (
                            <tr key={user.id} className={styles.tableRow}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.emailVerified ? <Check size={10}></Check> : <X size={14}></X>}</td>
                                <td>{user.banned ? <Check size={10}></Check> : <X size={14}></X>}</td>
                                <td>
                                    {new Date(user.createdAt).toLocaleString()}
                                </td>
                                <td>
                                    {new Date(user.updatedAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
import styles from './Admin.module.css';
import { authClient } from '../lib/authClient';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Admin() {
    const session = authClient.useSession();
    const i18n = useTranslation();

    const [adminData, setAdminData] = useState(null);
    const [error, setError] = useState("");

    const isLogged = session.data !== null;
    const isAdmin = session.data?.user.role === "admin";

    useEffect(() => {
        if (!isAdmin) return;

        const getAdminData = async () => {
            const response = await fetch(
                "http://localhost:3000/api/admin/",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setAdminData(data);
        };

        getAdminData();
    }, [isAdmin]);


    if (!isLogged) {
        return <p>{i18n.t("pleaseLogIn")}</p>;
    }

    if (!isAdmin) {
        return <p>{i18n.t("adminOnly")}</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <p>Admin page</p>

            {adminData && (
                <pre>
                    {JSON.stringify(adminData, null, 2)}
                </pre>
            )}
        </div>
    );
}
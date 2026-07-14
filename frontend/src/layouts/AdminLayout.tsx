import styles from './AdminLayout.module.css';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
    return (
        <>
            <Outlet />
        </>
    )
}
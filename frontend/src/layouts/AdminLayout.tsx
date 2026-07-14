import styles from './AdminLayout.module.css';
import { Outlet } from 'react-router-dom';
import GreenButton from '../components/GreenButton';
import { useTranslation } from 'react-i18next';

export default function AdminLayout() {
    
    return (
        <>
            
            <Outlet />
        </>
    )
}
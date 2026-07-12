import styles from './GreenButton.module.css';

interface GreenButtonProps {
    text: string,
    width?: string,
    onClick: () => void;
}

export default function GreenButton({text, width, onClick}: GreenButtonProps) {
    return (
        <button className={styles.btn} style={{width}} type='button' onClick={onClick}>{text}</button>
    );
}
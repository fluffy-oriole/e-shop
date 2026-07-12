import styles from './EButton.module.css';

interface EButtonProps {
    text: string;
    onClick: () => void;
    width?: string;
}

export default function EButton({text, onClick, width}: EButtonProps) {
    return (
        <button style={{width}}type='button' onClick={onClick} className={styles.eButton}>
            {text}
        </button>
    );
}
import styles from './EButton.module.css';

export default function EButton({text, onClick}) {
    return (
        <button type='button' onClick={onClick} className={styles.eButton}>
            {text}
        </button>
    );
}
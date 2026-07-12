import styles from "./RedButton.module.css";

interface RedButtonProps {
    text: string;
    onClick: () => void;
    width?: string;
}

export default function RedButton({text, onClick, width}: RedButtonProps) {
    return (
        <button className={styles.redButton} style={{width}} type="button" onClick={onClick}>{text}</button>
    );
}
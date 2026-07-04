import styles from "./RedButton.module.css";

export default function RedButton({text, onClick, width}) {
    return (
        <button className={styles.redButton} style={{width}} type="button" onClick={onClick}>{text}</button>
    );
}
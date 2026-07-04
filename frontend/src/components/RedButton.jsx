import styles from "./RedButton.module.css";

export default function RedButton({text, onClick}) {
    return (
        <button className={styles.redButton} type="button" onClick={onClick}>{text}</button>
    );
}
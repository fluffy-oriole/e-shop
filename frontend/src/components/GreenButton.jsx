import styles from './GreenButton.module.css';

export default function GreenButton({text, width, onclick}) {
    reutrn (
        <button className={styles.btn} type='button' onclick={onclick}>{text}</button>
    );
}
import styles from "./CartElement.module.css"

export default function CartElement({ productTitle, productImage, productId, productPrice }) {
    return (
        <div className={styles.frame}>
            <img src="productImage"></img>
            <p>{productTitle}</p>
            <p>{productPrice}₽</p>
            <button>Удалить</button>
        </div>
    )
}
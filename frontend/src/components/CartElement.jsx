import styles from "./CartElement.module.css"

export default function CartElement({ productTitle, productImage, productId, productPrice }) {
    return (
        <div className={styles.frame}>
            <img src={productImage} className={styles.productImg}></img>
            <p>{productTitle}</p>
            <p>{productPrice}₽</p>
            <button>Удалить</button>
        </div>
    )
}
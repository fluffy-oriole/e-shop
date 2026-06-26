import './ProductCard.css'

function ProductCard({ productTitle, productImage, productId, productPrice }) {
    return (
    <div className="product-card">
        <img src={productImage} alt={productTitle} className="product-image"/>
        <h3 className="product-title">{productTitle}</h3>
        <p className="product-price">{productPrice}$</p>
         <button className="open">Open</button>
         <button className="close">Add to shopping Cart</button>
    </div>
    )
}

export default ProductCard
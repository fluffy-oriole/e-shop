import styles from "./Category.module.css"
import { Link } from 'react-router-dom'

export default function Category({category}) {
    return (
        <div className={styles.container}>
            <Link to={`/${category}`} >{category}</Link>
        </div>
    )
}
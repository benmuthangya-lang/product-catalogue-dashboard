import { ArrowIcon } from './Icons.jsx'
import { formatCategory } from '../utils/format.js'

export default function ProductCard({ product, onView }) {
  const lowStock = product.stock <= 10
  const stockLabel = product.stock === 0
    ? 'Out of stock'
    : lowStock ? `Only ${product.stock} left` : `${product.stock} in stock`

  return (
    <article className="product-card">
      <button className="image-button" type="button" onClick={(event) => onView(product, event.currentTarget)} aria-label={`View details for ${product.title}`}>
        <img src={product.thumbnail} alt="" loading="lazy" />
        <span className="category-pill">{formatCategory(product.category)}</span>
      </button>
      <div className="card-content">
        <div className="rating-row">
          <span className="rating"><span aria-hidden="true">★</span> {product.rating.toFixed(1)}</span>
          <span className={lowStock ? 'stock stock-low' : 'stock'}>{stockLabel}</span>
        </div>
        <h2>{product.title}</h2>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className="view-button" type="button" onClick={(event) => onView(product, event.currentTarget)}>
            Details <ArrowIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

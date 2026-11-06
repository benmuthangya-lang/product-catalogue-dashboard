import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, onView }) {
  return (
    <div className="product-grid">
      {products.map((product) => <ProductCard key={product.id} product={product} onView={onView} />)}
    </div>
  )
}

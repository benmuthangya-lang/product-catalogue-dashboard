import { GridIcon, SparkleIcon } from './Icons.jsx'

export default function Header({ productCount }) {
  return (
    <header className="site-header">
      <a className="brand" href="#main-content" aria-label="Catalogue dashboard home">
        <span className="brand-mark"><GridIcon /></span>
        <span>Catalogue<span className="brand-dot">.</span></span>
      </a>
      <div className="header-meta">
        <span className="demo-badge"><SparkleIcon /> Demo data</span>
        <span className="product-count">{productCount || '—'} products</span>
      </div>
    </header>
  )
}

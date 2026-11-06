import { useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Controls from './components/Controls.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Pagination from './components/Pagination.jsx'
import ProductDialog from './components/ProductDialog.jsx'
import { EmptyState, ErrorState, LoadingState } from './components/StatusStates.jsx'
import { useProducts } from './hooks/useProducts.js'

const PAGE_SIZE = 12

export default function App() {
  const { products, status, error, retry } = useProducts()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('name-asc')
  const [page, setPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const dialogTriggerRef = useRef(null)

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  )

  // Filtering the downloaded collection keeps search and category selection global,
  // then sorting and pagination operate on the same complete result set.
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    const result = products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesSearch = !query || [product.title, product.brand, product.category]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase().includes(query))
      return matchesCategory && matchesSearch
    })

    const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })
    return [...result].sort((a, b) => {
      switch (sort) {
        case 'name-desc': return collator.compare(b.title, a.title)
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'rating-asc': return a.rating - b.rating
        case 'rating-desc': return b.rating - a.rating
        default: return collator.compare(a.title, b.title)
      }
    })
  }, [products, search, category, sort])

  const pageCount = Math.ceil(filteredProducts.length / PAGE_SIZE)
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateFilter(setter, value) {
    setter(value)
    setPage(1)
  }

  function openProduct(product, trigger) {
    dialogTriggerRef.current = trigger
    setSelectedProduct(product)
  }

  function clearFilters() {
    setSearch('')
    setCategory('all')
    setPage(1)
  }

  function changePage(nextPage) {
    setPage(nextPage)
    document.getElementById('results-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Header productCount={products.length} />
      <main id="main-content">
        <section className="hero">
          <div>
            <p className="eyebrow">Curated finds · Demo catalogue</p>
            <h1>Good things,<br /><em>thoughtfully found.</em></h1>
          </div>
          <p className="hero-copy">Browse the demo collection. Search by name or brand, then filter and sort your finds.</p>
        </section>

        <Controls
          search={search}
          onSearch={(value) => updateFilter(setSearch, value)}
          category={category}
          onCategory={(value) => updateFilter(setCategory, value)}
          sort={sort}
          onSort={(value) => updateFilter(setSort, value)}
          categories={categories}
        />

        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState message={error} onRetry={retry} />}
        {status === 'success' && (
          <section className="results" aria-labelledby="results-heading">
            <div className="results-header">
              <div>
                <p className="eyebrow">The collection</p>
                <h2 id="results-heading">{filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</h2>
              </div>
              {pageCount > 0 && (
                <p aria-live="polite">Page {page} of {pageCount}</p>
              )}
            </div>
            {visibleProducts.length ? <ProductGrid products={visibleProducts} onView={openProduct} /> : <EmptyState onClear={clearFilters} />}
            <Pagination page={page} pageCount={pageCount} onPage={changePage} />
          </section>
        )}
      </main>
      <Footer />
      <ProductDialog product={selectedProduct} onClose={() => setSelectedProduct(null)} returnFocusRef={dialogTriggerRef} />
    </>
  )
}

import { SearchIcon } from './Icons.jsx'
import { formatCategory } from '../utils/format.js'

export default function Controls({ search, onSearch, category, onCategory, sort, onSort, categories }) {
  return (
    <section className="controls" aria-label="Catalogue filters">
      <label className="search-field">
        <span className="sr-only">Search products</span>
        <SearchIcon />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search the full catalogue…"
        />
        {search && <button className="clear-search" type="button" onClick={() => onSearch('')} aria-label="Clear search">×</button>}
      </label>
      <div className="select-group">
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => onCategory(event.target.value)}>
            <option value="all">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{formatCategory(item)}</option>)}
          </select>
        </label>
        <label>
          <span>Sort by</span>
          <select value={sort} onChange={(event) => onSort(event.target.value)}>
            <option value="name-asc">Name · A–Z</option>
            <option value="name-desc">Name · Z–A</option>
            <option value="price-asc">Price · Low to high</option>
            <option value="price-desc">Price · High to low</option>
            <option value="rating-desc">Rating · Highest</option>
            <option value="rating-asc">Rating · Lowest</option>
          </select>
        </label>
      </div>
    </section>
  )
}

export function LoadingState() {
  return (
    <div className="skeleton-grid" aria-label="Loading products" aria-live="polite">
      {Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index}><div /><span /><span /><span /></div>)}
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-card" role="alert">
      <span className="state-icon">!</span>
      <h2>Catalogue unavailable</h2>
      <p>{message} Check your connection and try again.</p>
      <button type="button" onClick={onRetry}>Retry loading</button>
    </div>
  )
}

export function EmptyState({ onClear }) {
  return (
    <div className="state-card">
      <span className="state-icon">0</span>
      <h2>No products found</h2>
      <p>Try a broader search or choose a different category.</p>
      <button type="button" onClick={onClear}>Clear filters</button>
    </div>
  )
}

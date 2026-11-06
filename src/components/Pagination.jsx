export default function Pagination({ page, pageCount, onPage }) {
  if (pageCount <= 1) return null

  const pages = getVisiblePages(page, pageCount)

  return (
    <nav className="pagination" aria-label="Product pages">
      <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1}>Previous</button>
      <div className="page-list">
        {pages.map((item, index) => item === '…' ? (
          <span className="ellipsis" key={`ellipsis-${index}`}>…</span>
        ) : (
          <button
            type="button"
            key={item}
            className={item === page ? 'active-page' : ''}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPage(item)}
          >{item}</button>
        ))}
      </div>
      <button type="button" onClick={() => onPage(page + 1)} disabled={page === pageCount}>Next</button>
    </nav>
  )
}

function getVisiblePages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

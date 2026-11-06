import { useEffect, useRef } from 'react'
import { CloseIcon } from './Icons.jsx'
import { formatCategory } from '../utils/format.js'

export default function ProductDialog({ product, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (product && dialog && !dialog.open) dialog.showModal()
  }, [product])

  function closeDialog() {
    dialogRef.current?.close()
  }

  function handleClosed() {
    onClose()
    // Native dialogs manage most focus behavior; this guarantees restoration to the exact trigger.
    requestAnimationFrame(() => returnFocusRef.current?.focus())
  }

  if (!product) return null

  const originalPrice = product.discountPercentage > 0 && product.discountPercentage < 100
    ? product.price / (1 - product.discountPercentage / 100)
    : null

  return (
    <dialog ref={dialogRef} className="product-dialog" aria-labelledby="product-dialog-title" onClose={handleClosed}>
      <button className="dialog-close" type="button" onClick={closeDialog} aria-label="Close product details"><CloseIcon /></button>
      <div className="dialog-layout">
        <div className="dialog-image-wrap">
          <img src={product.images?.[0] || product.thumbnail} alt={product.title} />
          <span className="dialog-demo">Demo product</span>
        </div>
        <div className="dialog-content">
          <p className="eyebrow">{formatCategory(product.category)}</p>
          <h2 id="product-dialog-title">{product.title}</h2>
          <div className="dialog-rating"><span aria-hidden="true">★★★★★</span> <strong>{product.rating.toFixed(1)}</strong> / 5</div>
          <p className="description">{product.description}</p>
          <dl className="product-facts">
            {product.brand && <div><dt>Brand</dt><dd>{product.brand}</dd></div>}
            <div><dt>Availability</dt><dd>{product.stock} units</dd></div>
            {product.shippingInformation && <div><dt>Shipping</dt><dd>{product.shippingInformation}</dd></div>}
            {product.warrantyInformation && <div><dt>Warranty</dt><dd>{product.warrantyInformation}</dd></div>}
          </dl>
          <div className="dialog-price-row">
            <div><span className="dialog-price">${product.price.toFixed(2)}</span>{originalPrice && <span className="original-price">${originalPrice.toFixed(2)}</span>}</div>
            {product.discountPercentage > 0 && <span className="discount">Save {product.discountPercentage.toFixed(0)}%</span>}
          </div>
        </div>
      </div>
    </dialog>
  )
}

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=0'

function isValidProduct(product) {
  if (!product || typeof product !== 'object') return false

  const hasRequiredText = ['title', 'category'].every(
    (field) => typeof product[field] === 'string' && product[field].trim().length > 0,
  )
  const hasValidOptionalText = ['brand', 'description', 'thumbnail', 'shippingInformation', 'warrantyInformation']
    .every((field) => product[field] == null || typeof product[field] === 'string')
  const hasValidImages = product.images == null
    || (Array.isArray(product.images) && product.images.every((image) => typeof image === 'string'))
  const hasValidDiscount = product.discountPercentage == null
    || (Number.isFinite(product.discountPercentage) && product.discountPercentage >= 0 && product.discountPercentage <= 100)

  return Number.isInteger(product.id) && product.id > 0
    && hasRequiredText && hasValidOptionalText && hasValidImages && hasValidDiscount
    && Number.isFinite(product.price) && product.price >= 0
    && Number.isFinite(product.rating) && product.rating >= 0 && product.rating <= 5
    && Number.isInteger(product.stock) && product.stock >= 0
}

export async function fetchProducts({ signal } = {}) {
  const response = await fetch(PRODUCTS_URL, { signal })

  if (!response.ok) {
    throw new Error(`The product service returned ${response.status}.`)
  }

  const data = await response.json()

  // Check fields used by the UI before accepting a response. A malformed product
  // should show the recoverable error state rather than crash during rendering.
  if (!Array.isArray(data?.products) || !data.products.every(isValidProduct)) {
    throw new Error('The product service returned incomplete or invalid product data.')
  }

  return data.products
}

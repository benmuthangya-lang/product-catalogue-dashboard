export function formatCategory(category) {
  return category.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

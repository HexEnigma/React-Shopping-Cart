// Formats a number as US dollars, e.g. 59.99 -> "$59.99"
export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
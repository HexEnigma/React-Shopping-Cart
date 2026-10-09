const API_URL = 'https://dummyjson.com/products?limit=30'

const CATEGORY_MAP = {
  smartphones: 'Electronics', laptops: 'Electronics', tablets: 'Electronics',
  'mobile-accessories': 'Electronics',
  'mens-shirts': 'Fashion', 'mens-shoes': 'Fashion', 'mens-watches': 'Fashion',
  'womens-dresses': 'Fashion', 'womens-shoes': 'Fashion', 'womens-bags': 'Fashion',
  'womens-jewellery': 'Fashion', 'womens-watches': 'Fashion', tops: 'Fashion',
  sunglasses: 'Fashion',
  'home-decoration': 'Home', furniture: 'Home', 'kitchen-accessories': 'Home',
  lighting: 'Home',
}

export async function fetchProducts() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  const { products } = await res.json()

  return products.map((p) => ({
    id: p.id,
    title: p.title,
    category: CATEGORY_MAP[p.category] ?? titleCase(p.category),
    price: p.price,
    image: p.thumbnail,
    rating: p.rating,
    discount: p.discountPercentage,
  }))
}

function titleCase(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
import ProductCard from './ProductCard'

function ProductGrid({ products, onViewCart }) {
  if (products.length === 0) {
    return (
      <div className="empty">
        <p className="empty__title">No products match your search</p>
        <p className="empty__hint">Try a different keyword or category.</p>
      </div>
    )
  }

  return (
    <section className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onViewCart={onViewCart} />
      ))}
    </section>
  )
}

export default ProductGrid
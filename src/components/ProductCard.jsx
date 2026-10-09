import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import { FALLBACK_IMAGE } from '../utils/placeholderImage'

function Stars({ rating }) {
  const rounded = Math.round(rating)
  return (
    <span className="stars" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      {'★'.repeat(rounded)}
      <span className="stars__dim">{'★'.repeat(5 - rounded)}</span>
    </span>
  )
}

function ProductCard({ product, onViewCart }) {
  const { addToCart } = useCart()
  const onSale = product.discount >= 10

  return (
    <article className="card">
      <div className="card__media">
        <img
          className="card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = FALLBACK_IMAGE
          }}
        />
        {onSale && (
          <span className="card__badge">−{Math.round(product.discount)}%</span>
        )}
      </div>

      <div className="card__body">
        <span className="card__category">{product.category}</span>
        <h3 className="card__title">{product.title}</h3>
        <Stars rating={product.rating} />
        <p className="card__price">{formatPrice(product.price)}</p>

        <div className="card__actions">
          <button className="btn btn--primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button className="card__view" onClick={onViewCart}>
            View Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
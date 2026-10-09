import { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import CartItem from './CartItem'

const FREE_SHIPPING_THRESHOLD = 50

function Cart({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, clearCart, checkout } = useCart()

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice)
  const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <>
      <div
        className={`overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`cart ${isOpen ? 'open' : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart__header">
          <h2>Your Cart</h2>
          <button className="cart__close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length > 0 && (
          <div className="shipping">
            <p className="shipping__msg">
              {remaining > 0
                ? <>Add <strong>{formatPrice(remaining)}</strong> for free shipping</>
                : <>You've unlocked <strong>free shipping</strong> ✓</>}
            </p>
            <div className="shipping__bar">
              <div className="shipping__fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="cart__empty">
            <div className="cart__empty-icon" aria-hidden="true">🛍️</div>
            <p className="empty__title">Your cart is empty</p>
            <p className="empty__hint">Browse the catalog and add something you love.</p>
            <button className="btn btn--outline" onClick={onClose}>
              Continue shopping
            </button>
          </div>
        ) : (
          <ul className="cart__list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="cart__summary">
            <div className="cart__row">
              <span>Items</span>
              <strong>{totalItems}</strong>
            </div>
            <div className="cart__row cart__row--total">
              <span>Total</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <button className="btn btn--primary btn--lg" onClick={checkout}>
              Checkout
            </button>
            <button className="btn btn--ghost" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Cart
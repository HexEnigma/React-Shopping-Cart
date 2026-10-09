import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import { FALLBACK_IMAGE } from '../utils/placeholderImage'

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

  return (
    <li className="cart-item">
      <img
        className="cart-item__image"
        src={item.image}
        alt={item.title}
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = FALLBACK_IMAGE
        }}
      />
      <div className="cart-item__info">
        <h4>{item.title}</h4>
        <p>{formatPrice(item.price)}</p>
        <div className="qty">
          <button
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity === 1}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.id)}
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item__side">
        <strong>{formatPrice(item.price * item.quantity)}</strong>
        <button
          className="link-btn"
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.title} from cart`}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
import { useCart } from '../hooks/useCart'

function Navbar({ search, onSearchChange, onCartClick }) {
  const { totalItems } = useCart()

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <h1 className="navbar__logo">
          Shop<span>Easy</span>
        </h1>

        <input
          className="navbar__search"
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />

        <button
          className="navbar__cart"
          onClick={onCartClick}
          aria-label={`View cart, ${totalItems} items`}
        >
          <span aria-hidden="true">🛒</span>
          <span className="navbar__cart-text">View Cart</span>
          <span className="navbar__badge">{totalItems}</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
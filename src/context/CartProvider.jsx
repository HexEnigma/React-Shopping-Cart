import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { CartContext } from './cartContext'

const STORAGE_KEY = 'shopping-cart-items'

function loadItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function cartReducer(items, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = items.some((item) => item.id === action.product.id)
      if (exists) {
        return items.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...items, { ...action.product, quantity: 1 }]
    }
    case 'INCREASE':
      return items.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    case 'DECREASE':
      return items.map((item) =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    case 'REMOVE':
      return items.filter((item) => item.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return items
  }
}

function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadItems)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch { /* storage may be unavailable */ }
  }, [items])

  const showToast = useCallback((message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  const addToCart = useCallback((product) => {
    dispatch({ type: 'ADD', product })
    showToast(`${product.title} added to cart`)
  }, [showToast])

  const checkout = useCallback(() => {
    dispatch({ type: 'CLEAR' })
    showToast('Order placed — thanks for shopping! 🎉')
  }, [showToast])

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return {
      items,
      totalItems,
      totalPrice,
      toast,
      addToCart,
      increaseQuantity: (id) => dispatch({ type: 'INCREASE', id }),
      decreaseQuantity: (id) => dispatch({ type: 'DECREASE', id }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      checkout,
    }
  }, [items, toast, addToCart, checkout])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
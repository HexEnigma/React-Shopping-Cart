import { useContext } from 'react'
import { CartContext } from '../context/cartContext'

// Custom hook: gives any component access to the cart state and actions.
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return context
}
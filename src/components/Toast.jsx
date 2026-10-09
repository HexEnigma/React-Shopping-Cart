import { useCart } from '../hooks/useCart'

function Toast() {
  const { toast } = useCart()
  return (
    <div className={`toast ${toast ? 'toast--visible' : ''}`} role="status" aria-live="polite">
      <span className="toast__check" aria-hidden="true">✓</span>
      <span>{toast}</span>
    </div>
  )
}

export default Toast
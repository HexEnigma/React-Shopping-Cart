import { useEffect, useMemo, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import CategoryFilter from './components/CategoryFilter'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import Toast from './components/Toast'
import Footer from './components/Footer'
import { fetchProducts } from './services/products'

function App() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchProducts()
      .then((data) => { if (!cancelled) { setProducts(data); setStatus('ready') } })
      .catch(() => { if (!cancelled) setStatus('error') })
    return () => { cancelled = true }
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(products.map((p) => p.category))],
    [products]
  )

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category
      const matchesSearch = p.title.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  const closeCart = useCallback(() => setIsCartOpen(false), [])
  const openCart = useCallback(() => setIsCartOpen(true), [])

  return (
    <>
      <Navbar search={search} onSearchChange={setSearch} onCartClick={openCart} />
      <main className="container">
        {status === 'ready' && (
          <CategoryFilter
            categories={categories}
            selected={category}
            onSelect={setCategory}
          />
        )}
        {status === 'loading' && <p className="empty">Loading products…</p>}
        {status === 'error' && (
          <div className="empty">
            <p className="empty__title">Couldn't load products</p>
            <p className="empty__hint">Check your connection and refresh.</p>
          </div>
        )}
        {status === 'ready' && (
          <ProductGrid products={visibleProducts} onViewCart={openCart} />
        )}
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={closeCart} />
      <Toast />
    </>
  )
}

export default App
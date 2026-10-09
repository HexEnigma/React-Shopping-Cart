function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__logo">Shop<span>Easy</span></p>
        <p className="footer__note">
          A demo storefront built with React, Vite, and the Context API.
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} ShopEasy</p>
      </div>
    </footer>
  )
}

export default Footer
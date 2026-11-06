export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-brand">Catalogue.</span>
      <p className="footer-copyright">© {new Date().getFullYear()} Benjamin Titus · Portfolio project.</p>
      <p className="footer-attribution">
        Product data supplied by{' '}
        <a href="https://dummyjson.com/docs/products" target="_blank" rel="noreferrer">DummyJSON</a>
        {' '}for demonstration only.
      </p>
    </footer>
  )
}

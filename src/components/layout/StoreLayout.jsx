import { Link, NavLink, Outlet } from "react-router-dom";
import { ShoppingBag, UserRound, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";

export default function StoreLayout() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">SAÚDE COM PROPÓSITO · CUIDADO EM CADA ESCOLHA</div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" onClick={closeMenu}>
            <span className="brand-mark">S</span>
            <span className="brand-copy">
              <strong>Sabryna Dahur</strong>
              <small>Saúde com propósito</small>
            </span>
          </Link>

          <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
            <NavLink to="/" end onClick={closeMenu}>Início</NavLink>
            <NavLink to="/produtos" onClick={closeMenu}>Produtos</NavLink>
            <a href="/#sobre" onClick={closeMenu}>Nossa história</a>
          </nav>

          <div className="header-actions">
            <Link className="icon-link account-link" to="/minha-conta" aria-label="Minha conta">
              <UserRound size={19} /><span>Minha conta</span>
            </Link>
            <Link className="cart-link" to="/carrinho" aria-label={`Carrinho com ${totalItems} itens`}>
              <ShoppingBag size={19} />
              <span className="cart-label">Sacola</span>
              <b>{totalItems}</b>
            </Link>
          </div>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">S</span>
            <span className="brand-copy"><strong>Sabryna Dahur</strong><small>Saúde com propósito</small></span>
          </Link>
          <p>Informação, cuidado e escolhas conscientes.</p>
          <span>© {new Date().getFullYear()} Sabryna Dahur</span>
        </div>
        <div className="container footer-disclaimer">
          Suplementos alimentares não são medicamentos. Consulte os rótulos e as orientações oficiais dos produtos.
        </div>
      </footer>
    </>
  );
}

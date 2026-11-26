import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, LogOut, Store, Settings } from "lucide-react";
import { logoutAdmin, getAdminUsername } from "../../services/adminAuth";

export default function AdminLayout() {
  const navigate = useNavigate();
  function handleLogout() {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  }
  return <div className="admin-shell">
    <aside className="admin-sidebar">
      <Link to="/" className="admin-brand"><span className="brand-mark">S</span><span><strong>Sabryna Dahur</strong><small>Administração</small></span></Link>
      <div className="admin-user-label">LOGADO COMO <strong>{getAdminUsername()}</strong></div>
      <nav>
        <NavLink to="/admin" end><LayoutDashboard/>Visão geral</NavLink>
        <NavLink to="/admin/produtos"><Package/>Produtos</NavLink>
        <NavLink to="/admin/configuracoes"><Settings/>Configurações</NavLink>
      </nav>
      <div className="admin-sidebar-bottom">
        <Link to="/"><Store size={16}/> Ver loja</Link>
        <button onClick={handleLogout}><LogOut size={16}/> Sair do painel</button>
      </div>
    </aside>
    <main className="admin-main"><Outlet /></main>
  </div>;
}

import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { loginAdmin } from "../services/adminAuth";

export default function AdminLogin() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [busy,setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const ok = loginAdmin(username,password);
    setBusy(false);
    if (!ok) { setError("Usuário ou senha incorretos."); return; }
    navigate(location.state?.from || "/admin", { replace:true });
  }

  return <div className="admin-login-page">
    <form className="admin-login-card" onSubmit={submit}>
      <Link to="/" className="admin-login-brand"><span className="brand-mark">S</span><span><strong>Sabryna Dahur</strong><small>PAINEL ADMINISTRATIVO</small></span></Link>
      <div className="admin-login-icon"><LockKeyhole size={24}/></div>
      <h1>Acesso <em>administrativo</em></h1>
      <p>Entre com suas credenciais para gerenciar a loja.</p>
      <label>Usuário<input autoComplete="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Digite seu usuário" required/></label>
      <label>Senha<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Digite sua senha" required/></label>
      {error && <div className="form-error" role="alert">{error}</div>}
      <button className="button button-primary full-button" disabled={busy}>{busy ? "Entrando..." : "Entrar no painel"}</button>
      <div className="admin-login-security"><ShieldCheck size={15}/> Acesso demonstrativo local</div>
    </form>
  </div>;
}

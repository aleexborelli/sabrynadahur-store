import { Link } from "react-router-dom";
export default function Account() {
  return <section className="page-section"><div className="container auth-card"><span className="eyebrow">SUA CONTA</span><h1>Minha <em>conta.</em></h1><p>Em breve você poderá consultar seus dados, endereços, pedidos e rastreamento.</p><Link className="button button-primary" to="/entrar">Entrar ou criar conta</Link></div></section>;
}

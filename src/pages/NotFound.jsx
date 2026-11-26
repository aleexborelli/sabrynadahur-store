import { Link } from "react-router-dom";
export default function NotFound() {
  return <section className="page-section"><div className="container auth-card"><span className="eyebrow">404</span><h1>Página não <em>encontrada.</em></h1><Link className="button button-primary" to="/">Voltar ao início</Link></div></section>;
}

import { Link } from "react-router-dom";
export default function Login() {
  return <section className="page-section"><div className="container auth-card"><span className="eyebrow">ÁREA DO CLIENTE</span><h1>Bem-vinda <em>de volta.</em></h1><p>A autenticação será implementada na etapa de conta do cliente, com backend quando a loja estiver pronta para produção.</p><Link className="button button-primary" to="/produtos">Continuar explorando</Link></div></section>;
}

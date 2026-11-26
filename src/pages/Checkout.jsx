import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { items, subtotal } = useCart();
  return <section className="page-section"><div className="container narrow-container"><div className="page-heading"><span className="eyebrow">FINALIZAÇÃO</span><h1>Concluir <em>pedido.</em></h1><p>O checkout e os meios de pagamento serão implementados na próxima etapa.</p></div>{!items.length ? <div className="catalog-empty"><h3>Adicione produtos antes de finalizar</h3><Link className="button button-primary" to="/produtos">Ir para a loja</Link></div> : <div className="checkout-notice"><LockKeyhole size={25}/><h2>Checkout em construção</h2><p>Esta fundação ainda não processa pagamentos nem coleta dados pessoais. Na próxima etapa vamos implementar endereço, frete, cupons e as simulações de PIX, cartão e boleto.</p><strong>Subtotal atual: {subtotal.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</strong><Link className="button button-secondary" to="/carrinho">Voltar à sacola</Link></div>}</div></section>;
}

import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  return (
    <section className="page-section">
      <div className="container narrow-container">
        <div className="page-heading"><span className="eyebrow">SUA SELEÇÃO</span><h1>Sua <em>sacola.</em></h1><p>Revise os itens antes de continuar.</p></div>
        {!items.length ? <div className="catalog-empty"><div className="empty-icon"><ShoppingBag size={27}/></div><h3>Sua sacola está vazia</h3><p>Quando você adicionar produtos, eles aparecerão aqui.</p><Link className="button button-primary" to="/produtos">Explorar produtos</Link></div> :
          <div className="cart-layout"><div className="cart-items">{items.map(item=><article className="cart-item" key={item.id}><div className="cart-thumb">{item.image ? <img src={item.image} alt=""/> : <ShoppingBag/>}</div><div className="cart-item-info"><h3>{item.name}</h3>{item.variantLabel && <small className="cart-variant">{item.variantLabel}</small>}<strong>{item.price.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</strong><div className="quantity-control"><button onClick={()=>updateQuantity(item.id,item.quantity-1)} aria-label="Diminuir"><Minus size={14}/></button><span>{item.quantity}</span><button onClick={()=>updateQuantity(item.id,item.quantity+1)} aria-label="Aumentar"><Plus size={14}/></button></div></div><button className="remove-button" onClick={()=>removeItem(item.id)} aria-label="Remover produto"><Trash2 size={17}/></button></article>)}</div><aside className="order-summary"><h2>Resumo do pedido</h2><div><span>Subtotal</span><strong>{subtotal.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</strong></div><p>Frete e descontos serão calculados nas próximas etapas.</p><Link className="button button-primary full-button" to="/checkout">Continuar compra</Link></aside></div>
        }
      </div>
    </section>
  );
}

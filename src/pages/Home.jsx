import { ArrowUpRight, Leaf, ShieldCheck, HeartHandshake, MoveRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SectionTitle from "../components/ui/SectionTitle";
import { getProducts } from "../services/products";
import { useCart } from "../contexts/CartContext";

export default function Home() {
  const [products] = useState(() => getProducts().filter(p => p.active));
  const { addItem } = useCart();
  const featured = products.filter(p => p.featured).slice(0,3);
  const displayProducts = featured.length ? featured : products.slice(0,3);

  return <>
    <section className="hero">
      <div className="container hero-layout">
        <div className="hero-content">
          <span className="eyebrow"><Leaf size={15} /> UMA ESCOLHA MAIS CONSCIENTE</span>
          <h1>Seu bem-estar merece <em>atenção de verdade.</em></h1>
          <p>Conheça a seleção de produtos TopNutrix apresentada por Sabryna Dahur. Explore as opções, consulte informações e escolha com consciência.</p>
          <div className="hero-buttons"><Link className="button button-primary" to="/produtos">Explorar produtos <ArrowUpRight size={17} /></Link><a className="button button-secondary" href="#sobre">Conheça a Sabryna</a></div>
          <div className="hero-note"><span /> Informação, cuidado e escolhas conscientes.</div>
        </div>
        <div className="hero-art"><div className="hero-image-placeholder"><div className="placeholder-seal"><Leaf size={28}/></div><span>ESPAÇO PARA FOTO DA MARCA</span><small>Vamos inserir as fotos oficiais na próxima etapa</small></div><div className="hero-floating-note"><span>✳</span><div><strong>Seu cuidado começa na escolha</strong><small>Conheça os produtos e suas informações.</small></div></div></div>
      </div>
    </section>
    <section className="benefits-strip"><div className="container benefits-grid"><div><Leaf/><span><strong>Escolhas conscientes</strong><small>Conheça antes de comprar.</small></span></div><div><HeartHandshake/><span><strong>Cuidado individual</strong><small>Seus objetivos importam.</small></span></div><div><ShieldCheck/><span><strong>Compra com informação</strong><small>Detalhes claros dos produtos.</small></span></div></div></section>
    <section className="home-products section-space"><div className="container">
      <div className="products-heading-row"><SectionTitle eyebrow="CONHEÇA AS OPÇÕES" title={<>Descubra o que combina<br/>com a sua rotina.</>} description="Explore os produtos disponíveis, compare opções e conheça os detalhes de cada item."/><Link className="text-link" to="/produtos">Ver todos os produtos <MoveRight size={17}/></Link></div>
      {displayProducts.length ? <div className="store-product-grid home-store-grid">{displayProducts.map(p=><article className="store-product-card" key={p.id}><Link to={`/produtos/${p.id}`} className="store-product-image">{p.image?<img src={p.image} alt={p.name}/>:<Leaf size={35}/>}</Link><div className="store-product-info"><small>{p.category||"TopNutrix"}</small><h3>{p.name}</h3><p>{p.description}</p><div className="store-product-bottom"><strong>{Number(p.price).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</strong><button onClick={()=>addItem({id:p.id,name:p.name,price:Number(p.price),image:p.image||""})} disabled={Number(p.stock)<=0}><ShoppingBag size={15}/>Adicionar</button></div></div></article>)}</div>
      : <div className="catalog-empty"><div className="empty-icon"><Leaf size={27}/></div><h3>Estamos preparando nossa seleção</h3><p>Cadastre os produtos no painel administrativo para que eles apareçam automaticamente nesta vitrine.</p><Link className="button button-primary" to="/produtos">Conhecer a loja <ArrowUpRight size={17}/></Link></div>}
    </div></section>
    <section className="about-band" id="sobre"><div className="container about-band-inner"><div className="about-monogram">S<span>✳</span></div><div><span className="eyebrow">PRAZER, SOU A SABRYNA</span><h2>Por trás de cada escolha,<br/>existe uma <em>pessoa.</em></h2><p>Uma experiência de compra baseada em informação, atenção e escolhas conscientes.</p></div></div></section>
  </>;
}

import { Search, SlidersHorizontal, Leaf, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/products";
import { useCart } from "../contexts/CartContext";

export default function Catalog() {
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("Todos");
  const [objective,setObjective]=useState("Todos");
  const [sort,setSort]=useState("relevance");
  const [products]=useState(()=>getProducts().filter(p=>p.active));
  const {addItem}=useCart();
  const categories=["Todos",...new Set(products.map(p=>p.category).filter(Boolean))];
  const objectives=["Todos",...new Set(products.map(p=>p.objective).filter(Boolean))];
  const filtered=useMemo(()=>{
    let list=products.filter(p=>
      `${p.name} ${p.description||""} ${p.category||""}`.toLowerCase().includes(query.toLowerCase()) &&
      (category==="Todos"||p.category===category) &&
      (objective==="Todos"||p.objective===objective)
    );
    if(sort==="price-asc") list=[...list].sort((a,b)=>a.price-b.price);
    if(sort==="price-desc") list=[...list].sort((a,b)=>b.price-a.price);
    return list;
  },[products,query,category,objective,sort]);
  return <section className="page-section"><div className="container">
    <div className="page-heading"><span className="eyebrow">LOJA SABRYNA DAHUR</span><h1>Conheça nossos <em>produtos.</em></h1><p>Explore as opções disponíveis e encontre informações para fazer uma escolha consciente.</p></div>
    <div className="catalog-toolbar"><label className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar produto pelo nome..."/></label>
      <label className="filter-box"><SlidersHorizontal size={17}/><select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="filter-box"><select value={objective} onChange={e=>setObjective(e.target.value)}>{objectives.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="filter-box"><select value={sort} onChange={e=>setSort(e.target.value)}><option value="relevance">Relevância</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option></select></label>
    </div>
    {!filtered.length?<div className="catalog-empty catalog-page-empty"><div className="empty-icon"><Leaf size={27}/></div><h3>{products.length?"Nenhum produto encontrado":"Nosso catálogo está sendo preparado"}</h3><p>{products.length?"Tente alterar a busca ou os filtros.":"Os produtos cadastrados e ativos no painel administrativo aparecerão automaticamente aqui."}</p></div>:
      <div className="store-product-grid">{filtered.map(p=><article className="store-product-card" key={p.id}><Link to={`/produtos#${p.id}`} className="store-product-image">{p.image?<img src={p.image} alt={p.name}/>:<Leaf size={35}/>} {p.featured&&<span>Destaque</span>}</Link><div className="store-product-info"><small>{p.category||"TopNutrix"}</small><h3>{p.name}</h3><p>{p.description}</p>{p.flavors?.length>0&&<span className="product-variants">Sabores: {p.flavors.join(", ")}</span>}<div className="store-product-bottom"><strong>{Number(p.price).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</strong><button onClick={()=>addItem({id:p.id,name:p.name,price:Number(p.price),image:p.image||""})} disabled={Number(p.stock)<=0}><ShoppingBag size={15}/>{Number(p.stock)<=0?"Indisponível":"Adicionar"}</button></div></div></article>)}</div>}
  </div></section>;
}

import { Link } from "react-router-dom";
import { PackagePlus, Package, AlertTriangle, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "../services/products";

export default function Admin() {
  const [products,setProducts] = useState([]);
  useEffect(() => {
    const refresh = () => setProducts(getProducts());
    refresh();
    window.addEventListener("focus",refresh);
    return () => window.removeEventListener("focus",refresh);
  },[]);
  const active = products.filter(p=>p.active).length;
  const low = products.filter(p=>Number(p.stock||0) <= Number(p.lowStock||0)).length;
  return <>
    <div className="admin-page-heading"><div><span className="eyebrow">PAINEL DE GESTÃO</span><h1>Visão <em>geral.</em></h1><p>Gerencie o catálogo da loja Sabryna Dahur.</p></div><Link className="button button-primary" to="/admin/produtos/novo"><PackagePlus size={16}/> Novo produto</Link></div>
    <div className="admin-stats-grid">
      <div className="admin-stat"><span>PRODUTOS CADASTRADOS</span><strong>{products.length}</strong><small>Total no catálogo local</small></div>
      <div className="admin-stat"><span>PRODUTOS ATIVOS</span><strong>{active}</strong><small>Visíveis na loja</small></div>
      <div className="admin-stat"><span>ESTOQUE BAIXO / CRÍTICO</span><strong>{low}</strong><small>Produtos no limite configurado</small></div>
    </div>
    <section className="admin-panel">
      <div className="admin-panel-heading"><div><h2>Gerenciamento de produtos</h2><p>Cadastre produtos, imagens, preços, variações e informações nutricionais.</p></div><Link className="text-link" to="/admin/produtos">Abrir catálogo <ArrowUpRight size={16}/></Link></div>
      {products.length ? <div className="admin-recent-list">{products.slice(0,5).map(p=><div key={p.id}><span className="admin-product-mini">{p.image?<img src={p.image} alt=""/>:<Package size={18}/>}</span><span className="admin-recent-name"><strong>{p.name}</strong><small>{p.category || "Sem categoria"}</small></span><b>{Number(p.price||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</b></div>)}</div> : <div className="admin-empty"><Package size={27}/><strong>Nenhum produto cadastrado ainda</strong><span>Comece adicionando o primeiro item do catálogo.</span><Link className="button button-primary" to="/admin/produtos/novo">Cadastrar primeiro produto</Link></div>}
    </section>
    {low>0 && <div className="admin-warning"><AlertTriangle size={18}/>{low} produto(s) com estoque baixo ou crítico. <Link to="/admin/produtos">Ver produtos</Link></div>}
  </>;
}

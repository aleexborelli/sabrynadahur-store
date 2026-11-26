import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Pencil, Trash2, Package, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { deleteProduct, getProducts, setProductStatus } from "../services/products";

export default function AdminProducts() {
  const [products,setProducts] = useState([]);
  const [query,setQuery] = useState("");
  const [status,setStatus] = useState("todos");
  const [confirmId,setConfirmId] = useState(null);
  const refresh = () => setProducts(getProducts());
  useEffect(()=>{refresh();},[]);
  const filtered = useMemo(()=>products.filter(p=>{
    const match = `${p.name} ${p.sku||""} ${p.category||""}`.toLowerCase().includes(query.toLowerCase());
    return match && (status==="todos" || (status==="ativos" ? p.active : !p.active));
  }),[products,query,status]);
  function remove(id) {
    deleteProduct(id);
    setConfirmId(null);
    refresh();
  }
  function toggle(p) {
    setProductStatus(p.id,!p.active);
    refresh();
  }
  return <>
    <div className="admin-page-heading"><div><span className="eyebrow">CATÁLOGO</span><h1>Produtos.</h1><p>Cadastre e mantenha os produtos disponíveis na loja.</p></div><Link className="button button-primary" to="/admin/produtos/novo"><Plus size={17}/> Novo produto</Link></div>
    <div className="admin-list-toolbar"><label className="admin-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por nome, SKU ou categoria..."/></label><select value={status} onChange={e=>setStatus(e.target.value)}><option value="todos">Todos os produtos</option><option value="ativos">Ativos</option><option value="inativos">Inativos</option></select></div>
    <div className="admin-table-wrap">
      <table className="admin-products-table"><thead><tr><th>PRODUTO</th><th>SKU / CATEGORIA</th><th>PREÇO</th><th>ESTOQUE</th><th>STATUS</th><th>AÇÕES</th></tr></thead>
      <tbody>{filtered.map(p=><tr key={p.id}><td><div className="admin-table-product"><span>{p.image?<img src={p.image} alt=""/>:<Package size={19}/>}</span><strong>{p.name}</strong></div></td><td><span>{p.sku||"—"}</span><small>{p.category||"Sem categoria"}</small></td><td>{Number(p.price||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</td><td><span className={Number(p.stock)<=Number(p.lowStock||0)?"stock-low":""}>{p.stock ?? 0}</span>{Number(p.stock)<=Number(p.lowStock||0)&&<small className="stock-alert"><AlertTriangle size={12}/> Estoque baixo</small>}</td><td><span className={`status-pill ${p.active?"is-active":"is-inactive"}`}>{p.active?"Ativo":"Inativo"}</span></td><td><div className="admin-row-actions"><Link to={`/admin/produtos/${p.id}`} title="Editar"><Pencil size={16}/></Link><button onClick={()=>toggle(p)} title={p.active?"Desativar":"Ativar"}>{p.active?<EyeOff size={16}/>:<Eye size={16}/>}</button><button className="danger-action" onClick={()=>setConfirmId(p.id)} title="Excluir"><Trash2 size={16}/></button></div>{confirmId===p.id&&<div className="delete-confirm"><span>Excluir este produto?</span><button onClick={()=>remove(p.id)}>Sim</button><button onClick={()=>setConfirmId(null)}>Não</button></div>}</td></tr>)}</tbody></table>
      {!filtered.length&&<div className="admin-empty"><Package size={27}/><strong>{products.length?"Nenhum resultado encontrado":"Seu catálogo está vazio"}</strong><span>{products.length?"Tente mudar os filtros.":"Cadastre os produtos reais para começar a montar a loja."}</span>{!products.length&&<Link className="button button-primary" to="/admin/produtos/novo">Cadastrar produto</Link>}</div>}
    </div>
  </>;
}

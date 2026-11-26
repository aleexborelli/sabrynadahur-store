import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Leaf, Minus, Plus, ShoppingBag } from "lucide-react";
import { getProducts } from "../services/products";
import { useCart } from "../contexts/CartContext";

const money = value => Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(() => getProducts().find(item => item.id === id && item.active), [id]);
  const { addItem } = useCart();
  const [flavor, setFlavor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <section className="page-section"><div className="container narrow-container"><div className="catalog-empty"><div className="empty-icon"><Leaf size={27}/></div><h3>Produto não encontrado</h3><p>Este produto pode ter sido removido ou não está disponível no momento.</p><Link className="button button-primary" to="/produtos">Voltar ao catálogo</Link></div></div></section>;
  }

  const stock = Math.max(0, Number(product.stock) || 0);
  const options = [flavor, size].filter(Boolean);
  const variantLabel = options.join(" · ");
  const cartId = options.length ? [product.id, flavor, size].join("::") : product.id;

  function handleAdd() {
    addItem({
      id: cartId,
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image || "",
      variantLabel
    }, quantity);
    setAdded(true);
  }

  return <section className="page-section product-detail-page">
    <div className="container">
      <Link className="product-back-link" to="/produtos"><ArrowLeft size={15}/> Voltar aos produtos</Link>
      <div className="product-detail-layout">
        <div className="product-detail-image">
          {product.image ? <img src={product.image} alt={product.name}/> : <Leaf size={54}/>}
          {product.featured && <span className="product-detail-badge">Destaque</span>}
        </div>
        <div className="product-detail-content">
          <span className="eyebrow">{product.category || "TOPNUTRIX"}{product.objective ? ` · ${product.objective}` : ""}</span>
          <h1>{product.name}</h1>
          {product.description && <p className="product-detail-summary">{product.description}</p>}
          <div className="product-detail-price">
            <strong>{money(product.price)}</strong>
            {Number(product.compareAtPrice) > Number(product.price) && <del>{money(product.compareAtPrice)}</del>}
          </div>
          <p className={stock > 0 ? "product-stock available" : "product-stock unavailable"}>{stock > 0 ? `Disponível · ${stock} em estoque` : "Produto indisponível no momento"}</p>
          {product.flavors?.length > 0 && <label className="product-option"><span>Escolha o sabor</span><select value={flavor} onChange={e=>{setFlavor(e.target.value);setAdded(false);}}><option value="">Selecione um sabor</option>{product.flavors.map(item=><option key={item} value={item}>{item}</option>)}</select></label>}
          {product.sizes?.length > 0 && <label className="product-option"><span>Escolha o tamanho / peso</span><select value={size} onChange={e=>{setSize(e.target.value);setAdded(false);}}><option value="">Selecione uma opção</option>{product.sizes.map(item=><option key={item} value={item}>{item}</option>)}</select></label>}
          <div className="product-buy-row">
            <div className="product-quantity"><button type="button" onClick={()=>setQuantity(v=>Math.max(1,v-1))} aria-label="Diminuir quantidade"><Minus size={14}/></button><span>{quantity}</span><button type="button" onClick={()=>setQuantity(v=>Math.min(Math.max(1,stock),v+1))} disabled={stock===0||quantity>=stock} aria-label="Aumentar quantidade"><Plus size={14}/></button></div>
            <button className="button button-primary product-add-button" onClick={handleAdd} disabled={stock===0 || (product.flavors?.length>0&&!flavor) || (product.sizes?.length>0&&!size)}><ShoppingBag size={16}/> Adicionar à sacola</button>
          </div>
          {added && <div className="product-added-message"><Check size={16}/> Produto adicionado à sacola. <Link to="/carrinho">Ver sacola</Link></div>}
          <div className="product-detail-note"><Leaf size={17}/><span>Consulte sempre o rótulo e as orientações oficiais do fabricante antes de utilizar o produto.</span></div>
        </div>
      </div>
      <div className="product-information-grid">
        <section className="product-information-card"><span className="eyebrow">SOBRE O PRODUTO</span><h2>Descrição e detalhes</h2><p>{product.details || product.description || "As informações detalhadas deste produto serão disponibilizadas em breve."}</p></section>
        <section className="product-information-card"><span className="eyebrow">COMPOSIÇÃO</span><h2>Ingredientes</h2><p>{product.ingredients || "Consulte a embalagem do produto para conferir a lista completa de ingredientes."}</p></section>
        <section className="product-information-card"><span className="eyebrow">ORIENTAÇÕES</span><h2>Modo de uso</h2><p>{product.usage || "Siga as orientações descritas no rótulo oficial do fabricante."}</p>{product.warnings && <><h3>Advertências e alergênicos</h3><p>{product.warnings}</p></>}</section>
      </div>
      {(product.servingSize || product.servingsPerContainer || product.calories || product.protein || product.carbs || product.totalFat || product.sodium) && <section className="nutrition-panel"><span className="eyebrow">INFORMAÇÃO DO RÓTULO</span><h2>Informações nutricionais</h2>{product.servingSize && <p className="nutrition-serving">Porção: {product.servingSize}{product.servingsPerContainer ? ` · ${product.servingsPerContainer} porções por embalagem` : ""}</p>}<div className="nutrition-grid">{[["Valor energético",product.calories,"kcal"],["Proteínas",product.protein,"g"],["Carboidratos",product.carbs,"g"],["Gorduras totais",product.totalFat,"g"],["Sódio",product.sodium,"mg"]].filter(([,value])=>value!==""&&value!=null).map(([label,value,unit])=><div key={label}><span>{label}</span><strong>{value} {unit}</strong></div>)}</div><small>Valores informados conforme cadastro do produto. Confira sempre a embalagem.</small></section>}
      <div className="product-detail-footer"><Link className="text-link" to="/produtos"><ArrowLeft size={15}/> Continuar explorando produtos</Link></div>
    </div>
  </section>;
}
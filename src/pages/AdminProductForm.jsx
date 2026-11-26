import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react";
import { createProductId, getProducts, saveProduct } from "../services/products";

const empty = {
  name:"", sku:"", category:"", objective:"", description:"", details:"",
  price:"", compareAtPrice:"", stock:"0", lowStock:"5", active:true, featured:false,
  image:"", flavors:"", sizes:"", ingredients:"", usage:"", warnings:"",
  servingSize:"", servingsPerContainer:"", calories:"", protein:"", carbs:"",
  totalFat:"", sodium:""
};

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [form,setForm] = useState(empty);
  const [error,setError] = useState("");
  const [saving,setSaving] = useState(false);

  useEffect(()=>{
    if(!editing) return;
    const product=getProducts().find(p=>p.id===id);
    if(!product){setError("Produto não encontrado.");return;}
    setForm({...empty,...product,
      flavors:Array.isArray(product.flavors)?product.flavors.join(", "):product.flavors||"",
      sizes:Array.isArray(product.sizes)?product.sizes.join(", "):product.sizes||""
    });
  },[id,editing]);

  function change(key,value){setForm(current=>({...current,[key]:value}));}
  async function handleImage(event) {
    const file=event.target.files?.[0];
    if(!file) return;
    if(!file.type.startsWith("image/")){setError("Selecione um arquivo de imagem.");return;}
    if(file.size>8*1024*1024){setError("A imagem deve ter no máximo 8 MB.");return;}
    try {
      const data=await new Promise((resolve,reject)=>{
        const reader=new FileReader();
        reader.onload=()=>resolve(reader.result);
        reader.onerror=reject;
        reader.readAsDataURL(file);
      });
      const image=await new Promise((resolve,reject)=>{
        const img=new Image();
        img.onload=()=>{
          const max=1000, scale=Math.min(1,max/Math.max(img.width,img.height));
          const canvas=document.createElement("canvas");
          canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
          canvas.getContext("2d").drawImage(img,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL("image/jpeg",0.82));
        };
        img.onerror=reject;img.src=data;
      });
      change("image",image);setError("");
    } catch { setError("Não foi possível carregar essa imagem."); }
  }

  function submit(event){
    event.preventDefault();setError("");
    if(!form.name.trim()){setError("Informe o nome do produto.");return;}
    if(form.price===""||Number(form.price)<0){setError("Informe um preço válido.");return;}
    setSaving(true);
    const product={
      ...form,
      id:id||createProductId(),
      name:form.name.trim(),
      price:Number(form.price),
      compareAtPrice:form.compareAtPrice===""?"":Number(form.compareAtPrice),
      stock:Math.max(0,Number(form.stock)||0),
      lowStock:Math.max(0,Number(form.lowStock)||0),
      flavors:form.flavors.split(",").map(s=>s.trim()).filter(Boolean),
      sizes:form.sizes.split(",").map(s=>s.trim()).filter(Boolean),
      active:Boolean(form.active),featured:Boolean(form.featured)
    };
    try { saveProduct(product); navigate("/admin/produtos"); }
    catch { setError("Não foi possível salvar. O armazenamento local pode estar cheio; tente reduzir o tamanho das imagens."); }
    finally { setSaving(false); }
  }

  const Field=({label,name,type="text",placeholder="",required=false,help=""})=><label className="admin-form-field"><span>{label}{required&&" *"}</span><input type={type} value={form[name]??""} onChange={e=>change(name,e.target.value)} placeholder={placeholder} required={required} min={type==="number"?"0":undefined} step={type==="number"?(name==="stock"||name==="lowStock"?"1":"0.01"):undefined}/>{help&&<small>{help}</small>}</label>;
  const Area=({label,name,placeholder=""})=><label className="admin-form-field admin-form-full"><span>{label}</span><textarea rows="3" value={form[name]||""} onChange={e=>change(name,e.target.value)} placeholder={placeholder}/></label>;

  return <>
    <div className="admin-page-heading"><div><Link className="admin-back-inline" to="/admin/produtos"><ArrowLeft size={15}/> Voltar aos produtos</Link><span className="eyebrow">{editing?"EDIÇÃO DE PRODUTO":"NOVO CADASTRO"}</span><h1>{editing?"Editar produto.":"Cadastrar produto."}</h1><p>Preencha as informações do produto. Campos com * são obrigatórios.</p></div></div>
    <form className="admin-product-form" onSubmit={submit}>
      <section className="admin-form-section"><div className="admin-form-section-title"><h2>Informações principais</h2><p>Nome, categoria e apresentação do produto.</p></div><div className="admin-form-grid">
        {Field({label:"Nome do produto", name:"name", placeholder:"Ex.: Nome oficial do suplemento", required:true})}
        {Field({label:"SKU / Código interno", name:"sku", placeholder:"Ex.: TOP-001"})}
        {Field({label:"Categoria", name:"category", placeholder:"Ex.: Bem-estar, Energia, Nutrição"})}
        {Field({label:"Objetivo nutricional", name:"objective", placeholder:"Ex.: Proteína, vitaminas, desempenho"})}
        {Area({label:"Descrição curta", name:"description", placeholder:"Resumo que aparecerá no catálogo."})}
        {Area({label:"Descrição completa", name:"details", placeholder:"Informações detalhadas e diferenciais conforme fabricante."})}
      </div></section>
      <section className="admin-form-section"><div className="admin-form-section-title"><h2>Imagem do produto</h2><p>Envie uma foto ou informe uma URL pública.</p></div><div className="admin-image-upload">
        <div className="admin-image-preview">{form.image?<><img src={form.image} alt="Prévia do produto"/><button type="button" onClick={()=>change("image","")} aria-label="Remover imagem"><X size={15}/></button></>:<ImagePlus size={30}/>}</div>
        <div className="admin-image-controls"><label className="button button-secondary upload-button"><ImagePlus size={16}/> Enviar imagem<input type="file" accept="image/*" onChange={handleImage} hidden/></label><span>JPG, PNG ou WebP · até 8 MB (a imagem será otimizada).</span>{Field({label:"Ou URL da imagem", name:"image", placeholder:"https://..."})}</div>
      </div></section>
      <section className="admin-form-section"><div className="admin-form-section-title"><h2>Preço e estoque</h2><p>Valores em reais e quantidade disponível.</p></div><div className="admin-form-grid">
        {Field({label:"Preço de venda (R$)", name:"price", type:"number", placeholder:"0,00", required:true})}
        {Field({label:"Preço anterior / promocional (R$)", name:"compareAtPrice", type:"number", placeholder:"Opcional"})}
        {Field({label:"Quantidade em estoque", name:"stock", type:"number"})}
        {Field({label:"Alerta de estoque baixo", name:"lowStock", type:"number", help:"O painel alertará quando o estoque atingir este número."})}
      </div></section>
      <section className="admin-form-section"><div className="admin-form-section-title"><h2>Variações</h2><p>Separe as opções por vírgula. Ex.: Chocolate, Baunilha.</p></div><div className="admin-form-grid">
        {Field({label:"Sabores disponíveis", name:"flavors", placeholder:"Chocolate, Baunilha, Morango"})}
        {Field({label:"Tamanhos / Pesos", name:"sizes", placeholder:"300 g,  pote 900 g, 1 kg"})}
      </div></section>
      <section className="admin-form-section"><div className="admin-form-section-title"><h2>Informações nutricionais</h2><p>Preencha conforme o rótulo oficial do produto.</p></div><div className="admin-form-grid">
        {Field({label:"Porção", name:"servingSize", placeholder:"Ex.: 30 g (1 dosador)"})}
        {Field({label:"Porções por embalagem", name:"servingsPerContainer", placeholder:"Ex.: 30"})}
        {Field({label:"Valor energético (kcal)", name:"calories", placeholder:"Ex.: 120"})}
        {Field({label:"Proteínas (g)", name:"protein", placeholder:"Ex.: 24"})}
        {Field({label:"Carboidratos (g)", name:"carbs", placeholder:"Ex.: 3"})}
        {Field({label:"Gorduras totais (g)", name:"totalFat", placeholder:"Ex.: 1,5"})}
        {Field({label:"Sódio (mg)", name:"sodium", placeholder:"Ex.: 80"})}
        {Area({label:"Ingredientes", name:"ingredients", placeholder:"Transcreva a lista de ingredientes do rótulo."})}
        {Area({label:"Sugestão / modo de uso do fabricante", name:"usage", placeholder:"Use somente as orientações oficiais do rótulo."})}
        {Area({label:"Advertências e alergênicos", name:"warnings", placeholder:"Informações de alergênicos, restrições e advertências do rótulo."})}
      </div></section>
      <section className="admin-form-section"><div className="admin-form-section-title"><h2>Publicação</h2><p>Controle a exibição do produto na loja.</p></div><div className="admin-checks"><label><input type="checkbox" checked={form.active} onChange={e=>change("active",e.target.checked)}/> Produto ativo e visível na loja</label><label><input type="checkbox" checked={form.featured} onChange={e=>change("featured",e.target.checked)}/> Destacar na página inicial</label></div></section>
      {error&&<div className="form-error" role="alert">{error}</div>}
      <div className="admin-form-actions"><Link className="button button-secondary" to="/admin/produtos">Cancelar</Link><button className="button button-primary" disabled={saving}><Save size={16}/>{saving?"Salvando...":"Salvar produto"}</button></div>
    </form>
  </>;
}

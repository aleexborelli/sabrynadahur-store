import { useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { changeAdminCredentials, getAdminUsername } from "../services/adminAuth";

export default function AdminSettings(){
  const [username,setUsername]=useState(getAdminUsername());
  const [current,setCurrent]=useState("");
  const [next,setNext]=useState("");
  const [confirm,setConfirm]=useState("");
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  function submit(e){
    e.preventDefault();setMessage("");setError("");
    if(next.length<8){setError("A nova senha precisa ter pelo menos 8 caracteres.");return;}
    if(next!==confirm){setError("A confirmação da senha não confere.");return;}
    if(!changeAdminCredentials(current,username,next)){setError("Senha atual incorreta ou usuário inválido.");return;}
    setCurrent("");setNext("");setConfirm("");setMessage("Credenciais atualizadas neste navegador.");
  }
  return <>
    <div className="admin-page-heading"><div><span className="eyebrow">SEGURANÇA</span><h1>Configurações.</h1><p>Altere as credenciais locais de acesso ao painel.</p></div></div>
    <form className="admin-settings-card" onSubmit={submit}>
      <div className="admin-settings-icon"><KeyRound/></div><h2>Credenciais administrativas</h2>
      <p>Altere o usuário e a senha utilizados neste navegador.</p>
      <label className="admin-form-field"><span>Novo usuário</span><input value={username} onChange={e=>setUsername(e.target.value)} required/></label>
      <label className="admin-form-field"><span>Senha atual</span><input type="password" value={current} onChange={e=>setCurrent(e.target.value)} required autoComplete="current-password"/></label>
      <label className="admin-form-field"><span>Nova senha</span><input type="password" value={next} onChange={e=>setNext(e.target.value)} required minLength="8" autoComplete="new-password"/></label>
      <label className="admin-form-field"><span>Confirmar nova senha</span><input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required minLength="8" autoComplete="new-password"/></label>
      {error&&<div className="form-error">{error}</div>}{message&&<div className="form-success"><ShieldCheck size={16}/>{message}</div>}
      <button className="button button-primary">Salvar credenciais</button>
      <div className="admin-security-warning"><ShieldCheck size={16}/> Esta autenticação é apenas demonstrativa. A senha fica no armazenamento local do navegador e não oferece segurança para uma loja publicada. Antes de produção, será obrigatório migrar a autenticação para o backend.</div>
    </form>
  </>;
}

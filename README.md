# Sabryna Dahur — Loja Virtual

Projeto React + Vite com JavaScript (sem TypeScript).

## Requisitos
- Node.js 20.19+ ou 22.12+
- npm

## Instalação e execução
```bash
npm install
npm run dev
```
Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Build
```bash
npm run build
npm run preview
```

## Acesso administrativo demonstrativo
- Endereço: `/admin/login`
- Usuário inicial: `admin`
- Senha inicial: `Sabryna@2026`

Altere as credenciais em **Administração → Configurações** após o primeiro acesso.

## Cadastro e gerenciamento de produtos
No painel, acesse **Produtos → Novo produto**. O formulário permite:
- Nome, SKU, categoria, objetivo nutricional e descrições.
- Imagem por upload (redimensionada/comprimida no navegador) ou URL pública.
- Preço, preço anterior, estoque e limite de alerta.
- Sabores e tamanhos/gramaturas.
- Porção, valor energético, proteínas, carboidratos, gorduras, sódio, ingredientes, modo de uso e advertências.
- Status ativo/inativo e destaque na vitrine.
- Editar, ativar/desativar e excluir produtos.

Produtos ativos são exibidos no catálogo público e a vitrine inicial usa produtos destacados (ou os três primeiros ativos).

## Persistência e limites importantes
Os dados ficam no `localStorage` do navegador. Isso serve para desenvolvimento e testes em um único dispositivo/perfil de navegador. Não há sincronização entre dispositivos ou clientes. Limpar os dados do navegador pode apagar o catálogo e a sessão.

A autenticação administrativa desta versão é apenas demonstrativa: as credenciais ficam no armazenamento local e não oferecem proteção real contra alguém que tenha acesso ao navegador ou aos arquivos da aplicação. Não publique essa versão como loja operacional com dados reais. Antes de produção, implementar backend, autenticação segura com senhas armazenadas por hash, autorização no servidor, banco de dados, upload de imagens e gateway de pagamento.

O checkout permanece em construção; nenhum pagamento real é processado. Dados nutricionais devem ser transcritos fielmente dos rótulos oficiais, sem inventar alegações ou benefícios.

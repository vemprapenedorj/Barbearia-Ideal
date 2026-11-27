# Passo 4 — Otimização On-Page: Barbearia Ideal

> **Arquivo auditado e atualizado:** `site/index.html` (e cópia sincronizada na raiz `index.html`).  
> **Arquivos técnicos gerados:** `robots.txt` e `sitemap.xml`.

---

## 1. Mapeamento de Palavras-Chave & Meta Tags por Página

Como o projeto é uma **Landing Page One-Page de alta velocidade**, toda a força semântica fica concentrada na URL principal (`/`):

| Página / URL | Keyword Principal | Title Otimizado *(58 chars)* | Meta Description Otimizada *(152 chars)* | H1 |
| :--- | :--- | :--- | :--- | :--- |
| `/` (`index.html`) | `barbearia em penedo rj` | `Barbearia Ideal em Penedo, RJ \| Degradê & Ordem de Chegada` | `Barbearia em Penedo (RJ) desde 2014. Corte degradê, barba na navalha e ar-condicionado. Atendimento sem agendamento por ordem de chegada. Venha conhecer!` | `Barbearia em Penedo: Mais que um corte.` |

### Estrutura de Headings (`H1`, `H2`, `H3`) Validada:
- **H1:** `Barbearia em Penedo: Mais que um corte.` *(1 único H1 por página, contendo a keyword principal + cidade)*.
- **H2 (Seções):**
  - `Onde a tradição encontra a modernidade`
  - `Serviços`
  - `Nosso Espaço & Clientes`
  - `Experiência Aprovada`
  - `Horários & Localização`
  - `Perguntas Comuns`
- **H3 (Subitens):** `Espaço Climatizado`, `Café & Bebidas`, `Profissionais Experientes`, `Pontualidade & Agilidade`, `Corte de Cabelo Masculino`, `Barba Tradicional`, `Combo Cabelo + Barba`, `Corte Personalizado & Freestyle`.

---

## 2. Schema Markup (JSON-LD) Aplicado no `<head>`

Implementado e validado com sintaxe JSON-LD oficial (`@type: BarberShop` + `@type: FAQPage` com 5 perguntas frequentes).  
*(Código fonte completo salvo no `<head>` de `site/index.html` e documentado em `seo/08-geo-otimizacao-ia.md`).*

---

## 3. Mapa de Links Internos & Navegação (One-Page)

- **Navbar & Hero:** `#sobre`, `#diferenciais`, `#servicos`, `#galeria`, `#contato`
- **CTAs de Conversão:** Botões diretos para WhatsApp `(24) 99834-4486` e rota direta no Google Maps (`https://maps.app.goo.gl/Y99ynTgvqZY4PNak6`).
- **Footer:** Links rápidos âncora para todas as seções principais + WhatsApp + Instagram `@barbeariaideal2014`.

---

## 4. Checklist Técnico On-Page

| Item Técnico | Status | Observação |
| :--- | :---: | :--- |
| **Title entre 50–60 caracteres** | ✅ **Feito** | Ajustado de 71 para **58 caracteres** com a keyword no início. |
| **Meta Description entre 150–160 caracteres** | ✅ **Feito** | Ajustado de 170 para **152 caracteres** com CTA claro. |
| **Tag Canonical (`<link rel="canonical">`)** | ✅ **Feito** | Adicionada apontando para `https://www.barbeariaideal.com.br/`. |
| **Apenas 1 H1 com keyword principal** | ✅ **Feito** | Atualizado para `"Barbearia em Penedo: Mais que um corte."` |
| **Alt Text em 100% das imagens** | ✅ **Feito** | Todas as 13 imagens possuem atributo `alt` descritivo (sem nenhum vazio). |
| **Open Graph (WhatsApp / Redes Sociais)** | ✅ **Feito** | `og:title`, `og:description`, `og:type`, `og:image` configurados. |
| **Schema JSON-LD (`BarberShop` + `FAQPage`)** | ✅ **Feito** | Inserido no `<head>` e validado sem erros de sintaxe. |
| **`robots.txt` criado** | ✅ **Feito** | Liberado para indexação e apontando para o `sitemap.xml`. |
| **`sitemap.xml` criado** | ✅ **Feito** | Mapa XML da URL principal pronto para envio no Google Search Console. |
| **Mobile-Friendly & Velocidade** | ✅ **Feito** | HTML5/CSS estático puro com `loading="lazy"` nas imagens secundárias. |
| **Links de WhatsApp (`api.whatsapp.com`)** | ⚠️ **Pendente (Opcional)** | Links da seção de localização atualizados; demais botões ainda usam `wa.me` (funcionais, mas padronizar para `api.whatsapp.com` se desejar). |
| **Google Search Console** | ⏳ **Pendente (Pós-publicação)** | Submeter `sitemap.xml` assim que o domínio oficial estiver no ar. |

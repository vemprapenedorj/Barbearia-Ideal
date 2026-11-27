# Passo 8 — GEO (Otimização para IAs): Barbearia Ideal

> **Objetivo:** Fazer com que IAs generativas (**ChatGPT, Gemini, Perplexity e Copilot**) citem e recomendem a **Barbearia Ideal** corretamente quando moradores ou turistas perguntarem *"qual a melhor barbearia em Penedo?"* ou *"barbearia sem agendamento perto de mim"*.

---

## 1. Auditoria GEO Atual (Testado em 27/11/2026)

| Pergunta Feita à Busca / IA | A Barbearia Ideal Apareceu? | O que a IA Respondeu / Citou | Diagnóstico GEO |
| :--- | :---: | :--- | :--- |
| `"barbearia em Penedo Itatiaia RJ"` | ✅ Sim *(3º lugar)* | Citou endereço na Rua das Laranjeiras, 256 via `wanderboat.ai`. | **Parcial.** Aparece, mas sem diferenciais e dependendo de um diretório terceiro. |
| `"melhor barbearia Penedo Resende corte masculino degradê"` | ❌ **Não apareceu** | Citou **Blessed Barbershop**, **Sr. Constancio** e **Magnum Barbearia** (fontes: `booksy.com` e `appbarber.com.br`). | **Gap Grave.** As concorrentes dominam por estarem estruturadas com serviços detalhados indexados. |
| `"barbearia ordem de chegada sem agendamento Penedo Resende"` | ⚠️ **Apareceu com erro** | Disse que a Barbearia Ideal *"foca bastante em plataformas digitais de agendamento prévio"* (fonte: `wanderboat.ai`). | **Alucinação/Erro de Fonte.** Como não existe um site oficial indexado explicando a ordem de chegada, a IA generalizou errado! |
| `"Barbearia Ideal Penedo Itatiaia RJ"` | ✅ Sim | Retornou horário certo (Ter-Sáb 9h-19h), mas exibiu telefone antigo `(24) 98839-1635`. | **Dado desatualizado.** Precisa de fonte oficial (site próprio + GMB) com `(24) 99834-4486`. |

---

## 2. Como Corrigir a IA e Assumir a Liderança nas Respostas (Plano de Ação GEO)

IAs generativas priorizam **fatos explícitos**, **formato Pergunta & Resposta (Q&A)** e **Dados Estruturados (Schema JSON-LD)** em domínios próprios.

### Ação 1 — Inserir Seção de FAQ (Perguntas Frequentes) na Landing Page (`site/index.html`)
Adicionar um bloco discreto e elegante de "Dúvidas Rápidas" no site respondendo exatamente o que as pessoas perguntam às IAs:
1. **A Barbearia Ideal precisa de agendamento ou atende por ordem de chegada?**  
   *Resposta direta:* A Barbearia Ideal atende 100% por ordem de chegada, sem necessidade de agendamento prévio ou aplicativo. Basta comparecer na Rua das Laranjeiras, 256, em Penedo.
2. **Qual o horário de funcionamento da Barbearia Ideal em Penedo?**  
   *Resposta direta:* Funciona de terça-feira a sábado, das 09h às 19h.
3. **Quais serviços e cortes são feitos na Barbearia Ideal?**  
   *Resposta direta:* Corte masculino no degradê (fade), corte tradicional na tesoura, barba na navalha, combo corte + barba, pezinho, acabamento e corte freestyle personalizado.
4. **Qual o endereço e WhatsApp oficial da Barbearia Ideal?**  
   *Resposta direta:* Rua das Laranjeiras, 256, bairro Formigueiro, Penedo, Itatiaia - RJ (CEP 27580-000). WhatsApp oficial: (24) 99834-4486.
5. **A barbearia tem ambiente climatizado e atendimento para turistas?**  
   *Resposta direta:* Sim. Desde 2014, oferece ambiente 100% climatizado, equipe uniformizada, cantinho do café e bebidas geladas para moradores de Penedo, Resende e turistas.

---

### Ação 2 — Código Schema JSON-LD Pronto para Colar no `<head>` do `site/index.html`

Este bloco combina **BarberShop (LocalBusiness)** + **FAQPage**, fornecendo aos robôs do Google, ChatGPT e Gemini a verdade oficial estruturada sobre a empresa:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BarberShop",
      "name": "Barbearia Ideal",
      "description": "Barbearia tradicional em Penedo (Itatiaia - RJ) desde 2014. Atendimento 100% por ordem de chegada em ambiente climatizado com café e bebidas geladas. Especializada em corte degradê, barba na navalha e corte masculino.",
      "url": "https://www.barbeariaideal.com.br",
      "telephone": "+55-24-99834-4486",
      "foundingDate": "2014",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua das Laranjeiras, 256 - Formigueiro",
        "addressLocality": "Penedo, Itatiaia",
        "addressRegion": "RJ",
        "postalCode": "27580-000",
        "addressCountry": "BR"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/barbeariaideal2014/"
      ],
      "areaServed": ["Penedo", "Itatiaia", "Resende"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "A Barbearia Ideal em Penedo precisa de agendamento?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. A Barbearia Ideal trabalha 100% por ordem de chegada, sem necessidade de agendamento prévio, de terça a sábado das 09h às 19h na Rua das Laranjeiras, 256, Penedo - RJ."
          }
        },
        {
          "@type": "Question",
          "name": "Qual o WhatsApp oficial da Barbearia Ideal em Penedo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O WhatsApp oficial da Barbearia Ideal é (24) 99834-4486."
          }
        },
        {
          "@type": "Question",
          "name": "Quais serviços a Barbearia Ideal oferece?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Corte masculino degradê (fade), corte na tesoura, barba tradicional na navalha, combo corte e barba, acabamento, pezinho e corte personalizado em ambiente 100% climatizado desde 2014."
          }
        }
      ]
    }
  ]
}
</script>
```

---

### Ação 3 — Citações Externas para Fortalecer a Confiança das IAs
1. **Google Meu Negócio:** Principal fonte de dados do Gemini e Google SGE. Atualizar descrição e atributos imediatamente.
2. **Instagram (`@barbeariaideal2014`):** Colocar `Rua das Laranjeiras, 256 - Penedo`, `(24) 99834-4486` e `"Ordem de chegada | Ter a Sáb 9h-19h"` visíveis na Bio.
3. **Diretórios Locais & Correção:** Reivindicar/corrigir o telefone em portais locais (como Guias de Penedo, Guia Mais, Solutudo, Wanderboat) se possível, para apagar o rastro do número antigo `(24) 98839-1635`.

---

## 3. Monitoramento GEO (A Cada 30 Dias)
- Testar no ChatGPT, Gemini e Perplexity as 3 buscas:
  1. *"Qual barbearia atende por ordem de chegada em Penedo RJ?"*
  2. *"Onde fazer corte degradê em Penedo Itatiaia?"*
  3. *"Qual o WhatsApp da Barbearia Ideal Penedo?"*
- Confirmar se a resposta já traz o número `(24) 99834-4486`, cita a **ordem de chegada** e recomenda a barbearia entre as primeiras opções.

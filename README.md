# 🌲 Huldra: GA4 Network Inspector

**Huldra** (na mitologia nórdica, a bela guardiã da floresta que esconde um segredo por trás de sua aparência) é um script utilitário leve e poderoso em JavaScript, desenhado para interceptar e revelar o que os sites enviam "por baixo dos panos" para o Google Analytics 4.

Ele atua como um inspetor de rede inteligente diretamente no console do DevTools. O Huldra intercepta os envios em tempo real, decodifica os parâmetros oficiais do GA4 e desenha tudo em gavetas organizadas e coloridas, poupando você de decifrar *payloads* nativos na aba *Network*.

## ✨ Funcionalidades

* **Monitoramento Completo e em Tempo Real:** Captura eventos enviados via `window.fetch` e envios de fim de sessão (`navigator.sendBeacon`) no exato momento em que ocorrem.
* **Tratamento de Batching:** Quebra pacotes múltiplos (quando o GA4 agrupa vários eventos em uma única requisição) e exibe cada evento em sua própria aba.
* **Decodificador de E-commerce Nativo 🛒:** Traduz o complexo *Measurement Protocol* do GA4. Ele intercepta as strings de produtos (ex: `pr1`, `pr2`), mapeia as abreviações (`nm` vira `item_name`, `pr` vira `price`) e cruza chaves e valores customizados (`k0` e `v0`), exibindo os itens do e-commerce em uma gaveta amarela limpa e expansível.
* **Agrupamento Semântico Inteligente:** O script organiza automaticamente os parâmetros em grupos lógicos:
  * 👤 **Identificação e Usuário:** Agrupa `uid`, `cid`, `sid` e propriedades de usuário (`up.`).
  * 🎯 **Dados do Evento:** Destaca o nome do evento (`en`) e seus parâmetros de texto (`ep.`) e número (`epn.`).
  * 🛒 **Produtos do E-commerce:** Lista individual estruturada de cada produto contido na requisição.
  * ⚙️ **Outros Parâmetros:** Mantém o payload técnico (`dl`, `dt`, resoluções, etc.) isolado em uma aba secundária para não poluir a análise.

## 🚀 Como Instalar e Usar

A forma mais eficiente de usar o Huldra é salvá-lo como um **Snippet** no seu navegador, permitindo a execução rápida em qualquer site que você esteja auditando.

1. Abra o painel DevTools (`F12` ou `Ctrl + Shift + I`).
2. Navegue até a aba **Sources** (Fontes) e abra o painel esquerdo para encontrar a sub-aba **Snippets**.
3. Clique em **+ New snippet** e nomeie-o como `Huldra`.
4. Cole todo o código do arquivo `huldra.js` e salve (`Ctrl + S` / `Cmd + S`).

**Executando:**
Na página que deseja debugar, abra o DevTools, pressione `Ctrl + P` (ou `Cmd + P`), digite `!Huldra` e dê Enter. Navegue pelo site, adicione itens ao carrinho, e veja as requisições sendo mapeadas magicamente no seu Console!

## 🎨 Paleta de Cores (Syntax Highlighting)

O Huldra utiliza formatação nativa do console para acelerar a sua leitura analítica:

* 🔵 **Azul:** IDs primários e identificadores de sessão.
* 🟣 **Lilás:** Propriedades de Usuário (`up.`).
* 🟢 **Verde Brilhante:** Nome do Evento (`en`).
* 🟠 **Laranja:** Parâmetros de Evento em formato de texto (`ep.`).
* 🩵 **Ciano:** Parâmetros de Evento numéricos (`epn.`).
* 🟡 **Amarelo:** Produtos do E-commerce decodificados (`pr`).
* 🔘 **Cinza:** Demais parâmetros técnicos da requisição.

## 🤝 Contribuições

Sinta-se à vontade para fazer um fork, abrir *issues* com sugestões ou enviar *pull requests*. Projetos focados em facilitar a vida de Analistas de Web Analytics e Engenheiros de Dados são sempre construídos a várias mãos!

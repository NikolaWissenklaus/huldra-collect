# 🌲 Huldra: GA4 Network Inspector

**Huldra** (na mitologia nórdica, a bela guardiã da floresta que esconde um segredo por trás de sua aparência) é um script utilitário em JavaScript criado para revelar o que os sites enviam "por trás dos panos" para o Google Analytics 4.

Ele atua como um inspetor de rede direto no console do DevTools. Em vez de você precisar procurar as requisições na aba *Network* e decifrar os *payloads* nativos do GA4, o Huldra intercepta os envios, decodifica os parâmetros e os desenha em gavetas organizadas, coloridas e fáceis de ler.

## ✨ Funcionalidades

* **Monitoramento Completo:** Intercepta tanto requisições feitas via `window.fetch` quanto os envios silenciosos de fim de sessão via `navigator.sendBeacon`.
* **Tratamento de Batching:** Se o GA4 agrupar vários eventos em uma única requisição de rede para economizar banda, o Huldra quebra esse pacote e exibe cada evento individualmente.
* **Agrupamento Semântico:** Chega de procurar agulha em palheiro! O script separa automaticamente os parâmetros do GA4 em três grupos lógicos:
  * 👤 **Identificação e Usuário:** Agrupa `uid`, `cid`, `sid` e propriedades de usuário (`up.`).
  * 🎯 **Dados do Evento:** Destaca o nome do evento (`en`) e seus parâmetros de texto (`ep.`) e número (`epn.`).
  * ⚙️ **Outros Parâmetros:** Mantém o payload técnico (`dl`, `dt`, resoluções, etc.) isolado em uma aba secundária para não poluir a análise.
* **Syntax Highlighting Inteligente:** Cores distintas aplicadas nativamente no console para rápida identificação visual de cada tipo de dado.

## 🚀 Como usar (Instalação Rápida)

A maneira mais eficiente de usar o Huldra é salvá-lo como um **Snippet** no navegador. Assim, você pode acioná-lo em qualquer site que estiver auditando.

1. Abra o painel DevTools do seu navegador (`F12` ou `Ctrl + Shift + I`).
2. Vá até a aba **Sources** (Fontes) e abra a sub-aba **Snippets** no painel lateral esquerdo.
3. Clique em **+ New snippet**, nomeie como `Huldra`.
4. Cole todo o código do arquivo `huldra.js` e salve (`Ctrl + S` / `Cmd + S`).

**Para rodar:**
Em qualquer página que desejar monitorar, abra o DevTools, aperte `Ctrl + P` (ou `Cmd + P`), digite `!Huldra` e dê Enter. Navegue pelo site e veja as requisições brotando lindamente no seu Console!

## 🎨 Entendendo as Cores

Para facilitar a leitura rápida em meio a muitos eventos, o Huldra utiliza a seguinte padronização de cores nos parâmetros:

* 🔵 **Azul:** IDs primários (`uid`, `cid`, `sid`).
* 🟣 **Lilás:** Propriedades de Usuário (`up.`).
* 🟢 **Verde Brilhante:** Nome do Evento (`en`).
* 🟠 **Laranja:** Parâmetros de Evento em texto (`ep.`).
* 🩵 **Ciano:** Parâmetros de Evento numéricos (`epn.`).
* 🔘 **Cinza:** Demais parâmetros da requisição.

## 🤝 Contribuindo

Sinta-se à vontade para fazer um fork, abrir *issues* com sugestões ou enviar *pull requests*. Toda ajuda para melhorar a inspeção de Web Analytics é muito bem-vinda!

---
*Construído para facilitar a vida de Analistas de Web Analytics e Engenheiros de Dados.*

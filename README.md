# **Lista de Tarefas — Clickguin**

## 🎨 **Arte**

* [ ] Criar o sprite do **pinguim** (em pose neutra).
* [ ] Criar o sprite do **coração** separado do pinguim (para animação).
* [ ] Criar sprites dos **peixes**.
* [ ] Criar **ícones dos upgrades** (se der tempo) ou encontrar na internet.
* [ ] Criar **background** (gelo, neve, céu etc).
* [ ] Salvar as imagens em formato leve (`.png` ou `.webp`).

---

## 🧱 **HTML**

* [ ] Criar a **estrutura principal** do jogo. Exemplo:

  * [ ] `<div id="game">` com o pinguim e o coração animável.
  * [ ] `<div id="score">` para mostrar os pontos atuais.
  * [ ] `<div id="upgrades-grid">` para os upgrades (usar **CSS Grid**).
  * [ ] `<div id="game-over">` com mensagem e botão de reinício.

---

## 💻 **JavaScript**

### 🔹 Estrutura do jogo

* [ ] Criar um **objeto de estado do jogo**:

* [ ] Função para **atualizar a interface** (pontuação, upgrades, etc).

* [ ] Função para **resetar o jogo**.

### 🔹 Sistema de pontuação e salvamento

* [ ] Função para **adicionar pontos** quando o jogador clica.
* [ ] Função para **salvar uma lista de pontuações finais** no `localStorage`.

### 🔹 Peixes

* [ ] Função para **spawnar peixes** (gerar em posições aleatórias).
* [ ] Função para **fazer os peixes caírem** (animação + gravidade simples).
* [ ] Função para **detectar clique nos peixes** (ganha pontos).

### 🔹 Upgrades

* [ ] Função para **navegar no grid de upgrades** (com as setas).
* [ ] Função para **comprar upgrade selecionado** (com espaço, verificar se há pontos).
* [ ] Atualizar o `gameState` quando upgrade for comprado.

---

## 🎮 **Game Design**

* [ ] Criar a **lista de upgrades possíveis**, com nome, custo e efeito:
* [ ] Definir **como os upgrades afetam o jogo** (ex: mais pontos por clique, mais tempo de vida, spawn mais rápido de peixes, etc).
---

## ⚙️ **Extras / Integração**

* [ ] Testar integração entre HTML e JS (event listeners, DOM updates).
* [ ] Testar funcionamento do localStorage (salvar e recuperar pontuações).
* [ ] Adicionar feedbacks visuais (animações, sons, efeitos de clique).
* [ ] Ajustar balanceamento (custo dos upgrades, velocidade de spawn).

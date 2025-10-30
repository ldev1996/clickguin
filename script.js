    const gameState = {
        points: 0,          // Alterar quando ganhar ou gastar pontos
        cost_multiplier: 1, // Multiplicar pelo preço na loja
        active_upgrades: [], // id dos upgrades,
        tempoPeixe : 12000, //tempo para criar o próximo peixe
        valorPeixe : 10, //Valor de cada peixe

        addPoints: function (amount) {
            self.points += amount
        },
        addUpgrade: function (id) {
            self.active_upgrades.push(id)
        }
    }

// tornar 'self' disponível para gameState.addPoints (não altera gameState)
const self = gameState;

// --- PLACAR --- (consertado pelo chat a minha versão tava meio cú)
const scoreDisplay = document.createElement("div");
scoreDisplay.style.position = "fixed";
scoreDisplay.style.top = "10px";
scoreDisplay.style.left = "10px";
scoreDisplay.style.background = "rgba(0,0,0,0.6)";
scoreDisplay.style.color = "white";
scoreDisplay.style.padding = "8px 12px";
scoreDisplay.style.borderRadius = "8px";
scoreDisplay.style.fontFamily = "sans-serif";
scoreDisplay.style.fontSize = "16px";
scoreDisplay.style.zIndex = "10000";
scoreDisplay.style.pointerEvents = "none"; // não atrapalha cliques
document.body.appendChild(scoreDisplay);

function atualizarPlacar() {
    scoreDisplay.textContent = `Pontos: ${gameState.points}`;
}

// Atualiza imediatamente e periodicamente (caso pontos mudem por outras rotinas)
atualizarPlacar();
const placarInterval = setInterval(atualizarPlacar, 100);

// --- BOTÃO DE DIMINUIR TEMPO --- (consertado pelo chat a minha versão tava meio cú)
const botaoTempo = document.createElement("button");
botaoTempo.textContent = "Diminuir spawn (−10ms)";
botaoTempo.style.position = "fixed";
botaoTempo.style.bottom = "12px";
botaoTempo.style.left = "12px";
botaoTempo.style.padding = "10px 14px";
botaoTempo.style.border = "none";
botaoTempo.style.borderRadius = "8px";
botaoTempo.style.cursor = "pointer";
botaoTempo.style.fontFamily = "sans-serif";
botaoTempo.style.fontSize = "14px";
botaoTempo.style.zIndex = "10000";
botaoTempo.style.background = "#0b84ff";
botaoTempo.style.color = "white";

// mostra o valor atual do tempo dentro do botão também
function atualizarTextoBotao() {
    botaoTempo.textContent = `Diminuir spawn (−10ms) — atual: ${gameState.tempoPeixe}ms`;
}
atualizarTextoBotao();

document.body.appendChild(botaoTempo);

// Comportamento do clique
botaoTempo.addEventListener("click", () => {
    // reduz em 10ms, mas não deixa passar de um mínimo razoável (10000ms)
    const MIN_TEMPO = 10000;

    if (gameState.tempoPeixe > MIN_TEMPO) {
        gameState.tempoPeixe -= 10;

        // se houver uma variável global tempoPeixe usada por schedulePeixe, atualize-a também
        if (typeof tempoPeixe !== "undefined") {
            tempoPeixe = gameState.tempoPeixe;
        }

        atualizarTextoBotao();
    }

    // quando atingir o mínimo, remover o botão
    if (gameState.tempoPeixe <= MIN_TEMPO) {
        botaoTempo.remove();
    }
});


        // Imagem
    const imageURL = "https://png.pngtree.com/png-clipart/20231018/original/pngtree-bluefin-tuna-fish-png-image_13344289.png"; // placeholder

    function spawnPeixe() {
        const img = document.createElement("img");
        img.src = imageURL;
        img.classList.add("falling-image");

        // posição
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        document.body.appendChild(img);

        // adios + pontos
        img.addEventListener("click", () => {
            gameState.addPoints(gameState.valorPeixe);
            atualizarPlacar();
            img.remove();
        });
        setTimeout(() => img.remove(), 5000);

        // começou
        schedulePeixe();
    }
    function schedulePeixe() {
        const delay = Math.random() * (gameState.tempoPeixe - 10000) + 10000; // se modificar a variável tempo o tempo máximo para spawnar será diminuido
        setTimeout(spawnPeixe, delay);
    }
    schedulePeixe();


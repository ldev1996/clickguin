function formatGreatNumber(num) {
    if (num < 1000) return num.toString();

    const units = ["K", "M", "B", "T", "Q", "Qi", "Sx", "Sp", "Oc", "No"];
    let order = Math.floor(Math.log10(num) / 3);
    let scaled = num / Math.pow(1000, order);

    // Corrige imprecisão de ponto flutuante
    const rounded = Math.round((scaled + Number.EPSILON) * 10) / 10;

    // Se a unidade existe no array
    if (order - 1 < units.length) {
        const unit = units[order - 1];
        return rounded % 1 === 0 ? `${rounded.toFixed(0)}${unit}` : `${rounded.toFixed(1)}${unit}`;
    }

    // Fallback para números absurdamente grandes
    return num.toExponential(2); // ex: 1.23e25
}


function kill(penguin, heart) {
    penguin.src = 'img/pinguim_morto.png'
    heart.src = 'img/coração_morto.png'
}

function revive(penguin, heart) {
    penguin.src = 'img/pinguim.png'
    heart.src = 'img/coração.png'
}

function renderLife(bar, life, max_life) {
    bar.style.width = `${(life / max_life) * 100}%`
}

function toggleButtons(button1, button2) {
    if (button1.style.display == 'none') {
        button1.style.display = 'block'
        button2.style.display = 'none'
    } else {
        button1.style.display = 'none'
        button2.style.display = 'block'
    }
}

function pulseElement(element) {
    element.classList.remove("pulse-once");
    void element.offsetWidth;
    element.classList.add("pulse-once");
}

export { formatGreatNumber, kill, revive, renderLife, toggleButtons, pulseElement }

// function formatNumber(num, decimals = 1) {
//   const abbrev = ["", "K", "M", "B", "T", "Q"];
//   const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  
//   if (tier === 0) return num.toString();

//   const suffix = abbrev[tier];
//   const scale = Math.pow(10, tier * 3);
//   const scaled = num / scale;

//   return scaled.toFixed(decimals).replace(/\.0+$/, "") + suffix;
// }
function formatGreatNumber(num) {
    if (num < 1000) return num.toString();

    const units = ["K", "M", "B", "T"];
    const order = Math.floor(Math.log10(num) / 3);
    const unit = units[order - 1];
    const scaled = num / Math.pow(1000, order);

    // Mostra 1 casa decimal só se necessário (ex: 1.2K) (não funciona)
    return scaled % 1 === 0 ? `${scaled}${unit}` : `${scaled.toFixed(1)}${unit}`;
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
    if(button1.style.display == 'none') {
        button1.style.display = 'block'
        button2.style.display = 'none'
    } else {
        button1.style.display = 'none'
        button2.style.display = 'block'
    }
}


export { formatGreatNumber, kill, revive, renderLife, toggleButtons }
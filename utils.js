function formatGreatNumber(num) {
    if (num < 1000) return num.toString();

    const units = ["K", "M", "B", "T"];
    const order = Math.floor(Math.log10(num) / 3);
    const unit = units[order - 1];
    const scaled = num / Math.pow(1000, order);

    // Mostra 1 casa decimal só se necessário (ex: 1.2K) (não funciona)
    return scaled % 1 === 0 ? `${scaled}${unit}` : `${scaled.toFixed(1)}${unit}`;
}

export { formatGreatNumber }
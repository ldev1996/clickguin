function pulseElement(element) {
    element.classList.remove("pulse-once");
    void element.offsetWidth;
    element.classList.add("pulse-once");
}

export { pulseElement }
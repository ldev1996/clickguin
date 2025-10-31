function getRandomFishSprite() {
    let rng = Math.ceil(Math.random() * 6)
    return `./img/peixe-${rng}.png`
}

function applyGravity(element, fallSeconds) {
    element.style.animation = `fall ${fallSeconds}s linear forwards`
}

function createFish(callback) {
    const fish = document.createElement('img')
    fish.src = getRandomFishSprite()
    fish.draggable = false
    fish.classList.add('fish')

    fish.style.width = '150px'
    fish.style.height = '150px'

    fish.addEventListener('click', () => {
        callback()
        fish.remove()
    })

    return fish
}

function spawnFish(fishDiv, callback, fallSeconds) {
    const containerWidth = fishDiv.clientWidth
    const randomX = Math.random() * (containerWidth - 100)
    const fish = createFish(callback)
    fish.style.top = 0
    fish.style.left = `${randomX}px`

    fishDiv.appendChild(fish)
    applyGravity(fish, fallSeconds)
}

export { spawnFish }
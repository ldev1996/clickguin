import { resetGameState, addToScoreList } from './script/state.js'
import { formatGreatNumber, kill, revive, renderLife, toggleButtons, pulseElement } from './script/utils.js'
import { spawnFish } from './script/fish.js'
import { upgrades } from './script/upgrades.js'

// ----------------------- estado do jogo
const gameState = {
    alive: true,
    maxLife: 6,
    life: 6,
    score: 0,          // Alterar quando ganhar ou gastar pontos
    maxScore: 0,
    costMultiplier: 1, // Multiplicar pelo preço na loja
    clickValue: 1,
    fishValue: 10,
    fishTime: 5000,
    gravitySeconds: 3,
    addScore: function (amount) {
        this.score += amount
        if (this.score > this.maxScore) {
            this.maxScore = this.score
        }
    },
    addUpgrade: function (upgrades, id) {
        const upgrade = upgrades[id]
        const finalCost = upgrade.cost * this.costMultiplier

        if (this.score < finalCost) {
            return
        }

        this.score -= finalCost

        if (upgrade.unique) {
            if (this.activeUpgrades.includes(id)) return
            this.activeUpgrades.push(id)
        }

        upgrade.effect(this)
        this.costMultiplier += 0.1
    },
    activeUpgrades: [], // ids dos upgrades,
}

resetGameState(gameState)

// ----------------------- elementos
const penguin = document.querySelector('#penguin')
const heart = document.querySelector('#heart')
const scoreDisplay = document.querySelector('#pontos')
const bar = document.querySelector('#vida')
const reset = document.querySelector('#reset')
const clicker = document.querySelector('#clicker')
const explanationBox = document.querySelector('#explanation')
const upgradeContainer = document.querySelector('#upgrade-container')
const centerDiv = document.querySelector('.center')

const upgradeKeys = Object.keys(upgrades)
let selectedIndex = 0

let deathTimer
let fishTimer

// ----------------------- funções
function renderScore() {
    scoreDisplay.innerText = formatGreatNumber(gameState.score)
}

function startDeathTimer() {
    // limpa qualquer timer antigo, só pra garantir
    clearInterval(deathTimer)

    deathTimer = setInterval(() => {
        gameState.life -= 1
        console.log(gameState.life)
        renderLife(bar, gameState.life, gameState.maxLife)

        if (gameState.life <= 0) {
            gameState.alive = false
            clearInterval(deathTimer)
            clearInterval(fishTimer)
            kill(penguin, heart)
            toggleButtons(clicker, reset)
            addToScoreList(gameState.maxScore)
        }
    }, 400)
}

function startFishTimer() {
    clearInterval(fishTimer)

    fishTimer = setInterval(() => {
        spawnFish(centerDiv, () => {
            gameState.addScore(gameState.fishValue)
            renderScore()
        }, gameState.gravitySeconds)
    }, gameState.fishTime)
}

function renderUpgrades() {
    upgradeContainer.innerHTML = ''
    upgradeKeys.forEach((id, i) => {
        const upgrade = upgrades[id]
        const div = document.createElement('div')

        div.classList.add('upgrade')
        if (i === selectedIndex) div.classList.add('selected')
        if (gameState.activeUpgrades.includes(id)) div.classList.add('bought')

        div.innerText = `[${(upgrade.cost * gameState.costMultiplier).toFixed(0)}] ${upgrade.displayName}`
        upgradeContainer.appendChild(div)

    })
    const upgrade = upgrades[upgradeKeys[selectedIndex]]
    explanationBox.innerText = upgrade.displayEffect
}

// ----------------------- jogo
startDeathTimer()
startFishTimer()
renderUpgrades()

clicker.addEventListener('click', () => {
    if (gameState.alive) {
        pulseElement(heart)
        gameState.addScore(gameState.clickValue)
        renderScore()
        gameState.life = gameState.maxLife
        renderLife(bar, gameState.life, gameState.maxLife)
    }
})

reset.addEventListener('click', () => {
    if (!gameState.alive) {
        revive(penguin, heart)
        resetGameState(gameState)
        renderLife(bar, gameState.life, gameState.maxLife)
        renderScore()
        toggleButtons(clicker, reset)
        startDeathTimer()
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + upgradeKeys.length) % upgradeKeys.length
        renderUpgrades()
    }

    if (e.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % upgradeKeys.length
        renderUpgrades()
    }

    if (e.code === 'Space') {
        const id = upgradeKeys[selectedIndex]
        gameState.addUpgrade(upgrades, id)
        renderUpgrades()
    }
})
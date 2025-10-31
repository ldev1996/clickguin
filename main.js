import { resetGameState, addToScoreList, getScoreList } from './script/state.js'
import { pulseElement } from './script/animate.js'
import { formatGreatNumber, kill, revive, renderLife, toggleButtons } from './script/utils.js'
import { spawnFish } from './script/fish.js'

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
    addUpgrade: function (id) {
        this.active_upgrades.push(id)
    },
    active_upgrades: [], // ids dos upgrades,
}

resetGameState(gameState)

// ----------------------- elementos
const penguin = document.querySelector('#penguin')
const heart = document.querySelector('#heart')
const scoreDisplay = document.querySelector('#pontos')
const bar = document.querySelector('#vida')
const reset = document.querySelector('#reset')
const clicker = document.querySelector('#clicker')
const centerDiv = document.querySelector('.center')

// ----------------------- funções
function renderScore() {
    scoreDisplay.innerText = formatGreatNumber(gameState.score)
}

// ----------------------- jogo
let deathTimer
let fishTimer

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

startDeathTimer()
startFishTimer()

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
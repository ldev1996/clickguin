import { resetGameState, addToScoreList, getScoreList } from './script/state.js'
import { pulseElement } from './script/animate.js'
import { formatGreatNumber, kill, revive, renderLife, toggleButtons } from './script/utils.js'

// ----------------------- estado do jogo
const gameState = {
    alive: true,
    maxLife: 6,
    life: 6,
    score: 0,          // Alterar quando ganhar ou gastar pontos
    maxScore: 0,
    cost_multiplier: 1, // Multiplicar pelo preço na loja
    click_value: 1,
    fish_value: 10,
    fish_time: 12000,
    addScore: function (amount) {
        this.score += amount
        if (this.score > this.maxScore) {
            this.maxScore = this.score
        }
        console.log('hahha', this.maxScore)
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

// ----------------------- jogo
let deathTimer

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
            kill(penguin, heart)
            toggleButtons(clicker, reset)
        }
    }, 400)
}

startDeathTimer()

clicker.addEventListener('click', () => {
    if (gameState.alive) {
        pulseElement(heart)
        gameState.addScore(gameState.click_value)
        scoreDisplay.innerText = formatGreatNumber(gameState.score)
        gameState.life = gameState.maxLife
        renderLife(bar, gameState.life, gameState.maxLife)
    }
})

reset.addEventListener('click', () => {
    if (!gameState.alive) {
        addToScoreList(gameState.maxScore)
        revive(penguin, heart)
        resetGameState(gameState)
        renderLife(bar, gameState.life, gameState.maxLife)
        scoreDisplay.innerText = formatGreatNumber(gameState.score)
        toggleButtons(clicker, reset)
        startDeathTimer()
    }
})
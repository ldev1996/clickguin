import { resetGameState, addToScoreList, getScoreList } from './state.js'
import { pulseElement } from './animate.js'
import { formatGreatNumber } from './utils.js'

// ----------------------- estado do jogo
const gameState = {
    alive: true,
    score: 0,          // Alterar quando ganhar ou gastar pontos
    cost_multiplier: 1, // Multiplicar pelo preço na loja
    click_value: 1,
    fish_value: 10,
    fish_time: 12000,
    addScore: function (amount) {
        this.score += amount
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
const clicker = document.querySelector('#clicker')

// ----------------------- jogo
clicker.addEventListener('click', () => {
    pulseElement(heart)
    gameState.addScore(gameState.click_value)
    scoreDisplay.innerText = formatGreatNumber(gameState.score)
})
function resetGameState(gameState) {
    gameState.alive = true
    gameState.maxLife = 6
    gameState.life = 6

    gameState.score = 0
    gameState.maxScore = 0

    gameState.costMultiplier = 1
    gameState.clickValue = 1

    gameState.fishValue = 10
    gameState.fishTime = 5000
    gameState.gravitySeconds = 3

    gameState.activeUpgrades = []
}

function addToScoreList(new_score) {
    let scoreList = JSON.parse(localStorage.getItem("score")) || []
    scoreList.push(new_score)
    localStorage.setItem("score", JSON.stringify(scoreList))
}

function getScoreList() {
    return JSON.parse(localStorage.getItem("score"))
}

export { resetGameState, addToScoreList, getScoreList }
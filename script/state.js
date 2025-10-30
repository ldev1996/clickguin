function resetGameState(gameState) {
    gameState.alive = true
    gameState.max_life = 6,
    gameState.life = 6,
    gameState.score = 0
    gameState.maxScore = 0
    gameState.cost_multiplier = 1
    gameState.click_value = 1
    gameState.fish_value = 10
    gameState.fish_time = 12000
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
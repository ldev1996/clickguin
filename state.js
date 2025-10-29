function resetGameState(gameState) {
    gameState.points = 0
    gameState.cost_multiplier = 1
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
/*
    {
        id: '',
        displayName: '',
        displayEffect: '',
        effect: (gameState) => {
            
        },
        cost: 1,
        unique: true
    }
*/

const upgrades = {
    fishing: {
        displayName: 'Pescaria',
        displayEffect: 'Peixes 30% mais frequentes',
        effect: (gameState) => {
            gameState.fishTime -= (gameState.fishTime / 3) // -30% tempo
        },
        cost: 200,
        unique: true
    },

    fishValueUp: {
        displayName: 'Peixes Premium',
        displayEffect: '+50% valor dos peixes',
        effect: (gameState) => {
            gameState.fishValue *= 1.5
        },
        cost: 300,
        unique: false
    },

    clickPower: {
        displayName: 'Força no Dedo',
        displayEffect: '+1 ponto por clique',
        effect: (gameState) => {
            gameState.clickValue += 1
        },
        cost: 50,
        unique: false
    },

    moreLife: {
        displayName: 'Coração Extra',
        displayEffect: '+1 de vida máxima',
        effect: (gameState) => {
            gameState.maxLife += 1
            gameState.life = gameState.maxLife // cura totalmente
        },
        cost: 250,
        unique: false
    },

    gravityBoost: {
        displayName: 'Gravidade Reduzida',
        displayEffect: 'Peixes 1 segundo mais lentos',
        effect: (gameState) => {
            if (gameState.gravitySeconds > 1) {
                gameState.gravitySeconds -= 1
            }
        },
        cost: 400,
        unique: true
    },
}

export { upgrades }
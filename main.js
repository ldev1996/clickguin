const gameState = {
    points: 0,          // Alterar quando ganhar ou gastar pontos
    cost_multiplier: 1, // Multiplicar pelo preço na loja
    active_upgrades: [], // id dos upgrades,
    addPoints: function (amount) {
        self.points += amount
    },
    addUpgrade: function (id) {
        self.active_upgrades.push(id)
    }
}

// exemplo de lista de upgrades:
/*
    [
        {
            id: 'lorem',
            name: 'Lorem',
            description: '',
            cost: 0
        },
        ...
    ]
*/

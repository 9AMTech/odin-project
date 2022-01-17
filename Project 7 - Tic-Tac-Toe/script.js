const players = (id, name, tile) => {
    return {id, name, tile};
}

const gameBoard = (function() {
    const gameBoard = document.querySelector('main'); 
    const array = [];
    for(let i = 1; i <= 9; i++) {
        const gridTile = document.createElement('section');
        const tileContent = document.createElement('p');
        gridTile.classList += 'grid-tiles';
        gridTile.dataset.id = i;
        // gridTile.textContent = ' ';
        gridTile.addEventListener('click', () => {
            array[gridTile.dataset.id] = gridTile.textContent;
        }, {
            once: true
        });
        gameBoard.appendChild(gridTile);
        gridTile.appendChild(tileContent);
    }

    return {
        array: array,
    }
})();


const gameLogic = (function() {
    const tiles = document.querySelectorAll('.grid-tiles');
    const player1 = players(1, 'Player 1', 'X');
    const player2 = players(2, 'Player 2', 'O');
    let activePlayer = player1;

    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const tileContent = tile.querySelector('p');
            tileContent.textContent += activePlayer.tile;
            if(activePlayer.id === 1) {
                activePlayer = player2;
            }
            else {
                activePlayer = player1;
            }
            console.log(activePlayer);
        }, {
            once: true
        })
    })
    
    return {
        player1: player1,
        player2: player2,
        activePlayer: activePlayer,
    }
})();


const notifications = (function() {
    const tiles = document.querySelectorAll('.grid-tiles');
    const notification = document.querySelector('.notification');
    tiles.forEach(tile => {
        tile.addEventListener('click', () => {
            notification.innerText = " ";
            if(gameLogic.activePlayer.id === 1) {
                notification.innerText = "Player 2's Turn";
                gameLogic.activePlayer = gameLogic.player1
            }
            else if(gameLogic.activePlayer.id === 2) {
                notification.innerText = "Player 1's Turn";
                gameLogic.activePlayer = gameLogic.player2
            }
        })
    })
    })();



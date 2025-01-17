const playerBoard = document.getElementById('player-board');
        const cpuBoard = document.getElementById('cpu-board');
        const startGameButton = document.getElementById('start-game');
        const resetGameButton = document.getElementById('reset-game');
        const messageDiv = document.getElementById('message');
        const shipsContainer = document.getElementById('ships-container');
        const boardSize = 10;
        const shipSizes = [5, 4, 3, 3, 2];
        let playerShips = [];
        let cpuShips = [];
        let playerHits = [];
        let playerMisses = [];
        let cpuHits = [];
        let cpuMisses = [];
        let draggedShip = null;

        function createBoard(board) {
            for (let i = 0; i < boardSize * boardSize; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                cell.addEventListener('dragover', handleDragOver);
                cell.addEventListener('drop', handleDrop);
                board.appendChild(cell);
            }
        }

        function handleDragStart(event) {
            draggedShip = event.target;
        }

        function handleDragOver(event) {
            event.preventDefault();
        }

        function handleDrop(event) {
            const index = parseInt(event.target.dataset.index);
            const size = parseInt(draggedShip.dataset.size);
            const row = Math.floor(index / boardSize);
            const col = index % boardSize;

            // Check if the ship fits within the board and does not overlap with existing ships
            if (col + size <= boardSize && !isOverlap(index, size)) {
                const newShip = [];
                for (let i = 0; i < size; i++) {
                    const cellIndex = index + i;
                    playerBoard.children[cellIndex].classList.add('player-ship');
                    newShip.push(cellIndex);
                }
                playerShips.push(newShip);
                draggedShip.remove();
            }
        }


        // Helper function to check if there is overlap
        function isOverlap(startIndex, size) {
            const newCells = [];
            for (let i = 0; i < size; i++) {
                const cellIndex = startIndex + i;
                if (playerShips.some(ship => ship.includes(cellIndex))) {
                    return true; // Overlap found
                }
                newCells.push(cellIndex);
            }
            return false;
        }


        function handlePlayerClick(event) {
            const index = parseInt(event.target.dataset.index);
            if (event.target.classList.contains('hit') || event.target.classList.contains('miss')) {
                return; // Cell has already been clicked, do nothing
            }
            
            const targetCell = event.target;
            
            if (cpuShips.flat().includes(index)) {
                // Successful hit
                targetCell.classList.add('hit');
                targetCell.style.backgroundColor = 'red'; // Mark as red for a hit
                
                // Remove the ship from the list of ships
                cpuShips.forEach(ship => {
                    const shipIndex = ship.indexOf(index);
                    if (shipIndex > -1) ship.splice(shipIndex, 1);
                });
                
                if (cpuShips.every(ship => ship.length === 0)) {
                    messageDiv.textContent = 'You win!';
                    return; // Game ends after the win
                }
            } else {
                // Missed
                targetCell.classList.add('miss');
                targetCell.style.backgroundColor = 'gray'; // Mark as gray for a miss
            }
            
            // After player completes their turn, make the CPU take its turn
            cpuTurn();
        }


        function cpuTurn() {
            let index;
            do {
                index = Math.floor(Math.random() * boardSize * boardSize);
            } while (cpuHits.includes(index) || cpuMisses.includes(index));

            const targetCell = playerBoard.children[index];

            if (playerShips.flat().includes(index)) {
                // Mark as a hit and update the cell's background color
                targetCell.classList.add('hit');
                targetCell.style.backgroundColor = 'red'; // Mark as red to indicate a hit
                // Remove the ship from the list of ships
                playerShips.forEach(ship => {
                    const shipIndex = ship.indexOf(index);
                    if (shipIndex > -1) ship.splice(shipIndex, 1);
                });
                cpuHits.push(index);
                if (playerShips.every(ship => ship.length === 0)) {
                    messageDiv.textContent = 'CPU wins!';
                }
            } else {
                // Mark as a miss
                targetCell.classList.add('miss');
                targetCell.style.backgroundColor = 'gray'; // Gray for a miss
                cpuMisses.push(index);
            }
        }



        function startGame() {
            if (playerShips.length !== shipSizes.length) {
                messageDiv.textContent = 'Please place all your ships before starting the game.';
                return;
            }
            playerHits = [];
            playerMisses = [];
            cpuHits = [];
            cpuMisses = [];
            messageDiv.textContent = '';
            Array.from(playerBoard.children).forEach(cell => {
                cell.classList.remove('hit', 'miss');
            });
            Array.from(cpuBoard.children).forEach(cell => {
                cell.classList.remove('hit', 'miss');
            });
            placeShipsRandomly(cpuShips);
        }

        function resetGame() {
            // Clear all ships from player and CPU boards
            playerShips = [];
            cpuShips = [];

            // Clear the CSS classes that mark ships
            const playerCells = playerBoard.children;
            const cpuCells = cpuBoard.children;
            
            // Remove the 'player-ship' and 'cpu-ship' classes
            for (let i = 0; i < playerCells.length; i++) {
                playerCells[i].classList.remove('player-ship');
            }

            for (let i = 0; i < cpuCells.length; i++) {
                cpuCells[i].classList.remove('cpu-ship');
            }
            
            // Reset the boards visually (optional, but makes it more user-friendly)
            // Clear or reset board UI as needed, if you're showing anything else
            
            // Reset the player and CPU ship count (if needed)
            updateShipCount(); // Optional: if you want to reset any UI ship count or display info
        }


        function placeShipsRandomly(ships) {
            for (let size of shipSizes) {
                let placed = false;
                while (!placed) {
                    const index = Math.floor(Math.random() * boardSize * boardSize);
                    const row = Math.floor(index / boardSize);
                    const col = index % boardSize;
                    if (col + size <= boardSize && !ships.some(ship => ship.includes(index))) {
                        const newShip = [];
                        for (let i = 0; i < size; i++) {
                            newShip.push(index + i);
                        }
                        ships.push(newShip);
                        placed = true;
                    }
                }
            }
        }

        createBoard(playerBoard);
        createBoard(cpuBoard);
        startGameButton.addEventListener('click', startGame);
        resetGameButton.addEventListener('click', resetGame);
        cpuBoard.addEventListener('click', handlePlayerClick);
        Array.from(document.querySelectorAll('.draggable-ship')).forEach(ship => {
            ship.addEventListener('dragstart', handleDragStart);
        });
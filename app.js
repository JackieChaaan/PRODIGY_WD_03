let cells = document.querySelectorAll('.cell');
const player_1 = document.querySelector('#player-1');
const player_2 = document.querySelector('#player-2');
let winner = document.querySelector('#winner');
let restart = document.querySelector('#restart');
let playAgain = document.querySelector('#play-again');
let popup = document.querySelector('.pop-up')
let player;
let isGameover;
let count = 0;



function resetGame() {
    player = "X";
    isGameover = false;
    count = 0;
    winner.textContent = '';
    popup.style.display = 'none';
    player_1.classList.add('bg');
    player_2.classList.remove('bg');

    cells.forEach(cell => {
        cell.textContent = ""
        cell.style.backgroundColor = '';
        cell.style.color = '';

    });
}

function init() {
    resetGame();
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick);
    })
}

function handleClick(e) {
    let cell = e.target;
    if (!isGameover && cell.textContent === "") {
        cell.textContent = player;
        checkWin();
        if (!isGameover) {
            changePlayer();
        }
    }
}

function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
    updatePlayerbackground();
}

function updatePlayerbackground() {
    if (player === 'X') {
        player_1.classList.add('bg');
        player_2.classList.remove('bg')
    } else {
        player_2.classList.add('bg');
        player_1.classList.remove('bg');
    }
}

function checkWin() {
    const winCondition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    count += 1;

    for (let i = 0; i < winCondition.length; i++) {
        let value0 = cells[winCondition[i][0]].textContent;
        let value1 = cells[winCondition[i][1]].textContent;
        let value2 = cells[winCondition[i][2]].textContent;

        if (value0 != "" && value0 === value1 && value0 === value2) {
            isGameover = true;
            popup.style.display = 'block';
            winner.textContent = `${player} is Winner`;
            

            for (let j = 0; j < 3; j++) {
                cells[winCondition[i][j]].style.backgroundColor = '#FF2E63';
                cells[winCondition[i][j]].style.color = 'white';
            }
            return;
        }
    }

    if (!isGameover && count === 9) {
        isGameover = true;
        popup.style.display = 'block';
        winner.textContent = `It's a Draw`;
        

    }
}


restart.addEventListener('click', init);

playAgain.addEventListener('click', init);

init();
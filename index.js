window.addEventListener('DOMContentLoaded', () => {

    // Selectam componentele din pagina web
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');


    // Initializam Tabla de joc si jucatorul curent
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Tabla de joc indexata:
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winCon = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        // Functie care verifica daca vreo unul dintre jucatori a castigat
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winCon[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
        // Daca runda a fost castigata, afisam castigatorul si semnalam incheierea jocului
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes('')) // Daca nu mai exista spatii goale si runda nu a fost castigata de nimeni, inseamna ca a fost o remiza
        announce(TIE);
    }

    const announce = (type) => {
        // Functie pentru anuntarea castigatorului sau a remizei
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="O">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="X">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        // Functie pentru a verifica daca utilizatorul face o actiune valida (daca nu alege un loc deja folosit)
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        // Functie pentru a "marca" pe tabla semnul corespunzator jucatorului curent
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        // Functie pentru a incheia randul jucatorului curent
        playerDisplay.classList.remove(`${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        //  Functie "wrapper" pentru a desfasura o actiune a jucatorului 
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        // Functie pentru a reseta tabla de joc
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('X');
            tile.classList.remove('O');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
window.addEventListener("DOMContentLoaded", () => {
    const squares = Array.from(document.querySelectorAll(".square"));
    const playerDisplay = document.querySelector(".display-player");
    const clearButton = document.querySelector("#clear");
    const report = document.querySelector(".report");
    const Player_X = "X";
    const Player_O = "O";
    const TIE = "TIE";



    let currentPlayer = "X";
    let activeGame = true;
    let grid = ['', '', '', '', '', '', '', '', ''];



    const gridWins = [
        [0,4,8],
        [2,4,6],
        [0,1,2],
        [3,4,5],  
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    


        function checkResult() {
            let roundW = false;
            for (let i = 0; i <= 7; i++){
                const winner = gridWins[i];
                const a = grid[winner[0]];
                const b = grid[winner[1]];
                const c = grid[winner[2]];
                if (a === "" || b === "" || c === ""){
                    continue; 
                }
                if (a === b && b === c){
                    roundW = true;
                    break;
                }
            }

            if(roundW){
                whoWon(currentPlayer === "X" ? Player_X : Player_O);
                activeGame = false;
                return;
            }
            if(!grid.includes(""))
                whoWon(TIE);
        }


    const whoWon = (type) => {
        switch(type){
            case Player_O:
                report.innerHTML = '<span class="playerO">O</span> Wins!';

                break;
            case Player_X:
                report.innerHTML = '<span class="playerX">X</span> Wins!';

                break;
            case TIE:
                report.innerText = "It's a Tie!";

        }
        report.classList.remove("hide");
    };


        const squareStatus = (square) => {
            if (square.innerText === "X" || square.innerText === "O"){
                return false;
            }

            return true;
        };

        const nextTurn = (index) =>{
            grid[index] = currentPlayer;
        }


    const switchPlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    
    const userAction = (square, index) => {
        if(squareStatus(square) && activeGame) {
            square.innerText = currentPlayer;
            square.classList.add(`player${currentPlayer}`);
            nextTurn(index);
            checkResult();
            switchPlayer();
        }
    }





    const clearGrid = () => {
        grid = ['', '', '', '', '', '', '', '', ''];
        activeGame = true;
        report.classList.add("hide");

        if (currentPlayer === "O") {
            switchPlayer();
        }

        squares.forEach(square => {
            square.innerText = "";
            square.classList.remove("playerX");
            square.classList.remove("playerO");
        });
    }




    squares.forEach( (square, index) => {
        square.addEventListener("click", () => userAction(square, index));
    });





    clearButton.addEventListener("click", clearGrid);
});
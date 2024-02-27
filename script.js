let current = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let winner = null;
let count = 0;
document.getElementsByClassName("win")[0].hidden = true;
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const messageDisplay = () => {
    const win = document.getElementsByClassName("win")[0];
    if (winner) {
        if (winner === "Tie")
            win.innerText = "🤝 It's a Draw!";
        else
            win.innerText = `🥳 ${winner} wins!`;
        win.hidden = false;
    }
    else{
        win.hidden = true;
    }
}

const checkWinner = () => {
    winCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            combo.forEach(index => {
                cells[index].style.backgroundColor = "#94ecbe";
            });
        }
    });
    
}
const turn = () => {
    const turn = document.getElementsByClassName("turn")[0];
    turn.innerText = `( ${current}'s turn )`;
}

const handleClick= (e) => {
    const index = e.target.id;
    if (board[index] === "" && !winner) {
        board[index] = current;
        e.target.innerText = current;
        checkWinner();
        messageDisplay();
        current = current === "X" ? "O" : "X";
        turn();
        count++;
    }
    if (count === 9 && !winner) {
        winner = "Tie";
        messageDisplay();
    }
}
const cells = document.querySelectorAll(".cell");
cells.forEach(cell => cell.addEventListener("click", handleClick));

const restart = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    winner = null;
    messageDisplay();
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor = "";
    });
    count = 0;
    current = "X";
    turn();
}


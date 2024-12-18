


let x;
let score = 0;
let playerName;

window.onload = function() {
    playerName = sessionStorage.getItem('playerName') || "שחקן";
    initializeGame();
};

function initializeGame() {
    x = parseInt(Math.random() * 100);
    document.querySelector("#score").innerText = playerName + " your score in this game: " + score;
    document.querySelector("#inp").value = '';
}

function input() {
    let y = document.querySelector("#inp").value;
    let p = document.querySelector("#p");

    if (isNaN(y) || y.trim() === '') {
        p.innerHTML = "Please enter a valid number.";
        return;
    }

    y = parseInt(y);

    if (x === y) {
        p.innerHTML = "Excellent! The number was " + x + ". Starting a new game...";
        score += 10;  
        document.querySelector("#score").innerText = playerName + " your score in this game: " + score; 
        let user = JSON.parse(localStorage.getItem(playerName));
        user.score_of_games.GUESS += 10;
    localStorage.setItem(playerName, JSON.stringify(user));
        setTimeout(initializeGame, 2000); 
    } else if (x > y) {
        p.innerHTML = "The number is bigger.";
    } else {
        p.innerHTML = "The number is smaller.";
    }
}



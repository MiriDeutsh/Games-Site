

const words = ["kitten", "banana", "castle", "number", "python", "guitar", "butter", "silver", "planet", "camera"];
let remainingWords = [];
let currentWord = "";
let wordIndex = 0;
const totalWords = 10;
let score = 0;

// קבלת שם השחקן מ-sessionStorage
const playerName = sessionStorage.getItem('playerName') || 'Guest';

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("user-input").addEventListener("input", checkCharacter);

function startGame() {
    wordIndex = 0;
    remainingWords = [...words];
    document.getElementById("user-input").value = "";
    document.getElementById("result").textContent = "";
    // עדכון הסקור כך שיכלול את שם השחקן
    document.querySelector("#score").innerText = playerName + " your score in this game: " + score; // הוספת שם השחקן לסקור
   
    document.getElementById("start-btn").disabled = true;
    document.getElementById("user-input").disabled = false;
    document.getElementById("user-input").focus();
    generateWord();
}

function generateWord() {
    if (wordIndex < totalWords && remainingWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingWords.length);
        currentWord = remainingWords[randomIndex];
        remainingWords.splice(randomIndex, 1);
        document.getElementById("word-display").textContent = `Word ${wordIndex + 1}: ${currentWord}`;
    } else {
        endGame();
    }
}

function checkCharacter() {
    const userInput = document.getElementById("user-input").value;
    const correctSubstring = currentWord.slice(0, userInput.length);
    if (userInput === correctSubstring) {
        document.getElementById("result").textContent = "";
        if (userInput.length === currentWord.length) {
            score += 10;
            let user = JSON.parse(localStorage.getItem(playerName));
            user.score_of_games.BLID_METHOOD += 10;
            localStorage.setItem(playerName, JSON.stringify(user));
            wordIndex++;
            document.getElementById("user-input").value = "";
            generateWord();
        }
    } else {
        document.getElementById("result").textContent = "Incorrect character. Please try again.";
        document.getElementById("user-input").value = userInput.slice(0, -1);
    }
    // עדכון הסקור כך שיכלול את שם השחקן
    document.querySelector("#score").innerText = playerName + " your score in this game: " + score; // הוספת שם השחקן לסקור
}

function endGame() {
    document.getElementById("word-display").textContent = "Game Over! Press 'Start' to play again.";
    document.getElementById("user-input").disabled = true;
    document.getElementById("start-btn").disabled = false;
}

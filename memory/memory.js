
const playerName = sessionStorage.getItem('playerName') || 'Guest';

let numOfCards = document.getElementById("numOfCards");
let num_cards;
const cards = document.getElementById("cards");
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
let score = 0;
let gameStarted = false; // דגל שמציין האם המשחק התחיל

// עדכון התצוגה של הסקור עם שם השחקן
const updateScoreDisplay = () => {
    document.querySelector("#score").innerText = playerName + " your score in this game: " + score; // הוספת שם השחקן לסקור


}

// הפעלת המשחק
const startGame = () => {
    if (gameStarted) {
        alert("המשחק כבר התחיל, אין אפשרות לשנות את מספר הקלפים.");
        return;
    }
    if (parseInt(numOfCards.value) < 2 || isNaN(parseInt(numOfCards.value))) {
        alert("קלט שגוי, הכנס מספר גדול מ-1");
        return;
    }
    gameStarted = true; // סימון שהמשחק התחיל
    clearScreen();
    createCards();
    updateScoreDisplay(); // עדכון התצוגה של הסקור עם שם השחקן
};

const clearScreen = () => {
    num_cards = parseInt(numOfCards.value);
    numOfCards.value = "";
    cards.innerHTML = ""; // מנקה את הלוח הישן
    matchedPairs = 0; // איפוס מספר הזוגות המותאמים
};

const randomColor = () => {
    let allowed = "ABCDEF0123456789", S = "#";
    while (S.length < 7) {
        S += allowed.charAt(Math.floor((Math.random() * 16)));
    }
    return S;
}

const createCards = () => {
    let colorArr = [];
    for (let i = 0; i < num_cards; i++) {
        let color = randomColor();
        colorArr.push(color, color);
    }
    colorArr = colorArr.sort(() => 0.5 - Math.random()); // מערבב את הצבעים

    for (let i = 0; i < num_cards * 2; i++) {
        const newCard = document.createElement('div');
        newCard.innerText = "❤";
        newCard.classList.add("card", "hidden");
        newCard.id = `card${i}`;
        newCard.dataset.color = colorArr[i];
        newCard.addEventListener("click", checkMe);
        cards.appendChild(newCard);
    }
};

const checkMe = (event) => {
    if (lockBoard) 
        return;
    const selectedCard = event.target;

    if (selectedCard === firstCard) 
        return;

    selectedCard.classList.remove('hidden');
    selectedCard.style.backgroundColor = selectedCard.dataset.color;

    if (!firstCard) {
        firstCard = selectedCard;
        return;
    }

    secondCard = selectedCard;
    lockBoard = true;

    setTimeout(() => {
        if (firstCard.dataset.color === secondCard.dataset.color) {
            matchedPairs++;
            score += 10; // הוספת נקודות
                let user = JSON.parse(localStorage.getItem(playerName));
                    user.score_of_games.MEMORY += 10;
                localStorage.setItem(playerName, JSON.stringify(user));
            updateScoreDisplay(); // עדכון התצוגה של הסקור
            if (matchedPairs === num_cards) {
                // הוספת עיכוב לפני הצגת ההודעה
                setTimeout(() => {
                    alert("מזל טוב! סיימת את המשחק!");
                    resetGame();
                }, 500); // עיכוב של חצי שניה
            }
            firstCard.removeEventListener('click', checkMe);
            secondCard.removeEventListener('click', checkMe);
        } else {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            firstCard.style.backgroundColor = 'red'; // החזר לצבע המקורי
            secondCard.style.backgroundColor = 'red'; // החזר לצבע המקורי
        }

        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }, 1000);
};

const resetGame = () => {
    setTimeout(() => {
        cards.innerHTML = "";
        numOfCards.value = "";
        gameStarted = false; // איפוס הדגל כאשר המשחק מסתיים
    }, 2000); // מניח 2 שניות כדי שהשחקן יראה את ההודעה
};

// עדכון התצוגה של הסקור עם שם השחקן כשהדף נטען
updateScoreDisplay();

numOfCards.addEventListener("blur", startGame);


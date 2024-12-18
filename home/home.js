function navigateTo(page) {
    window.location.href = page;
}

document.addEventListener('DOMContentLoaded', function() {
    const playerName = sessionStorage.getItem('playerName');
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (playerName) {
        welcomeMessage.textContent = `! ${playerName} WELCOME `; 
    } else {
        welcomeMessage.textContent = 'WELCOME!'; 
    }
});

// משתנה למעקב אחרי מצב הטבלה (אם פתוחה או סגורה)
let isScoreTableVisible = false;

function showScore() {
    const scoreTable = document.getElementById('score-table');
    const scoreBody = document.getElementById('score-body');
    
    if (isScoreTableVisible) {
        // אם הטבלה פתוחה, סגור אותה
        scoreTable.style.display = 'none';
        isScoreTableVisible = false;
    } else {
        // אם הטבלה סגורה, הצג אותה
        
        // נקה את התוכן הקיים בטבלה
        scoreBody.innerHTML = '';
        
        // קבל את השם מה-SessionStorage
        const playerName = sessionStorage.getItem('playerName');
        if (!playerName) {
            alert('לא נמצא שם משתמש פעיל.');
            return;
        }
        
        // קבל את הנתונים מה-LocalStorage
        const user = JSON.parse(localStorage.getItem(playerName));
        if (!user) {
            alert('לא נמצאו נתונים עבור המשתמש.');
            return;
        }
        
        // עדכן את הטבלה עם שמות המשחקים החדשים
        const gameNames = {
            'MEMORY': 'MEMORY',
            'GUESS': 'GUESS',
            'BLID_METHOOD': 'BLID METHOD',
            'Runny_Bunny': 'Runny Bunny'
        };

        for (const [key, score] of Object.entries(user.score_of_games)) {
            const gameName = gameNames[key] || key; // השתמש בשם החדש, אם קיים
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${gameName}</td>
                <td>${score}</td>
            `;
            scoreBody.appendChild(row);
        }
        
        // הצג את הטבלה
        scoreTable.style.display = 'block';
        isScoreTableVisible = true; // עדכן את מצב הטבלה ל'פתוחה'
    }
}

function clearAllOnLogout() {
    const playerName = sessionStorage.getItem('playerName');
    if (playerName) {
       
        sessionStorage.removeItem('playerName');
        localStorage.removeItem(playerName);

    }

    window.location.href = "../register/register.html";
}

function clearScoresOnLogout() {
    const playerName = sessionStorage.getItem('playerName');
    if (playerName) {
        sessionStorage.removeItem(playerName + '_score');
        const user = JSON.parse(localStorage.getItem(playerName));
        if (user) {
            user.score_of_games = {
                GUESS: 0,
                MEMORY: 0,
                BLID_METHOOD: 0,
                Runny_Bunny: 0
               
            };
            localStorage.setItem(playerName, JSON.stringify(user));
        }
    }
    sessionStorage.removeItem('playerName');
    window.location.href = "../login/login.html";
}

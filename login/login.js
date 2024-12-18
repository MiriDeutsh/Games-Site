
function logIn() {
    let password = document.querySelector("#password").value;
    let name = document.querySelector("#name").value;
    let mail = document.querySelector("#email").value;

    if (password === "" || name === "" || mail === "") {
        alert("נא מלא את כל השדות לפני לחיצה על כניסה.");
        return false;
    }

    let user = {
        name: name,
        mail: mail,
        password: password
    }

    if (localStorage.getItem(name) !== null) { 
        alert("שם משתמש זה כבר נמצא בשימוש");
        return false;
    } else {
        localStorage.setItem(name, JSON.stringify(user));
        // קבע ציונים עם הפונקציה הנכונה כדי למנוע חזרות
        setScores(name);
        sessionStorage.setItem('playerName', name); 
        setTimeout(() => {
            alert("נרשמת בהצלחה");
            window.location.href = "login.html";
        }, 300);
    }
}

function setScores(playerName) {
    sessionStorage.setItem(playerName + '_score', JSON.stringify({
        GUESS: 0,
        MEMORY: 0,
        Runny_Bunny: 0,
        BLID_METHOOD: 0
    }));
}

// התחברות JS
function SendToNewUser() {
    window.location.href = "../register/register.html";
}

function login() {
    let playerName = document.getElementById('playerName').value;
    let password = document.getElementById('password').value;
    
    if (playerName === "" || password === "") {
        alert("הכנס את כל הפרטים");
        return false;
    }
    
    let user = JSON.parse(localStorage.getItem(playerName));
    
    if (user) {
        if (user.password === password) {
            sessionStorage.setItem('playerName', playerName);
            // הצג את הציונים מה-LocalStorage ל-SessionStorage אם לא קיימים
            if (!sessionStorage.getItem(playerName + '_score')) {
                setScores(playerName); // קבע ציונים
            }
            window.location.href = "../home/home.html";
        } else {
            alert("שם משתמש או סיסמה שגויים");
        }
    } else {
        alert("שם משתמש או סיסמה שגויים");
    }
}


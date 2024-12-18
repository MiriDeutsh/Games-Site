
function logIn() {
    let password = document.querySelector("#password").value;
    let name = document.querySelector("#name").value;
    let mail = document.querySelector("#email").value;

    if (password === "" || name === "" || mail === "") {
        alert("נא מלא את כל השדות לפני לחיצה על הרשמה.");
        return false;
    }

    let user = {
        name: name,
        mail: mail,
        password: password,
        score_of_games: {
            GUESS: 0,
            MEMORY: 0,
            BLID_METHOOD: 0,
            Runny_Bunny: 0
        }
    };

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
            window.location.href="../login/login.html"
        },200);
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



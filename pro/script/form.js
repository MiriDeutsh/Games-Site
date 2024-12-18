
// const buttens = document.querySelectorAll(".btn"); 
// let level;

// for (btn of buttens) { 
//     btn.onclick = function (e) { 
//         e.preventDefault(); 
//         level = btn.dataset.level; 
//     }
// }

/////// נשתמש בשם המשתמש ששמרנו ב-sessionStorage
document.querySelector("#game").addEventListener("click", function (e) { 
    e.preventDefault(); 

    ///////קבלת שם המשתמש מ-sessionStorage
    const username = sessionStorage.getItem('playerName'); 
    if (username) {
        location.href = "pages/game.html?username=" + username; 
    } else {
        alert("לא נמצא שם משתמש, נא להתחבר קודם.");
    }
});

////// לחיצות על הכפתורים
document.querySelector("#game").onclick = function () { 
    document.querySelector("#game").style.backgroundColor = "gray"; 
};

document.querySelector("#score").onclick = function () {
    document.querySelector("#score").style.backgroundColor = "gray"; 
};

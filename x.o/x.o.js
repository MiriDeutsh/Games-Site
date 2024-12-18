
var arr = {};
let cnt = 0;
let t = 'o';
let scoreO = 0; // סקור לשחקן O
let scoreX = 0; // סקור לשחקן X

function count1(index) {
    if (arr[index] == 1 || arr[index] == 2) {
        return;
    }

    cnt++;
    let r = document.getElementById(`w${index}`);
    if (cnt % 2 == 0) {    
        arr[index] = 1;
        t = 'o';
    } else {
        arr[index] = 2;
        t = 'x';
    }

    r.innerHTML = t;
    setTimeout(check, 100); // הוספת עיכוב קצר לפני קריאה לפונקציית הבדיקה
}

function check() {
    // בדיקת שורות
    for (let i = 1; i <= 7; i += 3) {
        if (arr[i] && arr[i] == arr[i + 1] && arr[i] == arr[i + 2]) {
            setTimeout(() => {
                alert(`שחקן ${t} ניצח!`);
                updateScore(t); // עדכון הסקור
                restart();
            }, 100);
            return;
        }
    }

    // בדיקת עמודות
    for (let i = 1; i <= 3; i++) {
        if (arr[i] && arr[i] == arr[i + 3] && arr[i] == arr[i + 6]) {
            setTimeout(() => {
                alert(`שחקן ${t} ניצח!`);
                updateScore(t); // עדכון הסקור
                restart();
            }, 100);
            return;
        }
    }

    // בדיקת אלכסונים
    if ((arr[1] && arr[1] == arr[5] && arr[1] == arr[9]) ||
        (arr[3] && arr[3] == arr[5] && arr[3] == arr[7])) {
        setTimeout(() => {
            alert(`שחקן ${t} ניצח!`);
            updateScore(t); // עדכון הסקור
            restart();
        }, 100);
        return;
    }

    // בדיקת תיקו
    if (cnt == 9) {
        cnt = 0;
        alert("המשחק נגמר ללא מנצחים");
        restart();
    }
}

function updateScore(winner) {
    if (winner === 'o') {
        scoreO += 10;
        document.getElementById("scoreO").textContent = `Score O: ${scoreO}`;
    } else if (winner === 'x') {
        scoreX += 10;
        document.getElementById("scoreX").textContent = `Score X: ${scoreX}`;
    }
}

function restart() {
    let c;
    cnt = 0;
    for (let i = 1; i < 10; i++) {
        c = document.getElementById(`w${i}`);
        c.innerHTML = '';
        arr[i] = 0;
    }
    t = 'o';
}

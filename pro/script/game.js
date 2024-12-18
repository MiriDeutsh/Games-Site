// // window.onload(window.)

//////מיכשולים
const berriers1 = [
    { id: 'rock', img: "../image/rock1.jpg" },
    { id: 'rock1', img: "../image/rock1.jpg" },
    { id: 'rock2', img: "../image/rock1.jpg" }
];
const berriers2 = [
    { id: 'rock', img: "../image/rock2.jpg" },
    { id: 'rock1', img: "../image/rock2.jpg" },
    { id: 'rock2', img: "../image/rock2.jpg" }
];
//////התחלת המשחק
function start_game() {
    running("../images/bunny-1.png", "../images/bunny-2.png", "../images/bunny-3.png");
    michsholim();//מיכשולים
    startScore();///חישוב הניקוד
    setTimeout(check, 5000);///בדיקת פסילה

    document.querySelector('body').addEventListener("keydown", function (e) {
        e.preventDefault();/////מונע את הפעולה הדיפולטיבית של המקש (כמו גלילה או פעולה אחרת)
        if (document.getElementById("runner").classList.contains("down")) {
            to_up();////העלאת הארנב 
            document.getElementById("runner").classList.add("up");
            document.getElementById("runner").classList.remove("down");
        } else {
            to_down();////הורדת הארנב
            document.getElementById("runner").classList.add("down");
            document.getElementById("runner").classList.remove("up");
        }
    });
}

let run, growingScore, rock1, rock2, checkCrushed;
///////תמונות מתחלפות ב
function running(pic1, pic2, pic3) {
    run = setInterval(function () {
        const runner = document.querySelector('#runner');
        if (runner.getAttribute('src') == pic1)
            runner.setAttribute('src', pic2);
        else if (runner.getAttribute('src') == pic2)
            runner.setAttribute('src', pic3);
        else
            runner.setAttribute('src', pic1);
    }, 100);
}
///// התמונות המתחלפות למעלה
function to_up() {
    clearInterval(run);
    running("../image/bunny-up-1.png", "../image/bunny-up-2.png", "../image/bunny-up-3.png");
}
///////התמונות המתחלפות למטה
function to_down() {
    clearInterval(run);
    running("../image/bunny-1.png", "../image/bunny-2.png", "../image/bunny-3.png");
}
//////חישוב הניקוד
function startScore() {
    let scoreElement = document.querySelector("#score");
    let score = 0;
    growingScore = setInterval(() => {
        score += 1;
        scoreElement.innerHTML = score;
        //// עדכון ניקוד המשחק בלוקל סטורג
        let playerName = new URLSearchParams(window.location.search).get("username");
        if (playerName) {
            let user = JSON.parse(localStorage.getItem(playerName));
            if (user) {
                user.score_of_games.Runny_Bunny +=1;
                localStorage.setItem(playerName, JSON.stringify(user));
            }
        }
    }, 250);
}
/////הרצת המיכשולים על המסך
function michsholim() {
    const road1 = [], road2 = [];
    for (let i = 0; i < berriers1.length; i++) {
        let index = Math.floor(Math.random() * berriers1.length);
        road1.push({ ...berriers1[index] });
        index = Math.floor(Math.random() * berriers2.length);
        road2.push({ ...berriers2[index] });
    }
    let i = 0;
    rock1 = setInterval(() => {
        let cur = document.createElement('img');
        if (++i == road1.length)
             i = 0;
        cur.setAttribute("src", road1[i].img);
        cur.classList.add("rock1");
        document.querySelector(`#rock`).append(cur);
        setTimeout(() => cur.remove(), 5000);////מחיקת התמונה
    }, 2300);

    rock2 = setInterval(() => {
        let cur = document.createElement('img');
        if (++i == road2.length)
             i = 0;
        cur.setAttribute("src", road2[i].img);
        cur.classList.add("rock2");
        document.querySelector(`#rock`).append(cur);
        setTimeout(() => cur.remove(), 5000);/////מחיקת התמונה
    }, 1570);
}
/////בדיקת פסילה
function check() {
    checkCrushed = setInterval(function () {
        const rocks = document.querySelector("#rock");
        const rock = rocks.firstElementChild;
        const runner1 = document.querySelector("#runner");
        let bunnyR = runner1.offsetLeft + 105;
        let rockLeft = rock.offsetLeft;

        if (bunnyR > rockLeft && rockLeft >= 10 &&
            ((runner1.classList.contains("down") && rock.classList.contains("rock1")) ||
             (runner1.classList.contains("up") && rock.classList.contains("rock2")))) {
            let searchParams = new URLSearchParams(location.search);
            let user = searchParams.get("username");
            let score = parseInt(document.querySelector("#score").innerHTML);
            game_over(user, score);
        }
    }, 10);
}

function game_over(user, score) {
    alert("Game Over");
    clearInterval(run);
    clearInterval(growingScore);
    clearInterval(rock1);
    clearInterval(rock2);
    clearInterval(checkCrushed);

    let body = document.querySelector('body');
    body.innerHTML = "";
    let new_div = document.createElement('div');
    new_div.classList.add("game_over");
    body.append(new_div);

    let players = JSON.parse(localStorage.getItem('players')) || [];
    let player = players.find(p => p.user == user);
    let the_best = player ? player.best : 0;
    
    if (score > the_best) {
        if (player) {
            player.best = score;
        } else {
            players.push({ user: user, best: score });
        }
        localStorage.setItem('players', JSON.stringify(players));
    }

    new_div.innerHTML = `<p class="over">Player: ${user}</p></br>`;
    new_div.innerHTML += `<p class="over">Your score: ${score}</p></br>`;
    new_div.innerHTML += `<p class="over">Your Best: ${score > the_best ? score : the_best}</p></br>`;
    new_div.innerHTML += `<button id="back_to_menu">Back To Menu</button></br>`;
    new_div.innerHTML += `<button id="back_to_game">Play Again!!!</button></br>`;
    new_div.innerHTML += `<button id="back_to_home">RETURN TO THE MAIN PAGE</button></br>`;

    document.querySelector("#back_to_menu").onclick = function () {
        location.href = "../HomePage.html";
    };
    document.querySelector("#back_to_game").onclick = function () {
        location.href = "../pages/game.html?username=" + user;
    };
    document.querySelector("#back_to_home").onclick = function () {
        location.href = "../../home/home.html?username=" + user;
    };
}

start_game();








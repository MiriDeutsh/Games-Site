const data = JSON.parse(sessionStorage.getItem("user")); ///// מקבל את הנתון "user" מ-sessionStorage וממיר אותו ממחרוזת לאובייקט JSON
let str = JSON.stringify(data); ////// ממיר את האובייקט "data" למחרוזת JSON
////// השגת המחרוזת המכילה את שמות המשתמשים והניקוד שלהם
let str1 = "";
data.forEach(p => {
    str1 += `User: ${p.user}, Best: ${p.best}<br>`;
});

document.querySelector(`div`).innerHTML = str1; /////// מכניס את המחרוזת "str1" לתוך אלמנט div בדף
  
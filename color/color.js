
function f1() {
    for (var i = 0; i < 45; i++) {
        document.getElementById("t1").innerHTML += "<tr id='r" + i + "'></tr>";
        for (var j = 0; j < 90; j++) {
            document.getElementById("r"+i).innerHTML += "<td> </td>";
            
        }
    }
}
let flag = true, color='black';
function change() {
     color = document.getElementsByTagName("input")[0].value;
}
function add() {
    if (flag)
       document.getElementById("t1").addEventListener("mouseover", mouseover)
    else
       document.getElementById("t1").removeEventListener("mouseover", mouseover)
    flag = !flag;
}
function mouseover() {
    window.event.target.style.backgroundColor = color;
}

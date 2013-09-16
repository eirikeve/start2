window.setInterval(function(){
    setTime();
}, 1000);

function setTime() {
    var timer = document.getElementById("timer");
    var now = new Date();
    var then = new Date("Mon, Oct 28 2013 00:00:01");
    var diff = then - now;

    var days = Math.floor(diff/1000/60/60/24);
    var hours = Math.floor(diff/1000/60/60 - days*24);
    var minutes = Math.floor(diff/1000/60 - hours*60-days*24*60);
    var seconds = Math.floor(diff/1000 - minutes*60-hours*60*60-days*60*60*24);

    timer.innerHTML = ""+days+" days "+hours+" hours "+minutes+" minutes "+seconds+" seconds";
}
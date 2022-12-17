var start = document.querySelector('#start');
var timer = document.querySelector('#timer');
console.log(timer);

start.addEventListener("click", function() {
    start.remove();
    var secondsLeft = 60;
    var timerInterval = setInterval(function() {
        timer.textContent = "Time left: "+secondsLeft+" seconds";
        secondsLeft --;
    
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
})
/* Title app */
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "¡Enfoquemonos! 😢⏰  |  Stay Focused";
    } else {
      document.title = "Stay Focused 🤓⏰";
    }
});


let timerInterval;
let isPaused = false;
let timeRemaining;
let workTime;
let restTime;

function startTimer(work, rest) {
    workTime = work;
    restTime = rest;
    clearInterval(timerInterval);
    let time = work * 60;
    timeRemaining = time;
    updateDisplay(time);
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            updateDisplay(timeRemaining);
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert(`Tiempo de descanso: ${rest} minutos`);
            }
        }
    }, 1000);
}

function updateDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function pauseTimer() {
    isPaused = !isPaused;
    document.getElementById('pause').innerText = isPaused ? 'Reanudar' : 'Pausar';
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = '00:00';
    isPaused = false;
    document.getElementById('pause').innerText = 'Pausar';
}


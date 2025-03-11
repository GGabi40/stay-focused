/* Title app */
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.title = "¡Enfoquemonos! 😢⏰  |  Stay Focused";
    } else {
      document.title = "Stay Focused 🤓⏰";
    }
});


/* Modal - Custom Timer */
const dialogBox = document.getElementById('dialogBox');
function showModal() {
    dialogBox.showModal();
    setTimeout(() => {
        dialogBox.style.opacity = "1";
        dialogBox.style.transform = "scale(1)";
    }, 10);
}

function closeModal() {
    dialogBox.style.opacity = "0";
    dialogBox.style.transform = "scale(0.8)";
    setTimeout(() => {
        dialogBox.close();
    }, 300);
}

function processing() {
    const customTimeWork = document.getElementById('work').value;
    const customTimeRest = document.getElementById('rest').value;
    const error = document.getElementById('error');
    error.classList.remove('show');
    error.innerText = '';

    if(!customTimeWork || !customTimeRest) {
        error.classList.add('show');
        error.innerText = 'Debes ingresar un tiempo de concentración y de descanso.';
        return;
    }

    if(customTimeWork < 1 || customTimeRest < 1) {
        error.classList.add('show');
        error.innerText = 'El tiempo no debe ser negativo.';
        return;
    }

    if (customTimeWork.trim() === '' || customTimeRest.trim() === '') {
        error.classList.add('show');
        error.innerText = 'No puedes ingresar solo espacios en los campos.';
        return;
    }

    if(customTimeWork === customTimeRest) {
        error.classList.add('show');
        error.innerText = 'Los tiempos deben ser distintos entre sí.';
        return;
    }

    if(customTimeWork <= 10) {
        error.classList.add('show');
        error.innerText = 'El tiempo de Concentración debe ser mayor a 10 minutos.';
        return;
    }

    if (isNaN(customTimeWork) || isNaN(customTimeRest)) {
        error.classList.add('show');
        error.innerText = 'Solo se permiten números.';
        return;
    }

    if (customTimeWork > 180 || customTimeRest > 180) {
        error.classList.add('show');
        error.innerText = 'El tiempo no debe superar los 180 minutos.';
        return;
    }

    if (!Number.isInteger(Number(customTimeWork)) || !Number.isInteger(Number(customTimeRest))) {
        error.classList.add('show');
        error.innerText = 'Los tiempos deben ser números enteros.';
        return;
    }

    error.classList.remove('show');
    startTimer(customTimeWork, customTimeRest);
    closeModal();
}


/* Timer */
let timerInterval;
let isPaused = false;
let timeRemaining;
let workTime;
let restTime;
let contadorWork = 0;
let contadorRest = 0;
const workingOrResting = document.getElementById('workingOrResting');

function startTimer(work, rest) {
    document.getElementById("beginning").style.display = "none";
    document.querySelector(".timer-container").style.display = "block";
    contadorWork++;
    document.getElementById('workCount').innerText = contadorWork;

    const workingPhrases = [
        'Shh... Estoy leyendo',
        '¡Es momento de concentrarnos!',
        '¡Ya falta menos!',
        '¡Sigamos adelante!', 
        '¡No hay tiempo que perder!', 
        '¡A concentrarse!', 
        'Vamos que se puede', 
        'Casi lo logro', 
        'Todo está en marcha', 
        '¡Concentración al máximo!'
    ]
    const index = Math.floor(Math.random() * workingPhrases.length);
    workingOrResting.innerText = workingPhrases[index];

    workTime = work;
    restTime = rest;

    clearInterval(timerInterval);
    let time = work * 60;
    timeRemaining = time;
    updateDisplay(time);

    document.getElementById('animation').src = './assets/img/work.gif'
    document.getElementById('animation').alt = 'Coffee - Work GIF'

    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            updateDisplay(timeRemaining);

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                document.getElementById('animation').src = './assets/img/rest.gif'
                document.getElementById('animation').alt = 'Take a Rest GIF'
                document.getElementById('workAudio').play();

                startRestTimer(rest);
            }
        }
    }, 1000);
}

function startRestTimer(rest) {
    let time = rest * 60;
    timeRemaining = time;
    updateDisplay(time);
    contadorRest++;
    document.getElementById('restCount').innerText = contadorRest;

    const restingPhrases = [
        'Un descansito',
        'Relájate un poco', 
        'Respira profundo', 
        'Un poco de descanso nunca viene mal', 
        'Recarga energías', 
        '¡Tómate un respiro!', 
        '¡Un break para seguir con todo!',
        'Tiempo para desconectar'
    ]
    const index = Math.floor(Math.random() * restingPhrases.length);
    workingOrResting.innerText = restingPhrases[index];

    timerInterval = setInterval(() => {
        if(!isPaused) {
            timeRemaining--;
            updateDisplay(timeRemaining);

            if(timeRemaining <= 0) {
                clearInterval(timerInterval);
                document.getElementById('restAudio').play();
                startTimer(workTime, restTime);
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
    workingOrResting.innerText = 'TIEMPO EN PAUSA';
    document.getElementById('pause').innerText = isPaused ? 'Reanudar' : 'Pausar';
}

function stopTimer() {
    workingOrResting.innerText = 'El Tiempo se detuvo...';
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = '00:00';
    isPaused = false;
    document.getElementById('pause').innerText = 'Pausar';
    contadorRest = 0;
    contadorWork = 0;
}

function getBack() {
    document.getElementById("beginning").style.display = "block";
    document.querySelector(".timer-container").style.display = "none";

    clearInterval(timerInterval);
    isPaused = false;
    document.getElementById('pause').innerText = 'Pausar';

    contadorRest = 0;
    contadorWork = 0;
}
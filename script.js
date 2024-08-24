let timer;
let isRunning = false;
let elapsedTime = 0; // in milliseconds
let startTime = 0;   // Time when the stopwatch started
let lapTime = 0;     // Time when the last lap started

function updateDisplay() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    document.getElementById('display').textContent =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        lapTime = startTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    startTime = 0;
    lapTime = 0;
    updateDisplay();
    document.getElementById('lapList').innerHTML = ''; // Clear lap times
}

function recordLap() {
    if (isRunning) {
        const currentLapTime = Date.now() - lapTime;
        lapTime = Date.now();
        
        const hours = Math.floor(currentLapTime / (1000 * 60 * 60));
        const minutes = Math.floor((currentLapTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((currentLapTime % (1000 * 60)) / 1000);

        const lapList = document.getElementById('lapList');
        const lapItem = document.createElement('li');
        lapItem.textContent =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
        lapList.appendChild(lapItem);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

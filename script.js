document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    loadTimer();
});

function startTimer() {
    const datetimePicker = document.getElementById('datetime-picker');
    const targetDate = new Date(datetimePicker.value);
    if (isNaN(targetDate.getTime())) {
        alert('Please select a valid date and time.');
        return;
    }
    saveTimer(targetDate);
    updateTimer(targetDate);
}

function saveTimer(targetDate) {
    localStorage.setItem('countdownTargetDate', targetDate);
}

function loadTimer() {
    const targetDate = new Date(localStorage.getItem('countdownTargetDate'));
    if (!isNaN(targetDate.getTime())) {
        updateTimer(targetDate);
    }
}

function updateTimer(targetDate) {
    const timer = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(timer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            alert("Countdown finished!");
            localStorage.removeItem('countdownTargetDate');
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

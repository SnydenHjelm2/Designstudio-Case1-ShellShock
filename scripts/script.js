function driver() {
    timerTime(eggSize, boilType);
    timerDonePopup.style.display = "none";
}

function msToTime(ms) {
    let s = ms / 1000;
    let m = s / 60;
    let minutes = Math.trunc(m);
    let seconds = (m % 1) * 60;
    if (minutes < 10 && seconds < 10) {
        timerText.textContent = `0${minutes}:0${Math.round(seconds)}`;
    } else if (minutes < 10) {
        timerText.textContent = `0${minutes}:${Math.round(seconds)}`;
    }
}

function startTimer() {
    timerID = setInterval(() => {
        if (timeMs <= 0) {
            timerDonePopup.style.display = "flex";
            clearInterval(timerID)
        }
        gif.innerHTML = `<div><img src="../images/dancing-egg.gif"></div>`;
        infoText.innerHTML = `<p>Sit back and relax while ShellShock does the rest.<br></p><p>When your eggs are done, don't forget to visit our recipes page!</p>`
        msToTime(timeMs);
        timeMs -= 1000;
    }, 1000);
}

function timerTime(size, type) {
    let eggSize = size.value;
    let boilType = type.value;

    if (eggSize === "Small") {
        if (boilType === "Soft") {
            timeMs = 5000;
        } else if (boilType === "Medium") {
            timeMs = 360000;
        } else if (boilType === "Hard") {
            timeMs = 480000;
        }
    } else if (eggSize === "Medium") {
        if (boilType === "Soft") {
            timeMs = 270000;
        } else if (boilType === "Medium") {
            timeMs = 390000;
        } else if (boilType === "Hard") {
            timeMs = 510000;
        }
    } else if (eggSize === "Large") {
        if (boilType === "Soft") {
            timeMs = 300000;
        } else if (boilType === "Medium") {
            timeMs = 420000;
        } else if (boilType === "Hard") {
            timeMs = 540000;
        }
    } else if (eggSize === "XL") {
        if (boilType === "Soft") {
            timeMs = 330000;
        } else if (boilType === "Medium") {
            timeMs = 450000;
        } else if (boilType === "Hard") {
            timeMs = 570000;
        }
    }

    msToTime(timeMs);
}

const boilType = document.querySelector("#boil");
const eggSize = document.querySelector("#size");
const gif = document.querySelector("#gif");
const infoText = document.querySelector("#info-text");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const timerDonePopup = document.querySelector("#timer-done-popup");
const closeTimerDonePopup = document.querySelector("#timer-done-popup div button");
const timerText = document.querySelector("#timer p");
let timerID;
let timeMs;
let timerStarted = false;

boilType.addEventListener("click", () => {timerTime(eggSize, boilType)});
closeTimerDonePopup.addEventListener("click", () => {
    timerDonePopup.style.display = "none";
    timerTime(eggSize, boilType);
});
eggSize.addEventListener("click", () => {timerTime(eggSize, boilType)});
startButton.addEventListener("click", () => {startTimer(timeMs)});
stopButton.addEventListener("click", () => {
    clearInterval(timerID);
    timerTime(eggSize, boilType);
    gif.innerHTML = `<div><img src="../images/question-egg.gif"></div>`;
});

driver();
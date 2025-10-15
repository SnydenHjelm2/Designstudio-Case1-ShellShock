function driver() {
    timerTime(eggSize, boilType, true);
    document.querySelector("#altitude select").value = "0m";
    timerDonePopup.style.display = "none";
    helpPopup.style.display = "none";
    menuPopup.style.display = "none";
    dancingEgg.style.display = "none";
    settingsPopup.style.display = "none";
    recipesPage.style.display = "none";
}

function msToTime(ms) {
    let s = ms / 1000;
    let m = s / 60;
    let minutes = Math.trunc(m);
    let seconds = (m % 1) * 60;
    if (seconds < 0) {
        timerText.textContent = "00:00";
    } else if (minutes < 10 && seconds < 10) {
        timerText.textContent = `0${minutes}:0${Math.round(seconds)}`;
    } else if (minutes < 10) {
        timerText.textContent = `0${minutes}:${Math.round(seconds)}`;
    } else if (Math.round(seconds) < 10) {
        timerText.textContent = `${minutes}:0${Math.round(seconds)}`;
    } else {
        timerText.textContent = `${minutes}:${Math.round(seconds)}`;
    }
}

function startTimer() {
    timerStarted = true;
    questionEgg.style.display = "none";
    dancingEgg.style.display = "block";
    infoText.innerHTML = `<p>Sit back and relax while ShellShock does the rest.<br></p><p>When your eggs are done, don't forget to visit our recipes page!</p>`;
    timerID = setInterval(() => {
        if (timeMs <= 0) {
            timerStarted = false;
            pause = false;
            menuPopup.style.display = "none";
            helpPopup.style.display = "none";
            timerDonePopup.style.display = "flex";
            clearInterval(timerID);
        }
        if (!pause) {
            timeMs -= 1000;
            msToTime(timeMs);
        } 
    }, 1000);
}

function timerTime(size, type, onRefresh) {
    let eggSize = size.value;
    let boilType = type.value;
    let selectedBoilTechnique = document.querySelector(".selected");
    let altitudeSelect = document.querySelector("#altitude select");
    let extraTime = 0;

    if (onRefresh) {
        altitudeSelect.value = "0m";
    }

    if (selectedBoilTechnique.id === "cold-water") {
        extraTime += 240000;
    }

    let altitude = parseInt(altitudeSelect.value.split("m")[0]);
    let altitudeInFt = altitude * 3.28084;
    altitudeInFt = Math.round(altitudeInFt);
    if (altitudeInFt >= 13000) {
        extraTime += 780000;
    } else if (altitudeInFt >= 600000) {
        extraTime += 120000;
    } else if  (altitudeInFt >= 8000) {
        extraTime += 480000;
    } else if (altitudeInFt >= 6000) {
        extraTime += 360000
    } else if (altitudeInFt >= 4000) {
        extraTime += 240000;
    } else if (altitudeInFt >= 2000) {
        extraTime += 120000;
    } else if (altitudeInFt >= 1000) {
        extraTime += 60000;
    }
    

    if (eggSize === "Small") {
        if (boilType === "Soft") {
            timeMs = 240000 + extraTime;
        } else if (boilType === "Medium") {
            timeMs = 360000 + extraTime;
        } else if (boilType === "Hard") {
            timeMs = 480000 + extraTime;
        }
    } else if (eggSize === "Medium") {
        if (boilType === "Soft") {
            timeMs = 270000 + extraTime;
        } else if (boilType === "Medium") {
            timeMs = 390000 + extraTime;
        } else if (boilType === "Hard") {
            timeMs = 510000 + extraTime;
        }
    } else if (eggSize === "Large") {
        if (boilType === "Soft") {
            timeMs = 300000 + extraTime;
        } else if (boilType === "Medium") {
            timeMs = 420000 + extraTime;
        } else if (boilType === "Hard") {
            timeMs = 540000 + extraTime;
        }
    } else if (eggSize === "XL") {
        if (boilType === "Soft") {
            timeMs = 330000 + extraTime;
        } else if (boilType === "Medium") {
            timeMs = 450000 + extraTime;
        } else if (boilType === "Hard") {
            timeMs = 570000 + extraTime;
        }
    }

    msToTime(timeMs);
}

const boilTechniqueStatus = document.querySelector("#boil-technique-status");
const boilType = document.querySelector("#boil");
const boilingWater = document.querySelector("#boiling-water");
const coldWater = document.querySelector("#cold-water");
const dancingEgg = document.querySelector("#d-egg");
const eggControls = document.querySelector("#egg-controls");
const eggSize = document.querySelector("#size");
const gif = document.querySelector("#gif");
const help = document.querySelector("#help");
const helpPopup = document.querySelector("#help-popup");
const helpPopupExit = document.querySelector("#help-exit");
const home = document.querySelector("#home");
const infoText = document.querySelector("#info-text");
const menu = document.querySelector("#menu");
const menuPopup = document.querySelector("#menu-popup");
const menuPopupExit = document.querySelector("#menu-exit");
const recipesBackButton = document.querySelector("#recipes-back-button");
const recipesNav = document.querySelector("#recipes-nav");
const recipesPage = document.querySelector("#recipes");
const settings = document.querySelector("#settings");
const settingsBackButton = document.querySelector("#settings-back-button");
const settingsPopup = document.querySelector("#settings-popup");
const startButton = document.querySelector("#start");
const startButtonImg = document.querySelector("#start img");
const stopButton = document.querySelector("#stop");
const timer = document.querySelector("#timer");
const timerDonePopup = document.querySelector("#timer-done-popup");
const timerDonePopupExit = document.querySelector("#timer-done-popup div button");
const timerControls = document.querySelector("#timer-controls");
const timerText = document.querySelector("#timer p");
const questionEgg = document.querySelector("#q-egg");
let pause = false;
let timerID;
let timeMs = 0;
let timerStarted = false;

boilType.addEventListener("click", () => {
    if (timerStarted) {return;}
    timerTime(eggSize, boilType)
});

boilingWater.addEventListener("click", () => {
    if (boilingWater.classList.contains("unselected")) {
        boilingWater.classList.remove("unselected");
        boilingWater.classList.add("selected");
        coldWater.classList.remove("selected");
        coldWater.classList.add("unselected");
        boilTechniqueStatus.textContent = "Boiling water selected";
    }
});

coldWater.addEventListener("click", () => {
    if (coldWater.classList.contains("unselected")) {
        coldWater.classList.remove("unselected");
        coldWater.classList.add("selected");
        boilingWater.classList.remove("selected");
        boilingWater.classList.add("unselected");
        boilTechniqueStatus.textContent = "Cold water selected";
    }
});

timerDonePopupExit.addEventListener("click", () => {
    timerDonePopup.style.display = "none";
    dancingEgg.style.display = "none";
    questionEgg.style.display = "block";
    startButton.classList.remove("pause");
    startButtonImg.src = "../images/start.png";
    timerTime(eggSize, boilType);
});

eggSize.addEventListener("click", () => {
    if (timerStarted) {return;}
    timerTime(eggSize, boilType)
});

help.addEventListener("click", () => {
    helpPopup.style.display = "flex";
});

helpPopupExit.addEventListener("click", () => {
    helpPopup.style.display = "none";
});

home.addEventListener("click", () => {
    infoText.style.display = "block";
    eggControls.style.display = "flex";
    dancingEgg.style.display = "none";
    questionEgg.style.display = "block";
    timer.style.display = "block";
    timerControls.style.display = "flex";
    recipesPage.style.display = "none";
    menuPopup.style.display = "none";
});

menu.addEventListener("click", () => {
    menuPopup.style.display = "flex";
});

menuPopupExit.addEventListener("click", () => {
    menuPopup.style.display = "none";
});

recipesBackButton.addEventListener("click", () => {
    infoText.style.display = "block";
    eggControls.style.display = "flex";
    dancingEgg.style.display = "none";
    questionEgg.style.display = "block";
    timer.style.display = "block";
    timerControls.style.display = "flex";
    recipesPage.style.display = "none";
});

recipesNav.addEventListener("click", () => {
    infoText.style.display = "none";
    eggControls.style.display = "none";
    dancingEgg.style.display = "none";
    questionEgg.style.display = "none";
    timer.style.display = "none";
    timerControls.style.display = "none";
    recipesPage.style.display = "flex";
    menuPopup.style.display = "none";
});

settings.addEventListener("click", () => {
    menuPopup.style.display = "none";
    recipesPage.style.display = "none";
    infoText.style.display = "block";
    eggControls.style.display = "flex";
    dancingEgg.style.display = "none";
    questionEgg.style.display = "block";
    timer.style.display = "block";
    timerControls.style.display = "flex";
    settingsPopup.style.display = "block";
});

settingsBackButton.addEventListener("click", () => {
    settingsPopup.style.display = "none";
    timerTime(eggSize, boilType);
});

startButton.addEventListener("click", () => {
    if (timerStarted && pause) {
        pause = false;
        startButton.classList.add("pause");
        startButtonImg.src = "../images/pause.png"; 
        return;
    } else if (timerStarted) {
        pause = true;
        startButton.classList.remove("pause");
        startButtonImg.src = "../images/start.png";
        return;
    } else {
        startTimer(timeMs);
        startButton.classList.add("pause");
        startButtonImg.src = "../images/pause.png";
    }
});

stopButton.addEventListener("click", () => {
    clearInterval(timerID);
    pause = false;
    timerStarted = false;
    timerTime(eggSize, boilType);
    questionEgg.style.display = "block";
    dancingEgg.style.display = "none";
    startButton.classList.remove("pause");
    startButtonImg.src = "../images/start.png";
    infoText.innerHTML = `<p>Welcome to ShellShock, your egg boiling companion!<br></p>
        <p>Pick egg size and boil type below and start cooking!</p>`;
});

driver();
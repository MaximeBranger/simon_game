const infosDiv = document.querySelector(".informations");

const cards = document.querySelectorAll(".card");

const red = document.querySelector(".card#red");
const green = document.querySelector(".card#green");
const blue = document.querySelector(".card#blue");
const yellow = document.querySelector(".card#yellow");

const startButton = document.querySelector(".command");

const difficultyDiv = document.querySelector(".levels");
const difficultyInput = document.querySelector("#diff");
const difficultyDisplay = document.querySelector("#difficulty");

cards.forEach(c => {
    c.style.backgroundColor = c.id;
    c.addEventListener("click", checkClick)
});

startButton.addEventListener("click", startGame);

difficultyInput.addEventListener("change", updateDifficulty);

let isPlaying = false;
let isWatching = false;
let level = 0;
const colors = [red, green, blue, yellow];
const sequence = [];
const userSequence = [];

let timeout = 800;

let interval;

function startGame(ev) {
    reset();
    if (isPlaying) {
        return;
    }

    isPlaying = true;
    startButton.style.display = "none";
    difficultyDiv.style.display = "none";

    updateSequence()
    runSequence();
}

function updateSequence() {
    level++;
    sequence.push(colors[Math.floor(Math.random() * colors.length)])
}

function runSequence() {

    infosDiv.textContent = "Watch the sequence !";
    isWatching = true;
    sequence.forEach((item, index) => {
        setTimeout(() => {
            activateColor(item);
        }, (index + 1) * timeout);
    });

    setTimeout(() => {
        isWatching = false;
        infosDiv.textContent = "Your turn";
    }, (sequence.length + 1) * timeout);

}

function activateColor(item) {
    item.style.opacity = 1;
    setTimeout(() => {
        item.style.opacity = .5;
    }, timeout / 2);
}

function checkClick(ev) {
    if (!isPlaying || isWatching) {
        return;
    }
    isWatching = true;

    if (ev.target === sequence[userSequence.length]) {
        activateColor(ev.target);
        userSequence.push(ev.target);
        isWatching = false;
    } else {
        infosDiv.textContent = "Oh no ! You failed at level " + sequence.length;
        startButton.style.display = "block";
        difficultyDiv.style.display = "flex";
    }

    if (sequence.length === userSequence.length) {
        updateSequence();
        userSequence.length = 0;
        setTimeout(() => {
            runSequence();
        }, timeout / 2);

    }
}

function reset() {
    isPlaying = false;
    level = 0;
    sequence.length = 0;
    userSequence.length = 0;
}

function updateDifficulty(ev) {
    const difficulty = parseInt(ev.target.value);
    if (difficulty === 1) {
        difficultyDisplay.textContent = "Easy";
        timeout = 800;
    } else if (difficulty === 2) {
        difficultyDisplay.textContent = "Medium";
        timeout = 500;
    } else if (difficulty === 3) {
        difficultyDisplay.textContent = "Hard";
        timeout = 200;
    }
}
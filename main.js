const optionsArray = [
    "apple", "banana", "cherry", "grape", "orange", "melon", "strawberry", "blueberry", "watermelon", "pineapple"
];
let answer;
let maxWrongGuess = 5;
let mistakes = 0;
let guessed = [];
let wordStatus;

let mistakeElement = document.getElementById("mistakes");
let maxWrongGuessElement = document.getElementById("maxWrongGuesses");
let gameOverContainer = document.getElementById("gameOverContainer");
let gameOverStatus = document.getElementById("gameOverStatus");
let letterContainer = document.getElementById("letterContainer");
mistakeElement.innerHTML = mistakes;
maxWrongGuessElement.innerHTML = maxWrongGuess;

function generateButtons() {
    let keyboardContainerElement = document.getElementById('keyboardContainer');
    let keyboardButtons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => 
        `
            <button 
                class="keyboardLetter"
                id="` + letter + `"
                onClick="handleGuess('` + letter + `')"
            >
            ` + letter + `</button>
        `).join('');
    keyboardContainerElement.innerHTML = keyboardButtons; 
}

function selectRandomWord() {
    answer = optionsArray[Math.floor(Math.random() * optionsArray.length)];
    guessed = [];
    wordStatus = new Array(answer.length).fill('_');
    displayWord();
}

function displayWord() {
    letterContainer.innerHTML = wordStatus.join(' ');
}

function handleGuess(letter) {
    if (guessed.includes(letter)) return;
    guessed.push(letter);

    if (answer.includes(letter)) {
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] === letter) {
                wordStatus[i] = letter;
            }
        }
        document.getElementById(letter).classList.add("correctLetter");
    } else {
        mistakes++;
        document.getElementById(letter).classList.add("incorrectLetter");
        if (mistakes === maxWrongGuess) {
            gameOver("lose");
            return;
        }
    }

    displayWord();
    mistakeElement.innerHTML = mistakes;

    if (wordStatus.join('') === answer) {
        gameOver("win");
    }
}

function gameOver(status) {
    gameOverContainer.style.visibility = "visible";
    if (status === "win") {
        gameOverStatus.innerHTML = "You Win!";
    } else {
        gameOverStatus.innerHTML = `You Lose! The word was "${answer}".`;
    }
}

function startOver() {
    mistakes = 0;
    mistakeElement.innerHTML = mistakes;
    gameOverContainer.style.visibility = "hidden";
    generateButtons();
    selectRandomWord();
}
generateButtons();
selectRandomWord();

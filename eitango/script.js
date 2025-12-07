const words = [
  "apple", "banana", "computer", "keyboard", "javascript",
  "github", "school", "teacher", "window", "language",
  "program", "function", "variable", "internet", "browser"
];

let currentWord = "";
let score = 0;
let time = 30;
let timer;

const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

function startGame() {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  inputEl.disabled = false;
  inputEl.value = "";
  inputEl.focus();
  messageEl.textContent = "";
  startBtn.disabled = true;
  nextWord();
  timer = setInterval(updateTime, 1000);
}

function nextWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordEl.textContent = currentWord;
}

function updateTime() {
  time--;
  timeEl.textContent = time;
  if (time <= 0) {
    clearInterval(timer);
    endGame();
  }
}

function endGame() {
  inputEl.disabled = true;
  startBtn.disabled = false;
  messageEl.textContent = `Game Over! Final Score: ${score}`;
}

inputEl.addEventListener("input", () => {
  if (inputEl.value === currentWord) {
    score++;
    scoreEl.textContent = score;
    inputEl.value = "";
    nextWord();
  }
});

startBtn.addEventListener("click", startGame);

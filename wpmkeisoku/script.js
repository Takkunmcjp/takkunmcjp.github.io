const words = [
  "apple","banana","computer","keyboard","language","school","teacher","window","browser",
  "program","function","variable","internet","github","typing","practice","speed","music","river",
  "mountain","forest","desert","ocean","planet","galaxy","universe","energy","future","history"
];

let currentWord = "";
let score = 0;
let time = 60;
let timer;
let typedChars = 0; // 入力文字数を記録

const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("startBtn");
const wpmEl = document.getElementById("wpm");

function startGame() {
  score = 0;
  time = 60;
  typedChars = 0;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  wpmEl.textContent = 0;
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
  updateWPM();
  if (time <= 0) {
    clearInterval(timer);
    endGame();
  }
}

function updateWPM() {
  const elapsedMinutes = (60 - time) / 60;
  if (elapsedMinutes > 0) {
    const wpm = Math.round((typedChars / 5) / elapsedMinutes);
    wpmEl.textContent = wpm;
  }
}

function endGame() {
  inputEl.disabled = true;
  startBtn.disabled = false;
  messageEl.textContent = `ゲーム終了！スコア: ${score}, WPM: ${wpmEl.textContent}`;
}

inputEl.addEventListener("input", () => {
  const typed = inputEl.value.toLowerCase();
  if (typed === currentWord.toLowerCase()) {
    score++;
    scoreEl.textContent = score;
    typedChars += currentWord.length; // 正解した単語の文字数を加算
    inputEl.value = "";
    nextWord();
    updateWPM();
  } else {
    inputEl.classList.add("error");
    setTimeout(() => inputEl.classList.remove("error"), 300);
  }
});

startBtn.addEventListener("click", startGame);

function endGame() {
  inputEl.disabled = true;
  startBtn.disabled = false;
  const finalWPM = wpmEl ? wpmEl.textContent : 0;
  messageEl.textContent = `ゲーム終了！スコア: ${score}, WPM: ${finalWPM}`;

  // 履歴保存
  const history = JSON.parse(localStorage.getItem("typingHistory")) || [];
  history.push({
    game: "WPM計測", // 各ゲームごとに名前を変える
    score: score,
    wpm: finalWPM,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("typingHistory", JSON.stringify(history));
}

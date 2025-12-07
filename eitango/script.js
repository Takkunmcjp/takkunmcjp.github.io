const words = [
  "army","apple","banana","computer","keyboard","language","school","teacher","window","browser",
  "program","function","variable","internet","github","typing","practice","speed","music","river",
  "mountain","forest","desert","ocean","planet","galaxy","universe","energy","future","history",
  "science","engineer","doctor","nurse","student","library","book","pencil","paper","station",
  "train","airplane","airport","garden","flower","animal","tiger","lion","elephant","giraffe",
  "monkey","zebra","horse","dog","cat","bird","fish","shark","whale","dolphin","sun","moon","star"
];

let currentWord = "";
let score = 0;
let time = 60;
let timer;

const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

function startGame() {
  score = 0;
  time = 60;
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
  const typed = inputEl.value.toLowerCase();
  if (typed === currentWord.toLowerCase()) {
    score++;
    scoreEl.textContent = score;
    inputEl.value = "";
    nextWord();
  } else {
    // ミス演出: 入力が違う時に赤く点滅
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
    game: "英単語タイピング", // 各ゲームごとに名前を変える
    score: score,
    wpm: finalWPM,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("typingHistory", JSON.stringify(history));
}

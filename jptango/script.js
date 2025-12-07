const words = [
  "りんご","みかん","バナナ","ぶどう","すいか","さくらんぼ","いちご","メロン","もも","なし",
  "ねこ","いぬ","とり","うま","ぞう","きりん","さる","くま","しか","うさぎ",
  "やま","かわ","うみ","もり","そら","たいよう","つき","ほし","かぜ","くも",
  "がっこう","せんせい","ほん","えんぴつ","けしごむ","じしょ","ノート","じゅぎょう","テスト","きょうしつ",
  "でんしゃ","バス","くるま","ひこうき","ふね","じてんしゃ","えき","みち","こうさてん","しんごう",
  "パソコン","スマホ","インターネット","ゲーム","アニメ","えいが","おんがく","スポーツ","サッカー","やきゅう"
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
  messageEl.textContent = `ゲーム終了！スコア: ${score}`;
}

inputEl.addEventListener("input", () => {
  const typed = inputEl.value;
  if (typed === currentWord) {
    score++;
    scoreEl.textContent = score;
    inputEl.value = "";
    nextWord();
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
    game: "日本語単語タイピング", // 各ゲームごとに名前を変える
    score: score,
    wpm: finalWPM,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("typingHistory", JSON.stringify(history));
}

const sentences = [
  // 日常会話
  "今日は友達と遊びました。",
  "明日は早起きできるかな？",
  "お腹がすいた！",
  "宿題を終わらせました",
  "新しい服を買いました！",
  "今日は疲れたので早く寝ます。",
  "コーヒーを飲んでから仕事を始めます",
  "旅行に行きたい！",
  "音楽を聴くのが好きです。",
  "犬と散歩しました",

  // 学校・勉強
  "図書館で本を読みました。",
  "先生に質問しました",
  "テストが難しかった！",
  "授業中に眠くなった？",
  "ノートを忘れてしまいました。",
  "新しい単語を覚えました！",

  // 趣味・娯楽
  "友達と映画を見に行きます。",
  "ゲームをクリアしました！",
  "アニメを一気に見ました。",
  "スポーツをするのが好きです。",
  "サッカーの試合を見ました！",
  "美味しいラーメンを食べました。",
  "カラオケで歌いました！",

  // 自然・季節
  "今日はいい天気ですね。",
  "雨が降りそうです。",
  "桜が咲きました！",
  "夏休みが楽しみです。",
  "冬は寒いですね。",
  "星がきれいに見えました。",
  "海に行きたい！",

  // 感情・気持ち
  "とても嬉しいです！",
  "少し悲しい気持ちになりました。",
  "びっくりしました？",
  "緊張しています。",
  "安心しました。",
  "ワクワクしています！",

  // その他
  "新しいスマホを使っています。",
  "今日は早く寝よう？",
  "電車が遅れました。",
  "駅で友達に会いました！",
  "買い物に行きました。",
  "料理を作りました。",
  "写真を撮りました！",
  "ニュースを読みました。",
  "メールを送りました。",
  "電話をかけました。"
];

let currentSentence = "";
let score = 0;
let time = 60;
let timer;

const sentenceEl = document.getElementById("sentence");
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
  nextSentence();
  timer = setInterval(updateTime, 1000);
}

function nextSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.textContent = currentSentence;
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
  if (typed === currentSentence) {
    score++;
    scoreEl.textContent = score;
    inputEl.value = "";
    nextSentence();
  } else {
    inputEl.classList.add("error");
    setTimeout(() => inputEl.classList.remove("error"), 300);
  }
});

startBtn.addEventListener("click", startGame);

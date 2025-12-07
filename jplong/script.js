const sentences = [
  // 日常生活
  "今日は朝から雨が降っていましたが、午後になると少しずつ晴れてきて、散歩に出かけることができました。",
  "昨日は友達と映画館に行き、話題の新作映画を見ましたが、予想以上に感動的で涙が止まりませんでした！",
  "朝早く起きて散歩をしたら、空気が澄んでいてとても気持ちよく、一日の良いスタートになりました。",
  "今日は仕事が忙しくて疲れましたが、帰宅後に好きな音楽を聴いたら気分がすっきりしました。",
  
  // 学校・勉強
  "学校の授業で新しい単元が始まりましたが、少し難しく感じたので、家に帰ってから復習をしました。",
  "図書館で新しい本を借りて読み始めましたが、物語の展開が面白くて一気に最後まで読んでしまいました。",
  "テスト勉強のために夜遅くまで起きていましたが、眠気に負けそうになりながらも最後まで頑張りました。",
  
  // 趣味・娯楽
  "新しいゲームを始めたところ、ストーリーが面白くて時間を忘れて遊んでしまいました。",
  "友達と一緒に料理を作ったのですが、思った以上に上手にできて、とても美味しく食べることができました。",
  "休日には好きなアニメを一気に見て、キャラクターのセリフを覚えるほど夢中になってしまいました。",
  
  // 自然・季節
  "夏休みには家族と一緒に海へ旅行に行き、砂浜で遊んだり、海の幸を食べたりして楽しい時間を過ごしました。",
  "冬になると雪が積もり、外で雪だるまを作ったり、友達と雪合戦をしたりして遊びました。",
  "春には桜が満開になり、川沿いを歩きながら花びらが舞う景色を楽しみました。",
  
  // 感情・気持ち
  "駅で電車を待っていると、偶然にも昔の友達に会い、久しぶりに会話を楽しむことができました！",
  "公園でジョギングをしていると、子供たちが楽しそうに遊んでいる姿を見て、心が温かくなりました。",
  "新しいスマホを購入しましたが、機能が多すぎてまだ使いこなせていないので、少しずつ慣れていこうと思います。",
  
  // 旅行・体験
  "旅行先で美しい景色を写真に収めましたが、やはり実際に見る方が迫力がありました！",
  "海外旅行で現地の人と会話をしたとき、言葉が通じなくても笑顔で気持ちが伝わることに感動しました。",
  "山登りをした際、頂上から見える景色が素晴らしく、苦労して登った甲斐があると感じました。",
  
  // その他
  "昨日の夜は星がとてもきれいに見えて、しばらく空を眺めていました。",
  "今日は買い物に行き、必要なものを揃えただけでなく、偶然見つけたお気に入りの服も購入しました。",
  "ニュースで新しい発明について知り、人間の生活がこれからどう変わっていくのか楽しみになりました。",
  "メールを送った後にすぐ返事が来て、相手の素早い対応に驚きました。"
];

let currentSentence = "";
let score = 0;
let time = 90;
let timer;

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const messageEl = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

function startGame() {
  score = 0;
  time = 90;
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

function endGame() {
  inputEl.disabled = true;
  startBtn.disabled = false;
  const finalWPM = wpmEl ? wpmEl.textContent : 0;
  messageEl.textContent = `ゲーム終了！スコア: ${score}, WPM: ${finalWPM}`;

  // 履歴保存
  const history = JSON.parse(localStorage.getItem("typingHistory")) || [];
  history.push({
    game: "日本語長文", // 各ゲームごとに名前を変える
    score: score,
    wpm: finalWPM,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("typingHistory", JSON.stringify(history));
}

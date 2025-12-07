// ページ読み込み時に履歴を表示
document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("history-list");
  const history = JSON.parse(localStorage.getItem("typingHistory")) || [];

  historyList.innerHTML = "";
  if (history.length === 0) {
    historyList.innerHTML = "<li>まだ履歴はありません。</li>";
  } else {
    history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.date} - ${item.game} | スコア: ${item.score}, WPM: ${item.wpm}`;
      historyList.appendChild(li);
    });
  }
});

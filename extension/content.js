chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getTweet") {
    const tweet = document.querySelector('article div[lang]');
    if (!tweet) return;

    const tweetText = tweet.innerText;
    fetch("http://159.223.37.124:8000/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: tweetText })
    })
      .then(res => res.json())
      .then(data => {
        const replyText = data.reply;
        const replyBox = tweet.closest('article').parentElement.querySelector('div[role="textbox"]');
        if (replyBox) {
          replyBox.focus();
          document.execCommand("insertText", false, replyText);
        }
      });
  }
});

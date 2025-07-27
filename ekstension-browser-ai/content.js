function addAIReplyButtonsToTweets() {
  const myUsername = getMyUsername();
  console.log("👤 Username saya:", myUsername);

  const tweets = document.querySelectorAll('[data-testid="tweet"]');
  tweets.forEach((tweet) => {
    if (tweet.querySelector(".ai-reply-button")) return;

    const userHandle = Array.from(
      tweet.querySelectorAll('[data-testid="User-Name"] span')
    )
      .map((el) => el.innerText)
      .find((text) => text.startsWith("@"));

    if (!userHandle || userHandle === myUsername) return;

    const tweetText = tweet.querySelector('[data-testid="tweetText"]');
    if (!tweetText) return;

    const aiButton = document.createElement("button");
    aiButton.innerText = "🪄 AI Reply";
    aiButton.className = "ai-reply-button";
    Object.assign(aiButton.style, {
      marginLeft: "8px",
      padding: "6px 10px",
      borderRadius: "16px",
      border: "none",
      background: "#985EFF",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "13px",
    });

    aiButton.onclick = async () => {
      const content = tweetText.innerText.trim();
      if (!content) {
        alert("❗ Tidak ada isi tweet.");
        return;
      }

      console.log("🚀 Mengirim ke AI:", content);

      try {
        const response = await fetch("https://159-223-37-124.nip.io/reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: content }),
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        const aiReply = data.reply;

        console.log("✅ Balasan AI:", aiReply);

        // Modal custom untuk tampilkan hasil dan tombol copy
        const modal = document.createElement("div");
        Object.assign(modal.style, {
          position: "fixed",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          zIndex: 9999,
          maxWidth: "400px",
          fontFamily: "Arial, sans-serif",
        });

        modal.innerHTML = `
          <div style="margin-bottom: 12px; font-weight: bold;">🤖 AI Reply:</div>
          <textarea id="ai-reply-text" style="width: 100%; height: 100px; padding: 8px; box-sizing: border-box;">${aiReply}</textarea>
          <div style="text-align: right; margin-top: 8px;">
            <button id="copy-ai-reply" style="margin-right: 8px; padding: 6px 12px; background: #985EFF; color: #fff; border: none; border-radius: 6px; cursor: pointer;">📋 Copy</button>
            <button id="close-modal" style="padding: 6px 12px; background: #ccc; border: none; border-radius: 6px; cursor: pointer;">❌ Close</button>
          </div>
        `;

        document.body.appendChild(modal);

        document.getElementById("copy-ai-reply").onclick = () => {
          const textArea = document.getElementById("ai-reply-text");
          textArea.select();
          document.execCommand("copy");
          alert("✅ Teks disalin ke clipboard.");
        };

        document.getElementById("close-modal").onclick = () => {
          document.body.removeChild(modal);
        };
      } catch (err) {
        console.error("❌ Gagal mengambil balasan:", err);
        alert(`❌ Error saat menghubungi AI: ${err.message}`);
      }
    };

    const actionGroup = tweet.querySelector('[role="group"]');
    if (actionGroup) {
      actionGroup.appendChild(aiButton);
    }
  });
}

function getMyUsername() {
  const me = document.querySelector(
    'a[role="link"][href^="/"][tabindex="-1"] span'
  );
  return me?.innerText?.startsWith("@") ? me.innerText : null;
}

const observer = new MutationObserver(() => {
  addAIReplyButtonsToTweets();
});

observer.observe(document.body, { childList: true, subtree: true });
addAIReplyButtonsToTweets();

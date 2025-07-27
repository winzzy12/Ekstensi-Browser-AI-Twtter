# 🤖 Ekstension Reply-X menggunakan AI(Gemini)
## 🛠️ Fungsi utama Exstension
- ✅ automatically read x posts and send to server
- ✅ Displaying POP UP reply results from AI
- ✅ Copy POP UP
---

## ⚙️ How to Install Bot
1. Prepare API KEY (Google AI Studio)
   - Link Google AI Studio [APIKEY](https://aistudio.google.com/apikey)
  
2. Download Repository
```bash
git clone https://github.com/winzzy12/Ekstensi-Browser-AI-Twtter.git
```

3. Create Screen & Open Folder
```bash
screen -S server-ai-x
```
```bash
cd Ekstensi-Browser-AI-Twtter/server-ai
```

4. Use automatic domain from nip.io
- Run the command to create SSL:
```bash
sudo certbot certonly --standalone -d YourIP.nip.io
```

5. Edit Server.JS
```bash
nano server.js
```
- Change your API key
- Change Script (Use domain YourIP.nip.io)
```bash
// 🔐 Load HTTPS certs
const httpsOptions = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/YourIP.nip.io/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/YourIP.nip.io/fullchain.pem"
  ),
};
```
```bash
// 🚀 Run HTTPS server
https.createServer(options, app).listen(443, () => {
  console.log("✅ Server jalan di https://YourIP.nip.io");
});
```
6. Download Extension in repository & Update in Ekstensi (content.js)
```bash
fetch("https://YourIP.nip.io/reply", {
```
7. Running Exstension (Change Developer mode)

Done

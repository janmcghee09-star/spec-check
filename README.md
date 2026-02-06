# Spec-Check Premortem Assistant

AI-powered tool that analyzes Product Requirement Documents (PRDs) to identify potential risks, gaps, and edge cases before launch.

## 🚀 Live Demo

**URL:** [https://spec-check-nine.vercel.app/](https://spec-check-nine.vercel.app/)

## 📋 How to Use

1. Visit the live demo
2. Click "⚙️ API Key" in the header
3. Get a free API key from [console.anthropic.com](https://console.anthropic.com/)
4. Paste your API key and click "Save"
5. Click "🔍 Analyze PRD" to see AI insights

Your API key is stored locally in your browser and sent securely to our serverless backend.

---

## 🔧 How It Works

### Architecture

```
User Browser
    ↓
  Frontend (index.html)
    ↓
  Vercel Serverless Function (/api/analyze)
    ↓
  Anthropic API
```

1. **Frontend** - User enters PRD and API key
2. **Serverless Function** - Receives request, calls Anthropic API
3. **Anthropic API** - Analyzes PRD and returns insights
4. **Frontend** - Displays insights to user

### Why This Architecture?

- ✅ **No CORS issues** - Backend proxies the API call
- ✅ **Secure** - API keys never exposed in frontend code
- ✅ **Free hosting** - Vercel free tier is generous
- ✅ **Scalable** - Serverless functions auto-scale
- ✅ **Easy updates** - Push to GitHub, Vercel auto-deploys

---

## 🔒 Security & Privacy

- User API keys are stored in **browser localStorage** only
- Keys are sent to **your Vercel backend** (not third parties)
- Backend forwards requests to **Anthropic API** only
- **No data is logged or stored** on the server
- All communication uses **HTTPS encryption**

---

## ❓ Troubleshooting

### "404 Not Found" after deployment
- **Solution:** Check that files are in the correct folders (`public/` and `api/`)
- Re-upload if needed, maintaining folder structure

### "Analysis failed" error
- **Solution:** Check browser console (F12) for detailed errors
- Verify API key starts with `sk-ant-`
- Try a fresh API key from console.anthropic.com

### Deployment fails
- **Solution:** Check Vercel deployment logs
- Verify `vercel.json` and `package.json` are at root level
- Make sure repository is public

### API calls timing out
- **Solution:** Vercel free tier has 10-second timeout
- PRD might be too long - try a shorter one
- Or upgrade Vercel plan for longer timeouts

---

## 📊 Cost Estimate

**Vercel Free Tier:**
- ✅ 100GB bandwidth/month
- ✅ 100 deployments/day
- ✅ Automatic HTTPS
- ✅ Global CDN

**Anthropic API:**
- Users bring their own API key
- You pay $0

**Total cost to you: $0/month**

---

## 🤝 Credits

Built by Jan McGhee as a portfolio demonstration of AI-augmented product management.

**Tech used:**
- Frontend: React (via CDN)
- Backend: Vercel Serverless Functions
- AI: Anthropic Claude API
- Hosting: Vercel (https://vercel.com/jan-mcghees-projects/spec-check)

---

## 📄 License

MIT License - Free to use and modify

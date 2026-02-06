# Spec-Check Premortem Assistant

AI-powered tool that analyzes Product Requirement Documents (PRDs) to identify potential risks, gaps, and edge cases before launch.

## 🚀 Live Demo

**URL:** https://your-project.vercel.app (after deployment)

## 📋 How to Use

1. Visit the live demo
2. Click "⚙️ API Key" in the header
3. Get a free API key from [console.anthropic.com](https://console.anthropic.com/)
4. Paste your API key and click "Save"
5. Click "🔍 Analyze PRD" to see AI insights

Your API key is stored locally in your browser and sent securely to our serverless backend.

---

## 🛠️ Vercel Deployment Guide

### Prerequisites
- A GitHub account
- A Vercel account (free) - [Sign up here](https://vercel.com/signup)

### Step-by-Step Deployment

#### 1. Upload to GitHub

1. **Create a new repository** on GitHub:
   - Go to https://github.com/new
   - Name: `spec-check`
   - Make it **Public**
   - Don't initialize with README
   - Click "Create repository"

2. **Upload all files** to your repository:
   - Download all files from this package:
     - `public/index.html`
     - `api/analyze.js`
     - `vercel.json`
     - `package.json`
     - `README.md` (this file)
   
3. **In your GitHub repository:**
   - Click "uploading an existing file"
   - Drag ALL the files (maintaining the folder structure)
   - Important: Keep files in their folders:
     ```
     spec-check/
     ├── public/
     │   └── index.html
     ├── api/
     │   └── analyze.js
     ├── vercel.json
     ├── package.json
     └── README.md
     ```
   - Click "Commit changes"

#### 2. Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Sign Up" (if you don't have an account)
   - Choose "Continue with GitHub"

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Find your `spec-check` repository
   - Click "Import"

3. **Configure project:**
   - **Project Name:** `spec-check` (or customize)
   - **Framework Preset:** Leave as "Other"
   - **Root Directory:** `./` (leave default)
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
   - Click "Deploy"

4. **Wait for deployment:**
   - Vercel will build and deploy (takes ~1 minute)
   - You'll see a success message with your URL
   - Example: `https://spec-check.vercel.app`

#### 3. Test Your Deployment

1. Click the deployment URL
2. The app should load
3. Click "⚙️ API Key"
4. Enter a test API key
5. Click "🔍 Analyze PRD"
6. ✅ If insights appear, you're done!

---

## 📁 Project Structure

```
spec-check/
├── public/
│   └── index.html          # Frontend (React app)
├── api/
│   └── analyze.js          # Serverless function (proxies Anthropic API)
├── vercel.json             # Vercel configuration
├── package.json            # Project metadata
└── README.md               # This file
```

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

## 🎨 Customization

### Change the Domain

**Option 1: Use Vercel subdomain**
- Settings → Domains → Edit
- Choose a custom subdomain: `your-name-speccheck.vercel.app`

**Option 2: Use your own domain**
- Settings → Domains → Add Domain
- Enter your domain (e.g., `speccheck.io`)
- Follow DNS configuration instructions

### Update the Code

Any changes pushed to GitHub will automatically deploy:

1. Edit files in your GitHub repository
2. Commit changes
3. Vercel auto-deploys in ~30 seconds
4. Check your live URL

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

## 💡 For Your Portfolio

### What to Say

> **Spec-Check** is an AI-powered PRD analysis tool I built to demonstrate how AI can augment PM workflows. It uses Claude to conduct premortem analysis, identifying risks before launch.
>
> **Tech Stack:** React, Vercel Serverless Functions, Anthropic API
>
> **Try it:** [your-url.vercel.app]

### Key Talking Points

- **Quality augmentation, not automation** - Helps PMs think, doesn't replace thinking
- **Serverless architecture** - No backend infrastructure to maintain
- **Privacy-first** - API keys never leave user's control
- **Production-ready** - Proper error handling, responsive design

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

Built by [Your Name] as a portfolio demonstration of AI-augmented product management.

**Tech used:**
- Frontend: React (via CDN)
- Backend: Vercel Serverless Functions
- AI: Anthropic Claude API
- Hosting: Vercel

---

## 📄 License

MIT License - Free to use and modify

# Deployment Guide

## Frontend Deployment (Vercel)

Your frontend is already deployed on Vercel at:
https://wd-compiler-9hr6-39tya8jnc-himavarshinis-projects.vercel.app/

### Auto-Deploy Setup
✅ Already configured - pushes to main branch will auto-deploy

## Backend Deployment (WebSocket Server)

### Option 1: Render (Recommended - Free Tier Available)

1. **Go to Render**: https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +"** → Select "Web Service"
4. **Connect Repository**: Select your `WD-compiler` repository
5. **Configure**:
   - **Name**: `wd-compiler-server`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. **Environment Variables**:
   - `PORT`: 8080 (or leave blank, Render sets automatically)
   - `NODE_ENV`: production

7. **Click "Create Web Service"**

8. **Copy the URL** (will be something like: `https://wd-compiler-server.onrender.com`)

### Option 2: Railway (Alternative)

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Click "New Project"** → "Deploy from GitHub repo"
4. **Select** `WD-compiler` repository
5. **Configure**:
   - **Root Directory**: `/server`
   - **Start Command**: `npm start`
6. **Add Variables**:
   - `PORT`: 8080
7. **Deploy**

### Option 3: Heroku

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **Login**: `heroku login`
3. **Create app**:
   ```bash
   cd server
   heroku create wd-compiler-server
   ```
4. **Set buildpacks**:
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```
5. **Deploy**:
   ```bash
   git subtree push --prefix server heroku main
   ```

## Step 3: Update Frontend Environment Variable

After deploying the backend, you need to update the frontend:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: wd-compiler
3. **Go to Settings** → **Environment Variables**
4. **Add Variable**:
   - **Name**: `VITE_WS_URL`
   - **Value**: `wss://your-render-url.onrender.com` (or your deployed backend URL)
   - **Scope**: Production, Preview, Development
5. **Save**
6. **Redeploy**: Go to Deployments → Click "..." → Redeploy

## Step 4: Test Your Deployment

1. Visit your Vercel frontend URL
2. Create a code snippet and save
3. Copy the collaboration link
4. Open in another browser/incognito
5. Edit code - changes should sync in real-time!

## Troubleshooting

### WebSocket Connection Failed
- Make sure backend URL uses `wss://` (not `ws://`) in production
- Check if Render service is running (not sleeping)
- Verify CORS is enabled in server

### Code Not Syncing
- Check browser console for WebSocket errors
- Verify environment variable `VITE_WS_URL` is set correctly
- Check backend logs on Render dashboard

### Render Free Tier Sleep
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Consider upgrading to paid tier for always-on service

## DNS & Custom Domain (Optional)

### For Frontend (Vercel)
1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Backend (Render)
1. Go to Render service → Settings → Custom Domain
2. Add your domain
3. Update DNS CNAME record

## Cost Breakdown

- **Vercel (Frontend)**: Free (with limits)
- **Render (Backend)**: Free tier available (with sleep after 15 min)
- **Firebase**: Free tier (for authentication)

For production with no sleep:
- Render: $7/month
- Railway: $5/month

## Environment Variables Summary

### Frontend (.env in client/)
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_WS_URL=wss://your-backend-url.onrender.com
```

### Backend (.env in server/)
```
PORT=8080
NODE_ENV=production
```

## Next Steps After Deployment

1. ✅ Push code to GitHub
2. ⏳ Deploy backend on Render
3. ⏳ Update VITE_WS_URL in Vercel
4. ⏳ Redeploy frontend on Vercel
5. ✅ Test real-time collaboration
6. 🎉 Share your project!

## Support

If you encounter issues:
1. Check Render logs for backend errors
2. Check Vercel logs for frontend errors
3. Open browser dev tools console
4. Check network tab for WebSocket connection

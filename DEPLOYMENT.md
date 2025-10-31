# Deployment Guide

## Deploy to Vercel (Recommended)

### Quick Deploy

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "Import Project"
4. Select `student-srijit/detection_frontend` repository
5. Click "Deploy"

That's it! Vercel will automatically:
- Install dependencies
- Build the Next.js app
- Deploy to a production URL

### Manual Steps

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from terminal
cd detection_frontend
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: your-username
# - Link to existing project: N
# - Project name: detection-frontend
# - Directory: ./
# - Override settings: N
```

## Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select `student-srijit/detection_frontend`
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy"

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Environment Variables

No environment variables needed! The API URL is hardcoded to:
```
https://detection-mereye.onrender.com
```

If you need to change it, edit `lib/api.ts`:
```typescript
const API_BASE_URL = 'your-api-url';
```

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Build Fails
- Make sure Node.js 18+ is installed
- Clear cache: `rm -rf .next node_modules`
- Reinstall: `npm install`

### API Connection Issues
- Check if backend is running: https://detection-mereye.onrender.com/health
- Check CORS settings in backend
- Check browser console for errors

### Deployment Issues
- Make sure all files are committed to Git
- Check build logs in Vercel/Netlify dashboard
- Verify `package.json` has all dependencies


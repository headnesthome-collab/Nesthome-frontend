# Nesthome Frontend

Frontend website for Nesthome - built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📋 Environment Variables

Create a `.env` file:

```bash
# API Base URL - Your backend server URL
VITE_API_BASE_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Important:** All environment variables must have `VITE_` prefix to be accessible in the frontend.

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Vercel will auto-detect Vite
3. Add environment variables in Vercel dashboard
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

## 📝 Notes

- Backend API is deployed separately
- Set `VITE_API_BASE_URL` to your backend URL in production
- All API calls use the `apiUrl()` helper from `lib/api-config.ts`
# Nesthome-frontend
# Nesthome-frontend

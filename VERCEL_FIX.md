# Quick Fix for Vercel 404 Error

## The Problem
Vercel is returning `404: NOT_FOUND` because it can't find the built files.

## Solution Steps

### 1. Check Vercel Project Settings

In Vercel Dashboard → Your Project → Settings → General:

**Build & Development Settings:**
- Framework Preset: `Vite` (or `Other`)
- Root Directory: Leave **EMPTY** (don't set it to `client/`)
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 2. Verify Build Works Locally

```bash
cd nesthome-frontend
npm install
npm run build
ls -la dist/
```

You should see:
- `index.html`
- `assets/` folder

### 3. If Build Fails

Check for:
- Missing dependencies in `package.json`
- TypeScript errors
- Import path issues

### 4. Common Issues

#### Issue: "Cannot find module"
**Fix:** Run `npm install` and commit `package-lock.json`

#### Issue: Build succeeds but 404 on Vercel
**Fix:** 
1. Check that `outputDirectory` in `vercel.json` matches actual build output
2. Verify `index.html` exists in `dist/` after build
3. Check Vercel build logs for errors

#### Issue: Assets not loading
**Fix:** The `base: "/"` in vite.config.ts should fix this

### 5. Re-deploy

1. Commit the updated `vite.config.ts` and `vercel.json`
2. Push to GitHub
3. Vercel will auto-redeploy
4. Check the new deployment logs

### 6. Still Not Working?

Try this alternative `vercel.json`:

```json
{
  "buildCommand": "cd client && npm run build && cd .. && cp -r client/dist/* dist/",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

Or set Root Directory in Vercel to: `nesthome-frontend` (if deploying from monorepo)

### 7. Debug Checklist

- [ ] Build works locally (`npm run build`)
- [ ] `dist/index.html` exists after build
- [ ] `dist/assets/` folder exists with JS/CSS files
- [ ] Vercel build logs show successful build
- [ ] Output directory in Vercel matches `dist`
- [ ] Root directory in Vercel is empty or correct
- [ ] Environment variables are set in Vercel

### 8. Contact Support

If still not working, check Vercel build logs and share:
- Build command output
- Error messages
- File structure after build

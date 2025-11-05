# Quick Vercel Deployment Guide

## ✅ Issue Fixed

**Error:** `The file "/vercel/path0/out/routes-manifest.json" couldn't be found`

**Solution:** Updated `vercel.json` to work correctly with Next.js static export.

## What Was Changed

1. ✅ **Fixed `vercel.json`** - Removed incorrect `buildCommand` and `outputDirectory` properties
2. ✅ **Created `.vercelignore`** - Optimized deployment files
3. ✅ **Verified build** - Static export works correctly, `out` directory generated

## Deploy Now (3 Steps)

### Step 1: Push to GitHub
```powershell
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### Step 2: Import in Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose **`Arturas-Salivonas/petyears`**
5. **Accept default settings** (Vercel auto-detects everything)
6. Click **"Deploy"**

### Step 3: Configure Domain (After First Deploy)

1. In Vercel dashboard → Your project → **Settings** → **Domains**
2. Add domain: `petyears.net`
3. Add domain: `www.petyears.net`
4. Update DNS at your registrar:
   - **A Record:** `@` → `76.76.21.21`
   - **CNAME:** `www` → `cname.vercel-dns.com`

## Verify It Works

After deployment completes:

1. **Check Vercel preview URL** (provided in dashboard)
2. **Test redirects** (after domain configured):
   ```powershell
   ./test-redirects.ps1
   ```
3. **Request Google reindexing** in Search Console

## That's It! 🚀

Your site will automatically redeploy whenever you push to the `main` branch.

---

**Need detailed help?** See `.github/VERCEL_DEPLOYMENT.md`

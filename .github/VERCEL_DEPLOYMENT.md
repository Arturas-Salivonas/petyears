# Vercel Deployment Guide for Static Export

## Issue Fixed

**Error:** "The file `/vercel/path0/out/routes-manifest.json` couldn't be found"

**Root Cause:** When using `output: 'export'` in Next.js for static site generation, Vercel needs to be told to treat the project as a static site, not a Next.js serverless deployment.

**Solution:** Updated `vercel.json` configuration and added proper settings.

## What Was Changed

### 1. Fixed `vercel.json` ✅

**Changed from:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  // ...
}
```

**Changed to:**
```json
{
  "trailingSlash": false,
  "redirects": [
    // Proper redirect configuration
  ],
  // ...
}
```

**Why:** Vercel automatically detects Next.js projects. When using static export, we don't need to override `buildCommand` and `outputDirectory`. Vercel will use the `out` directory automatically.

### 2. Created `.vercelignore` ✅

Added file to optimize deployment and avoid uploading unnecessary files.

## Deployment Steps

### Method 1: Vercel Dashboard (Recommended for First Deploy)

1. **Push code to GitHub:**
   ```powershell
   git add .
   git commit -m "Fix Vercel static export deployment"
   git push origin main
   ```

2. **Import project in Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import your GitHub repository `Arturas-Salivonas/petyears`

3. **Configure build settings:**
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `out` (auto-detected from next.config.ts)
   - Install Command: `npm install` (default)

4. **Environment Variables:**
   - None required for basic functionality

5. **Click "Deploy"**

### Method 2: Vercel CLI (Alternative)

1. **Install Vercel CLI:**
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```powershell
   vercel login
   ```

3. **Deploy:**
   ```powershell
   # First time deployment
   vercel

   # Production deployment
   vercel --prod
   ```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time) or **Y** (subsequent)
   - What's your project's name? `petyears`
   - In which directory is your code located? `./`

## Vercel Configuration Explained

### `vercel.json`

```json
{
  // Don't add trailing slashes to URLs
  "trailingSlash": false,

  // Redirect www to non-www
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.petyears.net" }],
      "destination": "https://petyears.net/:path*",
      "permanent": true
    }
  ],

  // Security and caching headers
  "headers": [
    // ... (already configured)
  ]
}
```

### `next.config.ts`

```typescript
{
  output: 'export',  // Static export mode
  images: {
    unoptimized: true  // Required for static export
  }
}
```

## Domain Configuration

### Setting up Custom Domain on Vercel

1. **Add domain in Vercel dashboard:**
   - Go to your project → Settings → Domains
   - Add domain: `petyears.net`
   - Add domain: `www.petyears.net`

2. **Configure DNS records:**

**Option A: Using Vercel Nameservers (Recommended)**
   - Update nameservers at your domain registrar to Vercel's nameservers
   - Vercel will handle all DNS automatically

**Option B: Using Custom DNS**

   Add these DNS records at your domain registrar:

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | 76.76.21.21 |
   | CNAME | www | cname.vercel-dns.com |

3. **Verify SSL:**
   - Vercel automatically provisions SSL certificates
   - Wait 5-10 minutes for propagation
   - Visit https://petyears.net to verify

## Verifying Deployment

### 1. Check Build Logs
- Go to Vercel dashboard → Your project → Deployments
- Click on the latest deployment
- Check "Build Logs" for any errors

### 2. Test the Site
```powershell
# Test Vercel preview URL (provided after deployment)
curl -I https://petyears-xxx.vercel.app/

# Should return 200 OK
```

### 3. Test Redirects
```powershell
# Test www redirect (after custom domain is configured)
curl -I https://www.petyears.net/

# Should return 308 Permanent Redirect to https://petyears.net/
```

### 4. Verify Static Export
- Check that `out` directory is generated locally: `npm run build`
- Verify all pages are static HTML files in `out` directory
- No server-side functions should be present

## Troubleshooting

### Error: "routes-manifest.json not found"

**Solution:** Already fixed by removing `buildCommand` and `outputDirectory` from `vercel.json`.

**Verify:**
```powershell
# Build locally to ensure static export works
npm run build

# Check that out directory exists
ls out
```

### Build fails on Vercel

**Check:**
1. Node version compatibility (Vercel uses Node 18+ by default)
2. Build logs in Vercel dashboard
3. Ensure all dependencies are in `package.json`
4. Verify build works locally: `npm run build`

**Fix Node version (if needed):**
Add to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Redirects not working

**Check:**
1. DNS is properly configured
2. Custom domain is verified in Vercel
3. Wait 5-10 minutes for DNS propagation
4. Clear browser cache

**Test with curl:**
```powershell
curl -I https://www.petyears.net/
```

### Images not loading

**Check:**
1. `next.config.ts` has `unoptimized: true` for images
2. Images are in `public` directory
3. Image paths start with `/` (e.g., `/images/logo.png`)

### 404 errors on page routes

**Check:**
1. `output: 'export'` is set in `next.config.ts`
2. Pages are using static generation (not server-side rendering)
3. Build completed successfully
4. `out` directory contains HTML files for each route

## Post-Deployment Checklist

- [ ] Build completed successfully in Vercel dashboard
- [ ] Site loads at Vercel preview URL (https://petyears-xxx.vercel.app)
- [ ] Custom domain configured (petyears.net)
- [ ] DNS records updated
- [ ] SSL certificate active
- [ ] www redirects to non-www
- [ ] All pages load correctly
- [ ] Images load correctly
- [ ] Performance is good (test with PageSpeed Insights)
- [ ] Request reindexing in Google Search Console

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

## Monitoring

### Analytics
- Vercel Analytics is already integrated via `@vercel/analytics`
- View in Vercel dashboard → Your project → Analytics

### Build Notifications
- Configure in Vercel dashboard → Your project → Settings → Notifications
- Get notified via email/Slack when builds fail

## Next Steps

1. **Deploy to Vercel:**
   ```powershell
   git add .
   git commit -m "Fix Vercel deployment configuration"
   git push origin main
   ```

2. **Import project in Vercel dashboard** (if first time)

3. **Configure custom domain** `petyears.net`

4. **Test the deployment:**
   - Visit Vercel preview URL
   - Test www redirect
   - Check PageSpeed score
   - Request Google reindexing

5. **Monitor for 24 hours:**
   - Check Vercel Analytics
   - Monitor Google Search Console
   - Verify no errors in build logs

---

**Status:** Vercel configuration fixed ✅
**Next Action:** Push to GitHub and deploy via Vercel dashboard
**Expected Result:** Successful static site deployment

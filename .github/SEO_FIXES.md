# Google Search Console SEO Fixes

## Issues Identified

Google Search Console shows these URLs are not being indexed properly:
- `http://petyears.net/` (should redirect to https)
- `http://www.petyears.net/` (should redirect to https non-www)
- `https://www.petyears.net/` (should redirect to https non-www)

**Root Causes:**
1. Missing redirect configuration at hosting level
2. Relative canonical URLs in page metadata (fixed in this update)

## Solutions Implemented

### 1. Redirect Configuration Files Created

Choose the configuration file for your hosting platform:

#### **Netlify** (Recommended for Next.js Static)
- ✅ `public/_redirects` - Simple redirect rules
- ✅ `netlify.toml` - Full configuration with headers

**Deploy:** Push to your Git repository, Netlify will auto-detect and apply.

#### **Vercel**
- ✅ `vercel.json` - Redirect and header configuration

**Deploy:** Push to your Git repository, Vercel will auto-detect and apply.

#### **Apache Hosting**
- ✅ `.htaccess` - Redirect rules and cache headers

**Deploy:** Upload `.htaccess` to your site root directory.

#### **Nginx Hosting**
- ✅ `nginx.conf` - Server block configuration

**Deploy:** Update your Nginx configuration and reload: `sudo nginx -t && sudo systemctl reload nginx`

### 2. Canonical URL Metadata (Fixed)

Updated all page components to use absolute canonical URLs:

**Before:**
```typescript
alternates: {
  canonical: '/',  // ❌ Relative URL
}
```

**After:**
```typescript
alternates: {
  canonical: 'https://petyears.net/',  // ✅ Absolute URL
}
```

**Fixed Pages:**
- ✅ `/` (home)
- ✅ `/dog-years`
- ✅ `/cat-years`
- ✅ `/blog`
- ✅ `/about`
- ✅ `/privacy`
- ✅ All blog post pages

## Deployment Steps

### Step 1: Identify Your Hosting Platform

Which platform are you using?
- **Netlify** → Use `public/_redirects` or `netlify.toml`
- **Vercel** → Use `vercel.json`
- **Apache** → Use `.htaccess`
- **Nginx** → Use `nginx.conf`
- **Other** (Cloudflare Pages, GitHub Pages) → Contact support or check docs

### Step 2: Deploy Configuration

#### For Netlify/Vercel:
```powershell
# Rebuild and redeploy
npm run build

# Commit changes
git add .
git commit -m "Add SEO redirects and canonical URL fixes"
git push origin main
```

#### For Apache:
1. Upload `.htaccess` to your site root via FTP/SFTP
2. Ensure `mod_rewrite` and `mod_headers` modules are enabled
3. Test redirects

#### For Nginx:
1. Update your Nginx config file (usually in `/etc/nginx/sites-available/`)
2. Test configuration: `sudo nginx -t`
3. Reload: `sudo systemctl reload nginx`

### Step 3: Verify Redirects

Test all redirect combinations:

```powershell
# Test HTTP → HTTPS redirect
curl -I http://petyears.net/

# Test www → non-www redirect
curl -I https://www.petyears.net/

# Test HTTP www → HTTPS non-www redirect
curl -I http://www.petyears.net/
```

**Expected Response:** All should return `301 Moved Permanently` with `Location: https://petyears.net/`

### Step 4: Rebuild and Test Site

```powershell
# Rebuild with new canonical URLs
npm run build

# Test locally
npm run start
```

Verify canonical tags in HTML:
```html
<link rel="canonical" href="https://petyears.net/" />
<link rel="canonical" href="https://petyears.net/dog-years" />
<link rel="canonical" href="https://petyears.net/cat-years" />
```

### Step 5: Request Google Reindexing

1. Go to [Google Search Console](https://search.google.com/search-console)
2. For each URL with issues:
   - Click on the URL in the Coverage report
   - Click **"Request Indexing"**
3. Wait 1-3 days for Google to recrawl

## Verification Checklist

After deployment, verify:

- [ ] `http://petyears.net/` redirects to `https://petyears.net/` (301)
- [ ] `http://www.petyears.net/` redirects to `https://petyears.net/` (301)
- [ ] `https://www.petyears.net/` redirects to `https://petyears.net/` (301)
- [ ] All pages have absolute canonical URLs in HTML
- [ ] Sitemap.xml points to canonical URLs
- [ ] Robots.txt Host directive is correct
- [ ] Google Search Console shows no redirect errors (wait 1-3 days)

## Configuration File Comparison

### Netlify (_redirects)
**Pros:** Simple, reliable, auto-detected
**Cons:** Limited to basic redirects
**Best for:** Most users

### Netlify (netlify.toml)
**Pros:** Full configuration, includes headers
**Cons:** Can override _redirects
**Best for:** Advanced users needing custom headers

### Vercel (vercel.json)
**Pros:** Native Vercel support, includes headers
**Cons:** Vercel-specific syntax
**Best for:** Vercel deployments

### Apache (.htaccess)
**Pros:** Works on most shared hosting
**Cons:** Requires mod_rewrite enabled
**Best for:** Traditional web hosting

### Nginx (nginx.conf)
**Pros:** High performance, full control
**Cons:** Requires server access, manual config
**Best for:** VPS/dedicated servers

## Troubleshooting

### Redirects Not Working

**Issue:** Redirects not being applied after deployment

**Solutions:**
1. **Clear cache:** Clear browser cache and CDN cache
2. **Check file location:** Ensure config file is in correct directory
3. **Verify deployment:** Check hosting platform dashboard for deployment logs
4. **Test with curl:** Use `curl -I` to bypass browser cache

### Google Search Console Still Shows Errors

**Issue:** Google still reports redirect/canonical issues after fixes

**Solutions:**
1. **Wait:** Google can take 1-3 days to recrawl and update
2. **Request indexing:** Manually request reindexing in Search Console
3. **Check sitemap:** Ensure sitemap.xml only includes canonical URLs
4. **Verify redirects:** Test all redirect combinations with curl

### Multiple Configuration Files Conflict

**Issue:** You have both `_redirects` and `netlify.toml` (or similar)

**Solutions:**
1. **Choose one:** Decide which configuration method to use
2. **Delete unused:** Remove the configuration file you're not using
3. **Netlify priority:** `netlify.toml` overrides `_redirects` on Netlify

## Additional Resources

- [Netlify Redirects Documentation](https://docs.netlify.com/routing/redirects/)
- [Vercel Redirects Documentation](https://vercel.com/docs/concepts/projects/project-configuration#redirects)
- [Google Search Console Help](https://support.google.com/webmasters/answer/7451001)
- [Canonical URLs Best Practices](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## Next Steps

1. **Identify hosting platform** → Choose correct config file
2. **Deploy configuration** → Push changes or upload file
3. **Test redirects** → Verify all combinations work
4. **Rebuild site** → Deploy with new canonical URLs
5. **Request reindexing** → Ask Google to recrawl
6. **Monitor Search Console** → Check for improvements in 1-3 days

---

**Status:** All configuration files created. Choose the one for your hosting platform and deploy.

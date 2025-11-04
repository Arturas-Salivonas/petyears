# SEO Deployment Checklist

Use this checklist after deploying your redirect configuration.

## Pre-Deployment

- [ ] Identified hosting platform (Netlify/Vercel/Apache/Nginx/Other)
- [ ] Selected correct redirect configuration file
- [ ] Reviewed redirect rules (http→https, www→non-www)
- [ ] Built project successfully with `npm run build`
- [ ] No build errors or warnings

## Deployment

### For Netlify
- [ ] Committed `public/_redirects` or `netlify.toml` to repository
- [ ] Pushed changes to GitHub/GitLab
- [ ] Verified deployment completed in Netlify dashboard
- [ ] Checked deploy logs for any redirect warnings

### For Vercel
- [ ] Committed `vercel.json` to repository
- [ ] Pushed changes to GitHub/GitLab
- [ ] Verified deployment completed in Vercel dashboard
- [ ] Checked deployment preview for redirect functionality

### For Apache
- [ ] Uploaded `.htaccess` to site root via FTP/SFTP
- [ ] Verified `mod_rewrite` module is enabled
- [ ] Verified `mod_headers` module is enabled
- [ ] Checked Apache error logs for any issues

### For Nginx
- [ ] Updated Nginx configuration file
- [ ] Ran `sudo nginx -t` to test configuration
- [ ] Ran `sudo systemctl reload nginx` to apply changes
- [ ] Checked Nginx error logs for any issues

## Post-Deployment Testing

### Manual Testing
- [ ] Visit `http://petyears.net/` → Should redirect to `https://petyears.net/` (301)
- [ ] Visit `http://www.petyears.net/` → Should redirect to `https://petyears.net/` (301)
- [ ] Visit `https://www.petyears.net/` → Should redirect to `https://petyears.net/` (301)
- [ ] Visit `https://petyears.net/` → Should load normally (200)

### Automated Testing
- [ ] Run `./test-redirects.ps1` (PowerShell script)
- [ ] All tests pass with 301 redirects
- [ ] Canonical URL returns 200 OK

### Browser Testing
- [ ] Clear browser cache
- [ ] Test in Chrome (desktop & mobile)
- [ ] Test in Safari (desktop & mobile)
- [ ] Test in Firefox
- [ ] Test in Edge

### Canonical Tag Verification
- [ ] View page source on home page
- [ ] Verify: `<link rel="canonical" href="https://petyears.net/" />`
- [ ] Check `/dog-years` page source
- [ ] Verify: `<link rel="canonical" href="https://petyears.net/dog-years" />`
- [ ] Check `/cat-years` page source
- [ ] Verify: `<link rel="canonical" href="https://petyears.net/cat-years" />`
- [ ] Check a blog post page source
- [ ] Verify: `<link rel="canonical" href="https://petyears.net/blog/[slug]" />`

## Google Search Console

### Submit for Reindexing
- [ ] Log in to [Google Search Console](https://search.google.com/search-console)
- [ ] Go to URL Inspection tool
- [ ] Inspect `http://petyears.net/` → Request indexing
- [ ] Inspect `http://www.petyears.net/` → Request indexing
- [ ] Inspect `https://www.petyears.net/` → Request indexing

### Verify Sitemap
- [ ] Go to Sitemaps section in Search Console
- [ ] Verify sitemap URL: `https://petyears.net/sitemap.xml`
- [ ] Submit sitemap if not already submitted
- [ ] Check for any sitemap errors

### Monitor Coverage
- [ ] Go to Coverage/Pages section
- [ ] Monitor indexing status over next 1-3 days
- [ ] Verify redirect errors are resolved
- [ ] Verify canonical URL is indexed

## Cache Management

### CDN Cache
- [ ] Clear CDN cache (if using Cloudflare, Netlify, etc.)
- [ ] Purge all cached files
- [ ] Verify cache is cleared

### Browser Cache
- [ ] Clear browser cache on all test devices
- [ ] Test in incognito/private mode
- [ ] Verify redirects work without cache

## Performance Verification

### PageSpeed Test
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Test mobile performance (target: 90+)
- [ ] Test desktop performance (target: 95+)
- [ ] Verify no SEO issues reported

### Headers Check
- [ ] Use [Security Headers](https://securityheaders.com/)
- [ ] Verify security headers are set correctly
- [ ] Check for any missing headers

## Final Verification

### Search Engine Test
- [ ] Google search: `site:petyears.net`
- [ ] Verify only canonical URLs are indexed
- [ ] Check for duplicate content issues
- [ ] Verify meta descriptions are correct

### SSL/TLS Verification
- [ ] Visit [SSL Labs](https://www.ssllabs.com/ssltest/)
- [ ] Test `petyears.net`
- [ ] Verify A+ rating
- [ ] Check for any SSL warnings

### Robots.txt
- [ ] Visit `https://petyears.net/robots.txt`
- [ ] Verify Host directive: `Host: https://petyears.net`
- [ ] Verify Sitemap: `Sitemap: https://petyears.net/sitemap.xml`

## Monitoring (1-3 Days)

- [ ] Day 1: Check Search Console coverage report
- [ ] Day 2: Monitor redirect traffic in analytics
- [ ] Day 3: Verify redirect errors are resolved
- [ ] Week 1: Check PageSpeed score hasn't degraded
- [ ] Week 1: Verify organic traffic is stable

## Troubleshooting

If issues persist after 3 days:

### Redirects Not Working
1. Check deploy logs for configuration errors
2. Verify file is in correct location
3. Test with `curl -I [url]` to bypass cache
4. Contact hosting support

### Google Still Shows Errors
1. Request reindexing again
2. Check robots.txt isn't blocking Google
3. Verify sitemap includes only canonical URLs
4. Wait additional 3-7 days for recrawl

### Performance Issues
1. Clear all caches (CDN + browser)
2. Verify redirect response time is < 100ms
3. Check for redirect chains
4. Test from multiple geographic locations

## Success Criteria

✅ **All redirects return 301 status**
✅ **Canonical URL returns 200 status**
✅ **All pages have absolute canonical tags**
✅ **Google Search Console shows no redirect errors**
✅ **Only canonical URLs appear in search results**
✅ **PageSpeed score remains 90+**
✅ **No duplicate content issues**

---

**Last Updated:** After SEO fixes deployment
**Next Review:** 7 days after deployment

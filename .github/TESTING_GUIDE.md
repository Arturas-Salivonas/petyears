# Quick Testing Guide

## Mobile Responsiveness Testing

### 1. Hamburger Menu
- [ ] Open the site on mobile (or resize browser to < 768px)
- [ ] Click the hamburger menu icon (should see 3 lines)
- [ ] Verify menu slides in from the right
- [ ] Verify dark overlay appears behind menu
- [ ] Click overlay to close menu
- [ ] Verify menu closes smoothly
- [ ] Verify body scroll is locked when menu is open
- [ ] Click a menu link and verify navigation works
- [ ] Verify icon changes to X when menu is open

### 2. Layout Testing
Test these screen widths:
- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 8/X)
- [ ] 390px (iPhone 12/13/14)
- [ ] 412px (Pixel 6)
- [ ] 768px (iPad Portrait)
- [ ] 1024px (iPad Landscape)

Check for:
- [ ] No horizontal scrolling
- [ ] All text is readable without zooming
- [ ] Buttons are easily tappable (min 44x44px)
- [ ] Images scale properly
- [ ] Cards don't overflow
- [ ] Footer looks good

### 3. Calculator Testing
- [ ] Open Dog Years calculator on mobile
- [ ] Verify form inputs are large enough to tap
- [ ] Test age slider (should work with touch)
- [ ] Test +/- buttons (should be easy to tap)
- [ ] Fill out form and calculate
- [ ] Verify result card displays properly
- [ ] Test share button functionality
- [ ] Verify animations don't cause layout issues

### 4. Typography & Spacing
- [ ] All headings are properly sized
- [ ] Body text is readable (min 16px)
- [ ] Line height is comfortable
- [ ] Padding/margins look balanced
- [ ] No text cutoff or overlap

## Performance Testing

### Using Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Mobile" device
4. Run audit
5. Check scores:
   - [ ] Performance: 90+
   - [ ] Accessibility: 95+
   - [ ] Best Practices: 95+
   - [ ] SEO: 100

### Key Metrics to Check
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Speed Index < 3.4s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1

### Network Testing
1. Open DevTools Network tab
2. Throttle to "Slow 3G"
3. Reload page
4. Check:
   - [ ] Page loads within reasonable time
   - [ ] Critical content appears quickly
   - [ ] No large blocking resources
   - [ ] Images load progressively

## Cross-Browser Testing

### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile
- [ ] Chrome on Android
- [ ] Safari on iOS
- [ ] Firefox on Android
- [ ] Samsung Internet

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test hamburger menu with keyboard
- [ ] Press Escape to close menu
- [ ] Test form navigation with Tab

### Screen Reader
- [ ] Test with NVDA/JAWS (Windows) or VoiceOver (Mac/iOS)
- [ ] Verify all buttons have proper labels
- [ ] Check heading hierarchy (h1 → h2 → h3)
- [ ] Verify form labels are announced
- [ ] Test ARIA attributes on menu

### Visual
- [ ] Increase text size to 200%
- [ ] Verify layout doesn't break
- [ ] Check color contrast ratios
- [ ] Test in dark mode (if applicable)

## Common Issues to Watch For

### Mobile
- ❌ Horizontal scrolling
- ❌ Tiny tap targets (< 44px)
- ❌ Text too small to read
- ❌ Images overflow container
- ❌ Fixed elements cover content
- ❌ Forms difficult to use

### Performance
- ❌ Large images not optimized
- ❌ Too many HTTP requests
- ❌ Blocking JavaScript/CSS
- ❌ No caching headers
- ❌ Large bundle sizes
- ❌ Layout shifts during load

## Quick Fixes If Issues Found

### Mobile Menu Not Working
```typescript
// Check Layout.tsx has 'use client' directive
'use client';

// Verify state is imported
import { useState, useEffect } from 'react';
```

### Layout Breaking on Mobile
```css
/* Ensure viewport is set correctly */
/* Check app/layout.tsx metadata */
viewport: {
  width: 'device-width',
  initialScale: 1,
}
```

### Performance Issues
1. Run image analyzer: `npm run analyze-images`
2. Convert large images to WebP
3. Check bundle size: `npm run build`
4. Review Lighthouse suggestions

## Testing Checklist Summary

- [ ] Hamburger menu works smoothly
- [ ] All pages responsive 320px - 1920px
- [ ] Forms usable on mobile
- [ ] No horizontal scroll
- [ ] PageSpeed score 90+
- [ ] All browsers tested
- [ ] Keyboard navigation works
- [ ] Accessibility score 95+

## Tools & Resources

### Testing Tools
- Chrome DevTools (built-in)
- Firefox Developer Tools
- Lighthouse CI
- WebPageTest.org
- Google PageSpeed Insights
- GTmetrix

### Mobile Testing
- BrowserStack (paid)
- Chrome Device Toolbar (F12 → Toggle device)
- Real devices (recommended)
- Responsinator.com

### Accessibility
- axe DevTools Extension
- WAVE Browser Extension
- Lighthouse Accessibility Audit
- Screen readers (built-in OS)

---

**Pro Tip**: Test on real devices whenever possible. Emulators are good but don't catch everything!

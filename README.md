# PetYears.net

PetYears.net is a simple, informative, SEO-optimized web app that helps users convert pet ages (starting with dogs and cats) into human years — instantly, visually, and interactively.

## ✨ Features

- 📱 **Mobile-First Design** - Fully responsive with optimized mobile experience
- 🍔 **Hamburger Menu** - Smooth slide-in navigation for mobile devices
- ⚡ **Fast Performance** - Optimized for 90+ PageSpeed score
- 🐕 **Dog Age Calculator** - Accurate conversion based on size and breed
- 🐱 **Cat Age Calculator** - Coming soon!
- 📊 **Interactive Charts** - Visual age comparison and life stages
- 🔍 **SEO Optimized** - Rich content with structured data
- 🎨 **Clean UI** - Calm, pet-friendly design system
- 🔗 **Shareable Results** - Easy social sharing functionality

## 🚀 Recent Improvements

### Mobile Responsiveness (v2.0)
- ✅ Functional hamburger menu with slide-in drawer
- ✅ Optimized layouts for all screen sizes (320px+)
- ✅ Touch-friendly form inputs and buttons
- ✅ Proper viewport configuration
- ✅ Body scroll lock when menu is open

### Performance Optimizations
- ✅ Font loading optimization with Next.js
- ✅ Lazy loading for non-critical components
- ✅ Code splitting and bundle optimization
- ✅ Proper caching headers
- ✅ Reduced initial page load time

See [MOBILE_IMPROVEMENTS.md](.github/MOBILE_IMPROVEMENTS.md) for detailed changes.

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Available Scripts

```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run analyze-images  # Analyze image sizes and optimization opportunities
npm run check-unused-css # Find unused CSS rules
```

## 🏗️ Build for Production

```bash
npm run build
```

The static files will be generated in the `out` directory.

## 📁 Project Structure

```
petyears/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── dog-years/         # Dog calculator page
│   ├── cat-years/         # Cat calculator page
│   └── blog/              # Blog posts
├── components/            # Reusable React components
│   ├── Layout.tsx         # Main layout with hamburger menu
│   ├── DogYearsCalculator.tsx
│   ├── HomePageClient.tsx
│   └── ...
├── styles/               # CSS modules
│   ├── Layout.module.css
│   ├── HomePage.module.css
│   └── ...
├── data/                 # Static data (FAQ, charts)
├── public/               # Static assets
│   └── images/           # Optimized images
├── scripts/              # Utility scripts
│   ├── analyze-images.js
│   └── check-unused-css.js
└── .github/              # Documentation
    ├── MOBILE_IMPROVEMENTS.md
    └── PERFORMANCE_OPTIMIZATIONS.md
```

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (React 19 + TypeScript)
- **Styling**: CSS Modules + Custom Design System
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Inter, Poppins) via Next.js Font Optimization
- **Build**: Webpack with optimizations
- **Deployment**: Static export (Vercel/Netlify ready)
- **Analytics**: Vercel Analytics + Google Analytics

## 📱 Mobile Support

Tested and optimized for:
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- Samsung Galaxy (360px, 412px)
- iPad (768px, 1024px)
- All modern browsers (Chrome, Safari, Firefox, Edge)

## ⚡ Performance

Target metrics:
- Mobile PageSpeed: 90+
- Desktop PageSpeed: 95+
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.8s

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### next.config.ts
- Static export enabled
- Image optimization configured
- Webpack optimizations for code splitting
- Proper cache headers

## 📚 Documentation

- [Mobile Improvements Guide](.github/MOBILE_IMPROVEMENTS.md)
- [Performance Optimizations](.github/PERFORMANCE_OPTIMIZATIONS.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

## 📄 License

All rights reserved © 2025 PetYears.net

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Web Performance](https://web.dev/fast/)
- [Mobile UX Best Practices](https://web.dev/mobile/)

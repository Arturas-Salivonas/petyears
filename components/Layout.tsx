import Link from 'next/link';
import styles from '../styles/Layout.module.css';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      {/* Subtle pet pattern background */}
      <div className={styles.backgroundPattern}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="petPattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <image href="/images/dog-bg-pattern.svg" width="40" height="40" x="10" y="10" opacity="0.13"/>
              <image href="/images/dog-bg-pattern.svg" width="35" height="35" x="80" y="60" opacity="0"/>
              <image href="/images/dog-bg-pattern.svg" width="45" height="45" x="140" y="30" opacity="0.15"/>
              <image href="/images/dog-bg-pattern.svg" width="38" height="38" x="40" y="120" opacity="0.04"/>
              <image href="/images/dog-bg-pattern.svg" width="42" height="42" x="110" y="150" opacity="0.17"/>
              <image href="/images/dog-bg-pattern.svg" width="36" height="36" x="170" y="90" opacity="0.03"/>

            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#petPattern)" />
        </svg>
      </div>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.logo}>
     <Image src="/images/logos/logo-petyears-new.webp" width={123} height={60} alt="Logo" />
          </Link>
          <nav className={styles.navigation}>
            <Link href="/" className={styles.navLink} prefetch>Home</Link>
            <Link href="/dog-years" className={styles.navLink} prefetch>Dog Years</Link>
            <Link href="/cat-years" className={styles.navLink} prefetch>Cat Years</Link>
            <Link href="/blog" className={styles.navLink} prefetch>Blog</Link>
          </nav>
          {/* Mobile menu button */}
          <button className={styles.mobileMenuButton}>
            <svg className={styles.mobileMenuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLinks}>
            <Link href="/about" className={styles.footerLink} prefetch>About</Link>
            <Link href="/privacy" className={styles.footerLink} prefetch>Privacy</Link>
            <Link href="/sitemap" className={styles.footerLink} prefetch>Sitemap</Link>
          </div>
          <p className={styles.footerText}>&copy; 2025 PetYears.net. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
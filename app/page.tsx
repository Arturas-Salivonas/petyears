'use client';

import Link from 'next/link';
import { OrganizationJsonLd } from 'next-seo';
import styles from '../styles/HomePage.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <OrganizationJsonLd
        name="PetYears.net"
        url="https://petyears.net"
        description="Convert your pet's age to human years instantly. Simple, fast, and accurate calculator for dogs and cats."
        logo="https://petyears.net/logo.png"
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1
          className={styles.heroTitle}
        >
          Convert your <span className={styles.highlight}>pet's age</span> <br />into <span className={styles.highlight}>human years</span> instantly
        </h1>
        <p
          className={styles.heroDescription}
        >
          Discover how old your furry friend really is in human years with our accurate and easy-to-use calculators.
        </p>
      </section>

      {/* Calculator Cards */}
      <section className={styles.calculatorGrid}>
        <Link href="/dog-years" className="block group">
          <div className={styles.calculatorCard}>
            <div className={styles.calculatorCardHeader}>
              <h2 className={styles.calculatorCardTitle}>Dog Years</h2>
              <div
                className={styles.calculatorCardIcon}
              >
                <img alt="Dog avatar" className={styles.calculatorCardIcon} src="/images/default-dog.webp" />
              </div>
            </div>
            <p className={styles.calculatorCardDescription}>Calculate how old your dog is in human years.</p>
            <div className={styles.calculatorCardLink}>
              Try Dog Calculator →
            </div>
          </div>
        </Link>

        <Link href="/cat-years" className="block group">
          <div className={styles.calculatorCard}>
            <div className={styles.calculatorCardHeader}>
              <h2 className={styles.calculatorCardTitle}>Cat Years</h2>
              <div
                className={styles.calculatorCardIcon}
              >
                <img alt="Cat avatar" className={styles.calculatorCardIcon} src="/images/default-dog.webp" />
              </div>
            </div>
            <p className={styles.calculatorCardDescription}>Calculate how old your cat is in human years.</p>
            <div className={styles.calculatorCardLink}>
              Try Cat Calculator →
            </div>
          </div>
        </Link>
      </section>

      {/* Explanation Section */}
      <section className={styles.explanation}>
        <div
        >
          <h2 className={styles.explanationTitle}>How Does It Work?</h2>
          <p className={styles.explanationText}>
            Pet aging isn't linear like human aging. Our calculators use scientifically-backed formulas to convert your pet's age to equivalent human years, taking into account the rapid growth in their early years and slower aging as they mature.
          </p>
        </div>
      </section>
    </div>
  );
}

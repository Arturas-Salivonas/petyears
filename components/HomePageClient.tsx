'use client';

import Link from 'next/link';
import styles from '../styles/HomePage.module.css';

export default function HomePageClient() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Convert your <span className={styles.highlight}>pet's age</span> <br />into <span className={styles.highlight}>human years</span> instantly
        </h1>
        <p className={styles.heroDescription}>
          Discover how old your furry friend really is in human years with our accurate and easy-to-use calculators.
        </p>
      </section>

      {/* Calculator Cards */}
      <section className={styles.calculatorGrid}>
        <Link href="/dog-years" className="block group">
          <div className={styles.calculatorCard}>
            <div className={styles.calculatorCardHeader}>
              <h2 className={styles.calculatorCardTitle}>Dog Years</h2>
              <div className={styles.calculatorCardIcon}>
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
              <div className={styles.calculatorCardIcon}>
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

      {/* Blog Preview */}
      <section className={styles.blogSection}>
        <h2 className={styles.sectionTitle}>Latest from our Blog</h2>
        <div className={styles.blogGrid}>
          <Link href="/blog/cat-years-myths-facts" className="block group">
            <div className={styles.blogCard}>
              <h3 className={styles.blogCardTitle}>Cat Years Myths and Facts</h3>
              <p className={styles.blogCardDescription}>Discover the truth about cat aging and learn how to calculate your feline friend's real age.</p>
              <div className={styles.blogCardLink}>Read More →</div>
            </div>
          </Link>

          <Link href="/blog/understanding-dog-aging" className="block group">
            <div className={styles.blogCard}>
              <h3 className={styles.blogCardTitle}>Understanding Dog Aging</h3>
              <p className={styles.blogCardDescription}>Learn about the science behind dog aging and how different breeds age at different rates.</p>
              <div className={styles.blogCardLink}>Read More →</div>
            </div>
          </Link>

          <Link href="/blog/pet-age-calculators-history" className="block group">
            <div className={styles.blogCard}>
              <h3 className={styles.blogCardTitle}>The History of Pet Age Calculators</h3>
              <p className={styles.blogCardDescription}>Explore the evolution of pet age calculation methods from simple rules to scientific formulas.</p>
              <div className={styles.blogCardLink}>Read More →</div>
            </div>
          </Link>
        </div>

        <div className={styles.blogLink}>
          <Link href="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            View All Blog Posts
          </Link>
        </div>
      </section>
    </div>
  );
}
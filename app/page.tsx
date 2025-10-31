'use client';

import Link from 'next/link';
import { OrganizationJsonLd } from 'next-seo';
import { motion } from 'framer-motion';
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
        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Convert your <span className={styles.highlight}>pet's age</span> <br />into <span className={styles.highlight}>human years</span> instantly
        </motion.h1>
        <motion.p
          className={styles.heroDescription}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover how old your furry friend really is in human years with our accurate and easy-to-use calculators.
        </motion.p>
      </section>

      {/* Calculator Cards */}
      <section className={styles.calculatorGrid}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/dog-years" className="block group">
            <div className={styles.calculatorCard}>
              <div className={styles.calculatorCardHeader}>
                <h2 className={styles.calculatorCardTitle}>Cat Years</h2>
                <motion.div
                  whileHover={{ rotate: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img alt="Cat avatar" className={styles.calculatorCardIcon} src="/images/default-dog.webp" />
                </motion.div>
              </div>
              <p className={styles.calculatorCardDescription}>Calculate how old your dog is in human years.</p>
              <div className={styles.calculatorCardLink}>
                Try Dog Calculator →
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/cat-years" className="block group">
            <div className={styles.calculatorCard}>
              <div className={styles.calculatorCardHeader}>
                <h2 className={styles.calculatorCardTitle}>Cat Years</h2>
                <motion.div
                  whileHover={{ rotate: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img alt="Cat avatar" className={styles.calculatorCardIcon} src="/images/default-dog.webp" />
                </motion.div>
              </div>
              <p className={styles.calculatorCardDescription}>Calculate how old your cat is in human years.</p>
              <div className={styles.calculatorCardLink}>
                Try Cat Calculator →
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Explanation Section */}
      <section className={styles.explanation}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className={styles.explanationTitle}>How Does It Work?</h2>
          <p className={styles.explanationText}>
            Pet aging isn't linear like human aging. Our calculators use scientifically-backed formulas to convert your pet's age to equivalent human years, taking into account the rapid growth in their early years and slower aging as they mature.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

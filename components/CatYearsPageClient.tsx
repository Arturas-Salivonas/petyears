'use client';

import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/DogYearsPage.module.css';
import { catYearsFAQ } from '../data/cat-faq';

// Lazy load non-critical components
const FAQAccordion = lazy(() => import('../components/FAQAccordion'));

export default function CatYearsPageClient() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* 🐱 Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.hero}
        >
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How Old Is Your Cat in
            <br />
            <span className={styles.heroAccent}> Human Years?</span>
          </motion.h1>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Convert your cat's age to human years.
          </motion.p>
        </motion.section>

        {/* 🧮 Cat Years Calculator Placeholder */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.calculatorSection}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Cat Years Calculator</h2>
            <p className="text-gray-600 mb-4">Interactive calculator coming soon!</p>
            <p className="text-sm text-gray-500">We're working on a comprehensive cat age calculator with breed-specific formulas and charts.</p>
          </div>
        </motion.section>

        {/* 📚 SEO Content Block */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className={styles.contentSections}
        >
          {/* Cat Years vs Human Years Explained */}
          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Cat Years vs Human Years Explained</h2>
            <div className={styles.articleContent}>
              <p className="mb-4">
                Understanding your cat's age in human years helps you provide better care and anticipate their changing needs.
                While cats age differently than dogs, they also mature rapidly in their early years and then age more gradually.
              </p>
              <p className="mb-4">
                Our scientific approach considers the unique aging patterns of feline companions, taking into account their
                different developmental stages and lifespan expectations.
              </p>
              <p>
                Whether you have a playful kitten or a wise senior cat, understanding their human age equivalent helps
                you provide the best possible care throughout their lives.
              </p>
            </div>
          </article>

          {/* Frequently Asked Questions */}
          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Frequently Asked Questions</h2>
            <Suspense fallback={<div className="text-center py-4">Loading FAQ...</div>}>
              <FAQAccordion items={catYearsFAQ} />
            </Suspense>
          </article>
        </motion.section>
      </div>
    </div>
  );
}
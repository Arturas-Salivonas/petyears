'use client';

import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DogYearsCalculator from '../components/DogYearsCalculator';
import styles from '../styles/DogYearsPage.module.css';
import { dogYearsFAQ } from '../data/dog-faq';

// Lazy load non-critical components
const Toolbox = lazy(() => import('../components/Toolbox'));
const FAQAccordion = lazy(() => import('../components/FAQAccordion'));

export default function DogYearsPageClient() {
  const [showToolbox, setShowToolbox] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {/* 🐾 Hero Section */}
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
            How Old Is Your Dog in
            <br />
            <span className={styles.heroAccent}> Human Years?</span>
          </motion.h1>

          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Convert your dog's age to human years.
          </motion.p>
        </motion.section>

        {/* 🧮 Dog Years Calculator */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={styles.calculatorSection}
        >
          <DogYearsCalculator onCalculationComplete={() => setShowToolbox(true)} />
        </motion.section>

        {/* 🧠 Toolbox Explanation */}
        <AnimatePresence>
          {showToolbox && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className={styles.toolboxSection}
            >
              <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
                <Toolbox />
              </Suspense>
            </motion.section>
          )}
        </AnimatePresence>

        {/* 📚 SEO Content Block */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className={styles.contentSections}
        >
          {/* Dog Years vs Human Years Explained */}
          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Dog Years vs Human Years Explained</h2>
            <div className={styles.articleContent}>
              <p className="mb-4">
                The concept of "dog years" has fascinated pet owners for generations. While the traditional rule of thumb
                (1 dog year = 7 human years) was a rough estimate, modern veterinary science has given us much more
                accurate ways to understand canine aging.
              </p>
              <p className="mb-4">
                Our calculator uses a logarithmic formula that better reflects how dogs age throughout their lives.
                Puppies mature rapidly in their first two years, while adult dogs age at a more gradual pace. This
                scientific approach provides a more accurate representation of your dog's true age equivalent.
              </p>
              <p>
                Understanding your dog's human age helps you provide better care, anticipate health needs, and
                appreciate the precious time you have together. Every dog ages differently based on breed, size,
                and individual health factors.
              </p>
            </div>
          </article>

          {/* Dog Age Chart by Breed Size */}
          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Dog Age Chart by Breed Size</h2>
            <div className={styles.breedGrid}>
              <div className={styles.breedCard}>
                <div className={styles.breedEmoji}>🐕</div>
                <h3 className={styles.breedName}>Small Breeds</h3>
                <p className={styles.breedType}>Chihuahua, Pomeranian, Yorkie</p>
                <p className={styles.breedLifespan}>12-15 years</p>
              </div>
              <div className={styles.breedCard}>
                <div className={styles.breedEmoji}>🐕‍🦺</div>
                <h3 className={styles.breedName}>Medium Breeds</h3>
                <p className={styles.breedType}>Beagle, Bulldog, Corgi</p>
                <p className={styles.breedLifespan}>10-13 years</p>
              </div>
              <div className={styles.breedCard}>
                <div className={styles.breedEmoji}>🐕‍🦺</div>
                <h3 className={styles.breedName}>Large Breeds</h3>
                <p className={styles.breedType}>Labrador, German Shepherd, Boxer</p>
                <p className={styles.breedLifespan}>8-12 years</p>
              </div>
            </div>
            <p className={styles.breedInfo}>
              Breed size significantly impacts lifespan and aging patterns. Smaller dogs generally live longer and
              age more slowly than their larger counterparts. However, individual health, diet, exercise, and
              veterinary care play crucial roles in determining your dog's actual lifespan.
            </p>
          </article>

          {/* Frequently Asked Questions */}
          <article className={styles.article}>
            <h2 className={styles.articleTitle}>Frequently Asked Questions</h2>
            <Suspense fallback={<div className="text-center py-4">Loading FAQ...</div>}>
              <FAQAccordion items={dogYearsFAQ} />
            </Suspense>
          </article>
        </motion.section>
      </div>
    </div>
  );
}
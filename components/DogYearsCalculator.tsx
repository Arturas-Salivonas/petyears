'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ShareButton from './ShareButton';
import styles from '../styles/DogYearsCalculator.module.css';

const sizeCategories = {
  "Small": { factor: 1.15, range: "≤ 10kg", examples: "Chihuahua, Pomeranian, Dachshund" },
  "Medium": { factor: 1.00, range: "10-25kg", examples: "Beagle, Cocker Spaniel, Border Collie" },
  "Large": { factor: 0.90, range: "25-45kg", examples: "Labrador, Golden Retriever, Boxer" },
  "Giant": { factor: 0.80, range: "45kg+", examples: "Great Dane, Saint Bernard, Rottweiler" }
};

const dogAgeTable = {
  small: [
    { age: 0, humanAge: 0 },
    { age: 1, humanAge: 15 },
    { age: 2, humanAge: 24 },
    { age: 3, humanAge: 28 },
    { age: 4, humanAge: 32 },
    { age: 5, humanAge: 36 },
    { age: 6, humanAge: 40 },
    { age: 7, humanAge: 44 },
    { age: 8, humanAge: 48 },
    { age: 9, humanAge: 52 },
    { age: 10, humanAge: 56 },
    { age: 11, humanAge: 60 },
    { age: 12, humanAge: 64 },
    { age: 13, humanAge: 68 },
    { age: 14, humanAge: 72 },
    { age: 15, humanAge: 76 },
    { age: 16, humanAge: 80 },
  ],
  medium: [
    { age: 0, humanAge: 0 },
    { age: 1, humanAge: 15 },
    { age: 2, humanAge: 24 },
    { age: 3, humanAge: 28 },
    { age: 4, humanAge: 32 },
    { age: 5, humanAge: 36 },
    { age: 6, humanAge: 42 },
    { age: 7, humanAge: 47 },
    { age: 8, humanAge: 51 },
    { age: 9, humanAge: 56 },
    { age: 10, humanAge: 60 },
    { age: 11, humanAge: 65 },
    { age: 12, humanAge: 69 },
    { age: 13, humanAge: 74 },
    { age: 14, humanAge: 78 },
    { age: 15, humanAge: 83 },
    { age: 16, humanAge: 87 },
  ],
  large: [
    { age: 0, humanAge: 0 },
    { age: 1, humanAge: 15 },
    { age: 2, humanAge: 24 },
    { age: 3, humanAge: 28 },
    { age: 4, humanAge: 32 },
    { age: 5, humanAge: 36 },
    { age: 6, humanAge: 45 },
    { age: 7, humanAge: 50 },
    { age: 8, humanAge: 55 },
    { age: 9, humanAge: 61 },
    { age: 10, humanAge: 66 },
    { age: 11, humanAge: 72 },
    { age: 12, humanAge: 77 },
    { age: 13, humanAge: 82 },
    { age: 14, humanAge: 88 },
    { age: 15, humanAge: 93 },
    { age: 16, humanAge: 99 },
  ],
  giant: [
    { age: 0, humanAge: 0 },
    { age: 1, humanAge: 12 },
    { age: 2, humanAge: 22 },
    { age: 3, humanAge: 31 },
    { age: 4, humanAge: 38 },
    { age: 5, humanAge: 45 },
    { age: 6, humanAge: 49 },
    { age: 7, humanAge: 56 },
    { age: 8, humanAge: 64 },
    { age: 9, humanAge: 71 },
    { age: 10, humanAge: 79 },
    { age: 11, humanAge: 86 },
    { age: 12, humanAge: 93 },
    { age: 13, humanAge: 100 },
    { age: 14, humanAge: 107 },
    { age: 15, humanAge: 114 },
    { age: 16, humanAge: 121 },
  ],
};

const breedImages: { [key: string]: string } = {
  "Other": "/images/default-dog.webp"
};

interface DogYearsCalculatorProps {
  onCalculationComplete?: () => void;
}

export default function DogYearsCalculator({ onCalculationComplete }: DogYearsCalculatorProps = {}) {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Advanced mode state
  const [dogName, setDogName] = useState<string>('');
  const [dogAgeYears, setDogAgeYears] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [advancedHumanAge, setAdvancedHumanAge] = useState<number>(0);
  const [displayAge, setDisplayAge] = useState<number>(0);

  // Animated number using framer-motion
  const animatedAge = useMotionValue(0);
  const springAnimatedAge = useSpring(animatedAge, { stiffness: 100, damping: 30 });
  const roundedAnimatedAge = useTransform(springAnimatedAge, (latest) => Math.round(latest * 10) / 10);

  const calculateHumanAge = (dogAge: number, sizeCategory: string): number => {
    // Map size categories to table keys
    const sizeKey = sizeCategory.toLowerCase() as keyof typeof dogAgeTable;
    const table = dogAgeTable[sizeKey];

    if (!table) return 0;

    // Find exact match
    const exactMatch = table.find(entry => entry.age === dogAge);
    if (exactMatch) {
      return exactMatch.humanAge;
    }

    // For ages beyond 16, extrapolate using the last two data points
    if (dogAge > 16) {
      const lastEntry = table[table.length - 1];
      const secondLastEntry = table[table.length - 2];
      const slope = (lastEntry.humanAge - secondLastEntry.humanAge) / (lastEntry.age - secondLastEntry.age);
      return Math.round(lastEntry.humanAge + slope * (dogAge - lastEntry.age));
    }

    // For fractional ages or ages between table entries, interpolate
    for (let i = 0; i < table.length - 1; i++) {
      const current = table[i];
      const next = table[i + 1];

      if (dogAge > current.age && dogAge < next.age) {
        // Linear interpolation
        const ratio = (dogAge - current.age) / (next.age - current.age);
        return Math.round(current.humanAge + ratio * (next.humanAge - current.humanAge));
      }
    }

    return 0;
  };


  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResult(false);

    setTimeout(() => {
      const dogAge = parseFloat(dogAgeYears);
      const calculated = calculateHumanAge(dogAge, selectedSize);
      setAdvancedHumanAge(calculated);
      setShowResult(true);
      setIsCalculating(false);
      setShowConfetti(true);
      onCalculationComplete?.();

      // Smooth animated count-up using framer-motion
      animatedAge.set(0); // Reset to 0
      animatedAge.set(calculated); // Animate to final value

      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }, 500);
  };

  const handleRealTimeRecalculation = (dogAge?: string, size?: string) => {
    const currentDogAge = dogAge ?? dogAgeYears;
    const currentSize = size ?? selectedSize;

    if (showResult && currentDogAge && currentSize) {
      const parsedDogAge = parseFloat(currentDogAge);
      if (!isNaN(parsedDogAge) && parsedDogAge >= 0) {
        const calculated = calculateHumanAge(parsedDogAge, currentSize);
        setAdvancedHumanAge(calculated);
        animatedAge.set(calculated); // Update animation without reset
      }
    }
  };

  return (
    <div className={styles.calculator}>
      {/* Calculator Form */}
      <div className={styles.calculatorForm}>
        <div className={styles.formGrid}>
          <div>
            <h3 className={`text-lg font-semibold text-[var(--foreground)] mb-4 ${styles.dogDetailsTitle}`}>
              Dog Details
            </h3>
            <div className={styles.detailsRow}>
              <div className={styles.fieldGroup}>
                <label className={`block text-xs text-[var(--muted-text)] mb-1 ${styles.formLabel}`}>Name</label>
                <input
                  type="text"
                  value={dogName}
                  onChange={(e) => {
                    setDogName(e.target.value);
                  }}
                  placeholder="Dog's name"
                  className={styles.uniformField}
                />
              </div>

       <div className={styles.fieldGroup}>
                <label className={`block text-xs text-[var(--muted-text)] mb-1 ${styles.formLabel}`}>Age</label>
                <input
                  type="text"
                  value={dogAgeYears}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 20)) {
                      setDogAgeYears(value);
                      handleRealTimeRecalculation(value, selectedSize);
                    }
                  }}
                  placeholder="Years"
                  maxLength={2}
                  className={styles.uniformField}
                />
              </div>
         <div className={styles.fieldGroup}>
                <label className={`block text-xs text-[var(--muted-text)] mb-1 ${styles.formLabel}`}>Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value);
                    handleRealTimeRecalculation(dogAgeYears, e.target.value);
                  }}
                  className={styles.uniformField}
                >
                  <option value="">Select size</option>
                  {Object.entries(sizeCategories).map(([size, data]) => (
                    <option key={size} value={size}>
                      {size} ({data.range}) — e.g., {data.examples}
                    </option>
                  ))}
                </select>
              </div>




            </div>
          </div>
        </div>

        {/* Calculate Button */}
        {!showResult && (
          <div className="text-center">
            <motion.button
              onClick={handleCalculate}
              disabled={isCalculating || !dogAgeYears || !selectedSize}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.calculateButton} ${isCalculating || !dogAgeYears || !selectedSize ? styles.disabled : ''}`}
            >
              {isCalculating ? 'Calculating...' : 'Calculate'}
            </motion.button>
          </div>
        )}

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.resultContainer}
            >
              {/* Main Result Card */}
              <div className={`${styles.resultCard}`}>
                {/* Confetti Effect */}
                {showConfetti && (
                  <div className={styles.confetti}>
                    {Array.from({ length: 80 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={styles.confettiItem}
                        initial={{
                          x: (Math.random() - 0.5) * 800, // Centered spread from -100 to 100
                          y: -20,
                          rotate: 0,
                          opacity: 1
                        }}
                        animate={{
                          y: 400,
                          rotate: 360,
                          opacity: 0
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          delay: Math.random() * 0.5,
                          ease: "easeOut"
                        }}
                      >
                        {['🎉', '✨', '🎊', '🌟', '💫'][Math.floor(Math.random() * 5)]}
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className={styles.resultHeader}>
                  <img
                    src={breedImages["Other"]}
                    alt="Dog avatar"
                    className={styles.breedImage}
                  />
                  <div>
                    <div className={styles.dogName}>
                      {dogName || 'Your dog'}
                    </div>
                    <div className={styles.dogDetails}>
                      {selectedSize} • {dogAgeYears} years old
                    </div>
                  </div>

                </div>
             <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={styles.resultNumber}
                >
     <div className={styles.resultMessage}>
                 In human years, you dog is
                </div>
                  <motion.span
                    className={styles.animatedNumber}
                  >
                    {roundedAnimatedAge}
                  </motion.span>


                </motion.div>




                {/* Share Button */}
                <div className={styles.shareContainer}>
                  <ShareButton
                    dogName={dogName}
                    humanAge={advancedHumanAge}
                    mode="advanced"
                  />
                       <motion.button
                    onClick={() => {
                      setShowResult(false);
                      animatedAge.set(0);
                      setAdvancedHumanAge(0);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.recalculateButton}
                  >
                    Recalculate
                  </motion.button>
                </div>


              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
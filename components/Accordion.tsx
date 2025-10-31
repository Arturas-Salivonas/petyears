'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from '../styles/Accordion.module.css';

interface AccordionItem {
  id?: string;
  title: string;
  content: React.ReactNode;
  icon?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple'; // single = only one open at a time, multiple = multiple can be open
  defaultExpanded?: string[]; // array of item ids that should be expanded by default
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'multiple',
  defaultExpanded = [],
  className = ''
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (type === 'single') {
        // For single type, close all others
        if (newSet.has(itemId)) {
          newSet.clear();
        } else {
          newSet.clear();
          newSet.add(itemId);
        }
      } else {
        // For multiple type, toggle individual items
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
      }
      return newSet;
    });
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item, index) => {
        const itemId = item.id || `item-${index}`;
        const isOpen = openItems.has(itemId);

        return (
          <div key={itemId} className={styles.accordionItem}>
            <button
              onClick={() => toggleItem(itemId)}
              className={styles.accordionHeader}
              aria-expanded={isOpen}
            >
              <div className={styles.headerContent}>
                <div className={styles.headerLeft}>
                  {item.icon && (
                    <span className={styles.headerIcon}>{item.icon}</span>
                  )}
                  <h3 className={styles.headerTitle}>{item.title}</h3>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={styles.expandIcon}
                >
                  ▼
                </motion.span>
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    opacity: { duration: 0.2 }
                  }}
                  className={styles.accordionContent}
                >
                  <div className={styles.contentInner}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
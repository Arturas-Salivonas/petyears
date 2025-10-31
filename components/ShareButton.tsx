'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/ShareButton.module.css';

interface ShareButtonProps {
  dogName?: string;
  breed?: string;
  humanAge: number;
  mode: 'basic' | 'advanced';
}

export default function ShareButton({ dogName, breed, humanAge, mode }: ShareButtonProps) {
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowShareOptions(false);
      }
    };

    if (showShareOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareOptions]);

  const generateShareText = () => {
    if (mode === 'advanced' && dogName && breed) {
      return `${dogName} the ${breed} is ${humanAge} in human years! Check out this cool dog age calculator: ${window.location.href}`;
    }
    return `🐾 My dog is ${humanAge} in human years! Calculate yours at: ${window.location.href}`;
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(generateShareText());
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
  };


  const shareToWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    const shareUrl = `https://wa.me/?text=${text}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareToReddit = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Check out this dog age calculator!');
    const shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      // Could add a toast notification here
      alert('Copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generateShareText();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Share Button */}
      <motion.button
        onClick={() => setShowShareOptions(!showShareOptions)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={styles.shareButton}
      >

        <span>Share</span>
      </motion.button>

      {/* Share Options */}
      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            className={styles.shareOptions}
          >
            <div className={styles.socialButtons}>
              <motion.button
                onClick={shareToTwitter}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.socialButton} ${styles.twitterButton}`}
                title="Share on Twitter/X"
              >
                𝕏
              </motion.button>

              <motion.button
                onClick={shareToWhatsApp}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.socialButton} ${styles.whatsappButton}`}
                title="Share on WhatsApp"
              >
                💬
              </motion.button>
              <motion.button
                onClick={shareToReddit}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.socialButton} ${styles.redditButton}`}
                title="Share on Reddit"
              >
                🟠
              </motion.button>
              <motion.button
                onClick={copyToClipboard}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.socialButton} ${styles.copyButton}`}
                title="Copy link"
              >
                📋
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../styles/RelatedPosts.module.css';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

interface RelatedPostsProps {
  currentPost: PostMeta;
  allPosts: PostMeta[];
  maxPosts?: number;
}

export default function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  // Simple algorithm to find related posts based on keyword matching
  const findRelatedPosts = (current: PostMeta, posts: PostMeta[]): PostMeta[] => {
    const currentWords = [
      ...current.title.toLowerCase().split(/\s+/),
      ...current.description.toLowerCase().split(/\s+/)
    ].filter(word => word.length > 3); // Only words longer than 3 characters

    const scoredPosts = posts
      .filter(post => post.slug !== current.slug) // Exclude current post
      .map(post => {
        const postWords = [
          ...post.title.toLowerCase().split(/\s+/),
          ...post.description.toLowerCase().split(/\s+/)
        ];

        // Calculate similarity score based on common words
        const commonWords = currentWords.filter(word =>
          postWords.some(postWord => postWord.includes(word) || word.includes(postWord))
        );

        const score = commonWords.length;

        return { post, score };
      })
      .filter(item => item.score > 0) // Only include posts with some similarity
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, maxPosts) // Take top N posts
      .map(item => item.post);

    // If we don't have enough related posts, fill with recent posts
    if (scoredPosts.length < maxPosts) {
      const recentPosts = posts
        .filter(post => post.slug !== current.slug && !scoredPosts.some(p => p.slug === post.slug))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, maxPosts - scoredPosts.length);

      scoredPosts.push(...recentPosts);
    }

    return scoredPosts.slice(0, maxPosts);
  };

  const relatedPosts = findRelatedPosts(currentPost, allPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className={styles.title}>
          Related Articles
        </h3>

        <div className={styles.grid}>
          {relatedPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={styles.article}
            >
              <div className="mb-3">
                <time className={styles.date} dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </div>

              <h4 className={styles.articleTitle}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={styles.articleTitleLink}
                  prefetch
                >
                  {post.title}
                </Link>
              </h4>

              <p className={styles.description}>
                {post.description}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className={styles.readMore}
                prefetch
              >
                Read more
                <svg
                  className={styles.readMoreIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
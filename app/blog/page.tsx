import Link from 'next/link';
import { getSortedPostsData, PostMeta } from '../../lib/posts';
import { Metadata } from 'next';
import BlogSearch from '../../components/BlogSearch';
import styles from '../../styles/BlogPage.module.css';

export const metadata: Metadata = {
  title: 'Blog - PetYears.net',
  description: 'Learn about pet aging, care tips, and the science behind our age calculators.',
  alternates: {
    canonical: 'https://petyears.net/blog',
  },
};

export default async function Blog() {
  const posts = await getSortedPostsData();

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Pet Care Blog</h1>
      <p className={styles.pageDescription}>
        Discover insights about pet aging, care tips, and the science behind our age conversion calculators.
      </p>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <BlogSearch posts={posts} />
      </div>

      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <article key={post.slug} className={styles.postCard}>
            <div>
              <time className={styles.postDate} dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <h2 className={styles.postTitle}>
              <Link href={`/blog/${post.slug}`} className={styles.postTitleLink}>
                {post.title}
              </Link>
            </h2>
            <p className={styles.postDescription}>{post.description}</p>
            <Link
              href={`/blog/${post.slug}`}
              className={styles.postLink}
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
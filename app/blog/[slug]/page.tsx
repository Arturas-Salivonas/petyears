import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostData, getAllPostSlugs, getSortedPostsData } from '../../../lib/posts';
import { Metadata } from 'next';
import { ArticleJsonLd } from 'next-seo';
import Breadcrumb from '../../../components/Breadcrumb';
import RelatedPosts from '../../../components/RelatedPosts';
import styles from '../../../styles/BlogPost.module.css';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    return {
      title: `${post.title} - PetYears.net Blog`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://petyears.net/blog/${post.slug}`,
        type: 'article',
        publishedTime: post.date,
        images: [
          {
            url: `/og/${post.slug}.png`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [`/og/${post.slug}.png`],
      },
    };
  } catch {
    return {
      title: 'Blog Post - PetYears.net',
    };
  }
}

export default async function Post({ params }: PostPageProps) {
  const { slug } = await params;
  try {
    const post = await getPostData(slug);
    const allPosts = await getSortedPostsData();

    return (
      <>
        <ArticleJsonLd
          headline={post.title}
          description={post.description}
          image={`https://petyears.net/og/${post.slug}.png`}
          datePublished={post.date}
          url={`https://petyears.net/blog/${post.slug}`}
        />
        <div className={styles.container}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <div className={styles.contentGrid}>
          <article className={styles.article}>
            <div>
              <Link
                href="/blog"
                className={styles.backLink}
              >
                ← Back to Blog
              </Link>
            </div>

            <header className={styles.articleHeader}>
              <time
                className={styles.articleDate}
                dateTime={post.date}
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <h1 className={styles.articleTitle}>
                {post.title}
              </h1>
              <p className={styles.articleDescription}>{post.description}</p>
            </header>

            <div
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <footer className={styles.articleFooter}>
              <div className={styles.footerActions}>
                <Link
                  href="/blog"
                  className={styles.backLink}
                >
                  ← Back to Blog
                </Link>
                <div className={styles.footerButtons}>
                  <Link
                    href="/dog-years"
                    className={styles.footerButton}
                  >
                    Try Dog Calculator
                  </Link>
                  <Link
                    href="/cat-years"
                    className={styles.footerButton}
                  >
                    Try Cat Calculator
                  </Link>
                </div>
              </div>
            </footer>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Recent Posts</h3>
              <div>
                {allPosts.slice(0, 5).map((recentPost) => (
                  <div key={recentPost.slug} className={styles.recentPost}>
                    <Link
                      href={`/blog/${recentPost.slug}`}
                      className={styles.recentPostLink}
                    >
                      <div className={styles.recentPostTitle}>{recentPost.title}</div>
                      <div className={styles.recentPostDate}>
                        {new Date(recentPost.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          </div>
        </div>

        {/* Related Posts */}
        <RelatedPosts currentPost={post} allPosts={allPosts} />
      </>
    );
  } catch {
    notFound();
  }
}
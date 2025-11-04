import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import StaticPage from '../../components/StaticPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap - PetYears.net',
  description: 'Complete sitemap of all pages on PetYears.net.',
  alternates: {
    canonical: 'https://petyears.net/sitemap',
  },
};

export default async function Sitemap() {
  const posts = await getSortedPostsData();

  return (
    <StaticPage title="Sitemap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2>Main Pages</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dog-years">Dog Years Calculator</Link>
            </li>
            <li>
              <Link href="/cat-years">Cat Years Calculator</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Blog Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
                <span className="text-sm ml-2">
                  ({new Date(post.date).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StaticPage>
  );
}
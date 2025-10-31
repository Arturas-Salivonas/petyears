import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import images from 'remark-images';

const postsDirectory = path.join(process.cwd(), 'content');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export async function getSortedPostsData(): Promise<PostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description,
      };
    })
  );

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(images)
    .use(html, {
      sanitize: false,
    })
    .process(matterResult.content);

  // Enhance img tags with better attributes for optimization
  let contentHtml = processedContent.toString();
  contentHtml = contentHtml.replace(
    /<img([^>]+)src="([^"]*)"([^>]*)alt="([^"]*)"([^>]*)>/g,
    '<img$1src="$2"$3alt="$4"$5 loading="lazy" class="rounded-xl shadow-md w-full h-auto">'
  );

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description,
    contentHtml,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
}
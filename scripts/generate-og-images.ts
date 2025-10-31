import fs from 'fs';
import path from 'path';
import { getAllPostSlugs, getPostData } from '../lib/posts';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const ogDir = path.join(publicDir, 'og');

async function generateOGImage(post: any) {
  const width = 1200;
  const height = 630;

  // Create SVG template
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFFDF9;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FEEBC8;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#F6AD55;stop-opacity:0.2" />
        </linearGradient>
        <radialGradient id="bg2" cx="25%" cy="25%" r="50%">
          <stop offset="0%" style="stop-color:#FEEBC8;stop-opacity:0.4" />
          <stop offset="100%" style="stop-color:#FFFDF9;stop-opacity:0" />
        </radialGradient>
        <radialGradient id="bg3" cx="75%" cy="75%" r="50%">
          <stop offset="0%" style="stop-color:#F6AD55;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#FFFDF9;stop-opacity:0" />
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#bg2)"/>
      <rect width="100%" height="100%" fill="url(#bg3)"/>

      <!-- Header -->
      <g transform="translate(80, 60)">
        <text font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#F6AD55">🐾</text>
        <text x="70" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#333">PetYears.net</text>
      </g>

      <!-- Article badge -->
      <rect x="80" y="140" width="180" height="40" rx="20" fill="#FEEBC8"/>
      <text x="170" y="165" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#F6AD55" text-anchor="middle">BLOG ARTICLE</text>

      <!-- Title -->
      <text x="80" y="250" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="#333" style="max-width: 1000px;">
        ${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </text>

      <!-- Description -->
      <text x="80" y="320" font-family="Arial, sans-serif" font-size="28" fill="#666" style="max-width: 1000px;">
        ${post.description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </text>

      <!-- Footer -->
      <text x="80" y="550" font-family="Arial, sans-serif" font-size="20" fill="#999">Read more at petyears.net</text>
    </svg>
  `;

  // Generate PNG from SVG
  const buffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  return buffer;
}

async function generateAllOGImages() {
  try {
    // Ensure OG directory exists
    if (!fs.existsSync(ogDir)) {
      fs.mkdirSync(ogDir, { recursive: true });
    }

    // Get all post slugs
    const slugs = await getAllPostSlugs();

    console.log(`Generating OG images for ${slugs.length} blog posts...`);

    // Generate OG image for each post
    for (const slug of slugs) {
      const post = await getPostData(slug);
      const imageBuffer = await generateOGImage(post);

      const fileName = `${slug}.png`;
      const filePath = path.join(ogDir, fileName);

      fs.writeFileSync(filePath, imageBuffer);
      console.log(`✓ Generated OG image: ${fileName}`);
    }

    console.log('All OG images generated successfully!');
  } catch (error) {
    console.error('Error generating OG images:', error);
    process.exit(1);
  }
}

generateAllOGImages();
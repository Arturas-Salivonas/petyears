// Image optimization script for PetYears
// This script helps identify large images and suggests WebP conversion

const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = ['public/images', 'public/og'];
const MAX_SIZE_KB = 100; // Target max size for images

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function analyzeImages(dirPath) {
  const results = {
    total: 0,
    large: [],
    nonWebP: [],
    totalSize: 0
  };

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
        results.total++;
        const sizeKB = getFileSizeInKB(filePath);
        results.totalSize += sizeKB;

        if (sizeKB > MAX_SIZE_KB) {
          results.large.push({ path: filePath, size: sizeKB });
        }

        if (!/\.webp$/i.test(file)) {
          results.nonWebP.push({ path: filePath, size: sizeKB });
        }
      }
    });
  }

  scanDirectory(dirPath);
  return results;
}

console.log('🖼️  Image Optimization Analysis\n');
console.log('='.repeat(60));

IMAGE_DIRS.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Directory not found: ${dir}\n`);
    return;
  }

  console.log(`\n📁 Analyzing: ${dir}`);
  const results = analyzeImages(fullPath);

  console.log(`   Total images: ${results.total}`);
  console.log(`   Total size: ${results.totalSize} KB`);
  console.log(`   Large images (>${MAX_SIZE_KB}KB): ${results.large.length}`);
  console.log(`   Non-WebP images: ${results.nonWebP.length}`);

  if (results.large.length > 0) {
    console.log('\n   ⚠️  Large images found:');
    results.large.forEach(img => {
      console.log(`      ${path.relative(process.cwd(), img.path)} (${img.size} KB)`);
    });
  }

  if (results.nonWebP.length > 0) {
    console.log('\n   💡 Images to convert to WebP:');
    results.nonWebP.slice(0, 10).forEach(img => {
      console.log(`      ${path.relative(process.cwd(), img.path)} (${img.size} KB)`);
    });
    if (results.nonWebP.length > 10) {
      console.log(`      ... and ${results.nonWebP.length - 10} more`);
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log('\n📋 Recommendations:');
console.log('   1. Convert all images to WebP format using tools like:');
console.log('      - cwebp (command line): cwebp input.jpg -o output.webp');
console.log('      - Online: https://squoosh.app/');
console.log('      - npm package: sharp');
console.log('\n   2. Use responsive images with Next.js Image component');
console.log('\n   3. Add proper width/height attributes to prevent layout shift');
console.log('\n   4. Consider lazy loading for below-the-fold images');
console.log('\n   5. Use appropriate image sizes for different devices\n');

module.exports = { analyzeImages };

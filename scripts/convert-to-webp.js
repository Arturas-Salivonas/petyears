// WebP Image Converter Script
// Converts JPG/PNG images to WebP format using Sharp library
// Run: npm install sharp --save-dev
// Then: node scripts/convert-to-webp.js

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('❌ Sharp library not found!');
  console.log('\n📦 Please install it first:');
  console.log('   npm install sharp --save-dev\n');
  process.exit(1);
}

const IMAGE_DIRS = ['public/images', 'public/og'];
const QUALITY = 80; // WebP quality (0-100)
const SKIP_EXISTING = true; // Skip if WebP already exists

let stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  failed: 0,
  sizeBefore: 0,
  sizeAfter: 0
};

async function convertImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();

  // Skip if already WebP
  if (ext === '.webp') {
    return;
  }

  // Skip if not an image
  if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
    return;
  }

  const outputPath = inputPath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');

  // Skip if output already exists
  if (SKIP_EXISTING && fs.existsSync(outputPath)) {
    stats.skipped++;
    console.log(`⏭️  Skipped (exists): ${path.relative(process.cwd(), inputPath)}`);
    return;
  }

  try {
    const inputStats = fs.statSync(inputPath);
    const inputSizeKB = Math.round(inputStats.size / 1024);

    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = Math.round(outputStats.size / 1024);
    const savedKB = inputSizeKB - outputSizeKB;
    const savedPercent = Math.round((savedKB / inputSizeKB) * 100);

    stats.total++;
    stats.converted++;
    stats.sizeBefore += inputSizeKB;
    stats.sizeAfter += outputSizeKB;

    console.log(`✅ Converted: ${path.relative(process.cwd(), inputPath)}`);
    console.log(`   ${inputSizeKB}KB → ${outputSizeKB}KB (saved ${savedKB}KB, -${savedPercent}%)`);
  } catch (error) {
    stats.failed++;
    console.error(`❌ Failed: ${path.relative(process.cwd(), inputPath)}`);
    console.error(`   ${error.message}`);
  }
}

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      await convertImage(filePath);
    }
  }
}

async function main() {
  console.log('🖼️  WebP Image Converter\n');
  console.log('='.repeat(60));
  console.log(`Quality: ${QUALITY}%`);
  console.log(`Skip existing: ${SKIP_EXISTING}`);
  console.log('='.repeat(60) + '\n');

  for (const dir of IMAGE_DIRS) {
    const fullPath = path.join(process.cwd(), dir);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Directory not found: ${dir}\n`);
      continue;
    }

    console.log(`📁 Processing: ${dir}\n`);
    await processDirectory(fullPath);
    console.log('');
  }

  console.log('='.repeat(60));
  console.log('📊 Conversion Summary\n');
  console.log(`Total images processed: ${stats.total}`);
  console.log(`Successfully converted: ${stats.converted}`);
  console.log(`Skipped (already exist): ${stats.skipped}`);
  console.log(`Failed: ${stats.failed}`);

  if (stats.converted > 0) {
    const totalSaved = stats.sizeBefore - stats.sizeAfter;
    const avgPercent = Math.round((totalSaved / stats.sizeBefore) * 100);

    console.log(`\nSize before: ${stats.sizeBefore} KB`);
    console.log(`Size after: ${stats.sizeAfter} KB`);
    console.log(`Total saved: ${totalSaved} KB (-${avgPercent}%)`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n💡 Next Steps:');
  console.log('   1. Review the converted images');
  console.log('   2. Update image references in your code');
  console.log('   3. Consider deleting original images if satisfied');
  console.log('   4. Run: npm run build');
  console.log('   5. Test performance with Lighthouse\n');

  console.log('⚠️  Note: Original images are kept for safety.');
  console.log('   Delete them manually after verifying WebP versions.\n');
}

main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
});

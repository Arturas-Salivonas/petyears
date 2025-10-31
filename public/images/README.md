# Images Folder Structure

This folder contains static images for the PetYears.net website.

## Folder Organization

### `/breeds/`
- **Purpose**: Dog breed avatar images
- **Usage**: Place breed-specific images here (e.g., `labrador.jpg`, `german-shepherd.jpg`)
- **Naming**: Use lowercase with hyphens (e.g., `golden-retriever.jpg`)
- **Access**: `/images/breeds/filename.jpg`
- **Current usage**: DogYearsCalculator component displays breed avatars

### `/logos/`
- **Purpose**: Company logos, brand assets, favicons
- **Usage**: Place logo files, brand icons, and favicon here
- **Examples**: `logo.png`, `logo-white.png`, `favicon.ico`
- **Access**: `/images/logos/filename.ext`

### `/social/`
- **Purpose**: Social media assets, share images, OG images
- **Usage**: Social media banners, profile pictures, share graphics
- **Examples**: `facebook-banner.jpg`, `twitter-profile.png`
- **Access**: `/images/social/filename.ext`

## File Guidelines

- **Formats**: Use modern web formats (WebP, AVIF) when possible, fallback to JPG/PNG
- **Optimization**: Compress images for web use
- **Naming**: Use descriptive, lowercase names with hyphens
- **Sizes**: Optimize for intended use (avatars: 55x55px, logos: appropriate sizes)

## Next.js Usage

Images in the `public` folder are served statically:
```jsx
// Direct access
<img src="/images/breeds/labrador.jpg" alt="Labrador" />

// With Next.js Image component
import Image from 'next/image'
<Image src="/images/logos/logo.png" alt="PetYears Logo" width={200} height={60} />
```

## Current Breed Images Needed

The app currently references these breed images (placeholders):
- `labrador.jpg`
- `german-shepherd.jpg`
- `chihuahua.jpg`
- `bulldog.jpg`
- `golden-retriever.jpg`
- `dachshund.jpg`
- `poodle.jpg`
- `beagle.jpg`
- `boxer.jpg`
- `siberian-husky.jpg`
- `border-collie.jpg`
- `shih-tzu.jpg`
- `rottweiler.jpg`
- `yorkshire-terrier.jpg`
- `great-dane.jpg`
- `default-dog.jpg` (fallback image)</content>
<parameter name="filePath">c:\Users\Arturas\Desktop\petyears\public\images\README.md
import type { Metadata } from 'next';
import { OrganizationJsonLd } from 'next-seo';
import HomePageClient from '../components/HomePageClient';

export const metadata: Metadata = {
  title: 'PetYears.net - Pet Age to Human Years Calculator',
  description: "Convert your pet's age to human years instantly. Simple, fast, and accurate calculator for dogs and cats. Free online tool with detailed charts and breed information.",
  keywords: ['pet age calculator', 'dog years', 'cat years', 'human years', 'pet calculator', 'dog age converter', 'cat age converter'],
  openGraph: {
    title: 'PetYears.net - Pet Age to Human Years Calculator',
    description: 'Convert your pet\'s age to human years instantly. Simple, fast, and accurate calculator for dogs and cats.',
    url: 'https://petyears.net',
    siteName: 'PetYears.net',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PetYears.net - Pet Age Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetYears.net - Pet Age to Human Years Calculator',
    description: 'Convert your pet\'s age to human years instantly. Simple, fast, and accurate calculator for dogs and cats.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://petyears.net/',
  },
};

export default function Home() {
  return (
    <>
      <OrganizationJsonLd
        name="PetYears.net"
        url="https://petyears.net"
        description="Convert your pet's age to human years instantly. Simple, fast, and accurate calculator for dogs and cats."
        logo="https://petyears.net/logo.png"
      />
      <HomePageClient />
    </>
  );
}

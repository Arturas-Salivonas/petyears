import type { Metadata } from 'next';
import { OrganizationJsonLd, FAQJsonLd } from 'next-seo';
import DogYearsPageClient from '../../components/DogYearsPageClient';
import { dogYearsFAQ } from '../../data/dog-faq';

export const metadata: Metadata = {
  title: 'Dog Years Calculator - Convert Dog Age to Human Years',
  description: 'Calculate how old your dog is in human years with our accurate scientific calculator. Free online tool with breed-specific charts and detailed aging information.',
  keywords: ['dog years calculator', 'dog age to human years', 'puppy age calculator', 'dog aging chart', 'canine age converter', 'dog lifespan calculator'],
  openGraph: {
    title: 'Dog Years Calculator - Convert Dog Age to Human Years',
    description: 'Calculate how old your dog is in human years with our accurate scientific calculator. Free online tool with breed-specific charts.',
    url: 'https://petyears.net/dog-years',
    siteName: 'PetYears.net',
    type: 'website',
    images: [
      {
        url: '/og/dog-years-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Dog Years Calculator - Convert Dog Age to Human Years',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dog Years Calculator - Convert Dog Age to Human Years',
    description: 'Calculate how old your dog is in human years with our accurate scientific calculator.',
    images: ['/og/dog-years-calculator.jpg'],
  },
  alternates: {
    canonical: 'https://petyears.net/dog-years',
  },
};

export default function DogYearsPage() {
  return (
    <>
      <OrganizationJsonLd
        name="PetYears.net"
        url="https://petyears.net"
        description="Convert your pet's age to human years instantly. Simple, fast, and accurate calculator for dogs and cats."
        logo="https://petyears.net/logo.png"
      />
      <FAQJsonLd
        questions={dogYearsFAQ.map(item => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <DogYearsPageClient />
    </>
  );
}
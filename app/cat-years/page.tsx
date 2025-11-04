import type { Metadata } from 'next';
import { OrganizationJsonLd, FAQJsonLd } from 'next-seo';
import CatYearsPageClient from '../../components/CatYearsPageClient';
import { catYearsFAQ } from '../../data/cat-faq';

export const metadata: Metadata = {
  title: 'Cat Years Calculator - Convert Cat Age to Human Years',
  description: 'Calculate how old your cat is in human years with our accurate scientific calculator. Free online tool with breed information and feline aging charts.',
  keywords: ['cat years calculator', 'cat age to human years', 'kitten age calculator', 'cat aging chart', 'feline age converter', 'cat lifespan calculator'],
  openGraph: {
    title: 'Cat Years Calculator - Convert Cat Age to Human Years',
    description: 'Calculate how old your cat is in human years with our accurate scientific calculator. Free online tool with breed information.',
    url: 'https://petyears.net/cat-years',
    siteName: 'PetYears.net',
    type: 'website',
    images: [
      {
        url: '/og/cat-years-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Cat Years Calculator - Convert Cat Age to Human Years',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Years Calculator - Convert Cat Age to Human Years',
    description: 'Calculate how old your cat is in human years with our accurate scientific calculator.',
    images: ['/og/cat-years-calculator.jpg'],
  },
  alternates: {
    canonical: 'https://petyears.net/cat-years',
  },
};

export default function CatYearsPage() {
  return (
    <>
      <OrganizationJsonLd
        name="PetYears.net"
        url="https://petyears.net"
        description="Convert your pet's age to human years instantly. Simple, fast, and accurate calculator for dogs and cats."
        logo="https://petyears.net/logo.png"
      />
      <FAQJsonLd
        questions={catYearsFAQ.map(item => ({
          question: item.question,
          answer: item.answer,
        }))}
      />
      <CatYearsPageClient />
    </>
  );
}
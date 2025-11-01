import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Layout from "../components/Layout";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap', // Optimize font loading
});

export const metadata: Metadata = {
  title: {
    default: 'PetYears.net - Pet Age to Human Years Calculator',
    template: '%s | PetYears.net',
  },
  description: "Convert your pet's age to human years instantly. Simple, fast, and accurate calculator for dogs and cats. Free online tool with detailed charts and breed information.",
  keywords: ['pet age calculator', 'dog years', 'cat years', 'human years', 'pet calculator', 'dog age converter', 'cat age converter'],
  authors: [{ name: 'PetYears.net' }],
  creator: 'PetYears.net',
  publisher: 'PetYears.net',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  metadataBase: new URL('https://petyears.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PetYears.net - Pet Age to Human Years Calculator',
    description: 'Convert your pet\'s age to human years instantly. Simple, fast, and accurate calculator for dogs and cats.',
    url: 'https://petyears.net',
    siteName: 'PetYears.net',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PetYears.net - Pet Age Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PetYears.net - Pet Age to Human Years Calculator',
    description: 'Convert your pet\'s age to human years instantly. Simple, fast, and accurate calculator for dogs and cats.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preload" href="/images/logos/logo-petyears-new.webp" as="image" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-FLFS9989L0"} />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import AosProvider from '@/providers/aos-provider';
import { ClientProvider } from '@/providers/client-provider';
import { ToastProvider } from '@/providers/toast-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://keshariniyoga.com'),
  title: {
    default: 'Kesharini Yoga - Amélie Vetcour | Cours de Yoga en Belgique',
    template: '%s | Kesharini Yoga'
  },
  description:
    'Kesharini Yoga par Amélie Vetcour, professeur de yoga certifiée en Belgique. Cours de yoga collectifs et individuels, événements, ateliers et retraites. Hatha yoga, vinyasa, yoga doux. Retrouvez harmonie du corps et de l\'esprit.',
  keywords: [
    'Kesharini Yoga',
    'Amélie Vetcour',
    'cours de yoga Belgique',
    'professeur de yoga certifiée',
    'hatha yoga',
    'vinyasa yoga',
    'yoga doux',
    'yoga dynamique',
    'cours de yoga collectifs',
    'cours de yoga individuels',
    'ateliers yoga',
    'événements yoga',
    'retraite yoga Belgique',
    'bien-être',
    'méditation',
    'relaxation',
    'souplesse',
    'sérénité'
  ],
  authors: [{ name: 'Romain GILOT', url: 'https://romain-gilot.fr/' }],
  creator: 'Amélie Vetcour',
  publisher: 'Kesharini Yoga',
  alternates: {
    canonical: 'https://keshariniyoga.com'
  },
  openGraph: {
    title: 'Kesharini Yoga - Amélie Vetcour | Cours de Yoga en Belgique',
    description:
      'Cours de yoga collectifs et individuels par Amélie Vetcour. Hatha yoga, vinyasa, ateliers et événements en Belgique.',
    images: [
      {
        url: '/images/logo.png',
        width: 500,
        height: 300,
        alt: 'Kesharini Yoga - Amélie Vetcour'
      }
    ],
    url: 'https://keshariniyoga.com',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'Kesharini Yoga'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kesharini Yoga - Amélie Vetcour | Cours de Yoga',
    description:
      'Cours de yoga collectifs et individuels par Amélie Vetcour. Hatha yoga, vinyasa, ateliers et événements en Belgique.',
    images: '/images/logo.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script defer src="https://analytics.romain-gilot.fr/script.js" data-website-id="03868712-b356-47e7-a7cd-419af93791c0"></script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Kesharini Yoga',
            description:
              'Kesharini Yoga par Amélie Vetcour, professeur de yoga certifiée en Belgique. Cours de yoga collectifs et individuels, hatha yoga, vinyasa, ateliers, événements et retraites.',
            url: 'https://keshariniyoga.com',
            logo: 'https://keshariniyoga.com/images/logo.png',
            image: 'https://keshariniyoga.com/images/logo.png',
            telephone: '+32493574615',
            email: 'hello@yogiamelie.be',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BE'
            },
            sameAs: [],
            priceRange: '€€',
            openingHoursSpecification: [],
            areaServed: {
              '@type': 'Country',
              name: 'Belgique'
            }
          })}
        </script>
      </head>
      <body>
        <ClientProvider>
          <ToastProvider>
            <AosProvider>{children}</AosProvider>
          </ToastProvider>
        </ClientProvider>
      </body>
    </html>
  );
}

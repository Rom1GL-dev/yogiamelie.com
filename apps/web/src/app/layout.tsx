import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import AosProvider from '@/providers/aos-provider';
import { ClientProvider } from '@/providers/client-provider';
import { ToastProvider } from '@/providers/toast-provider';

export const metadata: Metadata = {
  title: 'Kesharini Yoga - Amélie Vetcour',
  description:
    'Kesharini Yoga par Amélie Vetcour, professeur de yoga passionnée. Cours de yoga collectifs et individuels, événements et ateliers. Retrouvez harmonie du corps et de l\'esprit.',
  keywords: [
    'Kesharini Yoga',
    'Amélie Vetcour',
    'Yoga',
    'Cours de yoga',
    'Professeur de yoga',
    'Bien-être',
    'Méditation',
    'Hatha yoga',
    'Vinyasa',
    'Yoga doux',
    'Yoga dynamique',
    'Relaxation',
    'Harmonie',
    'Corps et esprit',
    'Ateliers yoga',
    'Événements yoga',
    'Yoga Belgique',
    'yogiamelie'
  ],
  authors: [{ name: 'Romain GILOT', url: 'https://romain-gilot.fr/' }],
  openGraph: {
    title: 'Kesharini Yoga - Amélie Vetcour',
    description:
      'Kesharini Yoga par Amélie Vetcour. Cours de yoga, événements et ateliers pour retrouver harmonie du corps et de l\'esprit.',
    images: [
      {
        url: '/images/home-logo.svg',
        width: 500,
        height: 300,
        alt: 'Kesharini Yoga - Amélie Vetcour'
      }
    ],
    url: 'https://yogiamelie.com',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kesharini Yoga - Amélie Vetcour',
    description:
      'Kesharini Yoga par Amélie Vetcour. Cours de yoga, événements et ateliers pour retrouver harmonie du corps et de l\'esprit.',
    images: '/images/home-logo.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Kesharini Yoga',
            description:
              'Kesharini Yoga par Amélie Vetcour, professeur de yoga passionnée. Cours de yoga collectifs et individuels, événements et ateliers.',
            url: 'https://yogiamelie.com',
            logo: '/images/home-logo.svg',
            image: '/images/home-logo.svg',
            telephone: '+32493574615',
            email: 'hello@yogiamelie.be'
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

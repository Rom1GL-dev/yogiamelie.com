import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité du site keshariniyoga.com. Informations sur la gestion de vos données personnelles.',
  robots: { index: false },
};

export default function PolitiquedeConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Top bar */}
      <div className="border-b border-[#353F34]/10 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-[#353F34]/70 transition-colors hover:text-[#353F34]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Retour
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="grain bg-[#353F34] px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[Mistrully] text-3xl text-[#d5ddcb] md:text-4xl lg:text-5xl">
            Politique de Confidentialité
          </h1>
          <p className="mt-3 text-base font-light text-[#d5ddcb]/60 md:text-lg">
            Gestion de vos données sur keshariniyoga.com
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
        <article className="max-w-none space-y-8 text-base leading-[1.8] text-[#2d3640] md:text-[17px]">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#353F34]">1. Introduction</h2>
            <p>
              La présente politique de confidentialité a pour but de vous informer sur la manière
              dont nous gérons les informations sur notre site{' '}
              <Link href="https://keshariniyoga.com/" className="text-[#c08562] underline underline-offset-2">
                keshariniyoga.com
              </Link>
              . En utilisant notre site, vous acceptez les pratiques décrites dans cette politique.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#353F34]">2. Collecte des informations</h2>
            <p>
              Nous ne collectons ni ne stockons aucune donnée personnelle vous concernant. Les
              informations que vous pouvez nous fournir via le formulaire de contact ne sont pas
              conservées sur nos serveurs.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#353F34]">3. Utilisation des informations</h2>
            <p>
              Les informations que vous nous fournissez via le formulaire de contact sont utilisées
              uniquement pour répondre à vos demandes et questions. Ces informations sont envoyées
              directement par email et ne sont pas stockées sur notre site. Elles sont supprimées
              immédiatement après traitement de votre demande.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#353F34]">4. Sécurité des informations</h2>
            <p>
              Les informations que vous nous fournissez via le formulaire de contact sont envoyées
              directement par email et ne sont pas stockées sur notre site. Nous prenons des mesures
              pour assurer la sécurité de cette transmission, mais aucune méthode de transmission sur
              Internet n&apos;est totalement sécurisée. Par conséquent, nous ne pouvons garantir une
              sécurité absolue.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#353F34]">5. Modifications de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout
              moment. Les modifications seront publiées sur cette page et prendront effet
              immédiatement. Nous vous encourageons à consulter régulièrement cette page pour vous
              tenir informé des éventuelles modifications.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-[#353F34]">6. Contact</h2>
            <p>
              Pour toute question ou demande d&apos;information concernant le site{' '}
              <Link href="https://keshariniyoga.com/" className="text-[#c08562] underline underline-offset-2">
                keshariniyoga.com
              </Link>
              , veuillez contacter <strong>Kesharini Yoga</strong> à l&apos;adresse email suivante
              : hello@yogiamelie.be.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

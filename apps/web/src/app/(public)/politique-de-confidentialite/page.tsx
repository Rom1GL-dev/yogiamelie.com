import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import Title from '@/components/ux/title';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Politique de confidentialité du site keshariniyoga.com. Informations sur la gestion de vos données personnelles.',
  robots: { index: false },
};

export default function PolitiquedeConfidentialitePage() {
  return (
    <div className={'p-10'}>
      <Title title={'Politique de Confidentialité'} />
      <div
        className={'flex flex-col items-center'}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className={'w-full md:w-3/4'}>
          <div className={'mb-10 flex flex-col'}>
            <h2 className={'mb-5 text-2xl font-semibold text-[#58684E]'}>
              1. Introduction
            </h2>
            <p className={'mb-7'}>
              La présente politique de confidentialité a pour but de vous
              informer sur la manière dont nous gérons les informations sur
              notre site{' '}
              <Link
                href={'https://keshariniyoga.com/'}
                className={'font-semibold'}
              >
                https://keshariniyoga.com/
              </Link>
              . En utilisant notre site, vous acceptez les pratiques décrites
              dans cette politique.
            </p>
          </div>
          <div className={'mb-10 flex flex-col'}>
            <h2 className={'mb-5 text-2xl font-semibold text-[#58684E]'}>
              2. Collecte des informations
            </h2>
            <p className={'mb-7'}>
              Nous ne collectons ni ne stockons aucune donnée personnelle vous
              concernant. Les informations que vous pouvez nous fournir via le
              formulaire de contact ne sont pas conservées sur nos serveurs.
            </p>
          </div>
          <div className={'mb-10 flex flex-col'}>
            <h2 className={'mb-5 text-2xl font-semibold text-[#58684E]'}>
              3. Utilisation des informations
            </h2>
            <p className={'mb-7'}>
              Les informations que vous nous fournissez via le formulaire de
              contact sont utilisées uniquement pour répondre à vos demandes et
              questions. Ces informations sont envoyées directement par email et
              ne sont pas stockées sur notre site. Elles sont supprimées
              immédiatement après traitement de votre demande.
            </p>
          </div>
          <div className={'mb-10 flex flex-col'}>
            <h2 className={'mb-5 text-2xl font-semibold text-[#58684E]'}>
              4. Sécurité des informations
            </h2>
            <p className={'mb-2'}>
              Les informations que vous nous fournissez via le formulaire de
              contact sont envoyées directement par email et ne sont pas
              stockées sur notre site. Nous prenons des mesures pour assurer la
              sécurité de cette transmission, mais aucune méthode de
              transmission sur Internet n&apos;est totalement sécurisée. Par
              conséquent, nous ne pouvons garantir une sécurité absolue.
            </p>
          </div>
          <div className={'mb-10 flex flex-col'}>
            <h2 className={'mb-5 text-2xl font-semibold text-[#58684E]'}>
              5. Modifications de la politique de confidentialité
            </h2>
            <p className={'mb-2'}>
              Nous nous réservons le droit de modifier cette politique de
              confidentialité à tout moment. Les modifications seront publiées
              sur cette page et prendront effet immédiatement. Nous vous
              encourageons à consulter régulièrement cette page pour vous tenir
              informé des éventuelles modifications.
            </p>
          </div>
          <div className={'mb-10 flex flex-col'}>
            <h2 className={'mb-5 text-2xl font-semibold text-[#58684E]'}>
              6. Contact
            </h2>
            <p className={'mb-2'}>
              Pour toute question ou demande d&apos;information concernant le
              site{' '}
              <Link
                href={'https://keshariniyoga.com/'}
                className={'font-semibold'}
              >
                https://keshariniyoga.com/
              </Link>
              , veuillez contacter <b>Kesharini Yoga</b> à l&apos;adresse email
              suivante : hello@yogiamelie.be.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

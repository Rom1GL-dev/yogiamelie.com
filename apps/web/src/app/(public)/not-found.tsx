import React from 'react';
import Link from 'next/link';
import { routes } from '@/config/routes.config';

export default function NotFound() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <p className="text-base font-semibold text-[#58684E]">Erreur 404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Page non existante
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Désolé, cette page n&apos;existe pas.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href={routes.public.home.getHref()}
          className="rounded-md bg-[#58684E] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#667467] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#667467]"
        >
          Revenir en arrière
        </Link>
        <Link
          href="/#contact"
          className="text-sm font-semibold text-gray-900"
        >
          Contacter <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

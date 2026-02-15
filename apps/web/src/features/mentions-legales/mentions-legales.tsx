'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSiteWebSection } from '@/hooks/use-site-web-section';

export function MentionsLegales() {
  const { data } = useSiteWebSection('mentionsLegales');
  const content = data?.content ?? '';

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Top bar */}
      <div className="border-b border-[#353F34]/10 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-[#353F34]/70 transition-colors hover:text-[#353F34]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Retour
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="grain bg-[#353F34] px-6 pt-10 pb-12 md:px-0 md:pt-14 md:pb-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[Mistrully] text-3xl text-[#d5ddcb] md:text-4xl lg:text-5xl">
            Mentions Légales
          </h1>
          <p className="mt-3 text-base font-light text-[#d5ddcb]/60 md:text-lg">
            Informations légales relatives au site keshariniyoga.com
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-0 md:py-16">
        {content ? (
          <article
            className="html-content max-w-none text-base leading-[1.8] break-words text-[#2d3640] md:text-[17px] [&_a]:text-[#c08562] [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#353F34] [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#353F34] [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-center text-[#353F34]/50">
            Aucune mention légale configurée.
          </p>
        )}
      </div>
    </div>
  );
}

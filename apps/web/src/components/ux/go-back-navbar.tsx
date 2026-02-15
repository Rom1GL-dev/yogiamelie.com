'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GoBackNavbar() {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between border-b border-[#d5ddcb]/20 bg-white/80 p-2 px-5 text-[#353F34] backdrop-blur-md lg:p-4 lg:px-11">
      <ul className="items-center justify-end space-x-8 lg:flex">
        <li className="group relative">
          <Link
            className="flex cursor-pointer items-center gap-x-2 text-sm font-bold"
            title="Revenir sur la page d'accueil"
            href="/"
          >
            <ArrowLeft size={20} /> Revenir sur la page d&apos;accueil
          </Link>
        </li>
      </ul>
    </nav>
  );
}

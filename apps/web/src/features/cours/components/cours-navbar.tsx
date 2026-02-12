'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const navItems = [
  { label: 'A propos', href: '#a-propos' },
  { label: 'Lieu de cours', href: '#info' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Matériel', href: '#materiel' },
  { label: 'FAQ', href: '#faq' },
];

export default function CoursNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-white p-2 px-5 text-[#353F34] lg:p-4 lg:px-11">
      <ul className="hidden items-center justify-end space-x-8 lg:flex">
        <li>
          <Link className="flex cursor-pointer items-center gap-x-2 text-sm font-bold" href="/">
            <ArrowLeft size={20} /> Revenir sur la page d&apos;accueil
          </Link>
        </li>
      </ul>
      <ul className="hidden items-center justify-end space-x-8 lg:flex">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => scrollToSection(item.href)}
              className="flex cursor-pointer items-center text-sm font-bold"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="lg:hidden">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl text-[#353F34]" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="fixed top-0 right-0 z-30 h-full w-3/4 space-y-6 bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link href="/" className="text-sm font-bold text-[#353F34]">Accueil</Link>
              </li>
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => { scrollToSection(item.href); setIsSidebarOpen(false); }}
                    className="text-sm font-bold text-[#353F34]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

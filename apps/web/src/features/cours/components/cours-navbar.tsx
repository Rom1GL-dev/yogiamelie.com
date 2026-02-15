'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'À propos', href: '#a-propos' },
  { label: 'Lieux', href: '#info' },
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
    <nav className="fixed top-0 z-30 w-full border-b border-[#353F34]/8 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link
          className="group flex items-center gap-2 text-sm text-[#353F34]/70 transition-colors hover:text-[#353F34]"
          href="/"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Accueil
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => scrollToSection(item.href)}
                className="cursor-pointer rounded-full px-4 py-1.5 text-sm text-[#353F34]/70 transition-colors hover:bg-[#353F34]/5 hover:text-[#353F34]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg p-1.5 text-[#353F34] transition-colors hover:bg-[#353F34]/5 lg:hidden"
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 h-full w-72 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="mb-8 rounded-lg p-1 text-[#353F34]/50 transition-colors hover:text-[#353F34]"
            >
              <X size={22} />
            </button>
            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  href="/"
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-[#353F34] transition-colors hover:bg-[#353F34]/5"
                >
                  Accueil
                </Link>
              </li>
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => { scrollToSection(item.href); setIsSidebarOpen(false); }}
                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-[#353F34] transition-colors hover:bg-[#353F34]/5"
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

'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <nav className="fixed top-0 z-30 w-full bg-white/80 shadow-[0_1px_20px_rgba(53,63,52,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          className="group flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[#353F34]/70 transition-colors hover:text-[#353F34]"
          href="/"
        >
          <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-0.5" />
          Accueil
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => scrollToSection(item.href)}
                className="link-hover relative cursor-pointer px-4 py-2 text-[13px] tracking-[0.08em] uppercase text-[#353F34]/70 transition-all duration-300 hover:text-[#353F34]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-full p-2 text-[#353F34] transition-all duration-300 hover:bg-[#353F34]/5 lg:hidden"
          aria-label="Menu"
        >
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div className="absolute inset-0 bg-[#353F34]/20 backdrop-blur-sm" />
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-white p-8 shadow-2xl transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-12">
            <Image
              src="/logo.png"
              alt="Logo Kesharini Yoga"
              width={100}
              height={32}
              className="h-6 w-auto"
            />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-full p-2 text-[#353F34]/40 transition-colors hover:bg-[#353F34]/5 hover:text-[#353F34]"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                className="block w-full rounded-xl px-4 py-3.5 text-left text-[13px] tracking-[0.08em] uppercase text-[#353F34]/70 transition-all duration-200 hover:bg-[#353F34]/5 hover:text-[#353F34] hover:pl-6"
              >
                Accueil
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => { scrollToSection(item.href); setIsSidebarOpen(false); }}
                  className="block w-full rounded-xl px-4 py-3.5 text-left text-[13px] tracking-[0.08em] uppercase text-[#353F34]/70 transition-all duration-200 hover:bg-[#353F34]/5 hover:text-[#353F34] hover:pl-6"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-8 left-8 right-8 border-t border-[#353F34]/8 pt-6">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#353F34]/30">Kesharini Yoga</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

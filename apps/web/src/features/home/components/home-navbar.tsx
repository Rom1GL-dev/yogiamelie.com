'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'À propos', href: '#universe' },
  { label: 'Cours', href: '/cours', isLink: true },
  { label: 'Agenda', href: '#join' },
  { label: 'Blog', href: '#blog' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Contact', href: '#contact' },
];

export default function HomeNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 z-30 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 shadow-[0_1px_20px_rgba(53,63,52,0.06)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="/logo.png"
            alt="Logo Kesharini Yoga"
            width={120}
            height={40}
            className={`w-auto transition-all duration-500 ${scrolled ? 'h-8' : 'h-10'}`}
          />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const className = `relative px-4 py-2 text-[13px] tracking-[0.08em] uppercase transition-all duration-300 ${
              scrolled
                ? 'text-[#353F34]/70 hover:text-[#353F34]'
                : 'text-white/80 hover:text-white'
            }`;

            return (
              <li key={item.label}>
                {item.isLink ? (
                  <Link href={item.href} className={`${className} link-hover`}>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`${className} link-hover cursor-pointer`}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`rounded-full p-2 transition-all duration-300 lg:hidden ${
            scrolled
              ? 'text-[#353F34] hover:bg-[#353F34]/5'
              : 'text-white hover:bg-white/10'
          }`}
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
            {navItems.map((item) => {
              const className =
                'block w-full rounded-xl px-4 py-3.5 text-left text-[13px] tracking-[0.08em] uppercase text-[#353F34]/70 transition-all duration-200 hover:bg-[#353F34]/5 hover:text-[#353F34] hover:pl-6';

              return (
                <li key={item.label}>
                  {item.isLink ? (
                    <Link href={item.href} className={className}>
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => { scrollToSection(item.href); setIsSidebarOpen(false); }}
                      className={className}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="absolute bottom-8 left-8 right-8 border-t border-[#353F34]/8 pt-6">
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#353F34]/30">Kesharini Yoga</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

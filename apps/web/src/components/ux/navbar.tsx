'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isHome) return null;

  return (
    <nav
      className={`fixed top-0 left-0 z-10 flex w-full justify-between whitespace-nowrap transition-colors duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <ul className="hidden w-1/3 lg:flex" />
      <ul
        className={`items-center justify-center py-2 duration-300 lg:flex ${
          !scrolled ? 'h-[40%] w-[40%] md:h-[22%] md:w-[22%]' : 'h-[12%] w-[12%] md:h-[12%] md:w-[12%]'
        }`}
      >
        <li>
          <Image
            src="/logo.png"
            title="Logo"
            alt="Logo Kesharini Yoga"
            width={200}
            height={200}
            className="h-full w-full"
          />
        </li>
      </ul>
      <ul
        className={`hidden w-1/3 justify-end space-x-8 p-5 lg:flex ${scrolled ? 'items-center' : ''}`}
      >
        <li>
          <button onClick={() => scrollToSection('universe')} className="cursor-pointer">
            À propos
          </button>
        </li>
        <li>
          <Link href="/cours" className="cursor-pointer">
            Cours
          </Link>
        </li>
        <li>
          <button onClick={() => scrollToSection('join')} className="cursor-pointer">
            Agenda
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('blog')} className="cursor-pointer">
            Blog
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('newsletter')} className="cursor-pointer">
            Newsletter
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('contact')} className="cursor-pointer">
            Contact
          </button>
        </li>
      </ul>

      <ul className="flex w-full items-center justify-end space-x-8 p-5 lg:hidden">
        <button onClick={toggleSidebar} className="text-xl text-[#353F34]" aria-label="Open menu">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </ul>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={toggleSidebar}>
          <div
            className="fixed top-0 right-0 z-30 h-full w-3/4 space-y-6 bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <button
                  onClick={() => { toggleSidebar(); scrollToSection('universe'); }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  À propos
                </button>
              </li>
              <li>
                <Link href="/cours" className="text-sm font-bold text-[#353F34]">
                  Cours
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { toggleSidebar(); scrollToSection('join'); }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  Agenda
                </button>
              </li>
              <li>
                <button
                  onClick={() => { toggleSidebar(); scrollToSection('blog'); }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => { toggleSidebar(); scrollToSection('newsletter'); }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  Newsletter
                </button>
              </li>
              <li>
                <button
                  onClick={() => { toggleSidebar(); scrollToSection('contact'); }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

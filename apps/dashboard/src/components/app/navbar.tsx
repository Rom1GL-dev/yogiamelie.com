import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { clsx } from 'clsx';
import AOS from 'aos';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      AOS.refresh();
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`top-0 left-0 z-10 flex w-full justify-between transition-colors duration-300 lg:fixed ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <ul className="hidden w-1/3 lg:flex" />
      <ul
        className={clsx(
          'items-center justify-center py-2 duration-300 lg:flex',
          {
            'h-[40%] w-[40%] md:h-[22%] md:w-[22%]': !scrolled,
            'h-[12%] w-[12%] md:h-[12%] md:w-[12%]': scrolled
          }
        )}
      >
        <li>
          <img
            src="/logo.png"
            title={'Logo'}
            alt={'Logo'}
            className="h-full w-full"
          />
        </li>
      </ul>
      <ul
        className={clsx('hidden w-1/3 justify-end space-x-8 p-5 lg:flex', {
          'items-center': scrolled
        })}
      >
        <li>
          <button
            onClick={() => scrollToSection('universe')}
            className="cursor-pointer"
          >
            À propos
          </button>
        </li>
        <li>
          <Link
            to={APP_ROUTES.app.cours.getHref()}
            title={'Cours'}
            className="cursor-pointer"
          >
            Cours
          </Link>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('join')}
            className="cursor-pointer"
          >
            Agenda
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('blog')}
            className="cursor-pointer"
          >
            Blog
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('contact')}
            className="cursor-pointer"
          >
            Contact
          </button>
        </li>
      </ul>
      <ul className="flex w-full items-center justify-end space-x-8 p-5 lg:flex lg:hidden lg:w-1/3">
        <button
          onClick={toggleSidebar}
          className="text-xl text-[#353F34]"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </ul>

      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black lg:hidden"
          onClick={toggleSidebar}
        >
          <div
            className="w-2.5/4 fixed top-0 right-0 z-30 h-full space-y-6 bg-white p-6"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-offset="200"
            data-aos-easing="ease-in-out"
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <button
                  onClick={() => {
                    toggleSidebar();
                    scrollToSection('universe');
                  }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  À propos
                </button>
              </li>
              <li>
                <Link
                  to={APP_ROUTES.app.cours.getHref()}
                  title={'Cours'}
                  className="text-sm font-bold text-[#353F34]"
                >
                  Cours
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleSidebar();
                    scrollToSection('join');
                  }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  Agenda
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    toggleSidebar();
                    scrollToSection('blog');
                  }}
                  className="text-sm font-bold text-[#353F34]"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    toggleSidebar();
                    scrollToSection('contact');
                  }}
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

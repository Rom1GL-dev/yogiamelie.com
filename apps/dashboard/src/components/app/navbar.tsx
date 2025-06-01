import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { clsx } from 'clsx';

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-10 flex w-full justify-between transition-colors duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <ul className="hidden lg:flex lg:w-1/3" />
      <ul
        className={clsx(
          'hidden items-center justify-center py-2 duration-300 lg:flex',
          {
            'h-[22%] w-[22%]': !scrolled,
            'h-[12%] w-[12%]': scrolled
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
        className={clsx('flex w-full justify-end space-x-8 p-5 lg:w-1/3', {
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
    </nav>
  );
}

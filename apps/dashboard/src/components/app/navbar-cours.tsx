import { useState } from 'react';
import AOS from 'aos';
import { navigationCours } from '@/config/navigation.config.ts';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { APP_ROUTES } from '@/config/routes.config.ts';

export const NavbarCours = () => {
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

  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-white p-2 px-5 text-[#353F34] lg:p-4 lg:px-11">
      <ul className="hidden items-center justify-end space-x-8 lg:flex">
        <li className="group relative">
          <Link
            className="flex cursor-pointer items-center gap-x-2 text-sm font-bold"
            to={APP_ROUTES.app.getHref()}
          >
            <ArrowLeft size={20} /> Revenir sur la page d'accueil
          </Link>
        </li>
      </ul>
      <ul className="hidden items-center justify-end space-x-8 lg:flex">
        {navigationCours.map((item, index) => {
          if (index === 6) return null;
          return (
            <li key={item.label} className="group relative">
              <button
                onClick={() => scrollToSection(item.href.substring(1))}
                className="flex cursor-pointer items-center text-sm font-bold"
                title={item.label}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Mobile navbar */}
      <div className="lg:hidden">
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
      </div>

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
              {navigationCours.map((item, index) => {
                if (index === 0) {
                  return (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="text-sm font-bold text-[#353F34]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        scrollToSection(item.href.substring(1));
                        toggleSidebar();
                      }}
                      className="text-sm font-bold text-[#353F34]"
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

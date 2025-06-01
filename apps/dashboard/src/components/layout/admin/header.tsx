import { useEffect, useState } from 'react';
import CommandPalette from '@/components/layout/admin/command-palette.tsx';
import { Modal } from '@mui/material';
import { FaBars, FaSearch } from 'react-icons/fa';
import SidebarMobile from '@/components/layout/admin/sidebar-mobile.tsx';
import Breadcrumbs from '@/components/layout/admin/breadcrumb.tsx';
import { useStores } from '@/providers/stores-provider.tsx';

interface HeaderProps {
  breadcrumbs: {
    name: string;
    href: string;
    current: boolean;
  }[];
}

export const Header = ({ breadcrumbs }: HeaderProps) => {
  const { authStore } = useStores();

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if (
        (isMac && e.metaKey && e.key === 'k') ||
        (!isMac && e.ctrlKey && e.key === 'k')
      ) {
        e.preventDefault(); // empêche le comportement par défaut (par ex. recherche navigateur)
        setIsPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="relative flex w-full items-center justify-between bg-slate-600 p-3">
        <FaBars
          className="cursor-pointer text-2xl text-white md:hidden"
          onClick={handleSidebarToggle}
        />

        <div className="flex w-full items-center justify-between">
          <Breadcrumbs breadcrumbs={breadcrumbs ?? []} />
          <div className={'flex w-full items-center justify-end space-x-3'}>
            <div className="relative hidden w-2/4 lg:block lg:w-1/4">
              <input
                type="text"
                readOnly
                placeholder="Rechercher ici..."
                className="w-full cursor-pointer rounded-md bg-white p-1.5 pr-4 text-gray-700 focus:outline-none"
                onClick={() => setIsPaletteOpen(true)}
              />
              <span
                className="no-select absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer rounded-md border border-gray-300 p-0.5 px-1 text-xs text-gray-500"
                onClick={() => setIsPaletteOpen(true)}
              >
                ⌘ + K
              </span>
            </div>
            <div className="relative block lg:hidden">
              <FaSearch
                className="cursor-pointer text-white"
                size={20}
                onClick={() => setIsPaletteOpen(true)}
              />
            </div>
            <div
              className="relative cursor-pointer rounded-full bg-white p-2 text-slate-600"
              onClick={handleDropdownToggle}
            >
              {authStore.account?.name.split(' ')[0]?.charAt(0).toUpperCase() ??
                ''}
              {authStore.account?.name.split(' ')[1]?.charAt(0).toUpperCase() ??
                ''}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 rounded-md border border-gray-200 bg-white shadow-lg">
                  <div className="p-3">
                    <p className="text-gray-800">{authStore.account?.name}</p>
                    <p className="text-gray-600">{authStore.account?.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <Modal open={isPaletteOpen} onClose={() => setIsPaletteOpen(false)}>
        <CommandPalette />
      </Modal>
      {isSidebarOpen && (
        <SidebarMobile handleSidebarToggle={handleSidebarToggle} />
      )}
    </>
  );
};

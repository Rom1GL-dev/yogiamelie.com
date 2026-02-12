'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Props {
  children: React.ReactNode;
}

export default function AosProvider({ children }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  return children;
}

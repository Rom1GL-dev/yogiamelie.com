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
      duration: 700,
      easing: 'ease-out-cubic',
      offset: 80,
      once: true
    });
  }, []);

  return children;
}

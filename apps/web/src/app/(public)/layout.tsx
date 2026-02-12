import React from 'react';
import Navbar from '@/components/ux/navbar';

export default function VitrineLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

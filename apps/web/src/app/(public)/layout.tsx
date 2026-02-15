import React from 'react';

export default function VitrineLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="scroll-smooth">
      <main>{children}</main>
    </div>
  );
}

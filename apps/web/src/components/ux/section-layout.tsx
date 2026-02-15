'use client';

interface SectionLayoutProps {
  title?: string;
  background: string;
  children: React.ReactNode;
}

export default function SectionLayout({ title, background, children }: SectionLayoutProps) {
  return (
    <div className="grain overflow-hidden px-6 py-16 md:px-14 lg:px-32 lg:py-24" style={{ backgroundColor: background }}>
      {title && (
        <h2
          className="mb-12 font-[Mistrully] text-4xl tracking-wide xl:text-5xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

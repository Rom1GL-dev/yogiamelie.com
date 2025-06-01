export default function LayoutApp({
  title,
  background,
  children
}: {
  title: string;
  background: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-[${background}] p-10 px-14 lg:p-20 lg:px-32`}>
      <h2
        className={'mb-10 font-[Mistrully] text-4xl xl:text-5xl'}
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

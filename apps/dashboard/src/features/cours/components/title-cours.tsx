export default function TitleCours({ title }: { title: string }) {
  return (
    <h2
      className="text-shadow mb-10 font-[Mistrully] text-3xl text-white md:mb-18 md:text-4xl lg:text-5xl"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      {title}
    </h2>
  );
}

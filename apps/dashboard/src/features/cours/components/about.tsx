import TitleCours from '@/features/cours/components/title-cours.tsx';

export const About = () => {
  return (
    <div
      id={'welcome'}
      className="relative flex flex-col bg-[url('/images/welcomeToMyUniverse.jpg')] bg-cover bg-center px-5 py-10 md:px-24 md:py-10 lg:px-32 lg:py-20"
    >
      <div data-aos="fade-up" data-aos-delay="300">
        <TitleCours title={'Bienvenue dans mon univers'} />
      </div>

      <div className="flex w-full justify-center">
        <div
          className="bg-opacity-80 w-full rounded-xl bg-[#CAA168] p-8 shadow-lg md:max-w-5xl md:p-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p className="text-shadow text-justify text-lg leading-relaxed font-extralight text-white md:text-2xl">
            Rejoins-moi pour une séance de yoga alliant douceur, challenge et
            bienveillance. Mes cours sont pensés pour t’accompagner dans une
            exploration complète de ton être, grâce à une pratique équilibrée
            mêlant pranayama (exercices de respiration), asanas (postures
            physiques) et méditation.
            <br />
            Chaque mois, une thématique spirituelle guide nos séances,
            t’invitant à approfondir ta connexion intérieure tout en cultivant
            force, souplesse et sérénité.
            <br />
            Après le cours, je te propose un moment convivial autour d’une
            tisane, pour échanger, partager tes ressentis et renforcer les liens
            avec notre petite communauté. Une belle opportunité de prolonger la
            sérénité et la connexion, ensemble.
          </p>
        </div>
      </div>
    </div>
  );
};

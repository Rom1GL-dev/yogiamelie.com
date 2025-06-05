import Footer from '@/components/layout/app/footer.tsx';
import { Faq } from '@/features/cours/components/Faq.tsx';
import { Materiel } from '@/features/cours/components/Materiel.tsx';
import { NavbarCours } from '@/components/app/navbar-cours.tsx';
import { Tarifs } from '@/features/cours/components/Tarifs.tsx';
import { HomeCours } from '@/features/cours/components/HomeCours.tsx';
import { Info } from '@/features/cours/components/Info.tsx';
import { About } from '@/features/cours/components/about.tsx';

export const CoursRoute = () => {
  return (
    <>
      <NavbarCours />
      <div id="home">
        <HomeCours />
      </div>
      <div className={'a-propos'}>
        <About />
      </div>
      <div id="welcome">
        <Info />
      </div>
      <div id="tarifs">
        <Tarifs />
      </div>
      <div id="materiel">
        <Materiel />
      </div>
      <div id="faq">
        <Faq />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
};

'use client';
import CoursPresentation from '@/features/cours/components/cours-presentation';
import CoursAbout from '@/features/cours/components/cours-about';
import CoursLocations from '@/features/cours/components/cours-locations';
import CoursTarifs from '@/features/cours/components/cours-tarifs';
import CoursMateriel from '@/features/cours/components/cours-materiel';
import CoursFaq from '@/features/cours/components/cours-faq';
import CoursNavbar from '@/features/cours/components/cours-navbar';
import { Footer } from '@/components/ux/footer';

export const Cours = () => {
  return (
    <>
      <CoursNavbar />
      <div id="home">
        <CoursPresentation />
      </div>
      <div id="a-propos">
        <CoursAbout />
      </div>
      <div id="info">
        <CoursLocations />
      </div>
      <div id="tarifs">
        <CoursTarifs />
      </div>
      <div id="materiel">
        <CoursMateriel />
      </div>
      <div id="faq">
        <CoursFaq />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </>
  );
};

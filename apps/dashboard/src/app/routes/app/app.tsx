import { WelcomeToMyUniverse } from '@/components/app/welcome-to-my-universe.tsx';
import { JoinMe } from '@/components/app/join-me.tsx';
import Footer from '@/components/layout/app/footer.tsx';
import { Blog } from '@/components/app/blog.tsx';
import Navbar from '@/components/app/navbar.tsx';
import HomePresentation from '@/components/app/HomePresentation.tsx';
import Newsletter from '@/components/app/newsletter.tsx';

export const AppRoute = () => {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <div id="home">
        <HomePresentation />
      </div>
      <div id="universe">
        <WelcomeToMyUniverse />
      </div>
      <div id="join">
        <JoinMe />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="newsletter">
        <Newsletter />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

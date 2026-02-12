'use client';
import HomePresentation from '@/features/home/components/home-presentation';
import HomeWelcome from '@/features/home/components/home-welcome';
import HomeEvents from '@/features/home/components/home-events';
import HomeBlog from '@/features/home/components/home-blog';
import HomeNewsletter from '@/features/home/components/home-newsletter';
import { Footer } from '@/components/ux/footer';

export const Home = () => {
  return (
    <div className="scroll-smooth">
      <div id="home">
        <HomePresentation />
      </div>
      <div id="universe">
        <HomeWelcome />
      </div>
      <div id="join">
        <HomeEvents />
      </div>
      <div id="blog">
        <HomeBlog />
      </div>
      <div id="newsletter">
        <HomeNewsletter />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

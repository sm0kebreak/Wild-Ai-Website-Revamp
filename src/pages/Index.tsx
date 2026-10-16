import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import HeroHandoff from '@/components/motion/HeroHandoff';
import CityEventPicker from '@/components/CityEventPicker';
import ActionStrip from '@/components/ActionStrip';
import LogoCarousel from '@/components/LogoCarousel';
import PastEventsStrip from '@/components/PastEventsStrip';
import EventPhotoGallery from '@/components/EventPhotoGallery';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Intro />
      <Navbar />
      <main>
        <Hero />
        <HeroHandoff>
          <div className="bg-background">
            <section className="container mx-auto px-4 pb-2 pt-10 md:pt-14" aria-label="Next event">
              <CityEventPicker />
            </section>
            <ActionStrip />
            <LogoCarousel />
            <PastEventsStrip limit={4} stacks />
            <EventPhotoGallery />
          </div>
        </HeroHandoff>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

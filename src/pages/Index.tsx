import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ActionStrip from '@/components/ActionStrip';
import LogoCarousel from '@/components/LogoCarousel';
import PastEventsStrip from '@/components/PastEventsStrip';
import EventPhotoGallery from '@/components/EventPhotoGallery';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ActionStrip />
        <LogoCarousel />
        <PastEventsStrip limit={4} stacks />
        <EventPhotoGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

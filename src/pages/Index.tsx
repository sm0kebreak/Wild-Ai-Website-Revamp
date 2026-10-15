import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoCarousel from '@/components/LogoCarousel';
import PastEventsStrip from '@/components/PastEventsStrip';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <LogoCarousel />
        <PastEventsStrip limit={8} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

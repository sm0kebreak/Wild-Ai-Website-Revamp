import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PastEventsStrip from '@/components/PastEventsStrip';

const PreviousEvents = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <PastEventsStrip detailed />
      </main>
      <Footer />
    </div>
  );
};

export default PreviousEvents;

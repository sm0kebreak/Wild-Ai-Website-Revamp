import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PastEventsStrip from '@/components/PastEventsStrip';
import Seo from '@/components/Seo';

const PreviousEvents = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo title="Past events | Wild AI" description="Past Wild AI meetups." path="/past-events" />
      <Navbar />
      <main className="flex-grow">
        <PastEventsStrip detailed page />
      </main>
      <Footer />
    </div>
  );
};

export default PreviousEvents;

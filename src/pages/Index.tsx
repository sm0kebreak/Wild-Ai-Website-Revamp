import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import TeslaPanel from '@/components/TeslaPanel';
import CityEventPicker from '@/components/CityEventPicker';
import LogoCarousel from '@/components/LogoCarousel';
import PastEventsStrip from '@/components/PastEventsStrip';
import EventPhotoGallery from '@/components/EventPhotoGallery';
import EmailCapture from '@/components/EmailCapture';
import Footer from '@/components/Footer';
import { photoSrc } from '@/data/sitePhotos';
const Index = () => {
  return (
    <div className="tesla-home flex min-h-screen flex-col">
      <Intro />
      <Navbar />
      <main className="min-w-0">
        <Hero />

        <section className="logo-band" aria-label="Companies">
          <LogoCarousel />
        </section>

        <TeslaPanel
          sentence
          focus="center 42%"
          image={photoSrc('2026-08-minneapolis-06')}
          title="The underground AI scene in Minneapolis."
          subline="Raw builds. Fringe ideas. No slides."
        />

        <TeslaPanel flow image={photoSrc('2026-08-minneapolis-03')} imageAlt="">
          <CityEventPicker />
        </TeslaPanel>

        <TeslaPanel
          id="demo-your-build"
          focus="62% 46%"
          image={photoSrc('2026-08-minneapolis-02')}
          title="Show us something wild."
          subline="Any stage. The rawer, the better."
          primary={{ label: 'Demo it', href: '/speak' }}
          secondary={{ label: 'How it works', href: '/speak' }}
        />

        <TeslaPanel
          id="sponsor-a-night"
          focus="center 48%"
          image={photoSrc('2026-09-minneapolis-04')}
          title="Sponsor a night"
          subline="$500 per event."
          primary={{ label: 'Sponsor', href: '/sponsor' }}
          secondary={{ label: 'Learn more', href: '/sponsor' }}
        />

        <TeslaPanel flow wide>
          <EventPhotoGallery cinema />
        </TeslaPanel>

        <TeslaPanel flow image={photoSrc('2026-08-minneapolis-04')}>
          <PastEventsStrip limit={4} stacks cinema />
        </TeslaPanel>

        <TeslaPanel
          image={photoSrc('2026-08-minneapolis-07')}
          title="Bring it to your city."
          subline="Start a chapter."
          primary={{ label: 'Start a chapter', href: '/start-a-chapter' }}
          secondary={{ label: 'See chapters', href: '/chapters' }}
        />

        <TeslaPanel
          id="email-signup"
          flow
          focus="center 40%"
          image={photoSrc('2026-09-minneapolis-03')}
          title="Get the next invite"
          subline="One email per event. Invites and recaps."
        >
          <div className="mx-auto mt-8 max-w-md text-left">
            <EmailCapture source="home" bare title="Get the next invite" description="" />
          </div>
        </TeslaPanel>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

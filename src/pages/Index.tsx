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
import { team } from '@/data/team';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="tesla-home flex min-h-screen flex-col">
      <Intro />
      <Navbar />
      <main className="min-w-0">
        <Hero />

        <TeslaPanel
          flow
          image="/event-photos/2026-09-minneapolis-02-1280.webp"
          imageAlt=""
        >
          <CityEventPicker />
        </TeslaPanel>

        <TeslaPanel
          id="demo-your-build"
          image="/event-photos/2026-08-minneapolis-05-1280.webp"
          title="Demo your build"
          subline="15 minutes. No slides."
          primary={{ label: 'Sign up to demo', href: '/speak' }}
          secondary={{ label: 'How it works', href: '/speak' }}
        />

        <TeslaPanel
          id="sponsor-a-night"
          image="/event-photos/2026-08-minneapolis-08-1280.webp"
          title="Sponsor a night"
          subline="$500 per event."
          primary={{ label: 'Sponsor', href: '/sponsor' }}
          secondary={{ label: 'Learn more', href: '/sponsor' }}
        />

        <TeslaPanel flow wide image="/event-photos/2026-09-minneapolis-04-1280.webp">
          <EventPhotoGallery cinema />
        </TeslaPanel>

        <TeslaPanel flow image="/event-photos/2026-08-minneapolis-06-1280.webp" title="Team" subline="Organizers.">
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-5">
            {team.map((person) => {
              const body = (
                <>
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt=""
                      className="mx-auto h-24 w-24 rounded-full object-cover md:h-28 md:w-28"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <p className="mt-3 font-display text-sm font-semibold leading-tight md:text-base">{person.name}</p>
                  <p className="mt-1 text-xs text-white/70">Organizer</p>
                </>
              );
              return (
                <li key={person.name}>
                  {person.linkedin ? (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${person.name} on LinkedIn`}
                      className="block"
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
          <div className="tesla-actions">
            <Link className="tesla-pill tesla-pill-primary" to="/about">
              About
            </Link>
            <Link className="tesla-pill tesla-pill-secondary" to="/join">
              Join
            </Link>
          </div>
        </TeslaPanel>

        <TeslaPanel flow image="/event-photos/2026-08-minneapolis-04-1280.webp">
          <PastEventsStrip limit={4} stacks cinema />
        </TeslaPanel>

        <TeslaPanel flow wide image="/event-photos/2026-08-minneapolis-02-1280.webp">
          <div className="tesla-companies">
            <LogoCarousel />
          </div>
        </TeslaPanel>

        <TeslaPanel
          image="/event-photos/2026-08-sf-01-1280.webp"
          title="Start a chapter"
          subline="Bring Wild AI to your city."
          primary={{ label: 'Start a chapter', href: '/start-a-chapter' }}
          secondary={{ label: 'See chapters', href: '/chapters' }}
        />

        <TeslaPanel
          id="email-signup"
          flow
          image="/event-photos/2026-09-minneapolis-03-1280.webp"
          title="Stay in the loop"
          subline="Event invites and recaps, one email per event."
        >
          <div className="mx-auto mt-8 max-w-md text-left">
            <EmailCapture source="home" bare title="Stay in the loop" description="" />
          </div>
        </TeslaPanel>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

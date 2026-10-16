import React from 'react';
import Marquee from '@/components/motion/Marquee';
import Reveal from '@/components/motion/Reveal';
import { logos, type CompanyLogo } from '@/data/companyLogos';
import { speakerCompanyCount } from '@/data/speakerArchive';

const LogoMark = ({ company }: { company: CompanyLogo }) => {
  const darkTile = company.tile === 'dark';
  const mark = company.logo ? (
    <img
      src={company.logo}
      alt={company.name}
      loading="lazy"
      draggable={false}
      className="max-h-12 w-auto max-w-full object-contain md:max-h-14"
    />
  ) : (
    <span
      className={`max-w-[9.5rem] text-center font-display text-sm font-semibold leading-tight md:text-base ${
        darkTile ? 'text-[#f4f1ea]' : 'text-neutral-800'
      }`}
    >
      {company.name}
    </span>
  );

  const className =
    'logo-mark group flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-xl px-4 md:h-24 md:w-52 md:px-5 ' +
    (darkTile ? 'bg-[#1c2422]' : 'bg-[#f4f1ea]');

  if (!company.url) {
    return (
      <span title={company.name} className={className}>
        {mark}
      </span>
    );
  }

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      title={company.name}
      className={className}
    >
      {mark}
    </a>
  );
};

/** Two counter-scrolling rows of companies represented at Wild AI events. */
const LogoCarousel = () => {
  const half = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, half), logos.slice(half)];

  return (
    <section id="companies" className="py-4 md:py-6">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="glass overflow-hidden">
            <div className="flex items-baseline justify-between gap-4 border-b border-border/60 px-5 py-4 md:px-8">
              <p className="font-display text-base font-semibold leading-snug md:text-lg">
                {speakerCompanyCount} companies have taken the stage at Wild AI
              </p>
            </div>

            <div className="py-3 md:py-4">
              <Marquee speed={70}>
                {rows[0].map((company) => (
                  <LogoMark key={company.name} company={company} />
                ))}
              </Marquee>
              <div className="mx-5 h-px bg-border/40 md:mx-8" />
              <div className="[&_.animate-marquee]:[animation-direction:reverse]">
                <Marquee speed={82}>
                  {rows[1].map((company) => (
                    <LogoMark key={company.name} company={company} />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LogoCarousel;

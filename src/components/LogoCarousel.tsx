import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import LogoRail from '@/components/motion/LogoRail';
import Reveal from '@/components/motion/Reveal';
import { logoFit, logos, type CompanyLogo } from '@/data/companyLogos';
import { speakerCompanyCount } from '@/data/speakerArchive';

const logosByName = [...logos].sort((a, b) => a.name.localeCompare(b.name));
const rowSplit = Math.ceil(logos.length / 2);
const logoRows = [logos.slice(0, rowSplit), logos.slice(rowSplit)] as const;

const LogoMark = ({ company, grid = false }: { company: CompanyLogo; grid?: boolean }) => {
  const fit = logoFit[company.name] ?? 'lockup';
  const className =
    'logo-mark group flex h-20 items-center justify-center md:h-24 ' +
    (grid
      ? 'w-full min-w-0 px-2' + (fit === 'word' || fit === 'wide' ? ' col-span-2' : '')
      : 'w-max shrink-0 px-4 md:px-6');

  const mark = company.logo ? (
    <img
      src={company.logo}
      alt={company.name}
      loading={grid ? 'lazy' : 'eager'}
      decoding="async"
      draggable={false}
      className={company.tone === 'plain' ? 'brightness-0 invert' : undefined}
      style={
        company.tone === 'plain'
          ? undefined
          : { filter: 'url(#logo-mono' + (company.tone ? '-' + company.tone : '') + ')' }
      }
    />
  ) : (
    <span className="max-w-[9.5rem] text-center font-display text-sm font-semibold leading-tight text-foreground/80 md:text-base">
      {company.name}
    </span>
  );

  if (!company.url) {
    return (
      <span title={company.name} data-fit={fit} className={className}>
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
      data-fit={fit}
      className={className}
    >
      {mark}
    </a>
  );
};

const LogoFilters = () => {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="logo-mono" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  -0.34 -1.144 -0.1155 0 1.36"
          result="knock"
        />
        <feComposite in="knock" in2="SourceAlpha" operator="in" />
      </filter>
      <filter id="logo-mono-dark-bg" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  0.5315 1.788 0.1805 0 -0.7"
          result="knock"
        />
        <feComposite in="knock" in2="SourceAlpha" operator="in" />
      </filter>
      <filter id="logo-mono-light-ink" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  0.2126 0.7152 0.0722 0 0"
          result="knock"
        />
        <feComposite in="knock" in2="SourceAlpha" operator="in" />
      </filter>
      <filter id="logo-mono-deep-bg" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.93  0 0 0 0 0.96  0 0 0 0 0.95  1.7 5.72 0.58 0 -0.35"
        />
      </filter>
    </svg>,
    document.body,
  );
};

/** Two counter-scrolling rows of companies represented at Wild AI events. */
const LogoCarousel = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="companies" className="min-w-0 py-4 md:py-6">
      <LogoFilters />
      <div className="container mx-auto min-w-0 px-4">
        <Reveal>
          <div className="logo-card glass min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border/60 px-5 py-3 md:px-8">
              <p className="font-display text-base font-semibold leading-snug md:text-lg">
                {speakerCompanyCount} companies have taken the stage at Wild AI
              </p>
              <button
                type="button"
                className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-accent/50 bg-accent/15 px-4 text-sm font-semibold text-accent"
                aria-expanded={showAll}
                aria-controls="company-logos"
                onClick={() => setShowAll((open) => !open)}
              >
                {showAll ? 'Show the carousel' : 'See all companies'}
              </button>
            </div>

            <div id="company-logos" className="relative min-w-0 py-3 md:py-4">
              {showAll ? (
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 px-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {logosByName.map((company) => (
                    <LogoMark key={company.name} company={company} grid />
                  ))}
                </div>
              ) : (
                <>
                  <LogoRail
                    duration={70}
                    label="Company logos, first row. Scroll horizontally to browse."
                  >
                    {logoRows[0].map((company) => (
                      <LogoMark key={company.name} company={company} />
                    ))}
                  </LogoRail>
                  <div className="mx-5 h-px bg-border/40 md:mx-8" />
                  <LogoRail
                    duration={82}
                    reverse
                    label="Company logos, second row. Scroll horizontally to browse."
                  >
                    {logoRows[1].map((company) => (
                      <LogoMark key={company.name} company={company} />
                    ))}
                  </LogoRail>
                  <div className="logo-fade logo-fade-left" aria-hidden="true" />
                  <div className="logo-fade logo-fade-right" aria-hidden="true" />
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LogoCarousel;

import React from 'react';
import { createPortal } from 'react-dom';
import Marquee from '@/components/motion/Marquee';
import Reveal from '@/components/motion/Reveal';
import { logos, type CompanyLogo } from '@/data/companyLogos';
import { speakerCompanyCount } from '@/data/speakerArchive';

const LogoMark = ({ company }: { company: CompanyLogo }) => {
  const mark = company.logo ? (
    <img
      src={company.logo}
      alt={company.name}
      loading="lazy"
      draggable={false}
      className={
        'max-h-12 w-auto max-w-full object-contain md:max-h-14' +
        (company.tone === 'plain' ? ' brightness-0 invert' : '')
      }
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

  const className =
    'logo-mark group flex h-20 w-40 flex-shrink-0 items-center justify-center px-4 md:h-24 md:w-52 md:px-5';

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
      {/* Kept on document.body so the scroll handoff transform does not drop the filters. */}
      {typeof document !== 'undefined' &&
        createPortal(
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
        )}
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

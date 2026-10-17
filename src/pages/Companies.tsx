import React from 'react';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { LogoFilters } from '@/components/LogoCarousel';
import { logoFit, logos, type CompanyLogo } from '@/data/companyLogos';
import { speakerCompanyCount } from '@/data/speakerArchive';

const companies = [...logos].sort((a, b) => a.name.localeCompare(b.name, 'en'));

const CompanyTile = ({ company }: { company: CompanyLogo }) => {
  const fit = logoFit[company.name] ?? 'lockup';
  const mark = company.logo ? (
    <img
      src={company.logo}
      alt=""
      loading="eager"
      decoding="async"
      className={company.tone === 'plain' ? 'brightness-0 invert' : undefined}
      style={
        company.tone === 'plain'
          ? undefined
          : { filter: 'url(#logo-mono' + (company.tone ? '-' + company.tone : '') + ')' }
      }
    />
  ) : (
    <span className="company-word">{company.name}</span>
  );

  if (!company.url) {
    return (
      <span className="company-tile" data-fit={fit} data-company={company.name} title={company.name}>
        {mark}
      </span>
    );
  }

  return (
    <a
      className="company-tile"
      data-fit={fit}
      data-company={company.name}
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={company.name}
      title={company.name}
    >
      {mark}
    </a>
  );
};

const Companies = () => (
  <div className="company-page flex min-h-screen flex-col">
    <Seo
      title="Companies | Wild AI"
      description="Companies whose people have taken the stage at Wild AI."
      path="/companies"
    />
    <Navbar />
    <main className="flex-grow">
      <PageHero
        className="company-hero"
        title={`${speakerCompanyCount} companies have taken the stage at Wild AI`}
      />
      <LogoFilters />
      <ul className="company-grid">
        {companies.map((company) => (
          <li key={company.name}>
            <CompanyTile company={company} />
          </li>
        ))}
      </ul>
    </main>
    <Footer />
  </div>
);

export default Companies;

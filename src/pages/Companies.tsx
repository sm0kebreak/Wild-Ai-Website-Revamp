import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { LogoFilters } from '@/components/LogoCarousel';
import { logos, type CompanyLogo } from '@/data/companyLogos';
import { demosForCompany, type CompanyDemo } from '@/data/companyDemos';
import { speakerCompanyCount } from '@/data/speakerArchive';

const companies = [...logos].sort((a, b) => a.name.localeCompare(b.name, 'en'));

const joinNames = (names: string[]) => {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
};

const groupDemos = (demos: CompanyDemo[]) => {
  const groups: { date: string; eventTitle: string; displayDate: string; path: string; speakers: string[] }[] = [];
  for (const demo of demos) {
    const current = groups.find((group) => group.date === demo.date);
    if (current) {
      if (!current.speakers.includes(demo.speakerName)) current.speakers.push(demo.speakerName);
      continue;
    }
    groups.push({
      date: demo.date,
      eventTitle: demo.eventTitle,
      displayDate: demo.displayDate,
      path: demo.path,
      speakers: [demo.speakerName],
    });
  }
  return groups;
};

const CompanyMark = ({ company }: { company: CompanyLogo }) => {
  const image = company.logo ? (
    <img
      src={company.logo}
      alt=""
      loading="lazy"
      decoding="async"
      className={company.tone === 'plain' ? 'brightness-0 invert' : undefined}
      style={
        company.tone === 'plain'
          ? undefined
          : { filter: 'url(#logo-mono' + (company.tone ? '-' + company.tone : '') + ')' }
      }
    />
  ) : (
    <span>{company.name}</span>
  );

  if (!company.url) return <span className="company-slot">{image}</span>;

  return (
    <a className="company-slot" href={company.url} target="_blank" rel="noopener noreferrer" aria-label={company.name}>
      {image}
    </a>
  );
};

const Companies = () => (
  <div className="company-page flex min-h-screen flex-col">
    <Seo
      title="Companies | Wild AI"
      description="Companies whose people have taken the stage at Wild AI, with a short note on what each one does."
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
        {companies.map((company) => {
          const groups = groupDemos(demosForCompany(company.name));
          return (
            <li key={company.name} className="company-card" data-company={company.name}>
              <CompanyMark company={company} />
              <div className="company-copy">
                {company.url ? (
                  <a className="company-name" href={company.url} target="_blank" rel="noopener noreferrer">
                    {company.name}
                  </a>
                ) : (
                  <p className="company-name">{company.name}</p>
                )}
                {company.bio ? <p className="company-bio">{company.bio}</p> : null}
                {groups.length > 0 ? (
                  <p className="company-demo">
                    Demoed by{' '}
                    {groups.map((group, index) => (
                      <span key={group.date}>
                        {index > 0 ? '; ' : null}
                        {joinNames(group.speakers)} at <Link to={group.path}>{group.eventTitle}</Link>, {group.displayDate}
                      </span>
                    ))}
                    .
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
    <Footer />
  </div>
);

export default Companies;

import React from 'react';
import { Link } from 'react-router-dom';

type Pill = {
  label: string;
  href: string;
  external?: boolean;
};

const PillLink = ({ action, kind }: { action: Pill; kind: 'primary' | 'secondary' }) => {
  const className = `tesla-pill tesla-pill-${kind}`;
  if (action.external || /^https?:\/\//.test(action.href)) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noopener noreferrer">
        {action.label}
      </a>
    );
  }
  return (
    <Link className={className} to={action.href}>
      {action.label}
    </Link>
  );
};

/** One full-viewport photograph with a short centered message. */
const TeslaPanel = ({
  image,
  imageAlt = '',
  title,
  subline,
  primary,
  secondary,
  id,
  flow = false,
  wide = false,
  children,
  titleAs: TitleTag = 'h2',
}: {
  image: string;
  imageAlt?: string;
  title?: React.ReactNode;
  subline?: string;
  primary?: Pill;
  secondary?: Pill;
  id?: string;
  /** Grows past the viewport when the panel has a list, gallery, or form. */
  flow?: boolean;
  wide?: boolean;
  children?: React.ReactNode;
  titleAs?: 'h1' | 'h2';
}) => (
  <section id={id} className={`tesla-panel${flow ? ' tesla-panel-flow' : ''}`}>
    <img className="tesla-photo" src={image} alt={imageAlt} decoding="async" loading="lazy" />
    <div className="tesla-scrim" aria-hidden="true" />
    <div className={`tesla-copy${wide ? ' tesla-copy-wide' : ''}`}>
      {title && <TitleTag className="tesla-title">{title}</TitleTag>}
      {subline && <p className="tesla-sub">{subline}</p>}
      {(primary || secondary) && (
        <div className="tesla-actions">
          {primary && <PillLink action={primary} kind="primary" />}
          {secondary && <PillLink action={secondary} kind="secondary" />}
        </div>
      )}
      {children}
    </div>
  </section>
);

export default TeslaPanel;

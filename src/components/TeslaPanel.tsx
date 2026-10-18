import React from 'react';
import { Link } from 'react-router-dom';

type Pill = {
  label: string;
  href: string;
  external?: boolean;
};

/** 480/960/1280 derivatives share the same stem as the 1280 frame. */
const responsiveSrc = (src: string) => {
  const match = src.match(/^(.*)-\d+\.webp$/);
  if (!match) return undefined;
  return [480, 960, 1280].map((width) => `${match[1]}-${width}.webp ${width}w`).join(', ');
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

/** One full-bleed photograph with the words kept in a readable region. */
const TeslaPanel = ({
  image,
  srcSet,
  width = 1280,
  height = 960,
  focus = 'center 40%',
  imageAlt = '',
  title,
  subline,
  primary,
  secondary,
  id,
  flow = false,
  wide = false,
  sentence = false,
  children,
  titleAs: TitleTag = 'h2',
}: {
  image?: string;
  srcSet?: string;
  width?: number;
  height?: number;
  /** Portrait frame used on narrow screens, when one exists for this night. */
  portrait?: string;
  /** object-position so the subject survives a cover crop. */
  focus?: string;
  imageAlt?: string;
  title?: React.ReactNode;
  subline?: string;
  primary?: Pill;
  secondary?: Pill;
  id?: string;
  /** Grows past the viewport when the panel has a list, gallery, or form. */
  flow?: boolean;
  wide?: boolean;
  /** Sentence-length headline, smaller than the one-line display type. */
  sentence?: boolean;
  children?: React.ReactNode;
  titleAs?: 'h1' | 'h2';
}) => (
  <section
    id={id}
    className={`tesla-panel${flow ? ' tesla-panel-flow' : ''}`}
    style={{ ['--photo-focus' as string]: focus }}
  >
    {image ? (
      <div className="tesla-media">
        <img
          className="tesla-photo"
          src={image}
          srcSet={srcSet ?? responsiveSrc(image)}
          sizes="(min-width: 1024px) 864px, 100vw"
          alt={imageAlt}
          width={width}
          height={height}
          decoding="async"
          loading="lazy"
        />
      </div>
    ) : null}
    <div className={`tesla-copy${wide ? ' tesla-copy-wide' : ''}`}>
      {title && <TitleTag className={sentence ? 'tesla-title tesla-title-sentence' : 'tesla-title'}>{title}</TitleTag>}
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

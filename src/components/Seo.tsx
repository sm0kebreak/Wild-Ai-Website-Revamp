import { Helmet } from 'react-helmet-async';

const SITE = 'https://wildai.us';
const SHARE_IMAGE = `${SITE}/og/wildai-og.jpg`;

export const HOME_TITLE = 'Wild AI | Show us something wild';
export const HOME_DESCRIPTION =
  'Wild AI is a monthly meetup where builders show something wild: raw AI projects at any stage, live demos, no slides, and real feedback from the room.';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

/** One title, one description, and one share-card set for the route. */
const Seo = ({ title, description, path, type = 'website', noindex = false }: SeoProps) => {
  const url = path === '/' ? `${SITE}/` : `${SITE}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : null}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SHARE_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Wild AI. Show us something wild." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SHARE_IMAGE} />
      <meta name="twitter:image:alt" content="Wild AI. Show us something wild." />
    </Helmet>
  );
};

export default Seo;

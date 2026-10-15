export type PublicChapter = {
  slug: string;
  city: string;
  /** Short label for the city selector. */
  label: string;
  region: string;
  status: 'active' | 'launching';
  tagline: string;
  about: string;
};

/** The public chapter list. Only Minneapolis has a scheduled event. */
export const publicChapters: PublicChapter[] = [
  {
    slug: 'minneapolis',
    city: 'Minneapolis',
    label: 'Minneapolis',
    region: 'Minnesota',
    status: 'active',
    tagline: 'Third Monday of the month, 6:00 PM CT.',
    about:
      'The original Wild AI room. Short demos from local builders, then time to talk. Doors open at 6:00 PM CT at Dangerous Man Brewing.',
  },
  {
    slug: 'san-francisco',
    city: 'San Francisco',
    label: 'San Francisco',
    region: 'California',
    status: 'launching',
    tagline: 'Next event coming soon.',
    about: 'A San Francisco chapter is on the way. Leave your email and we will send the first date.',
  },
  {
    slug: 'toronto',
    city: 'Toronto',
    label: 'Toronto',
    region: 'Ontario',
    status: 'launching',
    tagline: 'Next event coming soon.',
    about: 'A Toronto chapter is on the way. Leave your email and we will send the first date.',
  },
  {
    slug: 'chicago',
    city: 'Chicago',
    label: 'Chicago',
    region: 'Illinois',
    status: 'launching',
    tagline: 'Next event coming soon.',
    about: 'A Chicago chapter is on the way. Leave your email and we will send the first date.',
  },
  {
    slug: 'austin',
    city: 'Austin, TX',
    label: 'Austin, TX',
    region: 'Texas',
    status: 'launching',
    tagline: 'Next event coming soon.',
    about: 'An Austin chapter is on the way. Leave your email and we will send the first date.',
  },
];

export const CHAPTER_SEO_CITIES = 'Minneapolis, San Francisco, Toronto, Chicago, and Austin';

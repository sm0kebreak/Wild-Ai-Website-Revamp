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

/** The public chapter list. Minneapolis is the only chapter with a scheduled date. */
export const publicChapters: PublicChapter[] = [
  {
    slug: 'minneapolis',
    city: 'Minneapolis',
    label: 'Minneapolis',
    region: 'Minnesota',
    status: 'active',
    tagline: 'Doors 6:00 PM · Three demos starting at 6:40 · Networking until 9 PM',
    about:
      'The original Wild AI room. 15-minute demos, no slides: about 10 minutes to show what you built, then about 5 minutes of questions and feedback. Doors 6:00 PM · Three demos starting at 6:40 · Networking until 9 PM at Dangerous Man Brewing. All ages. Free.',
  },
  {
    slug: 'san-francisco',
    city: 'San Francisco',
    label: 'San Francisco',
    region: 'California',
    status: 'active',
    tagline: 'Next event coming soon.',
    about:
      'Wild AI San Francisco launched August 5, 2026 at Frontier Tower. The next date is not set yet.',
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

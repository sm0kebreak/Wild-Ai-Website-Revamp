export type TeamMember = {
  name: string;
  linkedin?: string;
  photo?: string;
};

/**
 * LinkedIn URLs and photos are used only when a public profile confirms this
 * is the Wild AI person. Missing photo or URL stays blank.
 */
export const team: TeamMember[] = [
  {
    name: 'Anushka Bhide',
    linkedin: 'https://www.linkedin.com/in/anushka-b-9a253998/',
    photo: '/speakers/anushka-b.webp',
  },
  {
    name: 'Ben Long',
    linkedin: 'https://www.linkedin.com/in/benjamin-long-31165616b/',
    photo: '/speakers/benjamin-long.webp',
  },
  {
    name: 'Jake Brindley',
    linkedin: 'https://www.linkedin.com/in/jacob-brindley-452a44264/',
    photo: '/speakers/jake-brindley.webp',
  },
  {
    name: 'Judd Larson',
    linkedin: 'https://www.linkedin.com/in/judd-larson/',
    photo: '/team/judd-larson.jpg',
  },
  {
    name: 'Justin Bosco',
    linkedin: 'https://www.linkedin.com/in/justin14/',
    photo: '/team/justin-bosco.jpg',
  },
  {
    name: 'Kate Kuehl',
    linkedin: 'https://www.linkedin.com/in/katekuehl/',
    photo: '/speakers/kate-kuehl.webp',
  },
  {
    name: 'Maanas Taneja',
    linkedin: 'https://www.linkedin.com/in/maanas-taneja',
    photo: '/team/maanas-taneja.jpg',
  },
  {
    name: 'Matthew Osborn',
    linkedin: 'https://www.linkedin.com/in/mattjosborn/',
    photo: '/speakers/matt-josborn.webp',
  },
  {
    name: 'Micah Peoples',
    linkedin: 'https://www.linkedin.com/in/micahpeoples/',
    photo: '/team/micah-peoples.jpg',
  },
  {
    name: 'Muhammad Shahid',
    linkedin: 'https://www.linkedin.com/in/muhammad-shahid-moandco/',
    photo: '/team/muhammad-shahid.jpg',
  },
];

export type LineupSpeaker = {
  id: string;
  name: string;
  linkedin?: string;
  photo?: string;
  /** Short affiliation for this night, only when a source states it. */
  role?: string;
  /** Companies or employers this person represents or has worked for, as stated in the speaker notes. */
  companies: string[];
};

export type PastEventRecord = {
  id: string;
  date: string;
  displayDate: string;
  city: string;
  venue?: string;
  youtubeEmbedId?: string;
  speakers: LineupSpeaker[];
};

type Person = Omit<LineupSpeaker, 'role'>;

const people = {
  victorHofstetter: {
    id: 'victor-hofstetter',
    name: 'Victor Hofstetter',
    linkedin: 'https://www.linkedin.com/in/victor-hofstetter/',
    companies: [],
  },
  serhiiZatsarynin: {
    id: 'serhii-zatsarynin',
    name: 'Serhii Zatsarynin',
    linkedin: 'https://www.linkedin.com/in/serhii-zatsarynin/',
    companies: [],
  },
  joelHuber: {
    id: 'joel-huber',
    name: 'Joel Huber',
    linkedin: 'https://www.linkedin.com/in/hellojoelhuber/',
    companies: [],
  },
  lukasValine: {
    id: 'lukas-valine',
    name: 'Lukas Valine',
    linkedin: 'https://www.linkedin.com/in/lvaline/',
    companies: ['Attentio'],
  },
  ryanPeters: {
    id: 'ryan-peters',
    name: 'Ryan Peters',
    linkedin: 'https://www.linkedin.com/in/ryant-peters/',
    companies: ['U of Minnesota'],
  },
  jamesMooney: {
    id: 'james-mooney',
    name: 'James Mooney',
    linkedin: 'https://www.linkedin.com/in/james-mooney-45b420105/',
    companies: [],
  },
  adamTerlson: {
    id: 'adam-terlson',
    name: 'Adam Terlson',
    linkedin: 'https://www.linkedin.com/in/adamterlson/',
    companies: [],
  },
  aaronOlson: {
    id: 'aaron-j-olson',
    name: 'Aaron J. Olson',
    linkedin: 'https://www.linkedin.com/in/aaronjolson/',
    companies: ['Life Time'],
  },
  matthewPhillips: {
    id: 'matthew-phillips',
    name: 'Matthew Phillips',
    linkedin: 'https://www.linkedin.com/in/mattphillipsneuroscience/',
    companies: [],
  },
  vivekBhide: {
    id: 'vivek-bhide',
    name: 'Vivek Bhide',
    linkedin: 'https://www.linkedin.com/in/vivek-bhide-9864384/',
    companies: [],
  },
  markCollier: {
    id: 'mark-collier',
    name: 'Mark Collier',
    linkedin: 'https://www.linkedin.com/in/mark-collier-809282113/',
    companies: ['UMN Morris'],
  },
  mattOsborn: {
    id: 'matt-osborn',
    name: 'Matt Osborn',
    linkedin: 'https://www.linkedin.com/in/mattjosborn/',
    companies: ['Skail'],
  },
  abhishekA: {
    id: 'abhishek-a',
    name: 'Abhishek A.',
    linkedin: 'https://www.linkedin.com/in/abhishek-a-95328613b/',
    companies: [],
  },
  samuelGoff: {
    id: 'samuel-goff',
    name: 'Samuel Goff',
    linkedin: 'https://www.linkedin.com/in/samuel-goff-15359612/',
    companies: [],
  },
  benjaminLong: {
    id: 'benjamin-long',
    name: 'Benjamin Long',
    linkedin: 'https://www.linkedin.com/in/benjamin-long-31165616b/',
    companies: ['Simplify AI'],
  },
  weldonMakori: {
    id: 'weldon-makori-m',
    name: 'Weldon Makori M.',
    linkedin: 'https://www.linkedin.com/in/weldon-m-50b88a2b2/',
    companies: ['Custom AI Studio'],
  },
  ianBicking: {
    id: 'ian-bicking',
    name: 'Ian Bicking',
    linkedin: 'https://www.linkedin.com/in/ianbicking/',
    photo: '/lovable-uploads/ian-bicking.jpg',
    companies: ['Memory Atlas'],
  },
  colinHirdman: {
    id: 'colin-hirdman',
    name: 'Colin Hirdman',
    linkedin: 'https://www.linkedin.com/in/colinhirdman/',
    companies: ['Wrapped', 'Rainmaker', 'Monkey Island'],
  },
  zinKhant: {
    id: 'zin-khant',
    name: 'Zin Khant',
    linkedin: 'https://www.linkedin.com/in/zin-khant-993055216/',
    companies: ['St. Thomas', 'Cloudflare'],
  },
  benScharf: {
    id: 'ben-scharf',
    name: 'Ben Scharf',
    linkedin: 'https://www.linkedin.com/in/benjaminscharf/',
    companies: ['Remarketspace'],
  },
  kateKuehl: {
    id: 'kate-kuehl',
    name: 'Kate Kuehl',
    linkedin: 'https://www.linkedin.com/in/katekuehl/',
    companies: [],
  },
  alexBangs: {
    id: 'alex-bangs',
    name: 'Alex Bangs',
    linkedin: 'https://www.linkedin.com/in/alexbangs/',
    companies: [],
  },
  davidMontecalvo: {
    id: 'david-m-montecalvo',
    name: 'David M. Montecalvo',
    linkedin: 'https://www.linkedin.com/in/david-m-montecalvo-068a9811a/',
    companies: [],
  },
  andreSmith: {
    id: 'andre-smith',
    name: 'Andre Smith',
    linkedin: 'https://www.linkedin.com/in/andre-smith-mental-health/',
    companies: ['Chosn'],
  },
  anushkaBhide: {
    id: 'anushka-bhide',
    name: 'Anushka Bhide',
    linkedin: 'https://www.linkedin.com/in/anushka-b-9a253998/',
    companies: ['Medtronic', 'Submitta'],
  },
  mamadyKonneh: {
    id: 'mamady-konneh',
    name: 'Mamady Konneh',
    linkedin: 'https://www.linkedin.com/in/mamadykonneh/',
    photo: '/lovable-uploads/mamady-konneh.jpg',
    companies: ['U of Minnesota'],
  },
  ericLealos: {
    id: 'eric-lealos',
    name: 'Eric Lealos',
    linkedin: 'https://www.linkedin.com/in/ericlealos/',
    companies: ['Quantified Mechanix'],
  },
  kedgardCordero: {
    id: 'kedgard-cordero',
    name: 'Kedgard Cordero',
    linkedin: 'https://www.linkedin.com/in/kedgard-cordero/',
    companies: ['UMN Morris'],
  },
  justinTrantham: {
    id: 'justin-trantham',
    name: 'Justin Trantham',
    companies: ['FlowDevs', 'UMN Morris'],
  },
  joshKellner: {
    id: 'josh-kellner',
    name: 'Josh Kellner',
    linkedin: 'https://www.linkedin.com/in/joshuakellner/',
    companies: ['Simple Lead AI'],
  },
  timLane: {
    id: 'tim-lane',
    name: 'Tim Lane',
    linkedin: 'https://www.linkedin.com/in/tim-lane-78bb0448/',
    companies: ['C.H. Robinson'],
  },
  phillipDemro: {
    id: 'phillip-demro',
    name: 'Phillip Demro',
    linkedin: 'https://www.linkedin.com/in/phillipdemro/',
    companies: [],
  },
  rossGraba: {
    id: 'ross-graba',
    name: 'Ross Graba',
    linkedin: 'https://www.linkedin.com/in/rossgraba/',
    companies: [],
  },
  clintonKunhardt: {
    id: 'clinton-kunhardt',
    name: 'Clinton Kunhardt',
    linkedin: 'https://www.linkedin.com/in/clinton-kunhardt/',
    companies: [],
  },
  urbasEkka: {
    id: 'urbas-ekka',
    name: 'Urbas Ekka',
    linkedin: 'https://www.linkedin.com/in/urbas-ekka/',
    companies: ['Hacker Sidekick', 'NASA'],
  },
  sarahAntier: {
    id: 'sarah-antier-farfar',
    name: 'Sarah Antier-Farfar',
    linkedin: 'https://www.linkedin.com/in/sarah-antier-farfar-09a896a9/',
    photo: '/lovable-uploads/sarah-antier-farfar.jpg',
    companies: ['Univ. Paris-Saclay'],
  },
  andrewDahlberg: {
    id: 'andrew-dahlberg',
    name: 'Andrew Dahlberg',
    linkedin: 'https://www.linkedin.com/in/andrewdahlberg/',
    companies: ['Talkition'],
  },
  blaiseThomas: {
    id: 'blaise-thomas',
    name: 'Blaise Thomas',
    linkedin: 'https://www.linkedin.com/in/blaisethomas/',
    companies: ['Agora'],
  },
  jasonHaupt: {
    id: 'jason-haupt',
    name: 'Jason Haupt',
    linkedin: 'https://www.linkedin.com/in/jasonahaupt/',
    companies: ['Optum'],
  },
  ahmetErsin: {
    id: 'ahmet-ersin-a',
    name: 'Ahmet Ersin A.',
    linkedin: 'https://www.linkedin.com/in/ahmet-ersin-a-2908161/',
    companies: ['UW-River Falls'],
  },
  emersonVillalta: {
    id: 'emerson-villalta',
    name: 'Emerson Villalta',
    companies: ['Onni Health'],
  },
  sowmyaPodila: {
    id: 'sowmya-podila',
    name: 'Sowmya Podila',
    companies: ['Target'],
  },
  alexMelton: {
    id: 'alex-melton',
    name: 'Alex Melton',
    companies: ['Invene'],
  },
  evanOman: {
    id: 'evan-oman',
    name: 'Evan Oman',
    companies: ['Omega Point'],
  },
  kaushikSuresh: {
    id: 'kaushik-suresh',
    name: 'Kaushik Suresh',
    linkedin: 'https://www.linkedin.com/in/kaushiksuresh2110/',
    photo: '/lovable-uploads/kaushik-suresh.jpg',
    companies: [],
  },
  joeLachance: {
    id: 'joe-lachance',
    name: 'Joe LaChance',
    linkedin: 'https://www.linkedin.com/in/jlachance1/',
    photo: '/lovable-uploads/joe-lachance.jpg',
    companies: ['Satori'],
  },
  yanivBenAmi: {
    id: 'yaniv-ben-ami',
    name: 'Yaniv Ben-Ami',
    companies: [],
  },
  gerardBeaubrun: {
    id: 'gerard-beaubrun',
    name: 'Gérard Beaubrun',
    companies: [],
  },
  lyndonCarlson: {
    id: 'lyndon-carlson',
    name: 'Lyndon Carlson',
    companies: ['ChatLPO'],
  },
  jimmy: {
    id: 'jimmy',
    name: 'Jimmy',
    companies: ['Famelia', '3M'],
  },
  joannaMay: {
    id: 'joanna-may',
    name: 'Joanna May',
    companies: ['Chickensoft', 'Very Good Ventures'],
  },
  pierceRhine: {
    id: 'pierce-rhine',
    name: 'Pierce Rhine',
    companies: [],
  },
  darshGarg: {
    id: 'darsh-garg',
    name: 'Darsh Garg',
    companies: ['Tortus', 'U of Minnesota'],
  },
  libanKano: {
    id: 'liban-kano',
    name: 'Liban Kano',
    companies: ['CareSupport'],
  },
  tomOneill: {
    id: 'tom-oneill',
    name: "Tom O'Neill",
    photo: '/lovable-uploads/tom-oneill.jpg',
    companies: ['Nerdery', 'Parallax', 'Quickly'],
  },
  sageFaraday: {
    id: 'sage-faraday',
    name: 'Sage Faraday',
    companies: ['Rosenblatt AI'],
  },
  charlieDivine: {
    id: 'charlie-divine',
    name: 'Charlie Divine',
    companies: [],
  },
  antonPriborkin: {
    id: 'anton-priborkin',
    name: 'Anton Priborkin',
    companies: [],
  },
  arsalanZafar: {
    id: 'arsalan-zafar',
    name: 'Arsalan Zafar',
    companies: ['Deep Render'],
  },
  joeFioti: {
    id: 'joe-fioti',
    name: 'Joe Fioti',
    companies: ['Luminal'],
  },
  akashNagaraj: {
    id: 'akash-nagaraj',
    name: 'Akash Nagaraj',
    companies: ['smallest.ai'],
  },
  jacobBrindley: {
    id: 'jacob-brindley',
    name: 'Jacob Brindley',
    linkedin: 'https://www.linkedin.com/in/jacob-brindley-452a44264/',
    companies: ['Attentio'],
  },
  gabrielKrieshok: {
    id: 'gabriel-krieshok',
    name: 'Gabriel Krieshok',
    companies: ['Ovicounter AI'],
  },
  franciscoArechiga: {
    id: 'francisco-arechiga',
    name: 'Francisco Arechiga',
    companies: [],
  },
  matthewRein: {
    id: 'matthew-rein',
    name: 'Matthew Rein',
    companies: [],
  },
  jesterDapperDan: {
    id: 'jester-dapper-dan',
    name: 'Jester Dapper Dan',
    companies: ['Altruistic Intelligence', 'U of Minnesota'],
  },
  sethKinneman: {
    id: 'seth-kinneman',
    name: 'Seth Kinneman',
    companies: [],
  },
  erikaKvikstad: {
    id: 'erika-kvikstad',
    name: 'Erika Kvikstad',
    companies: [],
  },
  wesWierson: {
    id: 'wes-wierson',
    name: 'Wes Wierson',
    companies: ['VelociTx'],
  },
  brianHultgren: {
    id: 'brian-hultgren',
    name: 'Brian Hultgren',
    companies: ['Mayo Clinic'],
  },
  kathySeidl: {
    id: 'kathy-seidl',
    name: 'Kathy Seidl',
    companies: [],
  },
  vikasSabbi: {
    id: 'vikas-sabbi',
    name: 'Vikas Sabbi',
    companies: [],
  },
} satisfies Record<string, Person>;

const line = (person: Person, role?: string): LineupSpeaker =>
  role ? { ...person, role } : { ...person };

/** Newest first. Sarah M. Kaja is omitted because she did not speak. */
export const pastEvents: PastEventRecord[] = [
  {
    id: '2026-10-14',
    date: '2026-10-14',
    displayDate: 'October 14, 2026',
    city: 'Rochester',
    venue: 'Two Discovery Square',
    speakers: [
      line(people.erikaKvikstad),
      line(people.wesWierson, 'VelociTx'),
      line(people.brianHultgren, 'Mayo Clinic'),
      line(people.kathySeidl),
    ],
  },
  {
    id: '2026-09-21',
    date: '2026-09-21',
    displayDate: 'September 21, 2026',
    city: 'Minneapolis',
    venue: 'Dangerous Man Brewing',
    youtubeEmbedId: '0MjU339wblA',
    speakers: [
      line(people.matthewRein),
      line(people.jesterDapperDan, 'Altruistic Intelligence'),
      line(people.sethKinneman),
    ],
  },
  {
    id: '2026-08-17',
    date: '2026-08-17',
    displayDate: 'August 17, 2026',
    city: 'Minneapolis',
    venue: 'Dangerous Man Brewing',
    youtubeEmbedId: 'tHG-f_eV0Go',
    speakers: [
      line(people.justinTrantham, 'FlowDevs'),
      line(people.gabrielKrieshok, 'Ovicounter AI'),
      line(people.franciscoArechiga),
    ],
  },
  {
    id: '2026-08-05',
    date: '2026-08-05',
    displayDate: 'August 5, 2026',
    city: 'San Francisco',
    venue: 'Frontier Tower',
    speakers: [
      line(people.arsalanZafar, 'Deep Render'),
      line(people.joeFioti, 'Luminal'),
      line(people.akashNagaraj, 'smallest.ai'),
      line(people.lukasValine, 'Attentio'),
      line(people.jacobBrindley, 'Attentio'),
    ],
  },
  {
    id: '2026-07-20',
    date: '2026-07-20',
    displayDate: 'July 20, 2026',
    city: 'Minneapolis',
    venue: 'Dangerous Man Brewing',
    youtubeEmbedId: 'GeRGHq2PohM',
    speakers: [
      line(people.sageFaraday, 'Rosenblatt AI'),
      line(people.charlieDivine),
      line(people.antonPriborkin),
    ],
  },
  {
    id: '2026-06-19',
    date: '2026-06-19',
    displayDate: 'June 19, 2026',
    city: 'Minneapolis',
    venue: 'Improving Minneapolis',
    youtubeEmbedId: '42OT4S1kVKo',
    speakers: [
      line(people.pierceRhine),
      line(people.darshGarg, 'Tortus'),
      line(people.libanKano, 'CareSupport'),
      line(people.tomOneill, 'Quickly'),
    ],
  },
  {
    id: '2026-05-18',
    date: '2026-05-18',
    displayDate: 'May 18, 2026',
    city: 'Minneapolis',
    venue: 'Improving Minneapolis',
    youtubeEmbedId: 'neZDdF3_jIg',
    speakers: [
      line(people.yanivBenAmi),
      line(people.gerardBeaubrun),
      line(people.lyndonCarlson, 'ChatLPO'),
      line(people.jimmy, 'Famelia'),
      line(people.joannaMay, 'Chickensoft'),
    ],
  },
  {
    id: '2026-04-20',
    date: '2026-04-20',
    displayDate: 'April 20, 2026',
    city: 'Minneapolis',
    venue: 'Improving Minneapolis',
    youtubeEmbedId: 'rPqWm0SHJGE',
    speakers: [
      line(people.kaushikSuresh),
      line(people.joeLachance, 'Satori'),
      line(people.mamadyKonneh, 'U of Minnesota'),
    ],
  },
  {
    id: '2026-03-16',
    date: '2026-03-16',
    displayDate: 'March 16, 2026',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    speakers: [
      line(people.emersonVillalta, 'Onni Health'),
      line(people.sowmyaPodila, 'Target'),
      line(people.alexMelton, 'Invene'),
      line(people.evanOman, 'Omega Point'),
    ],
  },
  {
    id: '2026-02-16',
    date: '2026-02-16',
    displayDate: 'February 16, 2026',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    youtubeEmbedId: 'UeX8DrMXjbk',
    speakers: [
      line(people.blaiseThomas, 'Agora'),
      line(people.jasonHaupt, 'Optum'),
      line(people.ahmetErsin, 'UW-River Falls'),
    ],
  },
  {
    id: '2026-01-19',
    date: '2026-01-19',
    displayDate: 'January 19, 2026',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    youtubeEmbedId: 'IljclDTgpO8',
    speakers: [
      line(people.urbasEkka, 'Hacker Sidekick'),
      line(people.sarahAntier, 'Univ. Paris-Saclay'),
      line(people.andrewDahlberg, 'Talkition'),
    ],
  },
  {
    id: '2025-12-15',
    date: '2025-12-15',
    displayDate: 'December 15, 2025',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    youtubeEmbedId: 'igbBxpqhdVw',
    speakers: [
      line(people.phillipDemro),
      line(people.rossGraba),
      line(people.zinKhant, 'St. Thomas'),
      line(people.clintonKunhardt),
    ],
  },
  {
    id: '2025-11-17',
    date: '2025-11-17',
    displayDate: 'November 17, 2025',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    youtubeEmbedId: 'WF6GFjT8dZ4',
    speakers: [
      line(people.ericLealos, 'Quantified Mechanix'),
      line(people.kedgardCordero, 'UMN Morris'),
      line(people.justinTrantham, 'UMN Morris'),
      line(people.joshKellner, 'Simple Lead AI'),
      line(people.timLane, 'C.H. Robinson'),
    ],
  },
  {
    id: '2025-10-20',
    date: '2025-10-20',
    displayDate: 'October 20, 2025',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    youtubeEmbedId: 'Dm2QPv4jW-0',
    speakers: [
      line(people.andreSmith, 'Chosn'),
      line(people.anushkaBhide, 'Medtronic'),
      line(people.mamadyKonneh, 'U of Minnesota'),
    ],
  },
  {
    id: '2025-09-15',
    date: '2025-09-15',
    displayDate: 'September 15, 2025',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    youtubeEmbedId: 'QIbY5SlHopY',
    speakers: [
      line(people.kateKuehl),
      line(people.alexBangs),
      line(people.davidMontecalvo),
    ],
  },
  {
    id: '2025-08-18',
    date: '2025-08-18',
    displayDate: 'August 18, 2025',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    youtubeEmbedId: 'qZCGm13qauw',
    speakers: [
      line(people.colinHirdman, 'Wrapped'),
      line(people.zinKhant, 'St. Thomas'),
      line(people.benScharf, 'Remarketspace'),
    ],
  },
  {
    id: '2025-07-21',
    date: '2025-07-21',
    displayDate: 'July 21, 2025',
    city: 'Minneapolis',
    venue: 'HeadFlyer Brewing',
    speakers: [
      line(people.benjaminLong, 'Simplify AI'),
      line(people.weldonMakori, 'Custom AI Studio'),
      line(people.ianBicking, 'Memory Atlas'),
    ],
  },
  {
    id: '2025-06-16',
    date: '2025-06-16',
    displayDate: 'June 16, 2025',
    city: 'Minneapolis',
    speakers: [
      line(people.mattOsborn, 'Skail'),
      line(people.abhishekA),
      line(people.samuelGoff),
    ],
  },
  {
    id: '2025-05-15',
    date: '2025-05-15',
    displayDate: 'May 15, 2025',
    city: 'Minneapolis',
    venue: 'Day Block Brewing',
    speakers: [
      line(people.matthewPhillips),
      line(people.vivekBhide),
      line(people.markCollier, 'UMN Morris'),
    ],
  },
  {
    id: '2025-04-17',
    date: '2025-04-17',
    displayDate: 'April 17, 2025',
    city: 'Minneapolis',
    venue: 'Day Block Brewing',
    speakers: [
      line(people.ryanPeters, 'U of Minnesota'),
      line(people.jamesMooney),
      line(people.adamTerlson),
      line(people.aaronOlson, 'Life Time'),
    ],
  },
  {
    id: '2025-03-20',
    date: '2025-03-20',
    displayDate: 'March 20, 2025',
    city: 'Minneapolis',
    venue: 'Day Block Brewing',
    youtubeEmbedId: 'orLK9LCWBS4',
    speakers: [
      line(people.victorHofstetter),
      line(people.serhiiZatsarynin),
      line(people.joelHuber),
      line(people.lukasValine),
    ],
  },
];

/** October 19, 2026 is still upcoming. Vikas Sabbi is confirmed for that night. */
export const upcomingLineups: Record<string, LineupSpeaker[]> = {
  '2026-10-19': [line(people.vikasSabbi)],
};

export const pastEventByDisplayDate = (displayDate: string) =>
  pastEvents.find((event) => event.displayDate === displayDate);

export const pastEventByDate = (date: string) => pastEvents.find((event) => event.date === date);

const uniquePastSpeakers = () => {
  const seen = new Map<string, LineupSpeaker>();
  for (const event of pastEvents) {
    for (const speaker of event.speakers) {
      if (!seen.has(speaker.id)) seen.set(speaker.id, speaker);
    }
  }
  return [...seen.values()];
};

export const pastSpeakerRoster = uniquePastSpeakers();

export const speakerCompanies = [
  ...new Set(pastSpeakerRoster.flatMap((speaker) => speaker.companies)),
].sort((a, b) => a.localeCompare(b));

export const speakerCompanyCount = speakerCompanies.length;

export const speakersMissingLinkedIn = pastSpeakerRoster
  .filter((speaker) => !speaker.linkedin)
  .map((speaker) => speaker.name)
  .sort((a, b) => a.localeCompare(b));

export const speakersMissingPhoto = pastSpeakerRoster
  .filter((speaker) => !speaker.photo)
  .map((speaker) => speaker.name)
  .sort((a, b) => a.localeCompare(b));

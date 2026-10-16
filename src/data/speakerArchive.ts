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
    photo: '/speakers/victor-hofstetter.webp',
    companies: [],
  },
  serhiiZatsarynin: {
    id: 'serhii-zatsarynin',
    name: 'Serhii Zatsarynin',
    linkedin: 'https://www.linkedin.com/in/serhii-zatsarynin/',
    photo: '/speakers/serhii-zatsarynin.webp',
    companies: [],
  },
  joelHuber: {
    id: 'joel-huber',
    name: 'Joel Huber',
    linkedin: 'https://www.linkedin.com/in/hellojoelhuber/',
    photo: '/speakers/joel-huber.webp',
    companies: [],
  },
  lukasValine: {
    id: 'lukas-valine',
    name: 'Lukas Valine',
    linkedin: 'https://www.linkedin.com/in/lvaline/',
    photo: '/speakers/lukas-valine.webp',
    companies: ['Attentio'],
  },
  ryanPeters: {
    id: 'ryan-peters',
    name: 'Ryan Peters',
    linkedin: 'https://www.linkedin.com/in/ryant-peters/',
    photo: '/speakers/ryan-peters.webp',
    companies: ['U of Minnesota'],
  },
  jamesMooney: {
    id: 'james-mooney',
    name: 'James Mooney',
    linkedin: 'https://www.linkedin.com/in/james-mooney-45b420105/',
    photo: '/speakers/james-mooney.webp',
    companies: [],
  },
  adamTerlson: {
    id: 'adam-terlson',
    name: 'Adam Terlson',
    linkedin: 'https://www.linkedin.com/in/adamterlson/',
    photo: '/speakers/adam-terlson.webp',
    companies: [],
  },
  aaronOlson: {
    id: 'aaron-j-olson',
    name: 'Aaron J. Olson',
    linkedin: 'https://www.linkedin.com/in/aaronjolson/',
    photo: '/speakers/aaron-j-olson.webp',
    companies: ['Life Time'],
  },
  matthewPhillips: {
    id: 'matthew-phillips',
    name: 'Matthew Phillips',
    linkedin: 'https://www.linkedin.com/in/mattphillipsneuroscience/',
    photo: '/speakers/matt-phillips.webp',
    companies: [],
  },
  vivekBhide: {
    id: 'vivek-bhide',
    name: 'Vivek Bhide',
    linkedin: 'https://www.linkedin.com/in/vivek-bhide-9864384/',
    photo: '/speakers/vivek-bhide.webp',
    companies: [],
  },
  markCollier: {
    id: 'mark-collier',
    name: 'Mark Collier',
    linkedin: 'https://www.linkedin.com/in/mark-collier-809282113/',
    photo: '/speakers/mark-collier.webp',
    companies: ['UMN Morris'],
  },
  mattOsborn: {
    id: 'matt-osborn',
    name: 'Matt Osborn',
    linkedin: 'https://www.linkedin.com/in/mattjosborn/',
    photo: '/speakers/matt-josborn.webp',
    companies: ['Skail'],
  },
  abhishekA: {
    id: 'abhishek-a',
    name: 'Abhishek A.',
    linkedin: 'https://www.linkedin.com/in/abhishek-a-95328613b/',
    photo: '/speakers/abhishek-a.webp',
    companies: [],
  },
  samuelGoff: {
    id: 'samuel-goff',
    name: 'Samuel Goff',
    linkedin: 'https://www.linkedin.com/in/samuel-goff-15359612/',
    photo: '/speakers/samuel-goff.webp',
    companies: [],
  },
  benjaminLong: {
    id: 'benjamin-long',
    name: 'Benjamin Long',
    linkedin: 'https://www.linkedin.com/in/benjamin-long-31165616b/',
    photo: '/speakers/benjamin-long.webp',
    companies: ['Simplify AI'],
  },
  weldonMakori: {
    id: 'weldon-makori-m',
    name: 'Weldon Makori M.',
    linkedin: 'https://www.linkedin.com/in/weldonmakori/',
    photo: '/speakers/weldon-makori.webp',
    companies: ['Custom AI Studio'],
  },
  ianBicking: {
    id: 'ian-bicking',
    name: 'Ian Bicking',
    linkedin: 'https://www.linkedin.com/in/ianbicking/',
    photo: '/speakers/ian-bicking.webp',
    companies: ['Memory Atlas'],
  },
  colinHirdman: {
    id: 'colin-hirdman',
    name: 'Colin Hirdman',
    linkedin: 'https://www.linkedin.com/in/colinhirdman/',
    photo: '/speakers/colin-hirdman.webp',
    companies: ['Wrapped', 'Rainmaker', 'Monkey Island'],
  },
  zinKhant: {
    id: 'zin-khant',
    name: 'Zin Khant',
    linkedin: 'https://www.linkedin.com/in/zin-khant-993055216/',
    photo: '/speakers/zin-khant.webp',
    companies: ['St. Thomas', 'Cloudflare'],
  },
  benScharf: {
    id: 'ben-scharf',
    name: 'Ben Scharf',
    linkedin: 'https://www.linkedin.com/in/benjaminscharf/',
    photo: '/speakers/benjamin-scharf.webp',
    companies: ['Remarketspace'],
  },
  kateKuehl: {
    id: 'kate-kuehl',
    name: 'Kate Kuehl',
    linkedin: 'https://www.linkedin.com/in/katekuehl/',
    photo: '/speakers/kate-kuehl.webp',
    companies: [],
  },
  alexBangs: {
    id: 'alex-bangs',
    name: 'Alex Bangs',
    linkedin: 'https://www.linkedin.com/in/alexbangs/',
    photo: '/speakers/alex-bangs.webp',
    companies: [],
  },
  davidMontecalvo: {
    id: 'david-m-montecalvo',
    name: 'David M. Montecalvo',
    linkedin: 'https://www.linkedin.com/in/david-m-montecalvo-068a9811a/',
    photo: '/speakers/david-m-montecalvo.webp',
    companies: [],
  },
  andreSmith: {
    id: 'andre-smith',
    name: 'Andre Smith',
    linkedin: 'https://www.linkedin.com/in/andre-smith-mental-health/',
    photo: '/speakers/andre-smith.webp',
    companies: ['Chosn'],
  },
  anushkaBhide: {
    id: 'anushka-bhide',
    name: 'Anushka Bhide',
    linkedin: 'https://www.linkedin.com/in/anushka-b-9a253998/',
    photo: '/speakers/anushka-b.webp',
    companies: ['Medtronic', 'Submitta'],
  },
  mamadyKonneh: {
    id: 'mamady-konneh',
    name: 'Mamady Konneh',
    linkedin: 'https://www.linkedin.com/in/mamadykonneh/',
    photo: '/speakers/mamady-konneh.webp',
    companies: ['U of Minnesota'],
  },
  ericLealos: {
    id: 'eric-lealos',
    name: 'Eric Lealos',
    linkedin: 'https://www.linkedin.com/in/ericlealos/',
    photo: '/speakers/eric-lealos.webp',
    companies: ['Quantified Mechanix'],
  },
  kedgardCordero: {
    id: 'kedgard-cordero',
    name: 'Kedgard Cordero',
    linkedin: 'https://www.linkedin.com/in/kedgard-cordero/',
    photo: '/speakers/kedgard-cordero.webp',
    companies: ['UMN Morris'],
  },
  justinTrantham: {
    id: 'justin-trantham',
    name: 'Justin Trantham',
    linkedin: 'https://www.linkedin.com/in/justin-trantham/',
    photo: '/speakers/justin-trantham.webp',
    companies: ['FlowDevs', 'UMN Morris'],
  },
  joshKellner: {
    id: 'josh-kellner',
    name: 'Josh Kellner',
    linkedin: 'https://www.linkedin.com/in/joshuakellner/',
    photo: '/speakers/joshua-kellner.webp',
    companies: ['Simple Lead AI'],
  },
  timLane: {
    id: 'tim-lane',
    name: 'Tim Lane',
    linkedin: 'https://www.linkedin.com/in/tim-lane-78bb0448/',
    photo: '/speakers/tim-lane.webp',
    companies: ['C.H. Robinson'],
  },
  phillipDemro: {
    id: 'phillip-demro',
    name: 'Phillip Demro',
    linkedin: 'https://www.linkedin.com/in/phillipdemro/',
    photo: '/speakers/phillip-demro.webp',
    companies: [],
  },
  rossGraba: {
    id: 'ross-graba',
    name: 'Ross Graba',
    linkedin: 'https://www.linkedin.com/in/rossgraba/',
    photo: '/speakers/ross-graba.webp',
    companies: [],
  },
  clintonKunhardt: {
    id: 'clinton-kunhardt',
    name: 'Clinton Kunhardt',
    linkedin: 'https://www.linkedin.com/in/clinton-kunhardt/',
    photo: '/speakers/clinton-kunhardt.webp',
    companies: [],
  },
  urbasEkka: {
    id: 'urbas-ekka',
    name: 'Urbas Ekka',
    linkedin: 'https://www.linkedin.com/in/urbas-ekka/',
    photo: '/speakers/urbas-ekka.webp',
    companies: ['Hacker Sidekick', 'NASA'],
  },
  sarahAntier: {
    id: 'sarah-antier-farfar',
    name: 'Sarah Antier-Farfar',
    linkedin: 'https://www.linkedin.com/in/sarah-antier-farfar-09a896a9/',
    photo: '/speakers/sarah-antier-farfar.webp',
    companies: ['Univ. Paris-Saclay'],
  },
  andrewDahlberg: {
    id: 'andrew-dahlberg',
    name: 'Andrew Dahlberg',
    linkedin: 'https://www.linkedin.com/in/andrewdahlberg/',
    photo: '/speakers/andrew-dahlberg.webp',
    companies: ['Talkition'],
  },
  blaiseThomas: {
    id: 'blaise-thomas',
    name: 'Blaise Thomas',
    linkedin: 'https://www.linkedin.com/in/blaisethomas/',
    photo: '/speakers/blaise-thomas.webp',
    companies: ['Agora'],
  },
  jasonHaupt: {
    id: 'jason-haupt',
    name: 'Jason Haupt',
    linkedin: 'https://www.linkedin.com/in/jasonahaupt/',
    photo: '/speakers/jason-haupt.webp',
    companies: ['Optum'],
  },
  ahmetErsin: {
    id: 'ahmet-ersin-a',
    name: 'Ahmet Ersin A.',
    linkedin: 'https://www.linkedin.com/in/ahmet-ersin-a-2908161/',
    photo: '/speakers/ahmet-ersin-a.webp',
    companies: ['UW-River Falls'],
  },
  emersonVillalta: {
    id: 'emerson-villalta',
    name: 'Emerson Villalta',
    linkedin: 'https://www.linkedin.com/in/emersonvillalta/',
    photo: '/speakers/emerson-villalta.webp',
    companies: ['Onni Health', 'Quinoa'],
  },
  sowmyaPodila: {
    id: 'sowmya-podila',
    name: 'Sowmya Podila',
    linkedin: 'https://www.linkedin.com/in/sowmyapodila/',
    photo: '/speakers/sowmya-podila.webp',
    companies: ['Target'],
  },
  alexMelton: {
    id: 'alex-melton',
    name: 'Alex Melton',
    linkedin: 'https://www.linkedin.com/in/ammelto/',
    photo: '/speakers/alex-melton.webp',
    companies: ['Invene'],
  },
  evanOman: {
    id: 'evan-oman',
    name: 'Evan Oman',
    linkedin: 'https://www.linkedin.com/in/evanoman/',
    photo: '/speakers/evan-oman.webp',
    companies: ['Omega Point'],
  },
  kaushikSuresh: {
    id: 'kaushik-suresh',
    name: 'Kaushik Suresh',
    linkedin: 'https://www.linkedin.com/in/kaushiksuresh2110/',
    photo: '/speakers/kaushik-suresh.webp',
    companies: [],
  },
  joeLachance: {
    id: 'joe-lachance',
    name: 'Joe LaChance',
    linkedin: 'https://www.linkedin.com/in/jlachance1/',
    photo: '/speakers/joe-lachance.webp',
    companies: ['Satori'],
  },
  yanivBenAmi: {
    id: 'yaniv-ben-ami',
    name: 'Yaniv Ben-Ami',
    linkedin: 'https://www.linkedin.com/in/yaniv-ben-ami-9208b9184/',
    photo: '/speakers/yaniv-ben-ami.webp',
    companies: [],
  },
  gerardBeaubrun: {
    id: 'gerard-beaubrun',
    name: 'Gérard Beaubrun',
    linkedin: 'https://www.linkedin.com/in/gebeaubrun/',
    photo: '/speakers/gerard-beaubrun.webp',
    companies: [],
  },
  lyndonCarlson: {
    id: 'lyndon-carlson',
    name: 'Lyndon Carlson',
    linkedin: 'https://www.linkedin.com/in/lyndon-carlson/',
    photo: '/speakers/lyndon-carlson.webp',
    companies: ['ChatLPO'],
  },
  jimmy: {
    id: 'jimmy',
    name: 'Jimmy',
    linkedin: 'https://www.linkedin.com/in/thejimmy/',
    photo: '/speakers/jimmy.webp',
    companies: ['Famelia', '3M'],
  },
  joannaMay: {
    id: 'joanna-may',
    name: 'Joanna May',
    linkedin: 'https://www.linkedin.com/in/joanna-may/',
    photo: '/speakers/joanna-may.webp',
    companies: ['Chickensoft', 'Very Good Ventures'],
  },
  pierceRhine: {
    id: 'pierce-rhine',
    name: 'Pierce Rhine',
    linkedin: 'https://www.linkedin.com/in/pierce-rhine/',
    photo: '/speakers/pierce-rhine.webp',
    companies: [],
  },
  darshGarg: {
    id: 'darsh-garg',
    name: 'Darsh Garg',
    linkedin: 'https://www.linkedin.com/in/darshgarg13579/',
    photo: '/speakers/darsh-garg.webp',
    companies: ['Tortus', 'U of Minnesota'],
  },
  libanKano: {
    id: 'liban-kano',
    name: 'Liban Kano',
    linkedin: 'https://www.linkedin.com/in/libankano/',
    photo: '/speakers/liban-kano.webp',
    companies: ['CareSupport'],
  },
  tomOneill: {
    id: 'tom-oneill',
    name: "Tom O'Neill",
    linkedin: 'https://www.linkedin.com/in/tomoneill/',
    photo: '/speakers/tom-oneill.webp',
    companies: ['Nerdery', 'Parallax', 'Quickly'],
  },
  sageFaraday: {
    id: 'sage-faraday',
    name: 'Sage Faraday',
    linkedin: 'https://www.linkedin.com/in/sage-faraday/',
    photo: '/speakers/sage-faraday.webp',
    companies: ['Rosenblatt AI'],
  },
  charlieDivine: {
    id: 'charlie-devine',
    name: 'Charlie Devine',
    linkedin: 'https://www.linkedin.com/in/charlie-devine-05135a11/',
    photo: '/speakers/charlie-devine.webp',
    companies: [],
  },
  antonPriborkin: {
    id: 'anton-priborkin',
    name: 'Anton Priborkin',
    linkedin: 'https://www.linkedin.com/in/anton-priborkin-69305b213/',
    photo: '/speakers/anton-priborkin.webp',
    companies: [],
  },
  arsalanZafar: {
    id: 'arsalan-zafar',
    name: 'Arsalan Zafar',
    linkedin: 'https://www.linkedin.com/in/arsalanzafar/',
    photo: '/speakers/arsalan-zafar.webp',
    companies: ['Deep Render'],
  },
  joeFioti: {
    id: 'joe-fioti',
    name: 'Joe Fioti',
    linkedin: 'https://www.linkedin.com/in/joe-fioti-24a986189/',
    photo: '/speakers/joe-fioti.webp',
    companies: ['Luminal'],
  },
  akashNagaraj: {
    id: 'akash-nagaraj',
    name: 'Akash Nagaraj',
    linkedin: 'https://www.linkedin.com/in/akashnagarajdesign/',
    photo: '/speakers/akash-nagaraj.webp',
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
    linkedin: 'https://www.linkedin.com/in/gabrielkrieshok/',
    photo: '/speakers/gabriel-krieshok.webp',
    companies: ['Ovicounter AI'],
  },
  franciscoArechiga: {
    id: 'francisco-arechiga',
    name: 'Francisco Arechiga',
    linkedin: 'https://www.linkedin.com/in/franciscoarechiga/',
    photo: '/speakers/francisco-arechiga.webp',
    companies: [],
  },
  matthewRein: {
    id: 'matthew-rein',
    name: 'Matthew Rein',
    linkedin: 'https://www.linkedin.com/in/matthew-rein-38342a56/',
    photo: '/speakers/matthew-rein.webp',
    companies: [],
  },
  jesterDapperDan: {
    id: 'jester-dapper-dan',
    name: 'Jester Dapper Dan',
    linkedin: 'https://www.linkedin.com/in/jester-dapper-dan-0b0466386/',
    photo: '/speakers/jester-dapper-dan.webp',
    companies: ['Altruistic Intelligence', 'U of Minnesota'],
  },
  sethKinneman: {
    id: 'seth-kinneman',
    name: 'Seth Kinneman',
    linkedin: 'https://www.linkedin.com/in/seth-kinneman-618862314/',
    photo: '/speakers/seth-kinneman.webp',
    companies: [],
  },
  erikaKvikstad: {
    id: 'erika-kvikstad',
    name: 'Erika Kvikstad',
    linkedin: 'https://www.linkedin.com/in/erikakvikstad/',
    photo: '/speakers/erika-kvikstad.webp',
    companies: [],
  },
  wesWierson: {
    id: 'wes-wierson',
    name: 'Wes Wierson',
    linkedin: 'https://www.linkedin.com/in/wesley-wierson/',
    photo: '/speakers/wesley-wierson.webp',
    companies: ['VelociTx'],
  },
  brianHultgren: {
    id: 'brian-hultgren',
    name: 'Brian Hultgren',
    linkedin: 'https://www.linkedin.com/in/brian-hultgren-7a962729/',
    companies: ['Mayo Clinic'],
  },
  kathySeidl: {
    id: 'kathy-seidl',
    name: 'Kathy Seidl',
    linkedin: 'https://www.linkedin.com/in/kathyseidl/',
    photo: '/speakers/kathy-seidl.webp',
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

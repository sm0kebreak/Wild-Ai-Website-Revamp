export interface CompanyLogo {
  name: string;
  logo?: string;
  url?: string;
  /** 'dark-bg': light art on an opaque dark box. 'light-ink': light art on transparency. 'plain': a single-color mark. */
  tone?: 'dark-bg' | 'deep-bg' | 'light-ink' | 'plain';
  /**
   * One plain sentence, about 20 words, from the company's own site or LinkedIn.
   * Empty when that could not be checked. Jake can edit these in `companyBios`.
   */
  bio?: string;
}

/** Logos already on the site before the speaker-company pass. */
const existingLogos: CompanyLogo[] = [
{
  name: 'Adile Diagnostic',
  logo: '/lovable-uploads/adile-logo.png',
  url: 'https://www.linkedin.com/company/adile-diagnostic-inc/'
}, {
  name: 'Amazon',
  logo: '/lovable-uploads/amazon-logo.png',
  url: 'https://www.amazon.com/'
}, {
  name: 'Attentio',
  tone: 'light-ink',
  logo: '/lovable-uploads/attentio-logo.png?v=3',
  url: 'http://attentio.ai/'
}, {
  name: 'BData',
  tone: 'light-ink',
  logo: '/lovable-uploads/bdata-logo.png',
  url: 'https://bdatainc.com/'
}, {
  name: 'BlueFolder',
  logo: '/lovable-uploads/bluefolder-logo.png',
  url: 'https://bluefolder.com/'
}, {
  name: 'Boardwalk Health',
  logo: '/lovable-uploads/boardwalk-logo.png?v=3',
  url: 'https://mymeddefend.com/'
}, {
  name: 'Brilliant',
  logo: '/lovable-uploads/brilliant-logo.png?v=3',
  url: 'https://brilliant.org/'
}, {
  name: 'C.H. Robinson',
  logo: '/lovable-uploads/chrobinson-logo.png',
  url: 'https://www.chrobinson.com/'
}, {
  name: 'Calabrio',
  logo: '/lovable-uploads/calabrio-logo.png?v=2',
  url: 'https://www.calabrio.com/'
}, {
  name: 'Caparra',
  logo: '/lovable-uploads/caparra-logo.png?v=3',
  url: 'https://caparra.ai/'
}, {
  name: 'Chosn',
  logo: '/lovable-uploads/chosn-logo.png?v=4',
  url: 'https://www.chosn.io/'
}, {
  name: 'Crucible Energy',
  tone: 'dark-bg',
  logo: '/lovable-uploads/crucible-logo.png?v=3',
  url: 'https://crucible.energy/'
}, {
  name: 'Elucid',
  logo: '/lovable-uploads/elucid-logo.svg',
  url: 'https://elucid.com/'
}, {
  name: 'Ever Just',
  logo: '/lovable-uploads/everjust-logo.png',
  url: 'https://www.linkedin.com/company/ever-just/'
}, {
  name: 'EY',
  logo: '/lovable-uploads/ey-logo.png?v=3',
  url: 'https://www.ey.com/'
}, {
  name: 'FlowDevs',
  logo: '/lovable-uploads/flowdevs-logo.png?v=3',
  url: 'https://www.flowdevs.io/'
}, {
  name: 'Fulcrum Neuro',
  logo: '/lovable-uploads/fulcrumneuro-logo.png?v=3',
  url: 'https://www.fulcrumneuro.com/'
}, {
  name: 'Gullview Tech',
  tone: 'light-ink',
  logo: '/lovable-uploads/gullview-logo.png?v=2',
  url: 'https://www.gullviewtech.com/'
}, {
  name: 'Hacker Sidekick',
  logo: '/lovable-uploads/hackersidekick-logo.png?v=3',
  url: 'https://hackersidekick.com'
}, {
  name: 'Life Time',
  logo: '/lovable-uploads/lifetime-logo.png?v=3',
  url: 'https://www.lifetime.life/'
}, {
  name: 'LifeFx',
  logo: '/lovable-uploads/lifefx-logo.png?v=3',
  url: 'https://www.lifefxmn.com/'
}, {
  name: 'Medtronic',
  logo: '/lovable-uploads/medtronic-logo.png?v=3',
  url: 'https://www.medtronic.com/en-us/index.html'
}, {
  name: 'Monkey Island',
  tone: 'light-ink',
  logo: '/lovable-uploads/monkeyisland-logo.png?v=3',
  url: 'https://www.monkeyislandventures.com/'
}, {
  name: 'Ovul',
  tone: 'light-ink',
  logo: '/lovable-uploads/ovul-logo.png?v=3',
  url: 'https://ovul.ai/'
}, {
  name: 'Quantified Mechanix',
  logo: '/lovable-uploads/quantifiedmechanix-logo.png?v=2',
  url: 'https://quantifiedmechanix.com/'
}, {
  name: 'Rainmaker',
  tone: 'light-ink',
  logo: '/lovable-uploads/rainmaker-logo.png?v=4',
  url: 'https://www.rainmakergrows.com/'
}, {
  name: 'Remarketspace',
  logo: '/lovable-uploads/remarketspace-logo.png',
  url: 'https://www.remarketspace.com/'
}, {
  name: 'Simplify AI',
  logo: '/lovable-uploads/simplifyai-logo.png?v=3',
  url: 'https://www.simplifyaisolutions.com/'
}, {
  name: 'Skail',
  logo: '/lovable-uploads/skail-logo.svg',
  url: 'https://skail.ai/'
}, {
  name: 'St. Thomas',
  logo: '/lovable-uploads/stthomas-logo.png',
  url: 'https://www.stthomas.edu/'
}, {
  name: 'Submitta',
  logo: '/lovable-uploads/submitta-logo.png?v=4',
  url: 'https://www.linkedin.com/company/submitta/'
}, {
  name: 'Talknician',
  tone: 'dark-bg',
  logo: '/lovable-uploads/talknician-logo.png?v=3',
  url: 'https://www.talknician.com/'
}, {
  name: 'TSL Consulting',
  logo: '/lovable-uploads/tslconsulting-logo.png?v=2',
  url: 'https://tslconsulting.in/'
}, {
  name: 'U of Minnesota',
  logo: '/lovable-uploads/umn-logo.png?v=3',
  url: 'https://www.umn.edu/'
}, {
  name: 'UMN Morris',
  logo: '/lovable-uploads/umnmorris-logo.png?v=3',
  url: 'https://www.morris.umn.edu/'
}, {
  name: 'Univ. Paris-Saclay',
  logo: '/lovable-uploads/paris-saclay-logo.png?v=3',
  url: 'http://www.universite-paris-saclay.fr/fr'
}, {
  name: 'UST Nexus',
  tone: 'deep-bg',
  logo: '/lovable-uploads/ustnexus-logo.png?v=3',
  url: 'https://ustnexus.club/'
}, {
  name: 'VirtualGo',
  tone: 'dark-bg',
  logo: '/lovable-uploads/virtualgo-logo.png?v=4',
  url: 'https://www.virtualgoreality.com/'
}, {
  name: 'We Network Now',
  logo: '/lovable-uploads/wenetworknow-logo.png?v=2',
  url: 'https://wenetworknow.org/'
}, {
  name: 'Withum',
  logo: '/lovable-uploads/withum-logo.png?v=3',
  url: 'https://www.withum.com/'
}, {
  name: 'Xcel Energy',
  logo: '/lovable-uploads/xcelenergy-logo.png',
  url: 'https://www.xcelenergy.com/'
}];

/**
 * Speaker companies that are not already in `existingLogos`.
 * A logo is used when a real mark was available. Otherwise the carousel draws the name.
 */
export const speakerStageLogos: CompanyLogo[] = [
  { name: '3M', logo: '/logos/3m.svg', url: 'https://www.3m.com/' },
  { name: 'Agora', logo: '/logos/agora.webp?v=3', url: 'https://www.agora.io/' },
  { name: 'CareSupport', logo: '/logos/caresupport.webp?v=3', url: 'https://caresupport.com/' },
  { name: 'ChatLPO', logo: '/logos/chatlpo.svg?v=3', url: 'https://chatlpo.com/' },
  { name: 'Chickensoft', logo: '/logos/chickensoft.png?v=3', url: 'https://chickensoft.games/' },
  { name: 'Cloudflare', logo: '/logos/cloudflare.svg?v=3', url: 'https://www.cloudflare.com/' },
  { name: 'Custom AI Studio', logo: '/logos/custom-ai-studio.png?v=3', url: 'https://www.customaistudio.io/', tone: 'dark-bg' },
  { name: 'Deep Render', logo: '/logos/deep-render.png', url: 'https://deeprender.ai/' },
  { name: 'Famelia', logo: '/logos/famelia.svg', url: 'https://famelia.app/' },
  { name: 'Invene', logo: '/logos/invene.png', url: 'https://www.invene.com/' },
  { name: 'Kwikly', logo: '/logos/kwikly.svg', url: 'https://www.joinkwikly.com/' },
  { name: 'Luminal', logo: '/logos/luminal.svg?v=3', url: 'https://luminal.com/' },
  { name: 'Mayo Clinic', logo: '/logos/mayo-clinic.svg?v=3', url: 'https://www.mayoclinic.org/' },
  { name: 'NASA', logo: '/logos/nasa.svg?v=3', url: 'https://www.nasa.gov/' },
  { name: 'Nerdery', logo: '/logos/nerdery.svg', url: 'https://www.nerdery.com/' },
  { name: 'Omega Point', logo: '/logos/omega-point.png', url: 'https://www.ompnt.com/' },
  { name: 'Optum', logo: '/logos/optum.svg', url: 'https://www.optum.com/' },
  { name: 'Ovicounter AI', logo: '/logos/ovicounter.svg?v=3', url: 'https://ovicounter.ai/' },
  { name: 'Parallax', logo: '/logos/parallax.png', url: 'https://www.getparallax.com/', tone: 'dark-bg' },
  { name: 'Quinoa', logo: '/lovable-uploads/quinoa-logo.png', url: 'https://quinoa.health' },
  { name: 'Rosenblatt AI', logo: '/logos/rosenblatt.svg?v=3', url: 'https://www.rosenblatt.ai/', tone: 'light-ink' },
  { name: 'Satori', logo: '/logos/satori.png?v=3', url: 'https://satori.sh/', tone: 'light-ink' },
  { name: 'Simple Lead AI', logo: '/logos/simple-lead.png?v=3', url: 'https://siimplelead.com/' },
  { name: 'smallest.ai', logo: '/logos/smallest.png?v=3', url: 'https://smallest.ai/', tone: 'dark-bg' },
  { name: 'Target', logo: '/logos/target.png', url: 'https://www.target.com/' },
  { name: 'Tortus', logo: '/logos/tortus.png?v=3', url: 'https://tortus.ai/' },
  { name: 'UW-River Falls', logo: '/logos/uwrf.png?v=3', url: 'https://www.uwrf.edu/' },
  { name: 'VelociTx', logo: '/logos/velocitx.png', url: 'https://velocitx.com/' },
  { name: 'Very Good Ventures', logo: '/logos/very-good-ventures.svg', url: 'https://verygood.ventures/' },
  { name: 'Wrapped', logo: '/logos/wrappt.png', url: 'https://wrappt.ai/', tone: 'dark-bg' },
];

/**
 * One sentence each, taken from the company's site or LinkedIn.
 * Leave a value blank when the page did not say what the company does.
 */
export const companyBios: Record<string, string> = {
  '3M': '3M applies science to products people use in everyday life.',
  'Adile Diagnostic': 'Adile Diagnostic develops and produces diagnostic medical devices.',
  Agora: 'Agora provides voice, video, and chat tools for live conversations in apps.',
  Amazon: 'Amazon sells millions of products online and bundles shopping and entertainment in Prime.',
  Attentio: "Attentio puts an organization's rules into AI that the organization owns and runs.",
  BData: 'BData runs a burn-care data platform built with the American Burn Association.',
  BlueFolder: 'BlueFolder is field-service software for work orders, dispatch, scheduling, and billing.',
  'Boardwalk Health': 'Boardwalk Health runs chronic and behavioral health programs for health systems.',
  Brilliant: 'Brilliant is a visual tutor for math and coding, from grade school through college.',
  'C.H. Robinson': 'C.H. Robinson moves freight and manages supply chains for shippers.',
  Calabrio: 'Calabrio, now part of Verint, makes contact-center scheduling and workforce software.',
  Caparra: 'Caparra makes developer tools, including a chatbot that reads code repositories.',
  CareSupport: 'CareSupport turns family text messages into shared tasks, medications, and handoffs.',
  ChatLPO: 'ChatLPO helps teachers in Chile create classroom materials from the national curriculum.',
  Chickensoft: 'Chickensoft is a community of Godot and C# game developers with open-source tools.',
  Chosn: 'Chosn listens to a short recording and shows how your emotions change over time.',
  Cloudflare: 'Cloudflare provides internet services for millions of websites.',
  'Crucible Energy': 'Crucible Energy designs superconducting power networks that include storage.',
  'Custom AI Studio': 'Custom AI Studio designs and builds custom AI systems for businesses.',
  'Deep Render': "Deep Render's website now points to InterDigital's research on video compression.",
  EY: 'EY provides consulting, audit, tax, and transaction services.',
  Elucid: 'Elucid makes FDA-cleared software that measures heart and neck artery plaque from CT scans.',
  'Ever Just': 'Ever Just builds software products for small and mid-sized businesses.',
  Famelia: "Famelia's dietitians adapt a recipe so one meal can fit a family's different diets.",
  FlowDevs: 'FlowDevs builds custom apps, automations, and internal tools for businesses.',
  'Fulcrum Neuro': 'Fulcrum Neuro estimates patient risk from a mathematical model of brain metabolism.',
  'Gullview Tech': 'Gullview Tech helps companies find and build places to use AI.',
  'Hacker Sidekick': 'Hacker Sidekick is desktop software that runs security tools on your computer.',
  Invene: 'Invene does data engineering and AI work for health insurers and care providers.',
  Kwikly: 'Kwikly matches dental professionals with offices that need temporary staff.',
  'Life Time': 'Life Time runs athletic clubs, coworking spaces, and residences.',
  LifeFx: 'LifeFx offers executive-function coaching and camps in Richfield, Minnesota.',
  Luminal: 'Luminal compiles AI models so they run faster on GPUs and custom chips.',
  'Mayo Clinic': 'Mayo Clinic is a hospital system founded in Rochester, Minnesota.',
  Medtronic: 'Medtronic makes medical equipment and is headquartered in Minneapolis.',
  'Monkey Island': 'Monkey Island Ventures is a Minnesota founder group that invests in and starts companies.',
  NASA: 'NASA is the United States space agency for exploration, science, and aeronautics.',
  Nerdery: 'Nerdery designs and builds custom digital platforms for companies.',
  'Omega Point': 'Omega Point makes Kelly, an assistant that answers questions about an investment book.',
  Optum: 'Optum offers health services and works on care experiences and costs.',
  'Ovicounter AI': '',
  Ovul: 'Ovul reads estrogen and fertile days from a drop of saliva in a home device.',
  Parallax: 'Parallax is resource-planning software for professional services firms.',
  'Quantified Mechanix': 'Quantified Mechanix builds data and analytics tools for manufacturing and health care.',
  Quinoa: 'Quinoa tracks patient retention and safety in cancer clinical trials.',
  Rainmaker: 'Rainmaker helps founders and salespeople build business relationships on LinkedIn.',
  Remarketspace: 'Remarketspace sells used cars, trucks, and SUVs in Elk River, Minnesota.',
  'Rosenblatt AI': 'Rosenblatt works with private-equity firms on AI for their portfolio companies.',
  Satori: "Satori's product ctx packages the context an AI agent needs into one image.",
  'Simple Lead AI': 'Simple Lead AI builds websites and follow-up tools for local service businesses.',
  'Simplify AI': '',
  Skail: 'Skail offers C# and TypeScript tools for adding AI agents to existing software.',
  'St. Thomas': 'The University of St. Thomas is a private university in Minnesota.',
  Submitta: 'Submitta automates human-factors documentation for medical device teams.',
  'TSL Consulting': 'TSL Consulting provides marketing services, including search and lead generation, in Asia.',
  Talknician: '',
  Target: 'Target sells groceries, clothes, electronics, and other goods online and in stores.',
  Tortus: 'Tortus records clinical consultations for health systems in the NHS.',
  'U of Minnesota': 'The University of Minnesota has five campuses and degree programs.',
  'UMN Morris': 'The University of Minnesota Morris offers a liberal arts education.',
  'UST Nexus': '',
  'UW-River Falls': 'The University of Wisconsin-River Falls offers academics, student life, and athletics.',
  'Univ. Paris-Saclay': 'Université Paris-Saclay is a French university with schools of science, medicine, law, and engineering.',
  VelociTx: 'VelociTx designs CAR-T cell therapy, including the transmembrane part of the cells.',
  'Very Good Ventures': 'Very Good Ventures builds Flutter apps for mobile, web, and desktop.',
  VirtualGo: 'VirtualGo makes mixed-reality games and tools, including games for Apple Vision Pro.',
  'We Network Now': '',
  Withum: 'Withum is an accounting and advisory firm for businesses and individuals.',
  Wrapped: 'Wrappt turns a custom GPT into a branded product people can use and pay for.',
  'Xcel Energy': 'Xcel Energy is a utility that provides energy in eight states, including Minnesota.',
  'smallest.ai': 'Smallest AI offers speech-to-text, text-to-speech, and voice agents.',
};

/** Existing marks plus every speaker company that was not already in the carousel. */
export const logos: CompanyLogo[] = [...existingLogos, ...speakerStageLogos].map((company) => ({
  ...company,
  bio: companyBios[company.name] ?? '',
}));

export type LogoFit = 'icon' | 'lockup' | 'word' | 'wide';

/** Visual weight of the cropped mark. Icons are square, words are wide. */
export const logoFit: Record<string, LogoFit> = {
  "3M": 'lockup',
  "Adile Diagnostic": 'icon',
  "Agora": 'word',
  "Amazon": 'word',
  "Attentio": 'icon',
  "BData": 'icon',
  "BlueFolder": 'word',
  "Boardwalk Health": 'icon',
  "Brilliant": 'icon',
  "C.H. Robinson": 'word',
  "Calabrio": 'icon',
  "Caparra": 'icon',
  "CareSupport": 'icon',
  "ChatLPO": 'word',
  "Chickensoft": 'icon',
  "Chosn": 'word',
  "Cloudflare": 'word',
  "Crucible Energy": 'icon',
  "Custom AI Studio": 'icon',
  "Deep Render": 'icon',
  "EY": 'lockup',
  "Elucid": 'word',
  "Ever Just": 'icon',
  "Famelia": 'word',
  "FlowDevs": 'icon',
  "Fulcrum Neuro": 'wide',
  "Gullview Tech": 'word',
  "Hacker Sidekick": 'icon',
  "Invene": 'icon',
  "Kwikly": 'word',
  "Life Time": 'word',
  "LifeFx": 'icon',
  "Luminal": 'icon',
  "Mayo Clinic": 'icon',
  "Medtronic": 'icon',
  "Monkey Island": 'icon',
  "NASA": 'icon',
  "Nerdery": 'word',
  "Omega Point": 'wide',
  "Optum": 'word',
  "Ovicounter AI": 'icon',
  "Ovul": 'icon',
  "Parallax": 'icon',
  "Quantified Mechanix": 'icon',
  "Quinoa": 'icon',
  "Rainmaker": 'wide',
  "Remarketspace": 'icon',
  "Rosenblatt AI": 'wide',
  "Satori": 'icon',
  "Simple Lead AI": 'icon',
  "Simplify AI": 'word',
  "Skail": 'word',
  "St. Thomas": 'word',
  "Submitta": 'word',
  "TSL Consulting": 'word',
  "Talknician": 'icon',
  "Target": 'icon',
  "Tortus": 'wide',
  "U of Minnesota": 'lockup',
  "UMN Morris": 'icon',
  "UST Nexus": 'icon',
  "UW-River Falls": 'icon',
  "Univ. Paris-Saclay": 'word',
  "VelociTx": 'icon',
  "Very Good Ventures": 'word',
  "VirtualGo": 'word',
  "We Network Now": 'icon',
  "Withum": 'word',
  "Wrapped": 'icon',
  "Xcel Energy": 'word',
  "smallest.ai": 'icon',
};

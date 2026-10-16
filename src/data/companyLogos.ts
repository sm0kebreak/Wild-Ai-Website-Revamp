export interface CompanyLogo {
  name: string;
  logo?: string;
  url?: string;
  /** 'dark-bg': light art on an opaque dark box. 'light-ink': light art on transparency. 'plain': a single-color mark drawn in bone. */
  tone?: 'dark-bg' | 'deep-bg' | 'light-ink' | 'plain';
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
  logo: '/lovable-uploads/attentio-logo.png',
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
  logo: '/lovable-uploads/boardwalk-logo.png',
  url: 'https://mymeddefend.com/'
}, {
  name: 'Brilliant',
  logo: '/lovable-uploads/brilliant-logo.png?v=2',
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
  logo: '/lovable-uploads/caparra-logo.png',
  url: 'https://caparra.ai/'
}, {
  name: 'Chosn',
  logo: '/lovable-uploads/chosn-logo.png',
  url: 'https://www.chosn.io/'
}, {
  name: 'Crucible Energy',
  tone: 'dark-bg',
  logo: '/lovable-uploads/crucible-logo.png',
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
  logo: '/lovable-uploads/ey-logo.png?v=2',
  url: 'https://www.ey.com/'
}, {
  name: 'FlowDevs',
  logo: '/lovable-uploads/flowdevs-logo.png',
  url: 'https://www.flowdevs.io/'
}, {
  name: 'Fulcrum Neuro',
  logo: '/lovable-uploads/fulcrumneuro-logo.png?v=2',
  url: 'https://www.fulcrumneuro.com/'
}, {
  name: 'Gullview Tech',
  tone: 'light-ink',
  logo: '/lovable-uploads/gullview-logo.png?v=2',
  url: 'https://www.gullviewtech.com/'
}, {
  name: 'Hacker Sidekick',
  logo: '/lovable-uploads/hackersidekick-logo.png',
  url: 'https://hackersidekick.com'
}, {
  name: 'Life Time',
  logo: '/lovable-uploads/lifetime-logo.png',
  url: 'https://www.lifetime.life/'
}, {
  name: 'LifeFx',
  logo: '/lovable-uploads/lifefx-logo.png',
  url: 'https://www.lifefxmn.com/'
}, {
  name: 'Medtronic',
  logo: '/lovable-uploads/medtronic-logo.png',
  url: 'https://www.medtronic.com/en-us/index.html'
}, {
  name: 'Monkey Island',
  tone: 'light-ink',
  logo: '/lovable-uploads/monkeyisland-logo.png?v=2',
  url: 'https://www.monkeyislandventures.com/'
}, {
  name: 'Ovul',
  tone: 'light-ink',
  logo: '/lovable-uploads/ovul-logo.png',
  url: 'https://ovul.ai/'
}, {
  name: 'Quantified Mechanix',
  logo: '/lovable-uploads/quantifiedmechanix-logo.png?v=2',
  url: 'https://quantifiedmechanix.com/'
}, {
  name: 'Rainmaker',
  tone: 'light-ink',
  logo: '/lovable-uploads/rainmaker-logo.png?v=2',
  url: 'https://www.rainmakergrows.com/'
}, {
  name: 'Remarketspace',
  logo: '/lovable-uploads/remarketspace-logo.png',
  url: 'https://www.remarketspace.com/'
}, {
  name: 'Simplify AI',
  logo: '/lovable-uploads/simplifyai-logo.png',
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
  logo: '/lovable-uploads/submitta-logo.png',
  url: 'https://www.linkedin.com/company/submitta/'
}, {
  name: 'Talknician',
  tone: 'dark-bg',
  logo: '/lovable-uploads/talknician-logo.png',
  url: 'https://www.talknician.com/'
}, {
  name: 'TSL Consulting',
  logo: '/lovable-uploads/tslconsulting-logo.png?v=2',
  url: 'https://tslconsulting.in/'
}, {
  name: 'U of Minnesota',
  logo: '/lovable-uploads/umn-logo.png?v=2',
  url: 'https://www.umn.edu/'
}, {
  name: 'UMN Morris',
  logo: '/lovable-uploads/umnmorris-logo.png?v=2',
  url: 'https://www.morris.umn.edu/'
}, {
  name: 'Univ. Paris-Saclay',
  logo: '/lovable-uploads/paris-saclay-logo.png',
  url: 'http://www.universite-paris-saclay.fr/fr'
}, {
  name: 'UST Nexus',
  tone: 'deep-bg',
  logo: '/lovable-uploads/ustnexus-logo.png',
  url: 'https://ustnexus.club/'
}, {
  name: 'VirtualGo',
  tone: 'dark-bg',
  logo: '/lovable-uploads/virtualgo-logo.png',
  url: 'https://www.virtualgoreality.com/'
}, {
  name: 'We Network Now',
  logo: '/lovable-uploads/wenetworknow-logo.png?v=2',
  url: 'https://wenetworknow.org/'
}, {
  name: 'Withum',
  logo: '/lovable-uploads/withum-logo.png?v=2',
  url: 'https://www.withum.com/'
}, {
  name: 'Xcel Energy',
  logo: '/lovable-uploads/xcelenergy-logo.png',
  url: 'https://www.xcelenergy.com/'
}];

/**
 * Speaker companies that are not already in `existingLogos`.
 * A logo is used when a real mark was available. Otherwise the carousel draws a wordmark.
 */
export const speakerStageLogos: CompanyLogo[] = [
  { name: '3M', logo: '/lovable-uploads/3m-logo.svg', url: 'https://www.3m.com/', tone: 'plain' },
  { name: 'Agora', url: 'https://www.agora.io/' },
  { name: 'Altruistic Intelligence' },
  { name: 'CareSupport' },
  { name: 'ChatLPO' },
  { name: 'Chickensoft' },
  { name: 'Cloudflare', logo: '/lovable-uploads/cloudflare-logo.svg', url: 'https://www.cloudflare.com/', tone: 'plain' },
  { name: 'Custom AI Studio' },
  { name: 'Deep Render' },
  { name: 'Famelia' },
  { name: 'Invene' },
  { name: 'Luminal' },
  { name: 'Mayo Clinic', logo: '/lovable-uploads/mayo-clinic-logo.svg', url: 'https://www.mayoclinic.org/', tone: 'plain' },
  { name: 'Memory Atlas' },
  { name: 'NASA', logo: '/lovable-uploads/nasa-logo.svg', url: 'https://www.nasa.gov/', tone: 'plain' },
  { name: 'Nerdery', url: 'https://www.nerdery.com/' },
  { name: 'Omega Point' },
  { name: 'Onni Health' },
  { name: 'Optum', url: 'https://www.optum.com/' },
  { name: 'Ovicounter AI' },
  { name: 'Parallax' },
  { name: 'Quickly' },
  { name: 'Rosenblatt AI' },
  { name: 'Satori' },
  { name: 'Simple Lead AI', url: 'https://siimplelead.com/' },
  { name: 'smallest.ai', url: 'https://smallest.ai/' },
  { name: 'Talkition' },
  { name: 'Target', logo: '/lovable-uploads/target-logo.svg', url: 'https://www.target.com/', tone: 'plain' },
  { name: 'Tortus' },
  { name: 'UW-River Falls', url: 'https://www.uwrf.edu/' },
  { name: 'VelociTx' },
  { name: 'Very Good Ventures', url: 'https://verygood.ventures/' },
  { name: 'Wrapped' },
];

/** Existing marks plus every speaker company that was not already in the carousel. */
export const logos: CompanyLogo[] = [...existingLogos, ...speakerStageLogos];

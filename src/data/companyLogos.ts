export interface CompanyLogo {
  name: string;
  logo?: string;
  url?: string;
  /** 'dark-bg': light art on an opaque dark box. 'light-ink': light art on transparency. 'plain': a single-color mark. */
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
 * A logo is used when a real mark was available. Otherwise the carousel draws the name.
 */
export const speakerStageLogos: CompanyLogo[] = [
  { name: '3M', logo: '/logos/3m.svg', url: 'https://www.3m.com/' },
  { name: 'Agora', logo: '/logos/agora.webp', url: 'https://www.agora.io/' },
  { name: 'Altruistic Intelligence' },
  { name: 'CareSupport', logo: '/logos/caresupport.webp', url: 'https://caresupport.com/' },
  { name: 'ChatLPO', logo: '/logos/chatlpo.svg', url: 'https://chatlpo.com/' },
  { name: 'Chickensoft', logo: '/logos/chickensoft.png', url: 'https://chickensoft.games/' },
  { name: 'Cloudflare', logo: '/logos/cloudflare.svg', url: 'https://www.cloudflare.com/' },
  { name: 'Custom AI Studio', logo: '/logos/custom-ai-studio.png', url: 'https://www.customaistudio.io/' },
  { name: 'Deep Render', logo: '/logos/deep-render.png', url: 'https://deeprender.ai/' },
  { name: 'Famelia', logo: '/logos/famelia.svg', url: 'https://famelia.app/' },
  { name: 'Invene', logo: '/logos/invene.png', url: 'https://www.invene.com/' },
  { name: 'Luminal', logo: '/logos/luminal.svg', url: 'https://luminal.com/' },
  { name: 'Mayo Clinic', logo: '/logos/mayo-clinic.svg', url: 'https://www.mayoclinic.org/' },
  { name: 'Memory Atlas', url: 'https://devpost.com/software/memory-atlas' },
  { name: 'NASA', logo: '/logos/nasa.svg', url: 'https://www.nasa.gov/' },
  { name: 'Nerdery', logo: '/logos/nerdery.svg', url: 'https://www.nerdery.com/' },
  { name: 'Omega Point', logo: '/logos/omega-point.png', url: 'https://www.ompnt.com/' },
  { name: 'Onni Health', url: 'https://www.linkedin.com/company/nimblehealthh' },
  { name: 'Optum', logo: '/logos/optum.svg', url: 'https://www.optum.com/' },
  { name: 'Ovicounter AI', logo: '/logos/ovicounter.svg', url: 'https://ovicounter.ai/' },
  { name: 'Parallax', logo: '/logos/parallax.png', url: 'https://www.getparallax.com/', tone: 'dark-bg' },
  { name: 'Quickly' },
  { name: 'Quinoa', logo: '/lovable-uploads/quinoa-logo.png', url: 'https://quinoa.health' },
  { name: 'Rosenblatt AI', logo: '/logos/rosenblatt.svg', url: 'https://www.rosenblatt.ai/', tone: 'light-ink' },
  { name: 'Satori', logo: '/logos/satori.png', url: 'https://satori.sh/', tone: 'light-ink' },
  { name: 'Simple Lead AI', logo: '/logos/simple-lead.png', url: 'https://siimplelead.com/' },
  { name: 'smallest.ai', logo: '/logos/smallest.png', url: 'https://smallest.ai/' },
  { name: 'Target', logo: '/logos/target.png', url: 'https://www.target.com/' },
  { name: 'Tortus', logo: '/logos/tortus.png', url: 'https://tortus.ai/' },
  { name: 'UW-River Falls', logo: '/logos/uwrf.png', url: 'https://www.uwrf.edu/' },
  { name: 'VelociTx', logo: '/logos/velocitx.png', url: 'https://velocitx.com/' },
  { name: 'Very Good Ventures', logo: '/logos/very-good-ventures.svg', url: 'https://verygood.ventures/' },
  { name: 'Wrapped', logo: '/logos/wrappt.png', url: 'https://wrappt.ai/', tone: 'dark-bg' },
];

/** Existing marks plus every speaker company that was not already in the carousel. */
export const logos: CompanyLogo[] = [...existingLogos, ...speakerStageLogos];

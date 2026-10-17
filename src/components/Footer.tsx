import React from 'react';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import EmailCapture from '@/components/EmailCapture';
import { useChapters } from '@/hooks/useChapters';

const LINKEDIN_PATH = 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z';
const INSTAGRAM_PATH = 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077';
const MEETUP_PATH = 'M6.98.555a.518.518 0 0 0-.105.011.53.53 0 1 0 .222 1.04.533.533 0 0 0 .409-.633.531.531 0 0 0-.526-.418zm6.455.638a.984.984 0 0 0-.514.143.99.99 0 1 0 1.02 1.699.99.99 0 0 0 .34-1.36.992.992 0 0 0-.846-.482zm-3.03 2.236a5.029 5.029 0 0 0-4.668 3.248 3.33 3.33 0 0 0-1.46.551 3.374 3.374 0 0 0-.94 4.562 3.634 3.634 0 0 0-.605 4.649 3.603 3.603 0 0 0 2.465 1.597c.018.732.238 1.466.686 2.114a3.9 3.9 0 0 0 5.423.992c.068-.047.12-.106.184-.157.987.881 2.47 1.026 3.607.24a2.91 2.91 0 0 0 1.162-1.69 4.238 4.238 0 0 0 2.584-.739 4.274 4.274 0 0 0 1.19-5.789 2.466 2.466 0 0 0 .433-3.308 2.448 2.448 0 0 0-1.316-.934 4.436 4.436 0 0 0-.776-2.873 4.467 4.467 0 0 0-5.195-1.656 5.106 5.106 0 0 0-2.773-.807zm-5.603.817a.759.759 0 0 0-.423.135.758.758 0 1 0 .863 1.248.757.757 0 0 0 .193-1.055.758.758 0 0 0-.633-.328zm15.994 2.37a.842.842 0 0 0-.47.151.845.845 0 1 0 1.175.215.845.845 0 0 0-.705-.365zm-8.15 1.028c.063 0 .124.005.182.014a.901.901 0 0 1 .45.187c.169.134.273.241.432.393.24.227.414.089.534.02.208-.122.369-.219.984-.208.633.011 1.363.237 1.514 1.317.168 1.199-1.966 4.289-1.817 5.722.106 1.01 1.815.299 1.96 1.22.186 1.198-2.136.753-2.667.493-.832-.408-1.337-1.34-1.12-2.26.16-.688 1.7-3.498 1.757-3.93.059-.44-.177-.476-.324-.484-.19-.01-.34.081-.526.362-.169.255-2.082 4.085-2.248 4.398-.296.56-.67.694-1.044.674-.548-.029-.798-.32-.72-.848.047-.31 1.26-3.049 1.323-3.476.039-.265-.013-.546-.275-.68-.263-.135-.572.07-.664.227-.128.215-1.848 4.706-2.032 5.038-.316.576-.65.76-1.152.784-1.186.056-2.065-.92-1.678-2.116.173-.532 1.316-4.571 1.895-5.599.389-.69 1.468-1.216 2.217-.892.387.167.925.437 1.084.507.366.163.759-.277.913-.412.155-.134.302-.276.49-.357.142-.06.343-.095.532-.094zm10.88 2.057a.468.468 0 0 0-.093.011.467.467 0 0 0-.36.555.47.47 0 0 0 .557.36.47.47 0 0 0 .36-.557.47.47 0 0 0-.464-.37zm-22.518.81a.997.997 0 0 0-.832.434 1 1 0 1 0 1.39-.258 1 1 0 0 0-.558-.176zm21.294 2.094a.635.635 0 0 0-.127.013.627.627 0 0 0-.48.746.628.628 0 0 0 .746.483.628.628 0 0 0 .482-.746.63.63 0 0 0-.621-.496zm-18.24 6.097a.453.453 0 0 0-.092.012.464.464 0 1 0 .195.908.464.464 0 0 0 .356-.553.465.465 0 0 0-.459-.367zm13.675 1.55a1.044 1.044 0 0 0-.583.187 1.047 1.047 0 1 0 1.456.265 1.044 1.044 0 0 0-.873-.451zM11.4 22.154a.643.643 0 0 0-.36.115.646.646 0 0 0-.164.899.646.646 0 0 0 .899.164.646.646 0 0 0 .164-.898.646.646 0 0 0-.54-.28z';
const YOUTUBE_PATH = 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z';
const LUMA_PATH = 'M21.925 12C16.445 12 12 7.521 12 2c0 5.521-4.445 10-9.925 10 5.48 0 9.925 4.479 9.925 10 0-5.521 4.445-10 9.925-10Z';

const socialLinkClass =
  'w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors';

const BrandIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground" aria-hidden="true">
    <path fill="currentColor" d={d} />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 text-foreground"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Footer = () => {
  const { data: chapters } = useChapters();

  return (
    <footer className="site-footer border-t border-border bg-secondary/40 py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.15fr_.85fr] md:gap-10">
          <div>
            <div className="mb-4 flex items-center">
<Logo className="h-8" />
            </div>

            <p className="mb-4 max-w-md text-muted-foreground">
              A meetup for people who build with AI. Minneapolis first, now more cities.
            </p>

            <div className="mb-5 max-w-sm">
              <EmailCapture
                source="footer"
                title="STAY IN THE LOOP"
                description="Join the email list"
                compact
              />
            </div>

            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/wild-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on LinkedIn"
                className={socialLinkClass}
              >
                <BrandIcon d={LINKEDIN_PATH} />
              </a>
              <a
                href="https://www.meetup.com/wild-ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on Meetup"
                className={socialLinkClass}
              >
                <BrandIcon d={MEETUP_PATH} />
              </a>
              <a
                href="https://luma.com/wildai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on Luma"
                className={socialLinkClass}
              >
                <BrandIcon d={LUMA_PATH} />
              </a>
              <a
                href="https://www.youtube.com/@WildAI-US"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on YouTube"
                className={socialLinkClass}
              >
                <BrandIcon d={YOUTUBE_PATH} />
              </a>
              <a
                href="https://www.instagram.com/wildai.us/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on Instagram, @wildai.us"
                className={socialLinkClass}
              >
                <BrandIcon d={INSTAGRAM_PATH} />
              </a>
              <a
                href="mailto:jake@wildai.us"
                aria-label="Email Wild AI"
                className={socialLinkClass}
              >
                <MailIcon />
              </a>
            </div>
          </div>
          <div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <h4 className="signal-label mb-4">Chapters</h4>
                <ul className="space-y-2">
                  {(chapters ?? []).map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/${c.slug}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {c.city}
                        {c.status === 'launching' ? ' (launching)' : ''}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/chapters" className="text-wildai-mint hover:underline transition-colors">
                      All chapters →
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="signal-label mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/speak" className="text-muted-foreground hover:text-foreground transition-colors">
                      Speak
                    </Link>
                  </li>
                  <li>
                    <Link to="/sponsor" className="text-muted-foreground hover:text-foreground transition-colors">
                      Sponsor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/start-a-chapter"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Start a chapter
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/about#conduct"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Code of conduct
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="signal-label mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.meetup.com/wild-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Wild AI on Meetup
                  </a>
                </li>
                <li>
                  <a
                    href="https://luma.com/wildai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Wild AI on Luma
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-4 text-center text-xs text-muted-foreground">
          <p>© 2026 Wild AI Meetup. Events in the United States and Canada. Canadian chapters follow PIPEDA for subscriber data.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

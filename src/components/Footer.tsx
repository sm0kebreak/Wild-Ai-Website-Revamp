
import React from 'react';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';
import { Youtube, Mail, Linkedin, Instagram } from 'lucide-react';
import EmailCapture from '@/components/EmailCapture';
import { useChapters } from '@/hooks/useChapters';

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
                description="Event invites and recaps, one email per event."
                compact
              />
            </div>

            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/wild-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on LinkedIn"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Linkedin className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="https://www.meetup.com/wild-ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on Meetup"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M6.98.555a.518.518 0 0 0-.105.011.53.53 0 1 0 .222 1.04.533.533 0 0 0 .409-.633.531.531 0 0 0-.526-.418zm6.455.638a.984.984 0 0 0-.514.143.99.99 0 1 0 1.02 1.699.99.99 0 0 0 .34-1.36.992.992 0 0 0-.846-.482zm-3.03 2.236a5.029 5.029 0 0 0-4.668 3.248 3.33 3.33 0 0 0-1.46.551 3.374 3.374 0 0 0-.94 4.562 3.634 3.634 0 0 0-.605 4.649 3.603 3.603 0 0 0 2.465 1.597c.018.732.238 1.466.686 2.114a3.9 3.9 0 0 0 5.423.992c.068-.047.12-.106.184-.157.987.881 2.47 1.026 3.607.24a2.91 2.91 0 0 0 1.162-1.69 4.238 4.238 0 0 0 2.584-.739 4.274 4.274 0 0 0 1.19-5.789 2.466 2.466 0 0 0 .433-3.308 2.448 2.448 0 0 0-1.316-.934 4.436 4.436 0 0 0-.776-2.873 4.467 4.467 0 0 0-5.195-1.656 5.106 5.106 0 0 0-2.773-.807zm-5.603.817a.759.759 0 0 0-.423.135.758.758 0 1 0 .863 1.248.757.757 0 0 0 .193-1.055.758.758 0 0 0-.633-.328zm15.994 2.37a.842.842 0 0 0-.47.151.845.845 0 1 0 1.175.215.845.845 0 0 0-.705-.365zm-8.15 1.028c.063 0 .124.005.182.014a.901.901 0 0 1 .45.187c.169.134.273.241.432.393.24.227.414.089.534.02.208-.122.369-.219.984-.208.633.011 1.363.237 1.514 1.317.168 1.199-1.966 4.289-1.817 5.722.106 1.01 1.815.299 1.96 1.22.186 1.198-2.136.753-2.667.493-.832-.408-1.337-1.34-1.12-2.26.16-.688 1.7-3.498 1.757-3.93.059-.44-.177-.476-.324-.484-.19-.01-.34.081-.526.362-.169.255-2.082 4.085-2.248 4.398-.296.56-.67.694-1.044.674-.548-.029-.798-.32-.72-.848.047-.31 1.26-3.049 1.323-3.476.039-.265-.013-.546-.275-.68-.263-.135-.572.07-.664.227-.128.215-1.848 4.706-2.032 5.038-.316.576-.65.76-1.152.784-1.186.056-2.065-.92-1.678-2.116.173-.532 1.316-4.571 1.895-5.599.389-.69 1.468-1.216 2.217-.892.387.167.925.437 1.084.507.366.163.759-.277.913-.412.155-.134.302-.276.49-.357.142-.06.343-.095.532-.094zm10.88 2.057a.468.468 0 0 0-.093.011.467.467 0 0 0-.36.555.47.47 0 0 0 .557.36.47.47 0 0 0 .36-.557.47.47 0 0 0-.464-.37zm-22.518.81a.997.997 0 0 0-.832.434 1 1 0 1 0 1.39-.258 1 1 0 0 0-.558-.176zm21.294 2.094a.635.635 0 0 0-.127.013.627.627 0 0 0-.48.746.628.628 0 0 0 .746.483.628.628 0 0 0 .482-.746.63.63 0 0 0-.621-.496zm-18.24 6.097a.453.453 0 0 0-.092.012.464.464 0 1 0 .195.908.464.464 0 0 0 .356-.553.465.465 0 0 0-.459-.367zm13.675 1.55a1.044 1.044 0 0 0-.583.187 1.047 1.047 0 1 0 1.456.265 1.044 1.044 0 0 0-.873-.451zM11.4 22.154a.643.643 0 0 0-.36.115.646.646 0 0 0-.164.899.646.646 0 0 0 .899.164.646.646 0 0 0 .164-.898.646.646 0 0 0-.54-.28z"
                  />
                </svg>
              </a>
              <a
                href="https://luma.com/wildai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on Luma"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-foreground" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M21.925 12C16.445 12 12 7.521 12 2c0 5.521-4.445 10-9.925 10 5.48 0 9.925 4.479 9.925 10 0-5.521 4.445-10 9.925-10Z"
                  />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@WildAI-US"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on YouTube"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Youtube className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="https://www.instagram.com/wildai.us/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on Instagram, @wildai.us"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Instagram className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="mailto:jake@wildai.us"
                aria-label="Email Wild AI"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-foreground" />
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

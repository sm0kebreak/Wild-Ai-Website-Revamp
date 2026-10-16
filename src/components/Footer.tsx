
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
                    d="M7.2 16.8 4.2 8.4h2.2l1.9 5.4 1.9-5.4h2.1l-3 8.4H7.2zm6.6 0V10.7l-2.1 2.6h-.2l.2-2.6h1.8V7.6h2.4v3.1l2 3.1h.1l.1-3.1H20v9.2h-2.1l-2-3.1h-.1l.1 3.1h-2.1z"
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
                    d="M12 2.8 13.7 8.6 19.6 10.4 13.7 12.2 12 18 10.3 12.2 4.4 10.4 10.3 8.6 12 2.8Zm6.2 11.2.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"
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

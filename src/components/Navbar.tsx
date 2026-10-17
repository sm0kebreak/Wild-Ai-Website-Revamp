import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Logo from '@/components/Logo';
import CommandPalette, { useCommandPalette } from '@/components/CommandPalette';
import { publicChapters } from '@/data/chapters';
import { nextMeetupDate, rsvpUrlFor } from '@/lib/meetupSchedule';
import { prefersNativeScroll } from '@/hooks/useScrollProgress';

const navLinks = [
  { to: '/chapters', label: 'Chapters' },
  { to: '/events', label: 'Events' },
  { to: '/speak', label: 'Speak' },
  { to: '/sponsor', label: 'Sponsor' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const palette = useCommandPalette();
  const rsvpUrl = rsvpUrlFor(nextMeetupDate());

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      const next = window.scrollY > 12;
      setScrolled((prev) => (prev === next ? prev : next));
      if (prefersNativeScroll()) return;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bar = barRef.current;
        if (!bar) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-border bg-background' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-16 min-w-0 items-center justify-between gap-3 px-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link to="/" className="flex min-w-0 items-center">
              <Logo className="h-7 max-w-[9.5rem] md:h-8 md:max-w-none" data-nav-logo="" />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-active={pathname.startsWith(l.to)}
                className="nav-signal text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => palette.setOpen(true)}
              aria-label="Search the site"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 py-1.5 pl-3 pr-2 text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="rounded border border-border bg-background/70 px-1.5 py-0.5 font-mono text-[0.625rem]">
                ⌘K
              </kbd>
            </button>

            {isMobile && (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open navigation">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {navLinks.map((l) => (
                    <DropdownMenuItem key={l.to} asChild>
                      <Link to={l.to} className="cursor-pointer">
                        {l.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  {publicChapters.map((chapter) => (
                    <DropdownMenuItem key={chapter.slug} asChild>
                      <Link to={`/${chapter.slug}`} className="cursor-pointer">
                        {chapter.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/start-a-chapter" className="cursor-pointer">
                      Start a chapter
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button asChild size={isMobile ? 'sm' : 'default'} className="min-h-11 px-4 md:min-h-10">
              <a href={rsvpUrl} target="_blank" rel="noopener noreferrer">
                Register
              </a>
            </Button>
          </div>
        </div>

        <div
          ref={barRef}
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent/70"
          aria-hidden="true"
        />
      </header>

      <CommandPalette open={palette.open} onOpenChange={palette.setOpen} />
    </>
  );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
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
  const { pathname } = useLocation();
  const palette = useCommandPalette();
  const rsvpUrl = rsvpUrlFor(nextMeetupDate());

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 8;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="site-header fixed top-0 left-0 right-0 z-50" data-scrolled={scrolled ? 'true' : 'false'}>
        <div className="relative mx-auto flex h-12 min-w-0 items-center px-4 md:h-14 md:px-6">
          <Link to="/" className="relative z-10 flex min-w-0 items-center">
            <Logo className="h-auto max-h-6 w-auto max-w-[8.5rem] md:max-h-7" data-nav-logo="" />
          </Link>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-active={pathname.startsWith(l.to)}
                className="whitespace-nowrap text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => palette.setOpen(true)}
              aria-label="Search the site"
              className="hidden min-h-11 items-center gap-1.5 px-2 text-sm font-medium text-white/80 hover:text-white md:inline-flex"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>

            {isMobile && (
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open navigation" className="text-white hover:bg-white/10 hover:text-white">
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

            <a
              href={rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-white"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      <CommandPalette open={palette.open} onOpenChange={palette.setOpen} />
    </>
  );
};

export default Navbar;

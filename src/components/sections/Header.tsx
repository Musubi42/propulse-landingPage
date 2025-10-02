'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/programme', label: 'Le Programme' },
    { href: '/#founders', label: 'Nos Fondateurs' },
    { href: '/#mentors', label: 'Nos Mentors' },
  ];

  const ctaButtons = [
    {
      href: 'https://forms.gle/your-student-form',
      label: 'Je suis lycéen',
      variant: 'default' as const,
    },
    {
      href: 'https://forms.gle/your-mentor-form',
      label: 'Je deviens mentor',
      variant: 'outline' as const,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-background-tertiary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-white font-serif">P</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-primary font-serif">Propulse</span>
              <p className="text-xs text-text-tertiary -mt-1">100% gratuit • 100% à distance</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {ctaButtons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant={button.variant}
                  size="sm"
                  className={
                    button.variant === 'default'
                      ? 'bg-accent hover:bg-accent/90 text-white'
                      : ''
                  }
                >
                  {button.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-background-tertiary bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-2 pt-4 border-t border-background-tertiary">
              {ctaButtons.map((button) => (
                <Link
                  key={button.href}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={button.variant}
                    className={
                      button.variant === 'default'
                        ? 'bg-accent hover:bg-accent/90 text-white w-full'
                        : 'w-full'
                    }
                  >
                    {button.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
    { href: '/programme', label: 'Le programme' },
  ];

  return (
    <header
      className={`sticky h-[80px] top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#EBE3D5]/75 backdrop-blur-3xl shadow-sm'
          : 'bg-[#EBE3D5]'
      }`}
    >
      <div className="container w-[100vw]">
        <div className="flex h-20 items-center justify-between w-[100vw]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity absolute px-4 sm:px-6 lg:px-8"
          >
            <Image
              src="/logo.png"
              alt="Propulse - Mentorat gratuit vers les Grandes Écoles"
              width={140}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 w-full justify-center">
            {navLinks.map((link) => (
              <Link
                style={{textDecoration: 'none'}}
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[#2A2A2A] hover:text-[#D97642] transition-colors relative group no-underline"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D97642] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute right-0 md:hidden p-2 text-[#2A2A2A] hover:text-[#D97642] transition-colors rounded-lg hover:bg-[#FAF6F0]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#EBE3D5] bg-[#FAF6F0]/98 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-[#2A2A2A] hover:text-[#D97642] transition-colors py-3 border-b border-[#EBE3D5] last:border-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

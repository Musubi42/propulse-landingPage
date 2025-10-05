'use client';

import { Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative text-foreground mt-12" style={{ backgroundColor: 'rgb(var(--background-tertiary))' }}>
      {/* Mobile Wave - Taller, more pronounced */}
      <div
        className="absolute top-0 left-0 w-full h-[120px] -translate-y-[99%] md:hidden"
        style={{
          backgroundColor: 'rgb(var(--background-tertiary))',
          clipPath: 'polygon(0% 50%, 25% 30%, 50% 20%, 75% 30%, 100% 50%, 100% 100%, 0% 100%)',
        }}
      />

      {/* Desktop Wave - Wider, smoother curves */}
      <div
        className="hidden md:block absolute top-0 left-0 w-full h-[150px] -translate-y-[99%]"
        style={{
          backgroundColor: 'rgb(var(--background-tertiary))',
          clipPath: 'polygon(0% 45%, 8% 38%, 16% 32%, 24% 28%, 32% 26%, 40% 28%, 48% 32%, 56% 28%, 64% 26%, 72% 28%, 80% 32%, 88% 38%, 96% 45%, 100% 48%, 100% 100%, 0% 100%)',
        }}
      />

      <div className="container mx-auto px-4 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Propulse</h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              L&apos;association qui propulse les lycéens vers les Grandes Écoles
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#social-proof" className="text-foreground/80 hover:text-foreground transition-colors">
                  Le mouvement
                </Link>
              </li>
              <li>
                <Link href="/programme" className="text-foreground/80 hover:text-foreground transition-colors">
                  Le programme
                </Link>
              </li>
              <li>
                <Link href="/#founders" className="text-foreground/80 hover:text-foreground transition-colors">
                  Qui sommes-nous ?
                </Link>
              </li>
            </ul>
          </div>

          {/* Audiences */}
          <div>
            <h4 className="font-bold mb-4">Je suis...</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Lycéen
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Mentor
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Lycée / Établissement
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:propulse.association@gmail.com"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  propulse.association@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33769977242"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Arthur: 07 69 97 72 42
                </a>
              </li>
              <li>
                <a
                  href="tel:+33762542918"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Hugo: 07 62 54 29 18
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.linkedin.com/company/propulse-association"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} Propulse Association. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

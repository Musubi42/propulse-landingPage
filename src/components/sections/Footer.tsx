'use client';

import { Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Polymorph Wave Background at Top */}
      <div className="absolute top-[-40px] left-0 w-full">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1440 450"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', transform: 'scaleY(1.2) ' }}
        >
          <path
            fill="#EBE3D5"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10 pt-42">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Propulse</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              L&apos;association qui propulse les lycéens vers les Grandes Écoles
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#social-proof" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Le mouvement
                </Link>
              </li>
              <li>
                <Link href="/programme" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Le programme
                </Link>
              </li>
              <li>
                <Link href="/#founders" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
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
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Lycéen
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Mentor
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
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
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  propulse.association@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33769977242"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Arthur: 07 69 97 72 42
                </a>
              </li>
              <li>
                <a
                  href="tel:+33762542918"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
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
                  className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Propulse Association. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary-foreground transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-primary-foreground transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

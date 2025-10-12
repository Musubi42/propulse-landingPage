import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mentions légales | Propulse',
  description: 'Mentions légales du site Propulse Association.',
  alternates: {
    canonical: 'https://propulse-association.fr/mentions-legales',
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4">Mentions légales</h1>
          <p className="text-text-secondary text-lg">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-10">

          {/* 1. Éditeur du site */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">1. Éditeur du site</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                <strong className="text-foreground">Nom de l&apos;association :</strong> [NOM COMPLET DE L&apos;ASSOCIATION]
              </p>
              <p>
                <strong className="text-foreground">Forme juridique :</strong> Association loi 1901
              </p>
              <p>
                <strong className="text-foreground">Numéro RNA :</strong> [W + 9 chiffres]
              </p>
              <p>
                <strong className="text-foreground">Numéro SIRET :</strong> [14 chiffres si applicable, sinon &quot;Non applicable&quot;]
              </p>
              <p>
                <strong className="text-foreground">Siège social :</strong> [ADRESSE COMPLÈTE]
              </p>
              <p>
                <strong className="text-foreground">Date de déclaration :</strong> [JJ/MM/AAAA]
              </p>
              <p>
                <strong className="text-foreground">Directeur de la publication :</strong> [NOM DU PRÉSIDENT - Arthur Costa ou Hugo Nicaise]
              </p>
              <p>
                <strong className="text-foreground">Email :</strong>{' '}
                <a href="mailto:associationpropulse@gmail.com" className="text-primary hover:underline">
                  associationpropulse@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-foreground">Téléphone :</strong> +33 7 69 97 72 42 (Arthur) | +33 7 62 54 29 18 (Hugo)
              </p>
            </div>
          </section>

          {/* 2. Développement et conception */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">2. Développement et conception</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                <strong className="text-foreground">Développeur :</strong> THIBAUT Raphaël
              </p>
              <p>
                <strong className="text-foreground">Statut :</strong> Développeur libre
              </p>
              {/* <p>
                <strong className="text-foreground">SIRET :</strong> [14 chiffres si applicable]
              </p> */}
              <p>
                <strong className="text-foreground">Email :</strong>{' '}
                <a href="mailto:raphael@musubi.dev" className="text-primary hover:underline">
                  raphael@musubi.dev
                </a>
              </p>
              <p>
                <strong className="text-foreground">Site web :</strong>{' '}
                <a href="https://musubi.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  musubi.dev
                </a>
              </p>
            </div>
          </section>

          {/* 3. Hébergement */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">3. Hébergement</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Le site est hébergé par : <strong className="text-foreground">Vercel Inc.</strong>
              </p>
              <p>
                <strong className="text-foreground">Site web :</strong>{' '}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          {/* 4. Propriété intellectuelle */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">4. Propriété intellectuelle</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de l&apos;association Propulse, à l&apos;exception des marques et logos des écoles mentionnées.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l&apos;accord écrit de l&apos;association Propulse.
              </p>
            </div>
          </section>

          {/* 5. Responsabilité */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">5. Limitation de responsabilité</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                L&apos;association Propulse s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, elle ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition.
              </p>
              <p>
                L&apos;association Propulse ne pourra être tenue responsable des dommages directs ou indirects résultant de l&apos;utilisation de ce site ou de l&apos;impossibilité d&apos;y accéder.
              </p>
            </div>
          </section>

          {/* 6. Liens hypertextes */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">6. Liens hypertextes</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Le site peut contenir des liens vers d&apos;autres sites internet (notamment Google Forms, LinkedIn). L&apos;association Propulse ne saurait être responsable du contenu de ces sites tiers.
              </p>
            </div>
          </section>

          {/* 7. Droit applicable */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">7. Droit applicable</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </div>
          </section>

        </div>

        {/* Footer links */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
          >
            ← Retour à l&apos;accueil
          </Link>
          <span className="mx-4 text-text-tertiary">|</span>
          <Link
            href="/politique-de-confidentialite"
            className="text-primary hover:underline"
          >
            Politique de confidentialité
          </Link>
        </div>

      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | Propulse',
  description: 'Politique de confidentialité et protection des données personnelles de Propulse Association.',
  alternates: {
    canonical: 'https://propulse-association.fr/politique-de-confidentialite',
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-foreground mb-4">Politique de confidentialité</h1>
          <p className="text-text-secondary text-lg">
            Propulse s&apos;engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p className="text-text-tertiary text-sm mt-2">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-10">

          {/* 1. Responsable du traitement */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">1. Responsable du traitement des données</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                <strong className="text-foreground">Nom :</strong> [NOM COMPLET DE L&apos;ASSOCIATION]
              </p>
              <p>
                <strong className="text-foreground">Adresse :</strong> [ADRESSE DU SIÈGE SOCIAL]
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

          {/* 2. Données collectées */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">2. Données personnelles collectées</h2>

            <div className="space-y-6">
              {/* 2.1 Formulaires Google Forms */}
              <div>
                <h3 className="text-foreground text-xl mb-3">2.1 Formulaires d&apos;inscription</h3>
                <p className="text-text-secondary mb-4">
                  Nous collectons des données via <strong>Google Forms</strong> pour les inscriptions suivantes :
                </p>

                {/* Lycéens */}
                <div className="bg-background rounded-lg p-4 mb-4">
                  <h4 className="text-foreground font-bold mb-2">📚 Inscription Lycéens</h4>
                  <ul className="list-disc list-inside text-text-secondary space-y-1 text-sm">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Nom de votre lycéeLycée</li>
                    <li>Objectifs scolaires</li>
                  </ul>
                  <p className="text-text-tertiary text-sm mt-2">
                    <strong>Finalité :</strong> Sélection et accompagnement dans le programme de mentorat
                  </p>
                </div>

                {/* Mentors */}
                <div className="bg-background rounded-lg p-4 mb-4">
                  <h4 className="text-foreground font-bold mb-2">🎓 Inscription Mentors</h4>
                  <ul className="list-disc list-inside text-text-secondary space-y-1 text-sm">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Informations concernant le parcours du mentor</li>
                    <li>Informations concernant les envies du mentor par rapport à Propulse</li>
                  </ul>
                  <p className="text-text-tertiary text-sm mt-2">
                    <strong>Finalité :</strong> Constitution de l&apos;équipe de mentors et organisation du mentorat
                  </p>
                </div>

                {/* Lycées */}
                <div className="bg-background rounded-lg p-4">
                  <h4 className="text-foreground font-bold mb-2">🏫 Partenariats Lycées</h4>
                  <ul className="list-disc list-inside text-text-secondary space-y-1 text-sm">
                    <li>Adresse email du contact</li>
                    <li>Nom du lycée</li>
                    <li>Localisation du lycée</li>
                    <li>Informations générales concernant le lycée</li>
                  </ul>
                  <p className="text-text-tertiary text-sm mt-2">
                    <strong>Finalité :</strong> Établissement de partenariats avec les établissements scolaires
                  </p>
                </div>

                <p className="text-text-secondary text-sm mt-4 italic">
                  ⚠️ Les données collectées via Google Forms sont hébergées sur les serveurs de Google LLC.
                  Consultez la <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">politique de confidentialité de Google</a>.
                </p>
              </div>

              {/* 2.2 Vercel Analytics */}
              <div>
                <h3 className="text-foreground text-xl mb-3">2.2 Données de navigation (Vercel Analytics)</h3>
                <p className="text-text-secondary mb-3">
                  Nous utilisons <strong>Vercel Web Analytics</strong> pour mesurer l&apos;audience du site. Cet outil est <strong className="text-primary">100% anonyme</strong> et ne collecte <strong>aucune donnée personnelle identifiable</strong>.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-green-800 font-semibold mb-2">✅ Respectueux de la vie privée</p>
                  <ul className="list-disc list-inside text-green-700 space-y-1 text-sm">
                    <li><strong>Aucun cookie</strong> n&apos;est déposé sur votre navigateur</li>
                    <li><strong>Aucune donnée personnelle</strong> (pas d&apos;IP, pas de tracking)</li>
                    <li><strong>Conformité RGPD</strong> par design</li>
                    <li><strong>Pas de bannière de consentement requise</strong></li>
                  </ul>
                </div>

                <p className="text-text-tertiary text-sm mt-3">
                  <strong>Données collectées (anonymes) :</strong> URL visitée, type de navigateur, type d&apos;appareil, pays (approximatif), métriques de performance.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Base légale */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">3. Base légale du traitement</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Les traitements de données personnelles sont fondés sur :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Le consentement</strong> : En remplissant nos formulaires, vous consentez au traitement de vos données pour les finalités décrites.
                </li>
                <li>
                  <strong className="text-foreground">L&apos;intérêt légitime</strong> : Mesure d&apos;audience anonyme pour améliorer l&apos;expérience utilisateur (Vercel Analytics).
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Durée de conservation */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">4. Durée de conservation des données</h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                Conformément au RGPD, nous conservons vos données uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées :
              </p>

              <div className="bg-background rounded-lg p-4 space-y-3">
                <div>
                  <p className="font-bold text-foreground">📚 Lycéens (participants)</p>
                  <p className="text-sm"><strong>3 ans</strong> après la fin du programme ou le refus de candidature</p>
                </div>

                <div>
                  <p className="font-bold text-foreground">🎓 Mentors</p>
                  <p className="text-sm"><strong>3 ans</strong> après la dernière participation au programme</p>
                </div>

                <div>
                  <p className="font-bold text-foreground">🏫 Lycées (prospects et partenaires)</p>
                  <p className="text-sm"><strong>2 ans</strong> après le dernier contact</p>
                </div>

                <div>
                  <p className="font-bold text-foreground">📊 Données Vercel Analytics</p>
                  <p className="text-sm">Les données anonymes sont conservées <strong>24 heures</strong> puis automatiquement supprimées (seules les statistiques agrégées persistent)</p>
                </div>
              </div>

              <p className="text-sm italic">
                À l&apos;issue de ces durées, vos données sont <strong>supprimées définitivement</strong> de nos systèmes.
              </p>
            </div>
          </section>

          {/* 5. Partage des données */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">5. Destinataires des données</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Vos données personnelles sont accessibles uniquement à :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-foreground">L&apos;équipe Propulse</strong> (fondateurs et bénévoles autorisés)</li>
                <li><strong className="text-foreground">Google LLC</strong> (hébergement des formulaires Google Forms)</li>
                <li><strong className="text-foreground">Vercel Inc.</strong> (hébergement du site web - compte association)</li>
              </ul>
              <p className="mt-4">
                ⚠️ <strong className="text-foreground">Nous ne vendons ni ne louons vos données à des tiers.</strong>
              </p>
            </div>
          </section>

          {/* 6. Vos droits RGPD */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">6. Vos droits sur vos données</h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background rounded-lg p-4">
                  <p className="font-bold text-foreground mb-1">🔍 Droit d&apos;accès</p>
                  <p className="text-sm">Obtenir une copie de vos données personnelles</p>
                </div>

                <div className="bg-background rounded-lg p-4">
                  <p className="font-bold text-foreground mb-1">✏️ Droit de rectification</p>
                  <p className="text-sm">Corriger des données inexactes ou incomplètes</p>
                </div>

                <div className="bg-background rounded-lg p-4">
                  <p className="font-bold text-foreground mb-1">🗑️ Droit à l&apos;effacement</p>
                  <p className="text-sm">Demander la suppression de vos données</p>
                </div>

                <div className="bg-background rounded-lg p-4">
                  <p className="font-bold text-foreground mb-1">⛔ Droit d&apos;opposition</p>
                  <p className="text-sm">Vous opposer au traitement de vos données</p>
                </div>

                <div className="bg-background rounded-lg p-4">
                  <p className="font-bold text-foreground mb-1">📦 Droit à la portabilité</p>
                  <p className="text-sm">Récupérer vos données dans un format structuré</p>
                </div>

                <div className="bg-background rounded-lg p-4">
                  <p className="font-bold text-foreground mb-1">🚫 Droit à la limitation</p>
                  <p className="text-sm">Limiter le traitement de vos données</p>
                </div>
              </div>

              <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mt-6">
                <p className="font-bold text-foreground mb-2">📧 Exercer vos droits</p>
                <p className="text-sm">
                  Pour exercer vos droits, envoyez un email à :{' '}
                  <a href="mailto:associationpropulse@gmail.com" className="text-primary hover:underline font-semibold">
                    associationpropulse@gmail.com
                  </a>
                </p>
                <p className="text-sm mt-2">
                  <strong>Délai de réponse :</strong> 1 mois maximum (conformément à l&apos;article 12 du RGPD)
                </p>
              </div>

              <p className="text-sm mt-4">
                Vous disposez également du droit d&apos;introduire une réclamation auprès de la <strong className="text-foreground">CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) :{' '}
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  www.cnil.fr/fr/plaintes
                </a>
              </p>
            </div>
          </section>

          {/* 7. Sécurité */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">7. Sécurité des données</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Connexions sécurisées (HTTPS/SSL)</li>
                <li>Hébergement sur des infrastructures certifiées (Vercel, Google)</li>
                <li>Accès limité aux données (principe du moindre privilège)</li>
                <li>Procédure de suppression des données expirées</li>
              </ul>
            </div>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">8. Cookies et traceurs</h2>
            <div className="space-y-3 text-text-secondary">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold mb-2">
                  ✅ <strong>Bonne nouvelle :</strong> Ce site n&apos;utilise AUCUN cookie !
                </p>
                <p className="text-green-700 text-sm">
                  Grâce à Vercel Analytics, nous mesurons l&apos;audience de manière totalement anonyme, sans déposer de cookies sur votre navigateur.
                  <strong> Aucune bannière de consentement n&apos;est nécessaire.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* 9. Transferts internationaux */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">9. Transferts de données hors UE</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Certaines données peuvent être transférées hors de l&apos;Union européenne :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Google LLC</strong> (États-Unis) : Participe au EU-US Data Privacy Framework
                </li>
                <li>
                  <strong className="text-foreground">Vercel Inc.</strong> (États-Unis) : Hébergement sécurisé, données anonymes uniquement
                </li>
              </ul>
              <p className="mt-3">
                Ces transferts sont encadrés par des garanties appropriées (clauses contractuelles types de la Commission européenne).
              </p>
            </div>
          </section>

          {/* 10. Modifications */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">10. Modifications de la politique</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
              <p>
                En cas de modification substantielle, nous vous en informerons par email ou via une notification sur le site.
              </p>
            </div>
          </section>

          {/* 11. Contact */}
          <section>
            <h2 className="text-foreground mb-4 text-2xl md:text-3xl">11. Nous contacter</h2>
            <div className="space-y-3 text-text-secondary">
              <p>
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles :
              </p>
              <div className="bg-background rounded-lg p-4 space-y-2">
                <p>
                  <strong className="text-foreground">Email :</strong>{' '}
                  <a href="mailto:associationpropulse@gmail.com" className="text-primary hover:underline">
                    associationpropulse@gmail.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Téléphone :</strong> +33 7 69 97 72 42 (Arthur) | +33 7 62 54 29 18 (Hugo)
                </p>
                <p>
                  <strong className="text-foreground">Adresse postale :</strong> [ADRESSE DU SIÈGE SOCIAL]
                </p>
              </div>
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
            href="/mentions-legales"
            className="text-primary hover:underline"
          >
            Mentions légales
          </Link>
        </div>

      </div>
    </div>
  );
}

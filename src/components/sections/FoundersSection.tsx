'use client';

import { useState } from 'react';
import { FadeIn, ScaleIn, PenLine } from '@/components/animations';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function FoundersSection() {
  const [arthurExpanded, setArthurExpanded] = useState(false);
  const [hugoExpanded, setHugoExpanded] = useState(false);

  const { ref: arthurInViewRef, inView: arthurInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: hugoInViewRef, inView: hugoInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handleExpandArthur = () => {
    setArthurExpanded(true);
  };

  const handleExpandHugo = () => {
    setHugoExpanded(true);
  };

  const founders = [
    {
      name: 'Arthur Costa',
      role: 'Co-fondateur',
      education: 'EDHEC Lille & Université Paris-Dauphine',
      previewText: "Ce conseil a probablement ét&eacute; le meilleur qu'on aurait pu me donner. Aujourd'hui, **je souhaite aider des lycéens qui, comme moi, sont perdus dans l'univers de l'enseignement supérieur.**",
      story: [
        "Originaire du Sud-Ouest de la France, j'ai vécu dans un petit village de 400 habitants près de Tarbes avant de déménager dans la banlieue bordelaise. Issu d'un milieu plutôt rural, les longues études dans des établissements renommés n'allaient pas de soi.",
        "En Terminale, j'étais perdu quant à mes choix d'orientation. Mon professeur d'économie m'a conseillé les classes préparatoires — une filière que je ne connaissais pas jusqu'au milieu de mon année de terminale. **Ce conseil a probablement été le meilleur qu'on aurait pu me donner.**",
        "Après deux années de prépa passionnantes, j'ai intégré l'EDHEC Business School à Lille, École que je n'aurais jamais imaginé intégrer. Aujourd'hui diplômé de l'EDHEC et de Paris-Dauphine, **je souhaite aider des lycéens qui, comme moi, sont perdus dans l'univers de l'enseignement supérieur.**"
      ],
      expertise: ['Mathématiques', 'Physique', 'Orientation', 'Mentorat'],
      emoji: '🎓',
      linkedin: 'https://www.linkedin.com/in/arthur-costa',
      email: 'arthur@propulse-association.fr',
      phone: '+33769977242',
      expandable: true,
      designType: 'tornPaper' as const,
    },
    {
      name: 'Hugo Nicaise',
      role: 'Co-fondateur',
      education: 'EDHEC Lille',
      previewText: "Je me rends compte que tout cela n'a tenu qu'à un fil et que ma vie aurait pu être radicalement différente si on ne m'avait pas dit : **« fonce, tu en es capable ! »**",
      story: [
        "Mon cheminement scolaire ne fut pas un long fleuve tranquille. De bon élève à élève moyen voire mauvais, j'ai fait le choix de m'orienter vers un baccalauréat STMG. Cette filière m'a réconcilié avec l'école, me faisant reprendre confiance en mes capacités scolaires.",
        "La \"classe prépa\" m'était complètement inconnue deux mois avant Parcoursup. **Tout s'est joué sur un conseil de ma professeure principale.** J'ai changé ma volonté de faire des études courtes pour partir vers une filière longue et sélective.",
        "La classe préparatoire fut le point d'orgue de ma réconciliation avec l'école. Aujourd'hui je travaille au cabinet du Directeur général du groupe AFD, dans un milieu que je n'aurais jamais pu côtoyer sans l'ascenseur social de la classe prépa et des grandes écoles.",
        "Quand je regarde en arrière, **je me rends compte que tout cela n'a tenu qu'à un fil et que ma vie aurait pu être radicalement différente si on ne m'avait pas dit : « fonce, tu en es capable ! »**"
      ],
      expertise: ['Stratégie', 'Management', 'Partenariats', 'Développement'],
      emoji: '🚀',
      linkedin: 'https://www.linkedin.com/in/hugo-nicaise',
      email: 'hugo@propulse-association.fr',
      phone: '+33762542918',
      expandable: true,
      designType: 'penInk' as const,
    },
  ];

  return (
    <>
      {/* <PolymorphDivider variant="wave1" flip color="rgb(250, 246, 240)" /> */}

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" delay={0.1}>
              <h2 className="text-foreground mb-6">
                L&apos;histoire derrière{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Propulse</span>
                  <div className="absolute -bottom-2 left-0 w-full">
                    <PenLine
                      variant="underline"
                      width={180}
                      color="rgb(217, 118, 66)"
                      delay={0.5}
                    />
                  </div>
                </span>
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Deux étudiants qui ont vécu les inégalités d&apos;accès aux Grandes Écoles
                et qui ont décidé d&apos;agir.
              </p>
            </FadeIn>
          </div>

          {/* Founders Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {founders.map((founder, index) => (
              <ScaleIn key={founder.name} delay={0.3 + index * 0.2}>
                <div
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                  ref={index === 0 ? arthurInViewRef : hugoInViewRef}
                >
                  {/* Founder Photo */}
                  <div className="relative mb-6">
                    <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center text-6xl mx-auto shadow-lg">
                      {founder.emoji}
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mb-6">
                    <h3 className="font-bold text-foreground text-2xl mb-2">
                      {founder.name}
                    </h3>
                    <p className="text-primary text-base font-medium mb-1">
                      {founder.role}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {founder.education}
                    </p>
                  </div>

                  {/* Story */}
                  <div className="text-left text-text-secondary leading-relaxed text-sm mb-6">
                    {founder.expandable ? (
                      <>
                        <AnimatePresence mode="wait">
                          {(index === 0 && !arthurExpanded) || (index === 1 && !hugoExpanded) ? (
                            /* Preview with Vara Animation */
                            <motion.div
                              key="preview"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.4 }}
                              className="relative"
                            >
                              {founder.designType === 'tornPaper' ? (
                                /* Proposition 1: Torn Paper Design (Arthur) */
                                <div
                                  onClick={handleExpandArthur}
                                  className="torn-paper-note bg-gradient-to-br from-[#F5EFE6] to-[#EBE3D5] rounded-2xl p-6 shadow-xl cursor-pointer hover:shadow-2xl hover:-rotate-1 transition-all duration-300 relative"
                                  style={{
                                    transform: 'rotate(-1.5deg)',
                                    clipPath: 'polygon(0 2%, 3% 0, 7% 1%, 12% 0, 17% 2%, 21% 0, 26% 1%, 31% 0, 36% 2%, 41% 0, 46% 1%, 51% 0, 56% 2%, 61% 0, 66% 1%, 71% 0, 76% 2%, 81% 0, 86% 1%, 91% 0, 96% 2%, 100% 0, 100% 98%, 97% 100%, 93% 99%, 88% 100%, 83% 98%, 78% 100%, 73% 99%, 68% 100%, 63% 98%, 58% 100%, 53% 99%, 48% 100%, 43% 98%, 38% 100%, 33% 99%, 28% 100%, 23% 98%, 18% 100%, 13% 99%, 8% 100%, 3% 98%, 0 100%)'
                                  }}
                                >
                                  {/* Paper clip */}
                                  <div className="absolute -top-2 -right-2 text-2xl opacity-60">📎</div>

                                  {/* Handwritten quote with Framer Motion */}
                                  <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={arthurInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="font-handwriting italic text-xl text-[#1B3A52] min-h-[120px] mb-4"
                                    style={{
                                      fontFamily: "'Satisfy', cursive",
                                    }}
                                  >
                                    Ce conseil a probablement été le meilleur qu&apos;on aurait pu me donner. Aujourd&apos;hui, je souhaite aider des lycéens qui, comme moi, sont perdus dans l&apos;univers de l&apos;enseignement supérieur.
                                  </motion.p>

                                  {/* Button */}
                                  <button
                                    onClick={handleExpandArthur}
                                    className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1 mt-2 transition-colors"
                                  >
                                    Lire l&apos;histoire complète →
                                  </button>
                                </div>
                              ) : (
                                /* Proposition 2: Pen & Ink Box Design (Hugo) */
                                <div
                                  onClick={handleExpandHugo}
                                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 relative border-2 border-transparent"
                                  style={{
                                    borderImage: 'none',
                                  }}
                                >
                                  {/* Animated pen-drawn border */}
                                  <div className="absolute inset-0 rounded-2xl pointer-events-none">
                                    <svg className="absolute inset-0 w-full h-full" style={{ strokeDasharray: '10, 5' }}>
                                      <rect
                                        x="4"
                                        y="4"
                                        width="calc(100% - 8px)"
                                        height="calc(100% - 8px)"
                                        rx="16"
                                        fill="none"
                                        stroke="#D97642"
                                        strokeWidth="2"
                                        className="animate-draw-border"
                                      />
                                    </svg>
                                  </div>

                                  {/* Ink splatters */}
                                  <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-accent/20"></div>
                                  <div className="absolute bottom-4 left-6 w-1.5 h-1.5 rounded-full bg-accent/30"></div>

                                  {/* Handwritten quote with Framer Motion */}
                                  <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={hugoInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="font-handwriting italic text-xl text-[#D97642] min-h-[120px] mb-4 relative z-10"
                                    style={{
                                      fontFamily: "'Pacifico', cursive",
                                    }}
                                  >
                                    Je me rends compte que tout cela n&apos;a tenu qu&apos;à un fil et que ma vie aurait pu être radicalement différente si on ne m&apos;avait pas dit : « fonce, tu en es capable ! »
                                  </motion.p>

                                  {/* Hand-drawn arrow + button */}
                                  <div className="flex items-center gap-2 relative z-10">
                                    <span className="text-accent text-xl">→</span>
                                    <button
                                      onClick={handleExpandHugo}
                                      className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                                    >
                                      Découvrir l&apos;histoire
                                    </button>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            /* Full Story with ScaleIn Animation */
                            <motion.div
                              key="full-story"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="space-y-4">
                                {founder.story.map((paragraph, i) => (
                                  <ScaleIn key={i} delay={i * 0.1}>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: paragraph.replace(
                                          /\*\*(.*?)\*\*/g,
                                          '<strong class="text-foreground font-semibold">$1</strong>'
                                        ),
                                      }}
                                    />
                                  </ScaleIn>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : null}
                  </div>

                  {/* Pen Line Divider */}
                  <div className="flex justify-center my-6">
                    <PenLine
                      variant="horizontal-accent"
                      width={200}
                      height={2}
                      color="rgb(217, 118, 66)"
                      strokeWidth={2}
                      delay={0.5 + index * 0.2}
                    />
                  </div>

                  {/* Expertise Tags */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-foreground mb-3">Expertises :</p>
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 bg-primary/5 text-primary text-sm rounded-full border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`LinkedIn de ${founder.name}`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${founder.email}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`Email de ${founder.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={`tel:${founder.phone}`}
                      className="text-primary hover:text-primary/80 transition-colors"
                      aria-label={`Téléphone de ${founder.name}`}
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>

          {/* "Fonce!" Highlighted Quote */}
          <FadeIn direction="up" delay={0.7}>
            <div className="text-center mb-16 pt-8 border-t border-border max-w-4xl mx-auto">
              <blockquote className="text-4xl md:text-5xl lg:text-6xl font-bold italic text-accent mb-6">
                &ldquo;Fonce, tu en es capable !&rdquo;
              </blockquote>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                C&apos;est cette phrase qui a changé nos vies. C&apos;est cette même phrase
                que nous voulons transmettre à chaque lycéen motivé.
              </p>
            </div>
          </FadeIn>

          {/* Mission Statement */}
          <FadeIn direction="up" delay={0.7}>
            <div className="bg-primary/5 border-l-4 border-primary rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                Notre mission
              </h3>
              <p className="text-lg text-text-secondary leading-relaxed text-center">
                Démocratiser l&apos;accès aux Grandes Écoles en comblant les inégalités
                <strong className="text-primary"> géographiques, sociales et de genre</strong>.
                Un lycéen motivé à la fois, un mentor bienveillant à la fois.
              </p>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn direction="up" delay={0.9}>
            <div className="text-center mt-12">
              <p className="text-text-secondary mb-4">
                Une question ? Besoin d&apos;échanger ?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:propulse.association@gmail.com"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  propulse.association@gmail.com
                </a>
                <span className="hidden sm:inline text-text-tertiary">•</span>
                <div className="flex gap-4">
                  <span className="text-text-secondary">
                    Arthur: <a href="tel:+33769977242" className="text-primary hover:underline">07 69 97 72 42</a>
                  </span>
                  <span className="text-text-secondary">
                    Hugo: <a href="tel:+33762542918" className="text-primary hover:underline">07 62 54 29 18</a>
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

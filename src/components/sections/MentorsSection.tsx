'use client';

import { FadeIn, ScaleIn, InfiniteMovingCards } from '@/components/animations';
import { GraduationCap, Sparkles } from 'lucide-react';
import { schoolLogos } from '@/data/schools';

export function MentorsSection() {
  const testimonials = [
    {
      text: "Accompagner des lycéens motivés, c'est redonner ce que j'ai reçu. Voir leur progression et leur confiance grandir, c'est ma plus belle récompense.",
      name: 'Sarah',
      school: 'HEC Paris',
      emoji: '👩‍🎓',
    },
    {
      text: "J'aurais rêvé avoir un mentor quand j'étais au lycée. Aujourd'hui, je suis fier de pouvoir transmettre mon expérience et mes conseils.",
      name: 'Thomas',
      school: 'ESSEC',
      emoji: '👨‍🎓',
    },
  ];

  return (
    <>
      {/* <PolymorphDivider variant="wave2" flip color="rgb(245, 239, 230)" /> */}

      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent font-medium rounded-full text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                Nos Mentors
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <h2 className="text-foreground mb-6">
                <span className="text-accent">50+ étudiants</span> des meilleures écoles
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Des mentors bienveillants, passés par les Grandes Écoles,
                qui comprennent ton parcours et t&apos;accompagnent avec passion.
              </p>
            </FadeIn>
          </div>

          {/* Schools Carousel */}
          <div className="mb-16">
            <InfiniteMovingCards
              items={schoolLogos}
              direction="left"
              speed="normal"
              pauseOnHover={true}
            />
          </div>

          {/* Testimonials */}
          <div className="max-w-5xl mx-auto mb-12">
            <FadeIn direction="up" delay={1}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  Pourquoi ils s&apos;engagent
                </h3>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <ScaleIn key={testimonial.name} delay={1.2 + index * 0.2}>
                  <div className="bg-background rounded-2xl p-8 shadow-lg relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.emoji}
                    </div>
                    <p className="text-text-secondary leading-relaxed mb-6 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-bold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-text-tertiary">{testimonial.school}</p>
                      </div>
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>

          {/* CTA */}
          <FadeIn direction="up" delay={1.6}>
            <div className="text-center bg-background rounded-2xl p-8 md:p-12 max-w-3xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Envie de <span className="text-secondary">devenir mentor</span> ?
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Rejoins notre réseau de mentors bienveillants et fais la différence
                dans la vie d&apos;un lycéen motivé.
              </p>
              <a
                target='_blank'
                rel="noopener noreferrer"
                href="https://forms.gle/sqWqk59BCiP2CdLJA"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Je deviens mentor
              </a>
              <p className="text-sm text-text-tertiary mt-4">
                2h par mois • 100% à distance • Impact réel
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

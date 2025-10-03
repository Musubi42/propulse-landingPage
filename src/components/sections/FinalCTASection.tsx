'use client';

import { FadeIn, ScaleIn, PolymorphDivider } from '@/components/animations';
import { Rocket, Users, Building2, ArrowRight } from 'lucide-react';

export function FinalCTASection() {
  const audiences = [
    {
      icon: Rocket,
      title: 'Je suis lycéen',
      description: 'Tu vises une Grande École et tu veux être accompagné gratuitement',
      cta: 'M\'inscrire maintenant',
      href: '#',
      color: 'primary',
      bgColor: 'bg-primary',
      textColor: 'text-primary-foreground',
    },
    {
      icon: Users,
      title: 'Je deviens mentor',
      description: 'Tu es étudiant ou alumni et tu veux transmettre ton expérience',
      cta: 'Rejoindre les mentors',
      href: '#',
      color: 'secondary',
      bgColor: 'bg-secondary',
      textColor: 'text-secondary-foreground',
    },
    {
      icon: Building2,
      title: 'Je suis un lycée',
      description: 'Vous souhaitez proposer Propulse à vos élèves',
      cta: 'Discuter d\'un partenariat',
      href: '#',
      color: 'accent',
      bgColor: 'bg-accent',
      textColor: 'text-accent-foreground',
    },
  ];

  return (
    <>
      {/* <PolymorphDivider variant="wave1" color="rgb(250, 246, 240)" /> */}

      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn direction="up" delay={0.1}>
              <h2 className="text-foreground mb-6">
                Prêt à rejoindre le <span className="text-accent">mouvement</span> ?
              </h2>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <p className="text-xl text-text-secondary leading-relaxed">
                Que tu sois lycéen, mentor ou lycée, il y a une place pour toi dans Propulse.
              </p>
            </FadeIn>
          </div>

          {/* Three CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {audiences.map((audience, index) => (
              <ScaleIn key={audience.title} delay={0.3 + index * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                  {/* Icon */}
                  <div className={`inline-flex w-16 h-16 ${audience.bgColor} rounded-xl items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <audience.icon className={`w-8 h-8 ${audience.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {audience.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6 flex-grow">
                    {audience.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={audience.href}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-4 ${audience.bgColor} ${audience.textColor} font-semibold rounded-lg hover:opacity-90 transition-all duration-300 w-full group-hover:scale-105`}
                  >
                    {audience.cta}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </ScaleIn>
            ))}
          </div>

          {/* Bottom Message */}
          <FadeIn direction="up" delay={0.9}>
            <div className="text-center mt-16">
              <p className="text-text-secondary text-lg">
                🚀 Rejoins le mouvement qui{' '}
                <strong className="text-primary">propulse</strong> les lycéens vers les Grandes Écoles
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

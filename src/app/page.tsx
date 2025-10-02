import type { Metadata } from 'next';
import { FadeIn, ScaleIn, SlideIn, Counter, PenLine, PolymorphDivider } from '@/components/animations';

export const metadata: Metadata = {
  title: 'Propulse | Mentorat gratuit pour lycéens vers les Grandes Écoles',
  description: 'Propulse accompagne gratuitement et à distance les lycéens motivés vers les Grandes Écoles. Rejoignez le mouvement.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Animation Components Demo */}
      <section className="container mx-auto px-4 py-16">
        <FadeIn>
          <h1 className="text-foreground">Propulse</h1>
          <p className="mt-4 text-lg">Animation components test page</p>
        </FadeIn>

        <div className="mt-16 space-y-8">
          {/* FadeIn Demo */}
          <FadeIn direction="up" delay={0.2}>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2>FadeIn Animation</h2>
              <p className="mt-2">This text fades in from below</p>
            </div>
          </FadeIn>

          {/* ScaleIn Demo */}
          <ScaleIn delay={0.4}>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3>ScaleIn Animation</h3>
              <p className="mt-2">This card scales in smoothly</p>
            </div>
          </ScaleIn>

          {/* SlideIn Demo */}
          <SlideIn direction="right" delay={0.6}>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3>SlideIn Animation</h3>
              <p className="mt-2">This slides in from the right</p>
            </div>
          </SlideIn>

          {/* Counter Demo */}
          <FadeIn delay={0.8}>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3>Counter Animation</h3>
              <div className="mt-4 flex gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary">
                    <Counter end={50} suffix="+" />
                  </div>
                  <p className="text-sm">Mentors</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent">
                    <Counter end={400} suffix="+" />
                  </div>
                  <p className="text-sm">Reactions LinkedIn</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* PenLine Demo */}
          <FadeIn delay={1}>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h3>PenLine Animation</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="mb-2">Underline variant:</p>
                  <PenLine variant="underline" width={200} />
                </div>
                <div>
                  <p className="mb-2">Wave variant:</p>
                  <PenLine variant="wave" width={200} />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PolymorphDivider Demo */}
      <PolymorphDivider variant="wave1" color="rgb(245, 239, 230)" />

      <section className="py-16" style={{ backgroundColor: 'rgb(245, 239, 230)' }}>
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-center">Section with Divider</h2>
            <p className="text-center mt-4">Notice the smooth wave transition above</p>
          </FadeIn>
        </div>
      </section>

      <PolymorphDivider variant="wave2" flip color="rgb(250, 246, 240)" />
    </main>
  );
}

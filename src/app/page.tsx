import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Propulse | Mentorat gratuit pour lycéens vers les Grandes Écoles',
  description: 'Propulse accompagne gratuitement et à distance les lycéens motivés vers les Grandes Écoles. Rejoignez le mouvement.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground">Propulse</h1>
        <p className="mt-4 text-text-secondary">
          Landing page - Coming soon
        </p>
      </div>
    </main>
  );
}

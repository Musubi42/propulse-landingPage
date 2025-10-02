import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Le Programme | Propulse',
  description: 'Decouvrez le programme de mentorat Propulse : 6 phases pour accompagner les lyceens vers les Grandes Ecoles.',
};

export default function ProgrammePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground">Le Programme</h1>
        <p className="mt-4 text-text-secondary">
          Page Programme - Coming soon
        </p>
      </div>
    </main>
  );
}

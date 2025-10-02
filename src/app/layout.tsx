import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { organizationSchema } from "@/lib/structuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://propulse-association.fr'),
  title: "Propulse | Mentorat gratuit pour lycéens vers les Grandes Écoles",
  description: "Propulse accompagne gratuitement et à distance les lycéens motivés vers les Grandes Écoles. Rejoignez le mouvement.",
  keywords: ["mentorat", "lycéens", "grandes écoles", "éducation", "orientation", "gratuit"],
  authors: [{ name: "Propulse Association" }],
  openGraph: {
    title: "Propulse | Mentorat gratuit pour lycéens",
    description: "Accompagnement gratuit vers les Grandes Écoles",
    type: "website",
    locale: "fr_FR",
    url: 'https://propulse-association.fr',
    siteName: 'Propulse Association',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Propulse | Mentorat gratuit pour lycéens',
    description: 'Accompagnement gratuit vers les Grandes Écoles',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

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
  title: "Propulse | Mentorat gratuit pour lycéens vers les Grandes Écoles",
  description: "Propulse accompagne gratuitement et à distance les lycéens motivés vers les Grandes Écoles. Rejoignez le mouvement.",
  keywords: ["mentorat", "lycéens", "grandes écoles", "éducation", "orientation", "gratuit"],
  authors: [{ name: "Propulse Association" }],
  openGraph: {
    title: "Propulse | Mentorat gratuit pour lycéens",
    description: "Accompagnement gratuit vers les Grandes Écoles",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

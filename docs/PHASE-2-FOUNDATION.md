# Phase 2: Visual Identity & Foundation

**Status:** 🔜 Not Started
**Estimated Time:** 3-4 hours
**Prerequisites:** Phase 1 Complete

---

## Overview

This phase establishes the visual foundation of the Propulse landing page, including the color system, typography, global styles, and reusable animation components that will be used throughout the site.

---

## Checklist

### 2.1 Color System Implementation ⬜

**Update `tailwind.config.ts`:**
- [ ] Add Propulse color palette to theme.extend.colors
  ```typescript
  colors: {
    background: {
      DEFAULT: '#FAF6F0',
      secondary: '#F5EFE6',
      tertiary: '#EBE3D5',
    },
    primary: {
      DEFAULT: '#1B3A52',
      hover: '#2C5F7F',
      active: '#3D7FA6',
    },
    accent: {
      orange: '#D97642',
      'orange-hover': '#E89563',
      'orange-light': '#F4B587',
      green: '#4A6B52',
      'green-hover': '#5D8468',
      'green-light': '#7BA084',
    },
    text: {
      DEFAULT: '#2A2A2A',
      secondary: '#4A4A4A',
      tertiary: '#6B6B6B',
    },
    pen: '#3D3D3D',
    linkedin: '#0A66C2',
  }
  ```

**Update Global CSS:**
- [ ] Update `src/app/globals.css` with CSS variables
  ```css
  @layer base {
    :root {
      --background: 0 0% 98%;
      --foreground: 0 0% 16%;
      --primary: 209 48% 21%;
      --accent-orange: 21 62% 55%;
      --accent-green: 145 20% 36%;
    }
  }
  ```

**Test Colors:**
- [ ] Create test component to verify all colors render correctly
- [ ] Check contrast ratios meet WCAG AA standards

---

### 2.2 Typography Setup ⬜

**Configure Font System:**
- [ ] Update `tailwind.config.ts` with font families
  ```typescript
  fontFamily: {
    sans: [
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ],
  }
  ```

**Define Typography Scale:**
- [ ] Add custom font sizes to Tailwind config
  ```typescript
  fontSize: {
    'hero': ['3.5rem', { lineHeight: '1.1' }],
    'section-title': ['2.5rem', { lineHeight: '1.2' }],
    'subsection': ['1.75rem', { lineHeight: '1.3' }],
  }
  ```

**Create Typography Utilities:**
- [ ] File: `src/styles/typography.css`
  ```css
  .heading-hero {
    @apply text-5xl lg:text-6xl font-bold text-primary leading-tight;
  }

  .heading-section {
    @apply text-4xl font-bold text-primary mb-6;
  }

  .body-large {
    @apply text-xl text-text-secondary leading-relaxed;
  }

  .tagline {
    @apply text-2xl font-bold text-accent-orange italic;
  }
  ```

- [ ] Import in `src/app/globals.css`

---

### 2.3 Global Styles & CSS Variables ⬜

**Update `src/app/globals.css`:**
- [ ] Add paper texture background (subtle)
  ```css
  body {
    @apply bg-background text-text antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  ```

**Add Smooth Scrolling:**
- [ ] Add scroll behavior
  ```css
  html {
    scroll-behavior: smooth;
  }
  ```

**Add Animation Utilities:**
- [ ] Create custom animations
  ```css
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pen-draw {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  ```

---

### 2.4 Reusable Animation Components ⬜

**Create Fade-In Component:**
- [ ] File: `src/components/animations/fade-in.tsx`
  ```tsx
  'use client';

  import { motion } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';

  interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
  }

  export function FadeIn({
    children,
    delay = 0,
    direction = 'up'
  }: FadeInProps) {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    const directionOffset = {
      up: { y: 30 },
      down: { y: -30 },
      left: { x: 30 },
      right: { x: -30 },
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, ...directionOffset[direction] }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  }
  ```

**Create Counter Component:**
- [ ] File: `src/components/animations/counter.tsx`
  ```tsx
  'use client';

  import { useInView } from 'react-intersection-observer';
  import CountUp from 'react-countup';

  interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
  }

  export function Counter({
    end,
    duration = 2,
    suffix = '',
    prefix = ''
  }: CounterProps) {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });

    return (
      <span ref={ref}>
        {inView && (
          <CountUp
            end={end}
            duration={duration}
            suffix={suffix}
            prefix={prefix}
          />
        )}
      </span>
    );
  }
  ```

**Create Scale-In Component:**
- [ ] File: `src/components/animations/scale-in.tsx`
  ```tsx
  'use client';

  import { motion } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';

  interface ScaleInProps {
    children: React.ReactNode;
    delay?: number;
  }

  export function ScaleIn({ children, delay = 0 }: ScaleInProps) {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.3,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  }
  ```

**Create Animation Barrel Export:**
- [ ] File: `src/components/animations/index.ts`
  ```typescript
  export { FadeIn } from './fade-in';
  export { Counter } from './counter';
  export { ScaleIn } from './scale-in';
  export { PenLine } from './pen-line';
  ```

---

### 2.5 Pen Line SVG Component ⬜

**Create Pen Line Component:**
- [ ] File: `src/components/animations/pen-line.tsx`
  ```tsx
  'use client';

  import { motion } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';

  interface PenLineProps {
    path: string;
    className?: string;
    duration?: number;
  }

  export function PenLine({
    path,
    className = '',
    duration = 2
  }: PenLineProps) {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <svg
        ref={ref}
        className={className}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration, ease: "easeInOut" }}
        />
      </svg>
    );
  }
  ```

**Create Sample Pen Paths:**
- [ ] File: `src/lib/pen-paths.ts`
  ```typescript
  export const penPaths = {
    // Horizontal journey line
    journeyHorizontal: "M 0 50 Q 25 20, 50 50 T 100 50",

    // Vertical journey line
    journeyVertical: "M 50 0 Q 20 25, 50 50 T 50 100",

    // Simple curve
    curve: "M 0 100 Q 50 0, 100 100",

    // Underline
    underline: "M 0 50 L 100 50",
  } as const;
  ```

---

### 2.6 Polymorph Divider Component ⬜

**Create Polymorph SVG Component:**
- [ ] File: `src/components/ui/polymorph-divider.tsx`
  ```tsx
  interface PolymorphDividerProps {
    variant?: 'wave' | 'curve' | 'smooth';
    flip?: boolean;
    className?: string;
    color?: string;
  }

  export function PolymorphDivider({
    variant = 'wave',
    flip = false,
    className = '',
    color = 'currentColor'
  }: PolymorphDividerProps) {
    const paths = {
      wave: "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
      curve: "M0,96L48,90.7C96,85,192,75,288,80C384,85,480,107,576,112C672,117,768,107,864,90.7C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
      smooth: "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    };

    return (
      <div className={`relative w-full ${className}`}>
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-auto ${flip ? 'rotate-180' : ''}`}
          preserveAspectRatio="none"
        >
          <path
            d={paths[variant]}
            fill={color}
          />
        </svg>
      </div>
    );
  }
  ```

---

### 2.7 Create Utility Functions ⬜

**Update `src/lib/utils.ts`:**
- [ ] Add cn function (already exists from shadcn)
- [ ] Add formatNumber utility
  ```typescript
  export function formatNumber(num: number): string {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  }
  ```

- [ ] Add scrollToSection utility
  ```typescript
  export function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  ```

---

### 2.8 Update Root Layout ⬜

**Update `src/app/layout.tsx`:**
- [ ] Add proper metadata
- [ ] Add Vercel Analytics
- [ ] Add proper lang attribute
- [ ] Import global styles
  ```tsx
  import type { Metadata } from 'next';
  import { Analytics } from '@vercel/analytics/react';
  import './globals.css';

  export const metadata: Metadata = {
    title: 'Propulse | Mentorat Gratuit vers les Grandes Écoles',
    description: 'Accompagnement gratuit et personnalisé pour lycéens vers les Grandes Écoles. 50+ mentors d\'HEC, EDHEC, Sciences Po, Polytechnique.',
    keywords: ['mentorat', 'grandes écoles', 'orientation', 'égalité des chances'],
    openGraph: {
      title: 'Propulse | Mentorat Gratuit vers les Grandes Écoles',
      description: 'Accompagnement gratuit vers les Grandes Écoles',
      url: 'https://propulse-association.fr',
      locale: 'fr_FR',
      type: 'website',
    },
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="fr" className="scroll-smooth">
        <body className="antialiased">
          {children}
          <Analytics />
        </body>
      </html>
    );
  }
  ```

---

### 2.9 Create Test Page ⬜

**Create Visual Identity Test Page:**
- [ ] File: `src/app/test/page.tsx`
  ```tsx
  import { FadeIn, Counter, ScaleIn } from '@/components/animations';
  import { Button } from '@/components/ui/button';
  import { PolymorphDivider } from '@/components/ui/polymorph-divider';

  export default function TestPage() {
    return (
      <main className="min-h-screen">
        {/* Color Palette Test */}
        <section className="p-12 bg-background">
          <h2 className="heading-section">Color Palette</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-primary rounded" />
            <div className="h-24 bg-accent-orange rounded" />
            <div className="h-24 bg-accent-green rounded" />
          </div>
        </section>

        <PolymorphDivider variant="wave" color="fill-background-secondary" />

        {/* Typography Test */}
        <section className="p-12 bg-background-secondary">
          <h1 className="heading-hero">Hero Heading</h1>
          <h2 className="heading-section">Section Heading</h2>
          <p className="body-large">Body text example</p>
          <p className="tagline">"Fonce, tu en es capable !"</p>
        </section>

        {/* Button Test */}
        <section className="p-12 bg-background">
          <div className="flex gap-4">
            <Button size="lg" className="bg-accent-orange">Primary CTA</Button>
            <Button size="lg" variant="outline">Secondary CTA</Button>
          </div>
        </section>

        {/* Animation Test */}
        <section className="p-12 bg-background-secondary">
          <FadeIn>
            <h2 className="heading-section">Fade In Animation</h2>
          </FadeIn>

          <ScaleIn delay={0.2}>
            <div className="text-6xl font-bold text-accent-orange">
              <Counter end={50} suffix="+" />
            </div>
          </ScaleIn>
        </section>
      </main>
    );
  }
  ```

- [ ] Test at http://localhost:3000/test
- [ ] Verify all colors, typography, and animations work

---

## Success Criteria

Phase 2 is complete when:

- ✅ Color system implemented and working
- ✅ Typography scale defined and tested
- ✅ Global styles applied
- ✅ All reusable animation components created
- ✅ Pen line component working
- ✅ Polymorph divider component working
- ✅ Test page shows all visual elements correctly
- ✅ No console errors or warnings

---

## Next Phase

Once Phase 2 is complete, proceed to:
👉 [PHASE-3-SECTIONS.md](PHASE-3-SECTIONS.md) - Core Sections - Homepage

---

**Last Updated:** 2025-10-02

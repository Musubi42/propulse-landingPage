'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type TransitionType = 'gradient' | 'curved' | 'pen' | 'dots';

/**
 * Interactive Demo Page: Section Transition Comparisons
 * 4 separate full-page demos showing each transition type with multiple examples
 */

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

function DemoSection({
  bg,
  title,
  subtitle,
  children
}: {
  bg: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`py-24 ${bg}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-foreground mb-3">{title}</h2>
        {subtitle && (
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

// ============================================================================
// OPTION 1: GRADIENT FADE OVERLAYS
// ============================================================================

function GradientFadeDemo() {
  return (
    <div className="min-h-screen">
      <DemoSection
        bg="bg-background"
        title="Gradient Fade: Ultra Minimal"
        subtitle="Pure CSS, smooth color blending, zero JavaScript"
      >
        <div className="max-w-lg mx-auto mt-8 p-6 bg-background-secondary rounded-lg">
          <p className="text-sm text-text-secondary">
            ✅ Lightest performance<br />
            ✅ Smoothest transitions<br />
            ✅ Warm paper aesthetic
          </p>
        </div>
      </DemoSection>

      {/* Gradient 1: Background to Secondary */}
      <div
        className="h-32"
        style={{
          background: 'linear-gradient(to bottom, rgb(250, 246, 240), rgb(245, 239, 230))',
        }}
      />

      <DemoSection
        bg="bg-background-secondary"
        title="Section avec fond beige"
        subtitle="Notice how the transition above dissolved smoothly"
      />

      {/* Gradient 2: Secondary to Tertiary */}
      <div
        className="h-32"
        style={{
          background: 'linear-gradient(to bottom, rgb(245, 239, 230), rgb(235, 227, 213))',
        }}
      />

      <DemoSection
        bg="bg-background-tertiary"
        title="Section avec divider color"
        subtitle="Each gradient is a soft blend of two palette colors"
      />

      {/* Gradient 3: Tertiary to Primary tint */}
      <div
        className="h-40"
        style={{
          background: 'linear-gradient(to bottom, rgb(235, 227, 213) 0%, rgba(27, 58, 82, 0.05) 100%)',
        }}
      />

      <DemoSection
        bg="bg-primary/5"
        title="Variation: Gradient to tinted background"
        subtitle="You can blend into colored sections too"
      >
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white/80 rounded-xl">
          <h3 className="font-bold text-lg mb-4">Gradient Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left">
            <div className="p-4 bg-background rounded-lg">
              <strong>Short (20-32px)</strong>
              <p className="text-text-tertiary mt-1">Quick, subtle blend</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <strong>Medium (40-60px)</strong>
              <p className="text-text-tertiary mt-1">Smooth, noticeable</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <strong>Tall (80-120px)</strong>
              <p className="text-text-tertiary mt-1">Dramatic, spacious</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <strong>With opacity</strong>
              <p className="text-text-tertiary mt-1">Ethereal, soft</p>
            </div>
          </div>
        </div>
      </DemoSection>

      {/* Gradient 4: Angled gradient */}
      <div
        className="h-32"
        style={{
          background: 'linear-gradient(135deg, rgba(27, 58, 82, 0.05) 0%, rgb(245, 239, 230) 100%)',
        }}
      />

      <DemoSection
        bg="bg-background-secondary"
        title="Angled Gradient (135deg)"
        subtitle="Not just vertical - can create diagonal flow"
      />
    </div>
  );
}

// ============================================================================
// OPTION 2: SOFT CURVED MASK
// ============================================================================

function CurvedMaskDemo() {
  return (
    <div className="min-h-screen">
      <DemoSection
        bg="bg-background"
        title="Curved Mask: Organic Shapes"
        subtitle="CSS clip-path creating fluid, modern transitions"
      >
        <div className="max-w-lg mx-auto mt-8 p-6 bg-background-secondary rounded-lg">
          <p className="text-sm text-text-secondary">
            ✅ Modern, organic feel<br />
            ✅ Pure CSS (no SVG)<br />
            ✅ Responsive by default
          </p>
        </div>
      </DemoSection>

      {/* Variation 1: Top ellipse - Orange tinted */}
      <div className="relative">
        <div
          className="h-32"
          style={{
            clipPath: 'ellipse(100% 100% at 50% 0%)',
            backgroundColor: 'rgba(217, 118, 66, 0.2)' // Burnt orange
          }}
        />
      </div>

      <section className="py-24" style={{ backgroundColor: 'rgba(217, 118, 66, 0.2)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-3">Ellipse from top</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Creates a smooth curve entering the section - notice the orange curved edge above
          </p>
        </div>
      </section>

      {/* Variation 2: Bottom ellipse - Blue tinted */}
      <div className="relative -mt-1">
        <div
          className="h-32"
          style={{
            clipPath: 'ellipse(100% 100% at 50% 100%)',
            backgroundColor: 'rgba(27, 58, 82, 0.15)' // Deep navy
          }}
        />
      </div>

      <section className="py-24" style={{ backgroundColor: 'rgba(27, 58, 82, 0.15)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-3">Ellipse from bottom</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Inverted curve, flowing downward - blue tinted section
          </p>
        </div>
      </section>

      {/* Variation 3: Asymmetric curve - Green tinted */}
      <div className="relative -mt-1">
        <div
          className="h-40"
          style={{
            clipPath: 'ellipse(150% 100% at 30% 0%)',
            backgroundColor: 'rgba(74, 107, 82, 0.18)' // Forest green
          }}
        />
      </div>

      <section className="py-24" style={{ backgroundColor: 'rgba(74, 107, 82, 0.18)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-3">Asymmetric ellipse</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Off-center creates dynamic flow - green curve starts from left
          </p>
        </div>
      </section>

      {/* Variation 4: Polygon curve - Beige */}
      <div className="relative -mt-1">
        <div
          className="h-36"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 50% 100%, 0 50%)',
            backgroundColor: 'rgb(235, 227, 213)' // Tertiary beige
          }}
        />
      </div>

      <section className="py-24 bg-background-tertiary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-3">Polygon curve variation</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Using polygon for sharper, architectural pointed curves
          </p>
          <div className="max-w-2xl mx-auto mt-8 p-8 bg-white/80 rounded-xl">
            <h3 className="font-bold text-lg mb-4">Curved Mask Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left">
              <div className="p-4 bg-background rounded-lg">
                <strong>Ellipse top</strong>
                <p className="text-text-tertiary mt-1">Soft entrance</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <strong>Ellipse bottom</strong>
                <p className="text-text-tertiary mt-1">Soft exit</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <strong>Asymmetric</strong>
                <p className="text-text-tertiary mt-1">Dynamic flow</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <strong>Polygon</strong>
                <p className="text-text-tertiary mt-1">Architectural</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// OPTION 3: ANIMATED PEN STROKE PATH (Brand-Aligned)
// ============================================================================

function PenStrokeVariation1() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.svg width="280" height="80" viewBox="0 0 280 80" className="opacity-25">
        {/* Simple curved stroke */}
        <motion.path
          d="M 10 40 Q 70 20, 140 40 T 270 40"
          stroke="rgb(61, 61, 61)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

function PenStrokeVariation2() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.svg width="300" height="100" viewBox="0 0 300 100" className="opacity-30">
        {/* Wavy organic stroke */}
        <motion.path
          d="M 10 50 Q 40 30, 70 50 T 150 50 Q 200 35, 250 50 T 290 50"
          stroke="rgb(217, 118, 66)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Ink dots */}
        {[30, 80, 130, 180, 230, 270].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={50 + (i % 3 === 0 ? -8 : i % 3 === 1 ? 0 : 8)}
            r="2"
            fill="rgb(217, 118, 66)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.5, scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.12 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}

function PenStrokeVariation3() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center py-12">
      <motion.svg width="200" height="120" viewBox="0 0 200 120" className="opacity-25">
        {/* Looping journey path */}
        <motion.path
          d="M 20 60 Q 50 20, 100 60 Q 150 100, 180 60"
          stroke="rgb(27, 58, 82)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

function PenStrokeVariation4() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center py-10">
      <motion.svg width="320" height="90" viewBox="0 0 320 90" className="opacity-35">
        {/* Double stroke for emphasis */}
        <motion.path
          d="M 10 35 Q 80 20, 160 35 T 310 35"
          stroke="rgb(74, 107, 82)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M 10 55 Q 80 70, 160 55 T 310 55"
          stroke="rgb(74, 107, 82)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
      </motion.svg>
    </div>
  );
}

function PenStrokeDemo() {
  return (
    <div className="min-h-screen">
      <DemoSection
        bg="bg-background"
        title="Pen Stroke: Hand-Drawn Journey"
        subtitle="Animated SVG paths matching the pen & journey metaphor"
      >
        <div className="max-w-lg mx-auto mt-8 p-6 bg-background-secondary rounded-lg">
          <p className="text-sm text-text-secondary">
            ✅ Brand-aligned metaphor<br />
            ✅ Hand-drawn aesthetic<br />
            ✅ Scroll-triggered animation
          </p>
        </div>
      </DemoSection>

      <PenStrokeVariation1 />

      <DemoSection
        bg="bg-background-secondary"
        title="Variation 1: Simple Curve"
        subtitle="Clean, smooth pen stroke - subtle and elegant"
      />

      <PenStrokeVariation2 />

      <DemoSection
        bg="bg-background-tertiary"
        title="Variation 2: Organic Wave with Ink Dots"
        subtitle="More playful, hand-drawn feel with accent color"
      />

      <PenStrokeVariation3 />

      <DemoSection
        bg="bg-primary/5"
        title="Variation 3: Looping Journey Path"
        subtitle="Dashed line suggesting progress and movement"
      />

      <PenStrokeVariation4 />

      <DemoSection
        bg="bg-background-secondary"
        title="Variation 4: Double Stroke"
        subtitle="Parallel lines for emphasis and depth"
      >
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white/80 rounded-xl">
          <h3 className="font-bold text-lg mb-4">Pen Stroke Customization</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-left">
            <div className="p-4 bg-background rounded-lg">
              <strong>Stroke Width</strong>
              <p className="text-text-tertiary mt-1">2-3px: subtle<br />4-5px: bold</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <strong>Color Options</strong>
              <p className="text-text-tertiary mt-1">Pen line, Orange, Navy, Green</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <strong>Animation</strong>
              <p className="text-text-tertiary mt-1">1.5-2.5s duration</p>
            </div>
          </div>
        </div>
      </DemoSection>
    </div>
  );
}

// ============================================================================
// OPTION 4: MINIMAL DOT PATH
// ============================================================================

function DotPathVariation1() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center items-center gap-4 py-10">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: 'rgb(61, 61, 61)' }} // Pen line color
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        />
      ))}
    </div>
  );
}

function DotPathVariation2() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center items-center gap-3 py-10">
      {[...Array(9)].map((_, i) => {
        const isCenter = i === 4;
        return (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: isCenter ? '12px' : '5px',
              height: isCenter ? '12px' : '5px',
              backgroundColor: 'rgb(217, 118, 66)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 0.4, y: 0 } : {}}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
          />
        );
      })}
    </div>
  );
}

function DotPathVariation3() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center items-center gap-2 py-10">
      {[...Array(11)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: i % 3 === 0 ? '6px' : '3px',
            height: i % 3 === 0 ? '6px' : '3px',
            backgroundColor: 'rgb(27, 58, 82)' // Deep navy
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={inView ? { opacity: 0.25, scale: 1, rotate: 360 } : {}}
          transition={{ delay: i * 0.06, duration: 0.5 }}
        />
      ))}
    </div>
  );
}

function DotPathVariation4() {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 py-10">
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'rgb(74, 107, 82)' }} // Forest green
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.35 } : {}}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: 'rgb(217, 118, 66)' }} // Burnt orange
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.5, scale: 1 } : {}}
        transition={{ delay: 0.6, type: 'spring' }}
      />
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'rgb(74, 107, 82)' }} // Forest green
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.35 } : {}}
            transition={{ delay: 0.8 + i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}

function DotPathDemo() {
  return (
    <div className="min-h-screen">
      <DemoSection
        bg="bg-background"
        title="Dot Path: Minimal Sophistication"
        subtitle="Subtle progression indicators - clean and modern"
      >
        <div className="max-w-lg mx-auto mt-8 p-6 bg-background-secondary rounded-lg">
          <p className="text-sm text-text-secondary">
            ✅ Ultra minimal<br />
            ✅ Sophisticated<br />
            ✅ Journey suggestion
          </p>
        </div>
      </DemoSection>

      <DotPathVariation1 />

      <DemoSection
        bg="bg-background-secondary"
        title="Variation 1: Simple Sequence"
        subtitle="Clean, equal-sized dots appearing in sequence"
      />

      <DotPathVariation2 />

      <DemoSection
        bg="bg-background-tertiary"
        title="Variation 2: Center Emphasis"
        subtitle="Larger center dot with spring animation"
      />

      <DotPathVariation3 />

      <DemoSection
        bg="bg-primary/5"
        title="Variation 3: Varied Sizes"
        subtitle="Rhythmic pattern with rotating entrance"
      />

      <DotPathVariation4 />

      <DemoSection
        bg="bg-background-secondary"
        title="Variation 4: Branching Path"
        subtitle="Dots suggesting multiple paths or connections"
      >
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white/80 rounded-xl">
          <h3 className="font-bold text-lg mb-4">Dot Path Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-left">
            <div className="p-4 bg-background rounded-lg">
              <strong>Dot Count</strong>
              <p className="text-text-tertiary mt-1">5-11 dots optimal</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <strong>Spacing</strong>
              <p className="text-text-tertiary mt-1">2-4 gap classes</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <strong>Animation</strong>
              <p className="text-text-tertiary mt-1">Stagger 60-100ms</p>
            </div>
          </div>
        </div>
      </DemoSection>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT WITH NAVIGATION
// ============================================================================

export default function PenDemoPage() {
  const [activeDemo, setActiveDemo] = useState<TransitionType>('pen');

  const demos = [
    { id: 'gradient' as TransitionType, label: 'Gradient Fade', icon: '🎨' },
    { id: 'curved' as TransitionType, label: 'Curved Mask', icon: '🌊' },
    { id: 'pen' as TransitionType, label: 'Pen Stroke', icon: '✏️' },
    { id: 'dots' as TransitionType, label: 'Dot Path', icon: '•••' },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg">
        <div className="container mx-auto px-4 py-4">
          {/* Back button */}
          <Link
            href="/"
            className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour à l&apos;accueil</span>
          </Link>

          {/* Demo selector buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`
                  px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300
                  ${activeDemo === demo.id
                    ? 'bg-accent text-white shadow-lg scale-105'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-tertiary hover:scale-102'
                  }
                `}
              >
                <span className="text-lg mr-2">{demo.icon}</span>
                {demo.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeDemo === 'gradient' && <GradientFadeDemo />}
          {activeDemo === 'curved' && <CurvedMaskDemo />}
          {activeDemo === 'pen' && <PenStrokeDemo />}
          {activeDemo === 'dots' && <DotPathDemo />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { FullscreenTimeline } from '@/components/timeline/FullscreenTimeline';
import type { Phase } from '@/components/timeline';

interface FullscreenProgrammeOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phases: Phase[];
}

export function FullscreenProgrammeOverlay({
  open,
  onOpenChange,
  phases,
}: FullscreenProgrammeOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  // Client-side mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide main page content when overlay is open (but keep scroll enabled)
  useEffect(() => {
    if (open) {
      const mainContent = document.querySelector('body > *:not([data-overlay])');
      if (mainContent && mainContent instanceof HTMLElement) {
        mainContent.style.visibility = 'hidden';
      }

      return () => {
        if (mainContent && mainContent instanceof HTMLElement) {
          mainContent.style.visibility = 'visible';
        }
      };
    }
  }, [open]);

  // Handle ESC key
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onOpenChange]);

  // Reset scroll when overlay opens (CRITICAL for GSAP ScrollTrigger)
  useEffect(() => {
    if (open) {
      // Store original scroll position
      const scrollY = window.scrollY;

      // Reset timeline render state
      setShowTimeline(false);

      // CRITICAL: Aggressively reset window scroll to 0
      // GSAP ScrollTrigger absolutely needs scroll to start at 0
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Double-check scroll is at 0 after next frame
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // Triple-check and then render timeline
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

          // Now render timeline after scroll is confirmed at 0
          setTimeout(() => {
            setShowTimeline(true);
          }, 100);
        });
      });

      return () => {
        setShowTimeline(false);
        // Restore original scroll position
        window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
      };
    } else {
      // When closing, immediately hide timeline
      setShowTimeline(false);
    }
  }, [open]);

  // Don't render on server or when not mounted
  if (!mounted || !open) return null;

  // Use portal to render outside main React tree
  // NOTE: Render as absolute positioned to allow window scroll (GSAP requires it)
  return createPortal(
    <div
      data-overlay="true"
      className="absolute inset-0 z-[9999] bg-white"
      style={{
        margin: 0,
        padding: 0,
        width: '100vw',
        minHeight: '100vh',
        top: 0,
        left: 0,
        pointerEvents: 'auto',
      }}
    >
      {/* Close button - Fixed at top right */}
      <button
        onClick={() => onOpenChange(false)}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-[10000] p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Fermer"
      >
        <X className="w-6 h-6 text-text-secondary group-hover:text-foreground transition-colors" />
      </button>

      {/* Loading state while timeline initializes */}
      {!showTimeline && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-text-secondary">
            Chargement...
          </div>
        </div>
      )}

      {/* FullscreenTimeline component - only render after delay */}
      {showTimeline && (
        <FullscreenTimeline
          phases={phases}
          onComplete={() => onOpenChange(false)}
        />
      )}
    </div>,
    document.body
  );
}

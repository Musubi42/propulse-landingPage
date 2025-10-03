/**
 * useWheelScroll Hook
 *
 * Custom hook for mouse wheel navigation with smart hijacking
 * Only hijacks wheel when timeline is in viewport and can navigate
 * Maps wheel direction to navigation callbacks:
 * - Scroll down (deltaY > 0) → onScrollDown
 * - Scroll up (deltaY < 0) → onScrollUp
 */

import { useEffect, useRef } from 'react';

interface UseWheelScrollOptions {
  /** Enable/disable wheel scroll hijacking */
  enabled: boolean;
  /** Callback when scrolling down (move to next) */
  onScrollDown: () => void;
  /** Callback when scrolling up (move to previous) */
  onScrollUp: () => void;
  /** Check if can scroll to next (return false to allow normal scroll) */
  canScrollNext: () => boolean;
  /** Check if can scroll to previous (return false to allow normal scroll) */
  canScrollPrev: () => boolean;
  /** Debounce delay in milliseconds (default: 150) */
  debounceMs?: number;
  /** Timeline element ref (to check if in viewport) */
  elementRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
}

/**
 * Hook to handle mouse wheel navigation with smart hijacking
 * Only prevents default scroll when timeline can actually navigate
 *
 * @example
 * ```tsx
 * const timelineRef = useRef<HTMLDivElement>(null);
 *
 * useWheelScroll({
 *   enabled: true,
 *   elementRef: timelineRef,
 *   onScrollDown: () => goToNextPhase(),
 *   onScrollUp: () => goToPreviousPhase(),
 *   canScrollNext: () => currentPhase < totalPhases - 1,
 *   canScrollPrev: () => currentPhase > 0,
 *   debounceMs: 150
 * });
 * ```
 */
export function useWheelScroll({
  enabled,
  onScrollDown,
  onScrollUp,
  canScrollNext,
  canScrollPrev,
  debounceMs = 150,
  elementRef,
}: UseWheelScrollOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (e: WheelEvent) => {
      // Check if timeline element is in viewport
      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        // If not in viewport, allow normal scroll
        if (!isInViewport) return;
      }

      // Ignore if already processing a scroll
      if (isScrollingRef.current) return;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Only prevent default if we can actually navigate
      const shouldHijack =
        (scrollingDown && canScrollNext()) ||
        (scrollingUp && canScrollPrev());

      if (!shouldHijack) {
        // Allow normal page scroll (don't prevent default)
        return;
      }

      // Hijack the scroll for timeline navigation
      e.preventDefault();

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Mark as scrolling to prevent rapid successive calls
      isScrollingRef.current = true;

      // Determine direction and call appropriate callback
      if (scrollingDown) {
        onScrollDown();
      } else if (scrollingUp) {
        onScrollUp();
      }

      // Reset scrolling flag after debounce period
      timeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, debounceMs);
    };

    // Add event listener with passive: false to allow conditional preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, onScrollDown, onScrollUp, canScrollNext, canScrollPrev, debounceMs, elementRef]);
}

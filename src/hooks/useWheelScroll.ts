/**
 * useWheelScroll Hook
 *
 * Custom hook for mouse wheel navigation with debouncing
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
  /** Debounce delay in milliseconds (default: 150) */
  debounceMs?: number;
}

/**
 * Hook to handle mouse wheel navigation with debouncing
 *
 * @example
 * ```tsx
 * useWheelScroll({
 *   enabled: true,
 *   onScrollDown: () => goToNextPhase(),
 *   onScrollUp: () => goToPreviousPhase(),
 *   debounceMs: 150
 * });
 * ```
 */
export function useWheelScroll({
  enabled,
  onScrollDown,
  onScrollUp,
  debounceMs = 150,
}: UseWheelScrollOptions) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent default page scroll when wheel is used for navigation
      e.preventDefault();

      // Ignore if already processing a scroll
      if (isScrollingRef.current) return;

      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Mark as scrolling to prevent rapid successive calls
      isScrollingRef.current = true;

      // Determine direction and call appropriate callback
      if (e.deltaY > 0) {
        onScrollDown();
      } else if (e.deltaY < 0) {
        onScrollUp();
      }

      // Reset scrolling flag after debounce period
      timeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, debounceMs);
    };

    // Add event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, onScrollDown, onScrollUp, debounceMs]);
}

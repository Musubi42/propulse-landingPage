/**
 * useSwipeGesture Hook
 *
 * Custom hook for touch swipe gesture detection
 * Detects horizontal swipes and triggers callbacks
 */

import { useEffect, useRef } from 'react';

interface UseSwipeGestureOptions {
  /** Enable/disable swipe detection */
  enabled: boolean;
  /** Callback when swiping left (move to next) */
  onSwipeLeft: () => void;
  /** Callback when swiping right (move to previous) */
  onSwipeRight: () => void;
  /** Minimum swipe distance in pixels (default: 50) */
  minSwipeDistance?: number;
}

/**
 * Hook to detect horizontal swipe gestures on touch devices
 *
 * @example
 * ```tsx
 * useSwipeGesture({
 *   enabled: true,
 *   onSwipeLeft: () => goToNextPhase(),
 *   onSwipeRight: () => goToPreviousPhase(),
 *   minSwipeDistance: 50
 * });
 * ```
 */
export function useSwipeGesture({
  enabled,
  onSwipeLeft,
  onSwipeRight,
  minSwipeDistance = 50,
}: UseSwipeGestureOptions) {
  const touchStartXRef = useRef<number>(0);
  const touchEndXRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchStartXRef.current - touchEndXRef.current;
      const absSwipeDistance = Math.abs(swipeDistance);

      // Only trigger if swipe distance exceeds minimum threshold
      if (absSwipeDistance < minSwipeDistance) return;

      if (swipeDistance > 0) {
        // Swiped left (next)
        onSwipeLeft();
      } else {
        // Swiped right (previous)
        onSwipeRight();
      }

      // Reset
      touchStartXRef.current = 0;
      touchEndXRef.current = 0;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled, onSwipeLeft, onSwipeRight, minSwipeDistance]);
}

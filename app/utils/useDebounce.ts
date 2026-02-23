import { useCallback, useRef } from 'react';

/**
 * A custom hook that returns a debounced version of the provided callback.
 * Useful for limiting the rate at which an event handler is executed.
 *
 * @param callback The function to be debounced
 * @param delay The delay in milliseconds
 * @returns A debounced version of the callback
 */
export function useDebounceCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

import { useEffect, useRef } from "react";

export const useOutsideClick = (
  callback: (event: MouseEvent) => void,
  enabled: boolean = true,
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, callback, enabled]);

  return ref;
};

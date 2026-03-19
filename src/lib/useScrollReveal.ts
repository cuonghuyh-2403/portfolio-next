'use client';
import { useEffect, RefObject } from 'react';

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  threshold = 0.08
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            observer.unobserve(e.target);
          }
        }),
      { threshold }
    );

    const el = ref.current;
    if (!el) return;
    el.querySelectorAll('.rv, .rv-left, .rv-right, .rv-scale').forEach((el) =>
      observer.observe(el)
    );

    return () => observer.disconnect();
  }, [ref, threshold]);
}

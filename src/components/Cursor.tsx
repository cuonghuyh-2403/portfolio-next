'use client';
import { useEffect, useState, useRef } from 'react';

export default function Cursor() {
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [label, setLabel] = useState('');

    useEffect(() => {
        // Disable custom cursor on touch devices (mobile/tablet)
        const isTouch = !window.matchMedia('(pointer: fine)').matches;
        if (isTouch) return;

        const ring = ringRef.current;
        const dot = dotRef.current;
        if (!ring || !dot) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX, ringY = mouseY;
        let dotX = mouseX, dotY = mouseY;
        let isActive = true;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const render = () => {
            if (!isActive) return;
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;

            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(render);
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const projectItem = target.closest('[data-cursor="view"]');
            const interactive = target.closest('a, button, input, textarea, [data-magnetic]');

            if (projectItem) {
                ring.classList.add('cursor-expand');
                setLabel('VIEW');
            } else if (interactive) {
                ring.classList.add('cursor-hover');
                ring.classList.remove('cursor-expand');
                setLabel('');
            } else {
                ring.classList.remove('cursor-hover', 'cursor-expand');
                setLabel('');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', handleOver);
        requestAnimationFrame(render);

        return () => {
            isActive = false;
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', handleOver);
        };
    }, []);

    return (
        <>
            <div ref={ringRef} className="premium-cursor-ring">
                {label && <span className="cursor-label">{label}</span>}
            </div>
            <div ref={dotRef} className="premium-cursor-dot" />
            <style dangerouslySetInnerHTML={{ __html: `
                *, *::before, *::after { cursor: none !important; }

                .premium-cursor-ring {
                    position: fixed;
                    top: 0; left: 0;
                    width: 36px; height: 36px;
                    border-radius: 50%;
                    border: 1.5px solid rgba(26,26,26,0.2);
                    pointer-events: none;
                    z-index: 9999;
                    will-change: transform;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: width 0.35s cubic-bezier(0.16,1,0.3,1),
                                height 0.35s cubic-bezier(0.16,1,0.3,1),
                                background 0.35s ease,
                                border-color 0.35s ease,
                                mix-blend-mode 0.2s;
                    mix-blend-mode: normal;
                }

                .premium-cursor-ring.cursor-hover {
                    width: 60px; height: 60px;
                    background: rgba(230,57,70,0.08);
                    border-color: rgba(230,57,70,0.5);
                    mix-blend-mode: normal;
                }

                .premium-cursor-ring.cursor-expand {
                    width: 80px; height: 80px;
                    background: var(--accent, #E63946);
                    border-color: var(--accent, #E63946);
                    mix-blend-mode: normal;
                }

                .cursor-label {
                    font-family: var(--mono, monospace);
                    font-size: 0.52rem;
                    font-weight: 700;
                    color: #F5F0EB;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    user-select: none;
                }

                .premium-cursor-dot {
                    position: fixed;
                    top: 0; left: 0;
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: var(--accent, #E63946);
                    pointer-events: none;
                    z-index: 10000;
                    will-change: transform;
                }
            `}} />
        </>
    );
}

'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    useEffect(() => {
        if (isAdmin) return;

        const lenis = new Lenis({
            duration: 1.1, // Giảm xuống để bớt cảm giác "nặng", phản hồi nhanh hơn
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.1, // Giảm nhẹ lực cuộn để cân bằng
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [isAdmin]);

    return <>{children}</>;
}

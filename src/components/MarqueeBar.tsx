'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import styles from './MarqueeBar.module.css';

// Helper wrap function
function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ParallaxText({ children, baseVelocity = 100, reverse = false, className = '' }: { children: React.ReactNode; baseVelocity: number; reverse?: boolean; className?: string }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

    // Range depends on item width duplication
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    
    // Change initial direction
    if (reverse) directionFactor.current = -1;

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`${styles.mq} ${className}`} aria-hidden="true">
            <motion.div className={styles.inner} style={{ x }}>
                {children}
            </motion.div>
        </div>
    );
}

const items = ['Graphic Design', 'UI/UX', 'Motion', 'Branding', 'Next.js', 'React', 'TypeScript', 'Figma', 'Illustration', 'Creative Direction'];

export default function MarqueeBar() {
    // Duplicate multiple times for smooth infinite scroll on a rotated huge wide banner
    const doubled = [...items, ...items, ...items, ...items, ...items];
    
    return (
        <div className={styles.container}>
            <ParallaxText baseVelocity={3} className={styles.mq1} reverse={true}>
                {doubled.map((item, i) => (
                    <span key={i} className={styles.item}>
                        {item}
                        <span className={styles.sep}>✖</span>
                    </span>
                ))}
            </ParallaxText>
            
            <ParallaxText baseVelocity={5} className={styles.mq2}>
                {doubled.map((item, i) => (
                    <span key={i} className={styles.item}>
                        {item}
                        <span className={styles.sep}>+</span>
                    </span>
                ))}
            </ParallaxText>
        </div>
    );
}

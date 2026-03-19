'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import type { Content } from '@/lib/content';
import styles from './HeroSection.module.css';
import Image from 'next/image';

type Props = { data: Content['hero'] };

// Framer Motion Variants
export default function HeroSection({ data }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yFirst = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const yLast = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const scaleAvatar = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const rotateAvatar = useTransform(scrollYProgress, [0, 1], [4, -4]);

    return (
        <section id="hero" className={styles.hero} ref={containerRef}>
            <div className={styles.bgNoise} aria-hidden="true" />
            <div className={styles.gridLines} aria-hidden="true" />

            <div className={styles.verticalText}>SCROLL DOWN TO EXPLORE</div>

            {/* Maximalist Giant Typography Layers */}
            <div className={styles.titleLayer}>
                <motion.div 
                    className={styles.firstName}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ y: yFirst }}
                >
                    CƯỜNG
                </motion.div>
                <motion.div 
                    className={styles.lastName}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                    style={{ y: yLast }}
                >
                    HUỲNH
                </motion.div>
            </div>

            {/* Overlapping Chaotic Avatar */}
            <motion.div 
                className={styles.avatarContainer}
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 4 }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring', bounce: 0.4 }}
                style={{ scale: scaleAvatar, rotate: rotateAvatar }}
            >
                <img 
                    src="/avatar.jpg" 
                    alt="Cuong Huynh Avatar" 
                    className={styles.avatarImg} 
                />
            </motion.div>

            {/* Brutalist Badges & Descriptions */}
            <motion.div 
                className={styles.roleBadge}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                {data.eyebrow}
            </motion.div>

            <motion.div 
                className={styles.descBlock}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
            >
                {data.description}
            </motion.div>

            {/* Spinning SVG Graphic Overlaid */}
            <div className={styles.floatingBadge} aria-hidden="true">
                <svg viewBox="0 0 100 100">
                    <path id="curve" d="M 50 50 m -40 0 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0" fill="transparent" />
                    <text fontSize="12" fontWeight="bold">
                        <textPath href="#curve" startOffset="0">
                            • FULL-STACK • DESIGNER • CREATIVE 
                        </textPath>
                    </text>
                </svg>
            </div>
        </section>
    );
}

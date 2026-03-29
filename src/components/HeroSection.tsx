'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Content } from '@/lib/content';
import styles from './HeroSection.module.css';

type Props = { data: Content['hero'] };

export default function HeroSection({ data }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const yAvatar = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section id="hero" className={styles.hero} ref={containerRef}>
            {/* Thin lines decoration */}
            <div className={styles.topRule} aria-hidden="true" />

            {/* Left column — Typography */}
            <motion.div 
                className={styles.textCol}
                style={{ y: yText, opacity: opacityFade }}
            >
                <motion.div 
                    className={styles.eyebrow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {data.eyebrow}
                </motion.div>

                <motion.h1 
                    className={styles.name}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className={styles.firstName}>CƯỜNG</span>
                    <span className={styles.lastName}>HUỲNH</span>
                </motion.h1>

                <motion.p 
                    className={styles.desc}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    {data.description}
                </motion.p>

                <motion.div 
                    className={styles.scrollHint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <span className={styles.scrollLine} />
                    <span className={styles.scrollText}>Scroll</span>
                </motion.div>
            </motion.div>

            {/* Right column — Avatar */}
            <motion.div 
                className={styles.avatarCol}
                style={{ y: yAvatar }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className={styles.avatarFrame}>
                    <Image 
                        src={data.avatarUrl || "/avatar.jpg"} 
                        alt="Cuong Huynh" 
                        className={styles.avatarImg} 
                        width={500}
                        height={667}
                        priority
                    />
                </div>
                <div className={styles.avatarCaption}>
                    <span className={styles.captionLine}>Full-Stack Developer</span>
                    <span className={styles.captionLine}>&amp; Creative Designer</span>
                </div>
            </motion.div>
        </section>
    );
}

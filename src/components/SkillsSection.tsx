'use client';
import type { Content } from '@/lib/content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './SkillsSection.module.css';

type Props = { data: Content['skills'] };

export default function SkillsSection({ data }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    
    // Slanted overall scroll effect
    const yParallax = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section id="skills" className={styles.skillsSec} ref={ref}>
            <div className="tag" style={{ marginLeft: '5vw' }}>02 / EXPERTISE</div>
            
            <motion.div className={styles.giantList} style={{ y: yParallax }}>
                {data.map((sk, i) => (
                    <motion.div 
                        key={sk.name} 
                        className={styles.skillRow}
                        initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -5 : 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                    >
                        <h3 className={styles.skillName}>{sk.name}</h3>
                        <div className={styles.hoverDetails}>
                            {sk.list.toUpperCase()}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

'use client';
import type { Content } from '@/lib/content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './SkillsSection.module.css';

type Props = { data: Content['skills'] };

export default function SkillsSection({ data }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headingY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
    const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

    return (
        <section id="skills" className={styles.skillsSec} ref={sectionRef}>
            <div className={styles.container}>
                <motion.div 
                    className={styles.sectionTag}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    02 / Kỹ năng
                </motion.div>

                <motion.h2 
                    className={styles.heading}
                    style={{ y: headingY, opacity: headingOpacity }}
                >
                    Expertise &<br/><em>Technologies</em>
                </motion.h2>

                <div className={styles.skillTable}>
                    {data.map((sk, i) => (
                        <motion.div 
                            key={sk.name} 
                            className={styles.skillRow}
                            initial={{ opacity: 0, y: 30, x: -20 }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ 
                                duration: 0.6, 
                                delay: i * 0.08,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            <span className={styles.skillNum}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className={styles.skillName}>{sk.name}</h3>
                            <span className={styles.skillDots} />
                            <span className={styles.skillList}>{sk.list}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

'use client';
import type { Content } from '@/lib/content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './AboutSection.module.css';

type Props = { data: Content['about'] };

export default function AboutSection({ data }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headingY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
    const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section id="about" className={styles.aboutSec} ref={sectionRef}>
            <div className={styles.container}>
                {/* Section tag */}
                <motion.div 
                    className={styles.sectionTag}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    01 / Giới thiệu
                </motion.div>

                {/* Two column editorial layout */}
                <div className={styles.editorialGrid}>
                    {/* Bio column */}
                    <div className={styles.bioCol}>
                        <motion.h2 
                            className={styles.heading}
                            style={{ y: headingY, opacity: headingOpacity }}
                        >
                            About<br/><em>Me</em>
                        </motion.h2>
                        <motion.div 
                            className={styles.bioText}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {data.bio.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </motion.div>
                    </div>

                    {/* Info column */}
                    <div className={styles.infoCol}>
                        {/* Status badge */}
                        <motion.div 
                            className={styles.statusBadge}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
                        >
                            {data.info.status}
                        </motion.div>

                        {/* Info table */}
                        <div className={styles.infoTable}>
                            {Object.entries({
                                "Vị trí": data.info.location,
                                "Học vấn": data.info.education,
                                "Email": data.info.email
                            }).map(([lbl, val], i) => (
                                <motion.div 
                                    key={lbl} 
                                    className={styles.infoRow}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.15 * i }}
                                >
                                    <span className={styles.infoLabel}>{lbl}</span>
                                    <span className={styles.infoDots} />
                                    <span className={styles.infoValue}>{val}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Experience timeline */}
                <div className={styles.expSection}>
                    <motion.div 
                        className={styles.expHeader}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Kinh nghiệm
                    </motion.div>
                    <div className={styles.timeline}>
                        {data.experience.map((exp, i) => (
                            <motion.div 
                                key={i} 
                                className={styles.expItem}
                                initial={{ opacity: 0, y: 40, x: -20 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ 
                                    duration: 0.7, 
                                    delay: i * 0.12,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                            >
                                <div className={styles.expYear}>{exp.year}</div>
                                <div className={styles.expContent}>
                                    <div className={styles.expTitle}>{exp.title}</div>
                                    <div className={styles.expCompany}>{exp.company}</div>
                                    <p className={styles.expDesc}>{exp.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

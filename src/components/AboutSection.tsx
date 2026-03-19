'use client';
import type { Content } from '@/lib/content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './AboutSection.module.css';

type Props = { data: Content['about'] };

export default function AboutSection({ data }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const bgY = useTransform(scrollYProgress, [0, 1], [-200, 200]);

    return (
        <section id="about" className={styles.aboutSec} ref={ref}>
            <motion.div className={styles.bgType} style={{ y: bgY }}>
                ANTI<br/>DESIGN
            </motion.div>

            <div className={styles.antiGrid}>
                <div className={styles.row1}>
                    <motion.div 
                        className={styles.bioBlock}
                        initial={{ opacity: 0, x: -50, y: 50, rotate: -5 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: -2 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {data.bio.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                    </motion.div>
                    
                    <motion.div 
                        className={styles.statusBlock}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        {data.info.status}
                    </motion.div>
                </div>

                <div className={styles.row2}>
                    <motion.div 
                        className={styles.infoBlock}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                    >
                        {Object.entries({
                            "LOCATION": data.info.location,
                            "EDUCATION": data.info.education,
                            "CONTACT": data.info.email
                        }).map(([lbl, val]) => (
                            <div key={lbl} className={styles.infoItem}>
                                <div className={styles.infoLbl}>{lbl}</div>
                                <div className={styles.infoVal}>{val}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div 
                        className={styles.expBlock}
                        initial={{ opacity: 0, x: 100, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -1 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {data.experience.map((exp, i) => (
                            <div key={i} className={styles.expItem}>
                                <div className={styles.expYear}>{exp.year}</div>
                                <div className={styles.expTitle}>{exp.title}</div>
                                <div className={styles.expCompany}>{exp.company}</div>
                                <div style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.6 }}>{exp.desc}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

'use client';
import type { Content } from '@/lib/content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProjectsSection.module.css';

type Props = { data: Content['projects'] };

export default function ProjectsSection({ data }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const xParallax = useTransform(scrollYProgress, [0, 1], [-300, 300]);

    return (
        <section id="projects" className={styles.projSec} ref={ref}>
            <motion.div className={styles.giantTitle} style={{ x: xParallax }}>
                SELECTED WORKS // 03
            </motion.div>

            <div className={styles.projList}>
                {data.map((proj, i) => (
                    <motion.a 
                        key={proj.title}
                        href={proj.href}
                        className={styles.projCard}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <span className={styles.projNum}>{proj.num}</span>
                        <h3 className={styles.projTitle}>{proj.title}</h3>
                        <div className={styles.projMeta}>
                            <span className={styles.projCat}>{proj.category}</span>
                            <span className={styles.projYear}>{proj.year}</span>
                        </div>
                        {proj.imageUrl && (
                            <img src={proj.imageUrl} alt={proj.title} className={styles.hoverImg} />
                        )}
                    </motion.a>
                ))}
            </div>
        </section>
    );
}

'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import type { Content } from '@/lib/content';
import styles from './ProjectsSection.module.css';

type Props = { data: Content['projects'] };

export default function ProjectsSection({ data }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headingY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
    const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

    return (
        <section id="projects" className={styles.projSec} ref={sectionRef}>
            <div className={styles.container}>
                <motion.div 
                    className={styles.sectionTag}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    03 / Dự án nổi bật
                </motion.div>

                <motion.h2 
                    className={styles.heading}
                    style={{ y: headingY, opacity: headingOpacity }}
                >
                    Selected<br/><em>Works</em>
                </motion.h2>

                <div className={styles.projList}>
                    {data.map((proj, i) => (
                        <motion.a 
                            key={proj.title}
                            href={proj.href}
                            className={styles.projCard}
                            data-cursor="view"
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            {/* Image area */}
                            {proj.imageUrl && (
                                <div className={styles.projImgWrap}>
                                    <Image 
                                        src={proj.imageUrl} 
                                        alt={proj.title} 
                                        className={styles.projImg} 
                                        fill
                                        sizes="(max-width: 900px) 100vw, 50vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            {/* Text area */}
                            <div className={styles.projInfo}>
                                <div className={styles.projMeta}>
                                    <span className={styles.projNum}>{proj.num}</span>
                                    <span className={styles.projCat}>{proj.category}</span>
                                    <span className={styles.projYear}>{proj.year}</span>
                                </div>
                                <h3 className={styles.projTitle}>{proj.title}</h3>
                                <div className={styles.projArrow}>→</div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

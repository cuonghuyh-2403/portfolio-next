'use client';
import type { Content } from '@/lib/content';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';

type Props = { data: Content['contact'] };

export default function ContactSection({ data }: Props) {
    const headingWords = data.heading.split(' ');
    const line1 = headingWords.slice(0, Math.ceil(headingWords.length / 2)).join(' ');
    const line2 = headingWords.slice(Math.ceil(headingWords.length / 2)).join(' ');

    return (
        <section id="contact" className={styles.contactSec}>
            <div className={styles.bigHead}>
                <motion.span 
                    className={styles.bigLine1}
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {line1 || "LET'S"}
                </motion.span>
                <motion.span 
                    className={styles.bigLine2}
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {line2 || "TALK"}
                </motion.span>
            </div>

            <div className={styles.grid}>
                <motion.div 
                    className={styles.left}
                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.emailLink}>
                        {data.paragraph}
                    </div>
                    <div className={styles.socials}>
                        {data.socials.map((s, i) => (
                            <a key={i} href={s.href} target="_blank" rel="noreferrer" className={styles.soc}>
                                {s.label}
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    className={styles.right}
                    initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: 0.2 }}
                >
                    <form className={styles.form} onClick={(e) => e.preventDefault()}>
                        <div className={styles.fg}>
                            <input type="text" placeholder="TÊN CỦA BẠN" required />
                        </div>
                        <div className={styles.fg}>
                            <input type="email" placeholder="EMAIL" required />
                        </div>
                        <div className={styles.fg}>
                            <textarea rows={4} placeholder="NÓI CÁI GÌ ĐÓ PHÁ CÁCH ĐI..." required />
                        </div>
                        <button type="submit" className={styles.sbtn}>
                            CHỐT ĐƠN
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

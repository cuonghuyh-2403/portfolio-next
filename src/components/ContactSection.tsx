'use client';
import { useState } from 'react';
import type { Content } from '@/lib/content';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './ContactSection.module.css';

type Props = { data: Content['contact'] };

/* ── Social Icon Helper ── */
function SocialIcon({ label }: { label: string }) {
    const l = label.toLowerCase();
    
    if (l.includes('facebook')) return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    );
    if (l.includes('instagram')) return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    );
    if (l.includes('linkedin')) return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    );
    if (l.includes('github')) return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    );
    if (l.includes('behance')) return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 12h7"></path><path d="M3 5h4c2 0 3.5 1 3.5 3s-1.5 3-3.5 3H3z"></path><path d="M3 11h4c2 0 3.5 1 3.5 3s-1.5 3-3.5 3H3z"></path><path d="M13 15c0 2 1.5 3 3.5 3S20 16 20 15"></path><path d="M20 12c0-2-1.5-3-3.5-3S13 10 13 12"></path></svg>
    );
    
    // Generic globe for others
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    );
}

export default function ContactSection({ data }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const headingY = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
    const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setErrorMsg(result.error || 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Lỗi kết nối. Vui lòng thử lại sau.');
        }
    };

    return (
        <section id="contact" className={styles.contactSec} ref={sectionRef}>
            <div className={styles.container}>
                <motion.div 
                    className={styles.sectionTag}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    04 / Liên hệ
                </motion.div>

                <div className={styles.grid}>
                    {/* Left — Heading & Social */}
                    <div className={styles.left}>
                        <motion.h2 
                            className={styles.heading}
                            style={{ y: headingY, opacity: headingOpacity }}
                        >
                            Let&apos;s<br/><em>Connect</em>
                        </motion.h2>

                        <motion.p 
                            className={styles.paragraph}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            {data.paragraph}
                        </motion.p>

                        <div className={styles.socials}>
                            {data.socials.map((s, i) => (
                                <motion.a 
                                    key={i} 
                                    href={s.href} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className={styles.soc}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                                >
                                    <div className={styles.socContent}>
                                        <SocialIcon label={s.label} />
                                        <span>{s.label}</span>
                                    </div>
                                    <span className={styles.socArrow}>→</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right — Form */}
                    <motion.div 
                        className={styles.right}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        {status === 'success' ? (
                            <div className={styles.successMsg}>
                                <div className={styles.successIcon}>✓</div>
                                <h3 className={styles.successTitle}>Gửi thành công!</h3>
                                <p className={styles.successText}>
                                    Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi sớm nhất có thể.
                                </p>
                                <button 
                                    className={styles.resetBtn}
                                    onClick={() => setStatus('idle')}
                                >
                                    Gửi tin nhắn khác
                                </button>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.fg}>
                                    <label className={styles.label}>Tên</label>
                                    <input 
                                        type="text" 
                                        placeholder="Nhập tên của bạn" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div className={styles.fg}>
                                    <label className={styles.label}>Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="email@example.com" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div className={styles.fg}>
                                    <label className={styles.label}>Tin nhắn</label>
                                    <textarea 
                                        rows={4} 
                                        placeholder="Chia sẻ ý tưởng của bạn..." 
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className={styles.errorMsg}>
                                        {errorMsg}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className={styles.sbtn}
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? 'Đang gửi...' : 'Gửi tin nhắn'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

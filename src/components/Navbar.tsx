'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const links = [
        { href: '/#about', label: 'Giới thiệu' },
        { href: '/#skills', label: 'Kỹ năng' },
        { href: '/#projects', label: 'Dự án' },
        { href: '/projects', label: 'Portfolio' },
    ];

    return (
        <>
            <motion.nav 
                className={styles.nav}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.logo}>
                    <Link href="/" onClick={closeMenu}>CH</Link>
                    <Link href="/admin" title="Admin" className={styles.adminLink}>.</Link>
                </div>
                
                <ul className={styles.ul}>
                    {links.map(l => (
                        <li key={l.href}><a href={l.href}>{l.label}</a></li>
                    ))}
                </ul>

                <div className={styles.navRight}>
                    <a href="#contact" className={styles.btn}>
                        Liên hệ
                    </a>

                    <button 
                        className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className={styles.mobileMenu}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className={styles.mobileInner}>
                            {links.map((l, i) => (
                                <motion.div
                                    key={l.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i + 0.2 }}
                                >
                                    <a href={l.href} className={styles.mobileLink} onClick={closeMenu}>
                                        <span className={styles.mobileNum}>0{i+1}</span>
                                        {l.label}
                                    </a>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className={styles.mobileFooter}
                            >
                                <a href="#contact" className={styles.mobileBtn} onClick={closeMenu}>
                                    Bắt đầu dự án →
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

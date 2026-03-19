'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <motion.nav 
            className={styles.nav}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 50 }}
        >
            <div className={styles.logo}>
                CH<Link href="/admin" title="Admin" className={styles.adminLink}>.</Link>
            </div>
            
            <ul className={styles.ul}>
                <li><a href="/#about">01/ Giới thiệu</a></li>
                <li><a href="/#skills">02/ Kỹ năng</a></li>
                <li><a href="/#projects">03/ Dự án</a></li>
                <li><Link href="/projects">04/ Portfolio</Link></li>
            </ul>

            <a href="#contact" className={styles.btn}>
                CONNECT
            </a>
        </motion.nav>
    );
}

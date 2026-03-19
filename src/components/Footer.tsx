import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>CH<em>.</em></div>
            <p className={styles.center}>© 2026 Cuong Huynh — Crafted with precision</p>
            <p className={styles.mono}>Design × Code</p>
        </footer>
    );
}

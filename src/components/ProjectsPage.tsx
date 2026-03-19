'use client';
import { useState, useMemo } from 'react';
import type { Content } from '@/lib/content';
import styles from './ProjectsPage.module.css';

type Project = Content['projects'][number];

type Props = { data: Project[] };

const CATEGORIES = ['Tất cả', 'Web Development', 'UI/UX Design', 'Mobile', 'Open Source'];

const categoryColors: Record<string, string> = {
    'Web Development': '#6366f1',
    'UI/UX Design': '#ec4899',
    'Mobile': '#f59e0b',
    'Open Source': '#10b981',
};

const ExternalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);


export default function ProjectsPage({ data }: Props) {
    const [active, setActive] = useState('Tất cả');

    const filtered = useMemo(() => {
        if (active === 'Tất cả') return data;
        return data.filter((p) => p.category === active);
    }, [active, data]);

    return (
        <div className={styles.page}>
            {/* Background decoration */}
            <div className={styles.bg}>
                <div className={styles.bgBlob1} />
                <div className={styles.bgBlob2} />
                <div className={styles.grid} />
            </div>

            <div className={styles.wrap}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.tag}>portfolio / all projects</div>
                    <h1 className={styles.title}>
                        Tất cả <em>Dự Án</em>
                    </h1>
                    <p className={styles.subtitle}>
                        {data.length} dự án · Từ web đến design, từ ý tưởng đến sản phẩm thực tế.
                    </p>
                </header>

                {/* Filter bar */}
                <div className={styles.filterBar}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.pill} ${active === cat ? styles.pillActive : ''}`}
                            onClick={() => setActive(cat)}
                        >
                            {cat}
                            {cat !== 'Tất cả' && (
                                <span className={styles.pillCount}>
                                    {data.filter((p) => p.category === cat).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Project count */}
                <div className={styles.resultLine}>
                    <span>
                        Hiển thị <strong>{filtered.length}</strong> dự án
                        {active !== 'Tất cả' && <> trong <em>{active}</em></>}
                    </span>
                </div>

                {/* Grid */}
                <div className={styles.grid2}>
                    {filtered.map((p) => (
                        <article key={p.num} className={styles.card}>
                            {/* Card top accent */}
                            <div
                                className={styles.cardAccent}
                                style={{ background: categoryColors[p.category] ?? '#6366f1' }}
                            />

                            <div className={styles.cardInner}>
                                {/* Number + category */}
                                <div className={styles.cardMeta}>
                                    <span className={styles.cardNum}>{p.num}</span>
                                    <span
                                        className={styles.cardCat}
                                        style={{ color: categoryColors[p.category] ?? '#6366f1' }}
                                    >
                                        {p.category}
                                    </span>
                                    <span className={styles.cardYear}>{p.year}</span>
                                </div>

                                {/* Title */}
                                <h2 className={styles.cardTitle}>{p.title}</h2>

                                {/* Tags */}
                                <div className={styles.cardTags}>
                                    {p.tags.map((t) => (
                                        <span key={t} className={styles.cardTag}>
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Desc */}
                                <p className={styles.cardDesc}>{p.desc}</p>

                                {/* Link */}
                                <a href={p.href} className={styles.cardLink} target="_blank" rel="noreferrer">
                                    <span>Xem dự án</span>
                                    <ExternalIcon />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

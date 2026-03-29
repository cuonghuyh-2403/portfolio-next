'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Content } from '@/lib/content';
import s from './Dashboard.module.css';

type Tab = 'hero' | 'about' | 'skills' | 'projects' | 'contact' | 'inbox' | 'settings';

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
    created_at: string;
};

export default function DashboardPage() {
    const [content, setContent] = useState<Content | null>(null);
    const [tab, setTab] = useState<Tab>('hero');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    const load = useCallback(async () => {
        const res = await fetch('/api/content');
        if (res.status === 401) { router.push('/admin'); return; }
        setContent(await res.json());
    }, [router]);

    useEffect(() => { load(); }, [load]);

    const save = async () => {
        if (!content) return;
        setSaving(true);
        await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/admin';
    };

    if (!content) return <div style={{ color: '#7a7e96', padding: '4rem', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>Đang tải...</div>;

    const tabs: { id: Tab; label: React.ReactNode }[] = [
        { id: 'hero', label: <><svg className={s.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>Hero</> },
        { id: 'about', label: <><svg className={s.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>About</> },
        { id: 'skills', label: <><svg className={s.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>Skills</> },
        { id: 'projects', label: <><svg className={s.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>Projects</> },
        { id: 'contact', label: <><svg className={s.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>Contact</> },
        { id: 'inbox', label: <><svg className={s.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>Inbox</> },
        { id: 'settings', label: <><svg className={s.navIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>Cài đặt</> },
    ];

    return (
        <div className={s.shell}>
            {/* Sidebar */}
            <aside className={s.sidebar}>
                <div className={s.brand}>
                    <div className={s.brandIcon}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
                            <circle cx="12" cy="12" r="2" fill="white"/>
                        </svg>
                    </div>
                    <div className={s.brandTextWrapper}>
                        <span className={s.brandText}>Workspace</span>
                        <span className={s.adminTag}>Admin Panel</span>
                    </div>
                </div>
                <nav className={s.nav}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} className={`${s.navItem} ${tab === t.id ? s.navActive : ''}`}>
                            {t.label}
                        </button>
                    ))}
                </nav>
                <div className={s.sideBottom}>
                    <a href="/" target="_blank" className={s.viewSite}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        Xem Website
                    </a>
                    <button onClick={logout} className={s.logoutBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className={s.main}>
                <header className={s.header}>
                    <div>
                        <div className={s.headerTitle}>{tabs.find(t => t.id === tab)?.label}</div>
                        <div className={s.headerSub}>Manage content dynamically</div>
                    </div>
                    <button onClick={save} disabled={saving} className={`${s.saveBtn} ${saved ? s.saveBtnSaved : ''}`}>
                        {saved ? (
                            <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Đã lưu</>
                        ) : saving ? (
                            'Đang lưu...'
                        ) : (
                            <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Lưu thay đổi</>
                        )}
                    </button>
                </header>

                <div className={s.content}>
                    {tab === 'hero' && <HeroTab content={content} setContent={setContent} />}
                    {tab === 'about' && <AboutTab content={content} setContent={setContent} />}
                    {tab === 'skills' && <SkillsTab content={content} setContent={setContent} />}
                    {tab === 'projects' && <ProjectsTab content={content} setContent={setContent} />}
                    {tab === 'contact' && <ContactTab content={content} setContent={setContent} />}
                    {tab === 'inbox' && <InboxTab />}
                    {tab === 'settings' && <SettingsTab />}
                </div>
            </main>
        </div>
    );
}

/* ── Sub-components ── */

function Field({ label, value, onChange, multiline = false, rows = 3 }: {
    label: string; value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number;
}) {
    const base: React.CSSProperties = {
        width: '100%', padding: '0.85rem 1.2rem', background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#fff',
        fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', resize: multiline ? 'vertical' : 'none',
        transition: 'all 0.3s ease', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className={s.label}>{label}</label>
            {multiline
                ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} style={base} 
                    onFocus={e => {e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.background = 'rgba(255,255,255,0.05)'}}
                    onBlur={e => {e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'}}
                />
                : <input value={value} onChange={e => onChange(e.target.value)} style={base} 
                    onFocus={e => {e.target.style.borderColor = 'rgba(255,255,255,0.3)'; e.target.style.background = 'rgba(255,255,255,0.05)'}}
                    onBlur={e => {e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.03)'}}
                />
            }
        </div>
    );
}

function Card({ children, title, icon }: { children: React.ReactNode; title?: string; icon?: React.ReactNode }) {
    return (
        <div className={s.card}>
            {title && <div className={s.cardTitle}>{icon && <span style={{marginRight: '8px', opacity: 0.7, display:'flex'}}>{icon}</span>}{title}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>{children}</div>
        </div>
    );
}

function AvatarUpload({ avatarUrl, setAvatarUrl }: { avatarUrl?: string, setAvatarUrl: (url: string) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

    const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        setMsg(null);
    };

    const onUpload = async () => {
        const file = inputRef.current?.files?.[0];
        if (!file) return;
        setUploading(true);
        const fd = new FormData();
        fd.append('avatar', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        setUploading(false);
        if (res.ok && data.path) {
            setAvatarUrl(data.path);
            setMsg({ text: '✓ Upload thành công! Nhấn "Lưu thay đổi" để áp dụng cho website', ok: true });
        } else {
            setMsg({ text: data.error ?? 'Upload thất bại', ok: false });
        }
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (!file || !inputRef.current) return;
        // Replace input files via DataTransfer
        const dt = new DataTransfer();
        dt.items.add(file);
        inputRef.current.files = dt.files;
        setPreview(URL.createObjectURL(file));
        setMsg(null);
    };

    return (
        <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Preview */}
            <div style={{ flexShrink: 0, width: 100, height: 125, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                <img
                    src={preview ?? avatarUrl ?? `/avatar.png?t=${Date.now()}`}
                    alt="Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                {preview && (
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(231,76,60,.85)', textAlign: 'center', fontSize: '.6rem', color: '#fff', padding: '.2rem', fontWeight: 700 }}>PREVIEW</div>
                )}
            </div>

            {/* Right side */}
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={onDrop}
                    onClick={() => inputRef.current?.click()}
                    style={{ padding: '1rem', border: '1.5px dashed var(--border)', borderRadius: 3, textAlign: 'center', cursor: 'pointer', color: 'var(--muted)', fontSize: '.8rem', transition: 'border-color .2s' }}
                >
                    📂 Kéo thả ảnh vào đây hoặc <span style={{ color: '#e74c3c', textDecoration: 'underline' }}>chọn file</span>
                    <div style={{ fontSize: '.7rem', marginTop: '.3rem', opacity: .6 }}>JPG · PNG · WebP · GIF · Tối đa 10MB</div>
                </div>
                <input ref={inputRef} type="file" accept="image/*" onChange={onPick} style={{ display: 'none' }} />

                {msg && (
                    <div style={{ padding: '.5rem .8rem', borderRadius: 3, fontSize: '.78rem', background: msg.ok ? 'rgba(39,174,96,.12)' : 'rgba(192,57,43,.12)', border: `1px solid ${msg.ok ? 'rgba(39,174,96,.3)' : 'rgba(192,57,43,.3)'}`, color: msg.ok ? '#27ae60' : '#e74c3c' }}>
                        {msg.text}
                    </div>
                )}

                <button
                    onClick={onUpload}
                    disabled={!preview || uploading}
                    style={{ padding: '.55rem 1rem', background: preview ? '#c0392b' : 'var(--surface2)', border: 'none', borderRadius: 3, color: preview ? '#fff' : 'var(--muted)', fontSize: '.82rem', fontWeight: 700, cursor: preview ? 'pointer' : 'not-allowed', transition: 'background .2s' }}
                >
                    {uploading ? 'Đang upload lên Cloud...' : '↑ Upload avatar'}
                </button>
            </div>
        </div>
    );
}

function HeroTab({ content, setContent }: { content: Content; setContent: React.Dispatch<React.SetStateAction<Content | null>> }) {
    const h = content.hero;
    const set = (field: string, val: string) => setContent(c => c ? { ...c, hero: { ...c.hero, [field]: val } } : c);
    const setStat = (i: number, field: 'value' | 'label', val: string) =>
        setContent(c => { if (!c) return c; const stats = [...c.hero.stats]; stats[i] = { ...stats[i], [field]: val }; return { ...c, hero: { ...c.hero, stats } }; });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Ảnh đại diện (Avatar)" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>}>
                <AvatarUpload
                    avatarUrl={h.avatarUrl}
                    setAvatarUrl={(url) => set('avatarUrl', url)}
                />
            </Card>
            <div className={s.grid}>
                <Card title="Tiêu đề chính" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>}>
                    <Field label="Eyebrow" value={h.eyebrow} onChange={v => set('eyebrow', v)} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1rem' }}>
                        <Field label="Tên dòng 1" value={h.titleLine1} onChange={v => set('titleLine1', v)} />
                        <Field label="Tên dòng 2" value={h.titleLine2} onChange={v => set('titleLine2', v)} />
                    </div>
                    <Field label="Phụ đề nhỏ" value={h.subtitle} onChange={v => set('subtitle', v)} />
                    <Field label="Mô tả" value={h.description} onChange={v => set('description', v)} multiline rows={3} />
                </Card>
                <Card title="Sidebar (Trái/Phải)" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>}>
                    <Field label="Quote" value={h.quote} onChange={v => set('quote', v)} multiline rows={3} />
                    <div className={s.cardTitle}>Stats</div>
                    {h.stats.map((stat, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '.6rem' }}>
                            <Field label={`Số #${i + 1}`} value={stat.value} onChange={v => setStat(i, 'value', v)} />
                            <Field label="Nhãn" value={stat.label} onChange={v => setStat(i, 'label', v)} />
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
}

function AboutTab({ content, setContent }: { content: Content; setContent: React.Dispatch<React.SetStateAction<Content | null>> }) {
    const a = content.about;
    const setInfo = (field: string, val: string) => setContent(c => c ? { ...c, about: { ...c.about, info: { ...c.about.info, [field]: val } } } : c);
    const setBio = (i: number, val: string) => setContent(c => { if (!c) return c; const bio = [...c.about.bio]; bio[i] = val; return { ...c, about: { ...c.about, bio } }; });
    const setExp = (i: number, field: string, val: string) => setContent(c => { if (!c) return c; const exp = [...c.about.experience]; exp[i] = { ...exp[i], [field]: val }; return { ...c, about: { ...c.about, experience: exp } }; });
    const addExp = () => setContent(c => c ? { ...c, about: { ...c.about, experience: [...c.about.experience, { year: 'YYYY–YYYY', title: 'Vị trí', company: 'Công ty', desc: 'Mô tả' }] } } : c);
    const removeExp = (i: number) => setContent(c => { if (!c) return c; const exp = c.about.experience.filter((_, j) => j !== i); return { ...c, about: { ...c.about, experience: exp } }; });

    return (
        <div className={s.grid} style={{ gap: '1.5rem' }}>
            <Card title="Tiểu sử (Bio)" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}>
                {a.bio.map((b, i) => <Field key={i} label={`Đoạn ${i + 1}`} value={b} onChange={v => setBio(i, v)} multiline rows={3} />)}
            </Card>
            <Card title="Thông tin cá nhân" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}>
                <Field label="Vị trí" value={a.info.location} onChange={v => setInfo('location', v)} />
                <Field label="Học vấn" value={a.info.education} onChange={v => setInfo('education', v)} />
                <Field label="Email" value={a.info.email} onChange={v => setInfo('email', v)} />
                <Field label="Trạng thái" value={a.info.status} onChange={v => setInfo('status', v)} />
            </Card>
            <div style={{ gridColumn: '1 / -1' }}>
                <Card title="Kinh nghiệm làm việc" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>}>
                    {a.experience.map((e, i) => (
                        <div key={i} className={s.card} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span className={s.label} style={{ color: '#fff' }}>Vị trí {i + 1}</span>
                                <button onClick={() => removeExp(i)} className={s.removeBtn} style={{ marginBottom: 0 }}>✕ Xoá</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <Field label="Năm" value={e.year} onChange={v => setExp(i, 'year', v)} />
                                <Field label="Chức danh" value={e.title} onChange={v => setExp(i, 'title', v)} />
                                <Field label="Công ty" value={e.company} onChange={v => setExp(i, 'company', v)} />
                            </div>
                            <Field label="Mô tả" value={e.desc} onChange={v => setExp(i, 'desc', v)} multiline rows={2} />
                        </div>
                    ))}
                    <button onClick={addExp} className={s.addBtn}>＋ Thêm kinh nghiệm</button>
                </Card>
            </div>
        </div>
    );
}

function SkillsTab({ content, setContent }: { content: Content; setContent: React.Dispatch<React.SetStateAction<Content | null>> }) {
    const setSkill = (i: number, field: string, val: string) => setContent(c => { if (!c) return c; const skills = [...c.skills]; skills[i] = { ...skills[i], [field]: val }; return { ...c, skills }; });
    const addSkill = () => setContent(c => c ? { ...c, skills: [...c.skills, { name: 'New Skill', list: 'Tool 1\nTool 2', icon: 'code' }] } : c);
    const removeSkill = (i: number) => setContent(c => c ? { ...c, skills: c.skills.filter((_, j) => j !== i) } : c);

    return (
        <div>
            <div className={s.grid} style={{ marginBottom: '1.5rem', gap: '1.5rem' }}>
                {content.skills.map((sk, i) => (
                    <Card key={i} title={`Nhóm kỹ năng ${i + 1}`} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => removeSkill(i)} className={s.removeBtn}>✕ Xoá</button>
                        </div>
                        <Field label="Tên nhóm" value={sk.name} onChange={v => setSkill(i, 'name', v)} />
                        <Field label="Danh sách (mỗi dòng một dòng)" value={sk.list} onChange={v => setSkill(i, 'list', v)} multiline rows={4} />
                    </Card>
                ))}
            </div>
            <button onClick={addSkill} className={s.addBtn}>＋ Thêm skill card</button>
        </div>
    );
}

function ProjectsTab({ content, setContent }: { content: Content; setContent: React.Dispatch<React.SetStateAction<Content | null>> }) {
    const setProject = (i: number, field: string, val: string | string[]) => setContent(c => { if (!c) return c; const projects = [...c.projects]; projects[i] = { ...projects[i], [field]: val }; return { ...c, projects }; });
    const addProject = () => setContent(c => c ? { ...c, projects: [...c.projects, { num: String(c.projects.length + 1).padStart(2, '0'), title: 'New Project', category: 'Web Development', tags: ['Tag'], desc: 'Mô tả dự án', href: '#', year: new Date().getFullYear().toString() }] } : c);
    const removeProject = (i: number) => setContent(c => c ? { ...c, projects: c.projects.filter((_, j) => j !== i) } : c);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {content.projects.map((p, i) => (
                    <Card key={i} title={`${p.num} — ${p.title}`} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => removeProject(i)} className={s.removeBtn}>✕ Xoá</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(60px, auto) 1fr', gap: '1rem' }}>
                            <Field label="Số" value={p.num} onChange={v => setProject(i, 'num', v)} />
                            <Field label="Tiêu đề" value={p.title} onChange={v => setProject(i, 'title', v)} />
                        </div>
                        <Field label="Link" value={p.href} onChange={v => setProject(i, 'href', v)} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Field label="Category" value={p.category} onChange={v => setProject(i, 'category', v)} />
                            <Field label="Năm" value={p.year} onChange={v => setProject(i, 'year', v)} />
                        </div>
                        <Field label="Tags (cách nhau bằng dấu phẩy)" value={p.tags.join(', ')} onChange={v => setProject(i, 'tags', v.split(',').map(t => t.trim()))} />
                        <Field label="Mô tả" value={p.desc} onChange={v => setProject(i, 'desc', v)} multiline rows={2} />
                    </Card>
                ))}
            </div>
            <button onClick={addProject} className={s.addBtn}>＋ Thêm dự án</button>
        </div>
    );
}


function ContactTab({ content, setContent }: { content: Content; setContent: React.Dispatch<React.SetStateAction<Content | null>> }) {
    const c = content.contact;
    const set = (field: string, val: string) => setContent(prev => prev ? { ...prev, contact: { ...prev.contact, [field]: val } } : prev);
    const setSocial = (i: number, field: 'label' | 'href', val: string) =>
        setContent(prev => { if (!prev) return prev; const socials = [...prev.contact.socials]; socials[i] = { ...socials[i], [field]: val }; return { ...prev, contact: { ...prev.contact, socials } }; });
    const addSocial = () => setContent(prev => prev ? { ...prev, contact: { ...prev.contact, socials: [...prev.contact.socials, { label: 'Link', href: 'https://' }] } } : prev);
    const removeSocial = (i: number) => setContent(prev => prev ? { ...prev, contact: { ...prev.contact, socials: prev.contact.socials.filter((_, j) => j !== i) } } : prev);

    return (
        <div className={s.grid} style={{ gap: '1.5rem' }}>
            <Card title="Nội dung trang Liên hệ" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}>
                <Field label="Tiêu đề lớn" value={c.heading} onChange={v => set('heading', v)} multiline rows={2} />
                <Field label="Đoạn văn" value={c.paragraph} onChange={v => set('paragraph', v)} multiline rows={3} />
            </Card>
            <Card title="Mạng xã hội" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>}>
                {c.socials.map((soc, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 4fr auto', gap: '.6rem', alignItems: 'end' }}>
                        <Field label="Nhãn" value={soc.label} onChange={v => setSocial(i, 'label', v)} />
                        <Field label="Link" value={soc.href} onChange={v => setSocial(i, 'href', v)} />
                        <button onClick={() => removeSocial(i)} className={s.removeBtn} style={{ marginBottom: 0 }}>✕</button>
                    </div>
                ))}
                <button onClick={addSocial} className={s.addBtn}>＋ Thêm mạng xã hội</button>
            </Card>
        </div>
    );
}

function SettingsTab() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch('/api/auth/account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage({ text: 'Cập nhật tài khoản thành công! Lần đăng nhập sau hãy dùng Email & Mật khẩu này.', type: 'success' });
                setPassword(''); // Clear password field for safety
            } else {
                setMessage({ text: data.error || 'Có lỗi xảy ra', type: 'error' });
            }
        } catch {
            setMessage({ text: 'Lỗi kết nối', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Quản lý tài khoản Admin (Supabase Auth)" icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                Thiết lập Email và Mật khẩu để đăng nhập an toàn hơn. Khi đã thiết lập, bạn có thể đăng nhập bằng Email này, hoặc vẫn dùng mật khẩu cục bộ trong file `.env.local` như thông thường.
            </p>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>Email Admin</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                        style={{
                            width: '100%', padding: '.65rem .9rem', background: 'var(--surface2)',
                            border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text)',
                            fontSize: '.9rem', fontFamily: 'Inter, sans-serif', outline: 'none'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted)' }}>Mật khẩu mới</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        style={{
                            width: '100%', padding: '.65rem .9rem', background: 'var(--surface2)',
                            border: '1px solid var(--border)', borderRadius: 3, color: 'var(--text)',
                            fontSize: '.9rem', fontFamily: 'Inter, sans-serif', outline: 'none'
                        }}
                    />
                </div>
                
                {message && (
                    <div style={{ 
                        padding: '0.8rem 1rem', 
                        borderRadius: '4px', 
                        fontSize: '0.85rem',
                        lineHeight: 1.4,
                        background: message.type === 'success' ? 'rgba(39,174,96,0.1)' : 'rgba(192,57,43,0.1)',
                        border: `1px solid ${message.type === 'success' ? 'rgba(39,174,96,0.3)' : 'rgba(192,57,43,0.3)'}`,
                        color: message.type === 'success' ? '#2ecc71' : '#e74c3c'
                    }}>
                        {message.text}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{
                        padding: '0.8rem 1.2rem',
                        background: '#c0392b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        transition: 'opacity 0.2s',
                        width: 'fit-content',
                        marginTop: '0.5rem'
                    }}
                >
                    {loading ? 'Đang lưu...' : 'Lưu thông tin'}
                </button>
            </form>
        </Card>
    );
}

function InboxTab() {
    const [contacts, setContacts] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const loadContacts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/contacts');
            if (res.ok) {
                setContacts(await res.json());
            }
        } catch (err) {
            console.error('Failed to load contacts:', err);
        }
        setLoading(false);
    }, []);

    useEffect(() => { loadContacts(); }, [loadContacts]);

    const toggleRead = async (id: string, read: boolean) => {
        setActionLoading(id);
        await fetch('/api/contacts', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, read }),
        });
        setContacts(prev => prev.map(c => c.id === id ? { ...c, read } : c));
        setActionLoading(null);
    };

    const deleteContact = async (id: string) => {
        if (!confirm('Xoá tin nhắn này?')) return;
        setActionLoading(id);
        await fetch('/api/contacts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setContacts(prev => prev.filter(c => c.id !== id));
        setActionLoading(null);
    };

    const timeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Vừa xong';
        if (mins < 60) return `${mins} phút trước`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours} giờ trước`;
        const days = Math.floor(hours / 24);
        return `${days} ngày trước`;
    };

    const unreadCount = contacts.filter(c => !c.read).length;

    if (loading) return <div style={{ color: '#7a7e96', textAlign: 'center', padding: '3rem' }}>Đang tải tin nhắn...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Summary bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', color: '#7a7e96' }}>
                    {contacts.length} tin nhắn · <span style={{ color: unreadCount > 0 ? '#e74c3c' : '#27ae60' }}>{unreadCount} chưa đọc</span>
                </span>
                <button onClick={loadContacts} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#7a7e96', padding: '.4rem .8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '.75rem', fontFamily: 'var(--mono)' }}>↻ Làm mới</button>
            </div>

            {contacts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#7a7e96', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>📭</div>
                    <p>Chưa có tin nhắn nào.</p>
                </div>
            ) : (
                contacts.map(c => (
                    <div key={c.id} style={{
                        padding: '1.5rem',
                        background: c.read ? 'rgba(255,255,255,0.02)' : 'rgba(231,76,60,0.05)',
                        border: `1px solid ${c.read ? 'rgba(255,255,255,0.06)' : 'rgba(231,76,60,0.15)'}`,
                        borderRadius: '12px',
                        borderLeft: c.read ? undefined : '3px solid #e74c3c',
                        position: 'relative',
                        transition: 'all 0.2s'
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                                <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem', marginBottom: '.2rem' }}>
                                    {!c.read && <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#e74c3c', marginRight: '.5rem' }} />}
                                    {c.name}
                                </div>
                                <a href={`mailto:${c.email}`} style={{ color: '#7a7e96', fontSize: '.85rem', textDecoration: 'none' }}>{c.email}</a>
                            </div>
                            <span style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', color: '#555', whiteSpace: 'nowrap' }}>{timeAgo(c.created_at)}</span>
                        </div>

                        {/* Message */}
                        <p style={{ color: '#c0c0c0', lineHeight: 1.6, fontSize: '.9rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{c.message}</p>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '.5rem' }}>
                            <button
                                onClick={() => toggleRead(c.id, !c.read)}
                                disabled={actionLoading === c.id}
                                style={{ padding: '.4rem .8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#7a7e96', cursor: 'pointer', fontSize: '.75rem', fontFamily: 'var(--mono)', transition: 'all 0.2s' }}
                            >
                                {c.read ? '📩 Đánh dấu chưa đọc' : '✓ Đánh dấu đã đọc'}
                            </button>
                            <button
                                onClick={() => deleteContact(c.id)}
                                disabled={actionLoading === c.id}
                                style={{ padding: '.4rem .8rem', background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: '6px', color: '#e74c3c', cursor: 'pointer', fontSize: '.75rem', fontFamily: 'var(--mono)', transition: 'all 0.2s' }}
                            >
                                ✕ Xoá
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

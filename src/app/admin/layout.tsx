import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin — Portfolio CMS',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-layout-wrapper">
            <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --bg: #0f1117;
                    --surface: #1a1d27;
                    --surface2: #22263a;
                    --accent: #c0392b;
                    --accent2: #e74c3c;
                    --text: #e8eaf0;
                    --muted: #7a7e96;
                    --border: rgba(255,255,255,.08);
                    --sans: 'Inter', system-ui, sans-serif;
                    --mono: 'Space Mono', monospace;
                }
                .admin-layout-wrapper { 
                    font-family: var(--sans); 
                    background: var(--bg); 
                    color: var(--text); 
                    min-height: 100vh; 
                }
                .admin-layout-wrapper * { cursor: default; }
            `}} />
            {children}
        </div>
    );
}

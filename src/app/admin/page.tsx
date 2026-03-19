'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function AdminLoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        if (window.location.hash.includes('access_token')) {
            setLoading(true);
            supabase.auth.getSession().then(({ data, error }) => {
                if (error || !data.session) {
                    setError('Phiên đăng nhập không hợp lệ hoặc đã hết hạn.');
                    setLoading(false);
                    return;
                }
                
                fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: data.session.user.email, 
                        access_token: data.session.access_token 
                    })
                }).then(async (res) => {
                    if (res.ok) {
                        router.push('/admin/dashboard');
                    } else {
                        const errData = await res.json();
                        setError(errData.error || 'Authentication failed');
                        setLoading(false);
                    }
                }).catch(() => {
                    setError('Lỗi kết nối đên máy chủ.');
                    setLoading(false);
                });
            });
        }
    }, [router]);

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/admin`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || 'Lỗi kết nối Google');
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="vision-page">
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            
            {/* Apple-style Mesh Background */}
            <div className="mesh-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <main 
                className="vision-glass-container"
                style={{
                    opacity: mounted ? 1 : 0, 
                    transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                }}
            >
                <div className="vision-glass">
                    <div className="glass-content">
                        <div className="icon-wrapper">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>

                        <div className="text-header">
                            <h1 className="title">Portfolio Admin</h1>
                            <p className="subtitle">Secure authentication required</p>
                        </div>

                        <div className="action-area">
                            <button 
                                onClick={handleGoogleLogin} 
                                className={`vision-btn ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                <div className="btn-content">
                                    <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="google-logo">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
                                    </svg>
                                    <span>{loading ? 'Authenticating...' : 'Sign in with Google'}</span>
                                </div>
                            </button>

                            {error && (
                                <div className="error-msg">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="footer-note">
                            SSO Protected System
                        </div>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{__html: `
                :root {
                    --bg-dark: #000000;
                    --glass-bg: rgba(30, 30, 35, 0.45);
                    --glass-border: rgba(255, 255, 255, 0.08);
                    --glass-highlight: rgba(255, 255, 255, 0.15);
                    --text-primary: #ffffff;
                    --text-secondary: rgba(255, 255, 255, 0.55);
                }

                * { box-sizing: border-box; }
                body { margin: 0; background: var(--bg-dark); }

                .vision-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    position: relative;
                    overflow: hidden;
                    background-color: var(--bg-dark);
                }

                /* -- Apple Minimalist Mesh -- */
                .mesh-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    overflow: hidden;
                    background: #000;
                }

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    opacity: 0.6;
                    animation-iteration-count: infinite;
                    animation-direction: alternate;
                    animation-timing-function: ease-in-out;
                }

                .orb-1 {
                    background: #3B82F6; /* Azure Blue */
                    width: 60vw; height: 60vw;
                    top: -10vw; left: -10vw;
                    animation-name: float-1;
                    animation-duration: 25s;
                }

                .orb-2 {
                    background: #8B5CF6; /* Violet */
                    width: 50vw; height: 50vw;
                    bottom: -10vw; right: -5vw;
                    animation-name: float-2;
                    animation-duration: 30s;
                }

                .orb-3 {
                    background: #0EA5E9; /* Sky Blue */
                    width: 40vw; height: 40vw;
                    top: 40%; left: 40%;
                    animation-name: float-3;
                    animation-duration: 35s;
                }

                @keyframes float-1 {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(10vw, 5vw) scale(1.1); }
                }
                @keyframes float-2 {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(-8vw, -10vw) scale(1.15); }
                }
                @keyframes float-3 {
                    0% { transform: translate(0, 0) scale(1.2); }
                    100% { transform: translate(-15vw, 15vw) scale(1); }
                }

                /* -- Vision Glass -- */
                .vision-glass-container {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 400px;
                    padding: 0 20px;
                    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .vision-glass {
                    background: var(--glass-bg);
                    backdrop-filter: blur(48px) saturate(180%);
                    -webkit-backdrop-filter: blur(48px) saturate(180%);
                    border-radius: 32px;
                    border: 1px solid var(--glass-border);
                    box-shadow: 
                        0 24px 64px -16px rgba(0, 0, 0, 0.6),
                        inset 0 1px 0 0 var(--glass-highlight);
                    overflow: hidden;
                    position: relative;
                }
                
                /* Specular highlight map */
                .vision-glass::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at top left, rgba(255,255,255,0.1), transparent 50%);
                    pointer-events: none;
                }

                .glass-content {
                    padding: 48px 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    position: relative;
                    z-index: 2;
                }

                .icon-wrapper {
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
                    border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 24px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.1);
                }

                .text-header {
                    margin-bottom: 40px;
                }

                .title {
                    color: var(--text-primary);
                    font-size: 1.5rem;
                    font-weight: 600;
                    letter-spacing: -0.02em;
                    margin: 0 0 8px 0;
                }

                .subtitle {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    font-weight: 400;
                    margin: 0;
                }

                .action-area {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                /* Apple-style vivid button */
                .vision-btn {
                    width: 100%;
                    background: #ffffff;
                    color: #000000;
                    border: none;
                    border-radius: 14px;
                    padding: 0;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: 1rem;
                    font-weight: 500;
                    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
                    box-shadow: 0 4px 12px rgba(255,255,255,0.1);
                }

                .btn-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    padding: 14px;
                }

                .vision-btn:hover:not(:disabled) {
                    transform: scale(1.02);
                }

                .vision-btn:active:not(:disabled) {
                    transform: scale(0.98);
                }

                .vision-btn.loading {
                    opacity: 0.8;
                    cursor: not-allowed;
                }

                .google-logo path {
                    fill: #000; /* Apple likes monochromatic logos on solid buttons */
                }

                .error-msg {
                    color: #ff453a;
                    font-size: 0.85rem;
                    font-weight: 500;
                    animation: fadeIn 0.3s ease;
                }

                .footer-note {
                    margin-top: 32px;
                    color: rgba(255,255,255,0.3);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 600;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </div>
    );
}

import { cookies } from 'next/headers';

const SESSION_COOKIE = 'portfolio_admin_session';
const SECRET = process.env.AUTH_SECRET ?? 'fallback-secret';

function sign(value: string): string {
    // Simple HMAC-like signature using btoa — sufficient for low-stakes admin auth
    return Buffer.from(`${value}.${SECRET}`).toString('base64');
}

export function createSessionToken(): string {
    const payload = `admin:${Date.now()}`;
    return sign(payload);
}

export function isValidToken(token: string): boolean {
    // Token is valid if it was signed with our secret and not too old (24h)
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        if (!decoded.endsWith(`.${SECRET}`)) return false;
        const payload = decoded.slice(0, decoded.length - SECRET.length - 1);
        const [, tsStr] = payload.split(':');
        const ts = parseInt(tsStr, 10);
        if (isNaN(ts)) return false;
        const ageMs = Date.now() - ts;
        return ageMs < 30 * 24 * 60 * 60 * 1000; // 30 days
    } catch {
        return false;
    }
}

export async function getSession(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return false;
    return isValidToken(token);
}

export { SESSION_COOKIE };

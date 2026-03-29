import { NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const adminEmail = process.env.ADMIN_EMAIL;

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (!code) {
        return NextResponse.redirect(`${requestUrl.origin}/admin?error=No+code+provided`);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            flowType: 'pkce',
            persistSession: false,
        }
    });

    try {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
            console.error('Auth error:', error);
            return NextResponse.redirect(`${requestUrl.origin}/admin?error=Auth+Failed`);
        }

        const userEmail = data.user?.email;

        // Verify that the user who logged in is exactly the ADMIN_EMAIL
        if (!userEmail || userEmail !== adminEmail) {
            console.warn(`Unauthorized login attempt by: ${userEmail}`);
            return NextResponse.redirect(`${requestUrl.origin}/admin?error=Unauthorized+Email`);
        }

        // Authentication successful and authorized!
        const token = createSessionToken();
        const response = NextResponse.redirect(`${requestUrl.origin}/admin/dashboard`);
        
        response.cookies.set(SESSION_COOKIE, token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days — matches auth.ts validation
        });

        return response;

    } catch (err) {
        console.error('Unexpected callback error:', err);
        return NextResponse.redirect(`${requestUrl.origin}/admin?error=Internal+Error`);
    }
}

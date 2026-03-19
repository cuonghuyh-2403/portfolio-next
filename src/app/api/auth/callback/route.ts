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

    // We must create a new client instance for this specific server-side request
    // to handle the code exchange
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
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

        // Verify that the user who logged in is exactly the ADMIN_EMAIL we defined in .env.local
        if (!userEmail || userEmail !== adminEmail) {
            console.warn(`Unauthorized login attempt by: ${userEmail}`);
            return NextResponse.redirect(`${requestUrl.origin}/admin?error=Unauthorized+Email`);
        }

        // Authentication successful and authorized!
        // Mint our local session cookie to grant access to our dashboard
        const token = createSessionToken();
        const response = NextResponse.redirect(`${requestUrl.origin}/admin/dashboard`);
        
        response.cookies.set(SESSION_COOKIE, token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 24h
        });

        return response;

    } catch (err) {
        console.error('Unexpected callback error:', err);
        return NextResponse.redirect(`${requestUrl.origin}/admin?error=Internal+Error`);
    }
}

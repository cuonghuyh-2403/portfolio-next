import { NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    const { email, password, access_token } = await req.json();

    if (!email) {
        return NextResponse.json({ error: 'Require email' }, { status: 400 });
    }

    let userEmail = null;

    if (access_token) {
        // OAuth Flow: The user just logged in via Google Auth on the Client,
        // and sent us their access token. We verify it with Supabase.
        const { data, error } = await supabaseAdmin.auth.getUser(access_token);
        if (error || !data.user) {
            return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 401 });
        }
        userEmail = data.user.email;
    } else if (password) {
        // Fallback: This block might be deprecated based on previous edits, 
        // but keeping it safely for potential edge cases if you re-add password fields.
        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.session) {
            return NextResponse.json({ error: 'Thông tin đăng nhập không hợp lệ' }, { status: 401 });
        }
        userEmail = data.session.user.email;
    } else {
        return NextResponse.json({ error: 'Require authentication material' }, { status: 400 });
    }


    // Make sure they are the admin email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && userEmail !== adminEmail) {
        return NextResponse.json({ error: 'Email không được cấp quyền' }, { status: 403 });
    }

    const token = createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
}

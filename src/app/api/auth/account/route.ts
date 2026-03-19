import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    // 1. Verify that the request is from an authenticated admin session
    const isAuth = await getSession();
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, password } = await req.json();

    if (!email || !password || password.length < 6) {
        return NextResponse.json({ error: 'Email và mật khẩu (ít nhất 6 ký tự) là bắt buộc' }, { status: 400 });
    }

    try {
        // Find if any admin user exists in Supabase. We only expect 1 admin for this portfolio.
        const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        
        if (listError) {
            console.error('List users error:', listError);
            return NextResponse.json({ error: 'Lỗi kiểm tra người dùng' }, { status: 500 });
        }

        if (users && users.length > 0) {
            // Update existing user
            const userId = users[0].id; // Just update the first (and only) user
            const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
                email,
                password,
                email_confirm: true, // Auto-confirm for admin
            });
            if (updateError) {
                console.error('Update error:', updateError);
                return NextResponse.json({ error: updateError.message }, { status: 400 });
            }
        } else {
            // Create a new admin user
            const { error: createError } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
            });
            if (createError) {
                console.error('Create error:', createError);
                return NextResponse.json({ error: createError.message }, { status: 400 });
            }
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Account auth error:', err);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

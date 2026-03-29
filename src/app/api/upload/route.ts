import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    const ok = await getSession();
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const formData = await req.formData();
        const file = formData.get('avatar') as File | null;

        if (!file) return NextResponse.json({ error: 'Không có file' }, { status: 400 });

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Chỉ hỗ trợ JPG, PNG, WebP, GIF' }, { status: 400 });
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File tối đa 10MB' }, { status: 400 });
        }

        // Upload to Supabase Storage bucket 'portfolio'
        // Using a timestamp to force cache bypass on updates
        const buffer = await file.arrayBuffer();
        const ext = file.name.split('.').pop() || 'png';
        const fileName = `avatar-${Date.now()}.${ext}`;

        const { data, error } = await supabaseAdmin
            .storage
            .from('portfolio')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: true
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return NextResponse.json({ error: `Upload Supabase thất bại: ${error.message}` }, { status: 500 });
        }

        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from('portfolio')
            .getPublicUrl(fileName);

        return NextResponse.json({ ok: true, path: publicUrl });

    } catch (err) {
        console.error('Upload Error:', err);
        return NextResponse.json({ error: 'Lỗi server khi upload' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { getContent, updateContent, type Content } from '@/lib/content';
import { getSession } from '@/lib/auth';

export async function GET() {
    const ok = await getSession();
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const content = await getContent();
    return NextResponse.json(content);
}

export async function PUT(req: Request) {
    const ok = await getSession();
    if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const data: Content = await req.json();
    await updateContent(data);
    return NextResponse.json({ ok: true });
}

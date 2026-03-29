import { supabaseAdmin } from './supabase';

export type Content = {
    hero: {
        eyebrow: string;
        titleLine1: string;
        titleLine2: string;
        subtitle: string;
        description: string;
        quote: string;
        avatarUrl?: string;
        stats: { value: string; label: string }[];
    };
    about: {
        bio: string[];
        info: { location: string; education: string; email: string; status: string };
        experience: { year: string; title: string; company: string; desc: string }[];
    };
    skills: { name: string; list: string; icon: string }[];
    projects: { num: string; title: string; category: string; tags: string[]; desc: string; href: string; year: string; imageUrl?: string }[];
    contact: {
        heading: string;
        paragraph: string;
        socials: { label: string; href: string }[];
    };
};

export async function getContent(): Promise<Content> {
    const { data, error } = await supabaseAdmin
        .from('portfolio_content')
        .select('data')
        .eq('id', 'main')
        .single();

    if (error || !data) {
        console.warn(`Failed to fetch content from Supabase: ${error?.message}. Using empty fallback for build.`);
        return {
            hero: { eyebrow: '', titleLine1: '', titleLine2: '', subtitle: '', description: '', quote: '', stats: [] },
            about: { bio: [], info: { location: '', education: '', email: '', status: '' }, experience: [] },
            skills: [], projects: [],
            contact: { heading: '', paragraph: '', socials: [] }
        } as Content;
    }

    return data.data as Content;
}

export async function updateContent(content: Content): Promise<void> {
    const { error } = await supabaseAdmin
        .from('portfolio_content')
        .upsert({ id: 'main', data: content, updated_at: new Date().toISOString() });

    if (error) {
        throw new Error(`Failed to update content in Supabase: ${error.message}`);
    }
}

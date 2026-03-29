import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

// Client for the browser (public)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only client with service_role key — full read/write access.
// We only want to initialize this in the Node.js environment to prevent Next.js client-side crashes, 
// as `SUPABASE_SERVICE_KEY` is not exposed to the browser.
export const supabaseAdmin = typeof window === 'undefined' 
    ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
    : null as unknown as ReturnType<typeof createClient>; 


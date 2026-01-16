
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helper to ensure URL is valid
const getValidUrl = (url) => {
  try {
    if (!url) return null;
    if (url.includes('your_supabase_url')) return null; // Detect placeholder
    if (!url.startsWith('http')) return null;
    new URL(url); // Throws if invalid
    return url;
  } catch {
    return null;
  }
};

const validUrl = getValidUrl(supabaseUrl);
const validKey = supabaseAnonKey && !supabaseAnonKey.includes('your_supabase_anon_key') ? supabaseAnonKey : null;

if (!validUrl || !validKey) {
    console.error('❌ Supabase credentials missing or invalid. Application will not function.');
}

export const supabase = (validUrl && validKey) ? createClient(validUrl, validKey) : null;

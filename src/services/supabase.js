import { createClient } from '@supabase/supabase-js'
import config from '../config'

const supabaseUrl = config.supabase.url
const supabaseAnonKey = config.supabase.anonKey

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

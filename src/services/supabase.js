
import { createClient } from '@supabase/supabase-js'
import toast from 'react-hot-toast';

const envUrl = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.VITE_SUPABASE_URL : process.env.VITE_SUPABASE_URL
const envKey = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.VITE_SUPABASE_ANON_KEY : process.env.VITE_SUPABASE_ANON_KEY

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

const url = getValidUrl(envUrl);
const key = envKey && !envKey.includes('your_supabase_anon_key') ? envKey : null;

if (!url || !key) {
    console.error('❌ Supabase credentials missing or invalid. Application will not function.');
}

export const supabase = (url && key) ? createClient(url, key) : null;

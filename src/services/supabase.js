import { createClient } from '@supabase/supabase-js'

const envUrl = import.meta.env.VITE_SUPABASE_URL
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helper to ensure URL is valid
const getValidUrl = (url) => {
  try {
    if (!url) return null;
    if (!url.startsWith('http')) return null;
    new URL(url); // Throws if invalid
    return url;
  } catch {
    return null;
  }
};

const url = getValidUrl(envUrl) || 'https://placeholder.supabase.co'
const key = envKey || 'placeholder-key'

if (url === 'https://placeholder.supabase.co') {
    console.warn('⚠️ Supabase environment variables missing or invalid. Using placeholder URL. Auth and DB will not work.');
}

export const supabase = createClient(url, key)

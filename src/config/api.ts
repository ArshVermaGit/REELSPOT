// Basic configuration placeholder
export const API_CONFIG = {
  INSTAGRAM_API_KEY: process.env.NEXT_PUBLIC_INSTAGRAM_API_KEY || 'YOUR_INSTAGRAM_API_KEY_HERE',
  YOUTUBE_API_KEY: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY_HERE',
  FACEBOOK_API_KEY: process.env.NEXT_PUBLIC_FACEBOOK_API_KEY || 'YOUR_FACEBOOK_API_KEY_HERE',
  TIKTOK_API_KEY: process.env.NEXT_PUBLIC_TIKTOK_API_KEY || 'YOUR_TIKTOK_API_KEY_HERE',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || 'reelspot_development_secret',
};

export const getApiKey = (platform: keyof typeof API_CONFIG) => {
  // Logic to retrieve from local storage or environment
  if (typeof window !== 'undefined') {
    return localStorage.getItem(platform) || API_CONFIG[platform];
  }
  return API_CONFIG[platform];
};

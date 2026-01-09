export interface UserSettings {
  id: string;
  userId: string;
  downloadPath: string;
  autoHistory: boolean;
  darkMode: boolean;
  analytics: boolean;
  cookies: boolean;
  
  // Platform API Keys
  INSTAGRAM_API_KEY?: string;
  YOUTUBE_API_KEY?: string;
  FACEBOOK_API_KEY?: string;
  TIKTOK_API_KEY?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
}

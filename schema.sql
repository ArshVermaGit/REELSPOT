-- Database Schema for Reelspot

-- 1. Table: users (Managed by Supabase Auth, but usually we extend it or rely on auth.users)
-- Note: 'auth.users' is automatically created.

-- 2. Table: api_keys
create table if not exists public.api_keys (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null check (platform in ('instagram', 'youtube', 'facebook', 'tiktok')),
  api_key text not null, -- In a real app, this should be encrypted using pgcrypto or similar
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, platform)
);

-- Enable RLS
alter table public.api_keys enable row level security;

-- Policies for api_keys
create policy "Users can view their own api keys" 
on public.api_keys for select 
using (auth.uid() = user_id);

create policy "Users can insert their own api keys" 
on public.api_keys for insert 
with check (auth.uid() = user_id);

create policy "Users can update their own api keys" 
on public.api_keys for update 
using (auth.uid() = user_id);

create policy "Users can delete their own api keys" 
on public.api_keys for delete 
using (auth.uid() = user_id);


-- 3. Table: download_history
create table if not exists public.download_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null,
  media_url text not null,
  media_type text check (media_type in ('reel', 'story', 'post', 'video', 'short')),
  format text check (format in ('mp4', 'mp3', 'jpg', 'png')),
  quality text check (quality in ('1080p', '720p', '480p', '360p', 'audio')),
  file_size bigint,
  download_status text check (download_status in ('pending', 'processing', 'completed', 'failed')) default 'pending',
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.download_history enable row level security;

-- Policies for download_history
create policy "Users can view their own history" 
on public.download_history for select 
using (auth.uid() = user_id);

create policy "Users can insert their own history" 
on public.download_history for insert 
with check (auth.uid() = user_id);

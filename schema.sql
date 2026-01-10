-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- API Keys Table
create table api_keys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null check (platform in ('instagram', 'youtube', 'facebook', 'tiktok')),
  api_key text not null, 
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  -- Status Columns
  status text default 'active', -- 'active', 'invalid', 'expired'
  last_tested_at timestamp with time zone,
  quota_usage int default 0,
  
  unique(user_id, platform)
);

-- Download History Table
create table download_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null,
  media_url text not null,
  media_type text not null, 
  format text not null, 
  quality text not null, 
  file_size bigint, 
  download_status text not null default 'pending' check (download_status in ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  
  -- Extra Metadata
  title text,
  thumbnail_url text,
  author text,
  duration text,
  metadata jsonb default '{}'::jsonb, 

  created_at timestamp with time zone default now()
);

-- User Preferences Table (Renamed from user_settings)
create table user_preferences (
    user_id uuid references auth.users(id) on delete cascade primary key,
    default_format text default 'mp4',
    default_quality text default '1080p',
    
    auto_start_downloads boolean default false,
    notifications_enabled boolean default true,
    
    auto_delete_days int default 0, 
    history_limit int default 1000,
    show_file_warnings boolean default true,
    
    theme text default 'light',
    updated_at timestamp with time zone default now()
);

-- RLS Policies
alter table api_keys enable row level security;
alter table download_history enable row level security;
alter table user_preferences enable row level security;

-- API Keys Policies
create policy "Users can manage their own API keys"
  on api_keys for all
  using (auth.uid() = user_id);

-- History Policies
create policy "Users can manage their own download history"
  on download_history for all
  using (auth.uid() = user_id);

-- Preferences Policies
create policy "Users can manage their own preferences"
  on user_preferences for all
  using (auth.uid() = user_id);

-- Indexes
create index idx_api_keys_user_platform on api_keys(user_id, platform);
create index idx_download_history_user_created on download_history(user_id, created_at desc);
create index idx_download_history_platform on download_history(platform);

-- Updated_at Trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_api_keys_updated_at before update on api_keys
  for each row execute function update_updated_at_column();

create trigger update_user_preferences_updated_at before update on user_preferences
  for each row execute function update_updated_at_column();

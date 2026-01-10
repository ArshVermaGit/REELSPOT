-- Enable pgcrypto for UUID generation and potential encryption
extensions [
  "pgcrypto"
];

-- API Keys Table
create table api_keys (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  platform text not null,
  api_key text not null, 
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- New Status Columns
  status text default 'active', -- 'active', 'invalid', 'expired'
  last_tested_at timestamp with time zone,
  quota_usage int default 0,
  
  unique(user_id, platform)
);

-- Download History Table
create table download_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  platform text not null,
  media_url text not null,
  media_type text, 
  format text, 
  quality text, 
  file_size bigint, 
  download_status text not null, 
  
  title text,
  thumbnail_url text,
  author text,
  duration text,
  error_message text,
  metadata jsonb default '{}'::jsonb, 

  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Settings Table
create table user_settings (
    user_id uuid references auth.users(id) primary key,
    default_format text default 'mp4',
    default_quality text default '1080p',
    
    auto_download boolean default false,
    notifications_enabled boolean default true,
    
    auto_delete_days int default 30, -- Renamed from history_retention_days or kept for logic
    history_limit int default 1000,
    show_file_warnings boolean default true,
    
    theme text default 'light',
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table api_keys enable row level security;
alter table download_history enable row level security;
alter table user_settings enable row level security;

-- API Keys Policies
create policy "Users can view their own api keys"
  on api_keys for select
  using (auth.uid() = user_id);

create policy "Users can insert/update their own api keys"
  on api_keys for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own api keys"
  on api_keys for update
  using (auth.uid() = user_id);

create policy "Users can delete their own api keys"
  on api_keys for delete
  using (auth.uid() = user_id);

-- History Policies
create policy "Users can view their own history"
  on download_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own history"
  on download_history for insert
  with check (auth.uid() = user_id);
  
create policy "Users can delete their own history"
  on download_history for delete
  using (auth.uid() = user_id);

-- Settings Policies
create policy "Users can view their own settings"
  on user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own settings"
  on user_settings for update
  using (auth.uid() = user_id);

-- Enable pgcrypto for UUID generation and potential encryption
extensions [
  "pgcrypto"
];

-- API Keys Table
create table api_keys (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  platform text not null,
  api_key text not null, -- In a real prod app, use pgcrypto functions to encrypt this column
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, platform)
);

-- Download History Table
create table download_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  platform text not null,
  media_url text not null,
  media_type text, -- 'video', 'image', 'reel', 'story'
  format text, -- 'mp4', 'mp3', 'jpg'
  quality text, -- '1080p', 'HD'
  file_size bigint, -- bytes
  download_status text not null, -- 'completed', 'failed'
  
  -- New Metadata Columns
  title text,
  thumbnail_url text,
  author text,
  duration text,
  error_message text,
  metadata jsonb default '{}'::jsonb, -- Store extra platform specific info

  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table api_keys enable row level security;
alter table download_history enable row level security;

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

create policy "Users can view their own history"
  on download_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own history"
  on download_history for insert
  with check (auth.uid() = user_id);
  
create policy "Users can delete their own history"
  on download_history for delete
  using (auth.uid() = user_id);

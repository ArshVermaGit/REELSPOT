# Database Schema

Reelspot uses Supabase (PostgreSQL) for data persistence. Below is the core schema design.

## Tables

### `download_history`

Stores the record of all user downloads.

| Column         | Type        | Description                                  |
| :------------- | :---------- | :------------------------------------------- |
| `id`           | UUID        | Primary Key, default `gen_random_uuid()`     |
| `user_id`      | UUID        | Foreign Key -> `auth.users.id`               |
| `title`        | TEXT        | Title of the video/media                     |
| `thumbnail`    | TEXT        | URL to the thumbnail image                   |
| `original_url` | TEXT        | The source URL input by user                 |
| `platform`     | TEXT        | `instagram`, `youtube`, `facebook`, `tiktok` |
| `type`         | TEXT        | `video`, `image`, `reel`, etc.               |
| `format`       | TEXT        | `mp4`, `mp3`, `jpg`                          |
| `file_size`    | BIGINT      | Size in bytes                                |
| `created_at`   | TIMESTAMPTZ | Creation timestamp                           |

### `user_api_keys`

Stores user-specific API keys for external services. **Note**: In a production environment, these should be encrypted at rest or handled via a proxy server to avoid exposing them to the client-side context unnecessarily, though the current implementation stores them associated with the user profile for the client-side logic to use.

| Column       | Type        | Description                    |
| :----------- | :---------- | :----------------------------- |
| `id`         | UUID        | Primary Key                    |
| `user_id`    | UUID        | Foreign Key -> `auth.users.id` |
| `platform`   | TEXT        | `instagram`, `youtube`, etc.   |
| `api_key`    | TEXT        | The RapidAPI key string        |
| `status`     | TEXT        | `active`, `invalid`, `expired` |
| `updated_at` | TIMESTAMPTZ | Last update time               |

### `user_settings`

Stores user preferences.

| Column          | Type    | Description                        |
| :-------------- | :------ | :--------------------------------- |
| `user_id`       | UUID    | Primary Key (One-to-One with User) |
| `theme`         | TEXT    | `light` (default), `dark`          |
| `auto_download` | BOOLEAN | Preference flag                    |
| `history_limit` | INTEGER | Max items to keep                  |

## RLS Policies

Row Level Security (RLS) is enabled on all tables to ensure users can only access their own data.

```sql
-- Example Policy
CREATE POLICY "Users can manage their own history"
ON download_history
FOR ALL
USING (auth.uid() = user_id);
```

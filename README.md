# ReelSpot - Social Media Downloader

ReelSpot is a modern, high-performance web application for downloading media from Instagram, YouTube, Facebook, and TikTok. It features a premium UI, robust error handling, and a secure architecture.

## Features

- **Multi-Platform Support**: Download videos from Instagram, YouTube, Facebook, and TikTok.
- **Auto-Detection**: Paste a link and the app automatically detects the platform.
- **Format Selection**: Choose between Video (MP4) and Audio (MP3) formats with quality options.
- **Dashboard**: Track your download history and usage statistics (requires login).
- **Secure**: API keys are stored securely using Supabase with full encryption support.
- **Responsive Design**: Fully optimized for mobile and desktop devices.

## Project Structure

The project is organized into a modular structure for scalability:

```
src/
├── components/         # React Components
│   ├── dashboard/      # Dashboard-specific widgets (Charts, Stats)
│   ├── download/       # Download logic (Form, Progress, Detector)
│   ├── history/        # History list and cards
│   ├── home/           # Homepage components (Hero, Features)
│   ├── layout/         # Global layout (Navbar, Footer)
│   ├── modals/         # Contextual modals (API Keys)
│   ├── settings/       # Settings forms
│   └── shared/         # Reusable UI atoms (Button, Card, Input)
├── contexts/           # Global State (Auth, API Keys)
├── hooks/              # Custom React Hooks
├── pages/              # Route Pages (Home, Dashboard, History)
├── services/           # Business Logic (API integration)
└── utils/              # Helper functions
```

## Setup & installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/reelspot.git
    cd reelspot
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory (copy from `.env.example`) and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## Technologies

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, clsx, Lucide React (Icons)
- **Backend/DB**: Supabase (Auth, Database, Edge Functions)
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## License

MIT License

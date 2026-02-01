# Architecture Overview

Reelspot is a Single Page Application (SPA) built with the modern React ecosystem, focusing on performance, modularity, and a premium user experience.

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite (for fast HMR and optimized builds)
- **Styling**: Tailwind CSS (Utility-first CSS) + clsx/tailwind-merge
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: React Context API (`AuthContext`, `ApiKeyContext`)
- **Backend/BaaS**: Supabase (PostgreSQL, Auth, Realtime)
- **Notifications**: React Hot Toast

## Key Architecture Patterns

1.  **Context-Based State**:
    Global state for Authentication and User Settings is managed via Context Providers wrapping the application root. This ensures data availability without prop drilling.

2.  **Custom Hooks**:
    Business logic is abstracted into custom hooks (e.g., `useHistory`, `useDashboardStats`). This separates UI rendering from data fetching and manipulation logic.

3.  **Component Design**:
    - **Atomic/Shared Components**: Small, reusable elements like `Button`, `Card`, `Modal` in `src/components/shared`.
    - **Feature Components**: Complex, specific UI blocks like `HistoryList` or `StatsCard` in feature folders.

4.  **Glassmorphism UI**:
    The design relies heavily on transparency, blur filters (`backdrop-blur`), and gradients to achieve a "Hyper-Polished" aesthetic.

5.  **Strategy Pattern (Downloads)**:
    Platform-specific logic is decoupled from the UI. New platforms are registered in `src/services/platforms/registry.js`, allowing for easy extension without modify core downloader logic.

6.  **Modular Information Content**:
    Supplemental pages (About, FAQ, etc.) are loaded dynamically from `src/data/info/contents/`. This keeps `App.jsx` clean and routes scalable.

## Data Flow

1.  **User Action**: User inputs URL -> `DownloadForm.jsx`.
2.  **Detection**: `platformDetector.js` identifies the service and extracted ID.
3.  **Strategy Lookup**: `MediaDownloader` gets the registered function from the `Registry`.
4.  **API Call**: The strategy function calls the external API with stored credentials.
5.  **Persistence**: `DownloadContext` triggers the `historyService` to record the entry in Supabase.

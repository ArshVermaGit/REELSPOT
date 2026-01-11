# Deployment Guide

Reelspot is a static frontend application that can be deployed to any static site hosting provider.

## Build Process

1.  **Build Command**:
    ```bash
    npm run build
    ```
    This generates a `dist/` directory containing the optimized HTML, CSS, and JS assets.

## Deploying to Vercel (Recommended)

1.  **Import Project**: Connect your GitHub repository to Vercel.
2.  **Framework Preset**: Select **Vite**.
3.  **Environment Variables**:
    Add your Supabase secrets in the Vercel dashboard:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
4.  **Deploy**: Click Deploy. Vercel will handle the build and CDN distribution.

## Deploying to Netlify

1.  **New Site from Git**.
2.  **Build Command**: `npm run build`.
3.  **Publish Directory**: `dist`.
4.  **Environment Variables**: Add them in Site Settings > Build & Deploy > Environment.

## Manual Deployment

1.  Run `npm run build`.
2.  Upload the contents of `dist/` to any web server (Apache, Nginx, S3 bucket).
3.  **SPA Configuration**: Ensure your server is configured to rewrite all 404s to `index.html` so that React Router can handle client-side routing.

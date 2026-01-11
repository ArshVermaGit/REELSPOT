# Developer Setup Guide

This guide covers how to set up the Reelspot development environment.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**
- **Supabase Account**: For backend services (Auth/DB).

## Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/REELSPOT.git
    cd REELSPOT
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Environment Configuration**

    Create a `.env` file in the root directory based on `.env.example`:

    ```properties
    # .env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    _Note: Obtain these credentials from your Supabase project settings._

4.  **Database Setup**

    If setting up a fresh database, run the SQL schema in your Supabase SQL Editor.
    The schema file is located at `schema.sql` in the root of the project.

## Running the Application

- **Development Server**:

  ```bash
  npm run dev
  ```

  Access at `http://localhost:5173`.

- **Production Build**:
  ```bash
  npm run build
  npm run preview
  ```

## Project Structure

- `/src`: Source code
  - `/components`: Reusable UI components
  - `/pages`: Route pages (Dashboard, History, Settings)
  - `/hooks`: Custom React hooks (logic layer)
  - `/contexts`: Global state (Auth, ApiKeys)
  - `/utils`: Helper functions
- `/docs`: Documentation

## Linting & Formatting

- **Lint**: `npm run lint`

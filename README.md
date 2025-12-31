<a name="readme-top"></a>

<div align="center">
  <br />
  <div style="background-color: #000; padding: 20px; border-radius: 20px; display: inline-block;">
     <h1 style="color: #fff; font-size: 50px; font-weight: 900; margin: 0;">REELSPOT</h1>
  </div>
  <h3 align="center">The Ultimate Premium Video Downloader</h3>

  <p align="center">
    A high-fidelity, stateless extraction interface for the modern web.
    <br />
    <a href="https://reelspot.vercel.app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://reelspot.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/ArshVermaGit/REELSPOT/issues">Report Bug</a>
    ·
    <a href="https://github.com/ArshVermaGit/REELSPOT/issues">Request Feature</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary><strong>Table of Contents</strong></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#key-features">Key Features</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br />

---

## ⚡ About The Project

**REELSPOT** is not just another video downloader. It is a re-imagined extraction interface designed for visual perfection and speed. Built with a "Zero-Color" monochromatic aesthetic, it emphasizes content and functionality over distraction.

We leverage advanced algorithms to fetch high-definition media from top social platforms including Instagram, YouTube, TikTok, X (Twitter), and Facebook. The user experience is enhanced with fluid glassmorphism, physics-based micro-interactions, and a stateless architecture that respects user privacy.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ✨ Key Features

- **🎥 Multi-Vector Support:** Simultaneous compatibility with Instagram (Reels, Stores, Posts), YouTube (4K Video, MP3), TikTok (Watermark-free), X, and Facebook.
- **💎 Hyper-Premium UI:** A layout built with `Framer Motion` for cinematic entrances, parallax effects, and glassmorphic overlays.
- **🛡️ Privacy First:** Stateless "Zero-Log" architecture. We extract, deliver, and forget. No user data is stored persistently.
- **⚡ Lightning Core:** Optimized API routes ensure near-instant resolution of video manifests.
- **🔐 Secure Auth:** Integrated Google OAuth (via NextAuth.js) for optional premium features like download history.
- **📱 Universal Response:** Flawless experience across desktop, tablet, and mobile devices.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🛠️ Built With

This project relies on the cutting edge of the React ecosystem.

- **[Next.js 15](https://nextjs.org/)** - The React Framework for the Web (App Router).
- **[TypeScript](https://www.typescriptlang.org/)** - For type-safe, robust code.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development.
- **[Prisma](https://www.prisma.io/)** - Next-generation Node.js and TypeScript ORM.
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animation library for React.
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons.
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication solution for Next.js applications.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL Database** (Local or Cloud like Supabase/Neon)
- **RapidAPI Keys** (for the backend logic)

### Installation

1.  **Clone the repository**

    ```sh
    git clone https://github.com/ArshVermaGit/REELSPOT.git
    cd REELSPOT
    ```

2.  **Install packages**

    ```sh
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory and add your keys:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/reelspot"

    # Authentication
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="super-secret-key-change-me"

    # Google OAuth
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"

    # RapidAPI (Universal Key)
    RAPIDAPI_KEY="your_rapidapi_key"
    ```

4.  **Database Setup**

    ```sh
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**

    ```sh
    npm run dev
    ```

6.  **Verify**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🎮 Usage

1.  **Copy Link:** Navigate to your social media app and copy the link to the Reel, Video, or Post.
2.  **Paste & Analyze:** Paste the link into the main input field on the home page. The system will auto-detect the platform.
3.  **Select Quality:** For platforms like YouTube, choose your desired resolution (up to 4K) or format (MP3).
4.  **Download:** Click the download button. The file will be processed and pushed to your device instantly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🛣️ Roadmap

- [x] Initial UI/UX Design (Monochromatic Theme)
- [x] Core Video Downloader Implementation
- [x] Authentication System (Google OAuth)
- [x] Platform Grid & Modal Architecture
- [ ] Backend API Integration for all platforms
- [ ] User Dashboard & History
- [ ] Bulk Download Support
- [ ] Browser Extension

See the [open issues](https://github.com/ArshVermaGit/REELSPOT/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📬 Contact

**Arsh Verma**

- GitHub: [@ArshVermaGit](https://github.com/ArshVermaGit)
- LinkedIn: [Arsh Verma](https://linkedin.com/in/arshvermadev)
- X (Twitter): [@TheArshVerma](https://x.com/TheArshVerma)
- Email: arshverma.dev@gmail.com

Project Link: [https://github.com/ArshVermaGit/REELSPOT](https://github.com/ArshVermaGit/REELSPOT)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<div align="center">
  Built with ❤️ for the web.
</div>

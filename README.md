<div align="center">
  <a href="https://reelspot.vercel.app">
    <img src="public/logo.png" alt="Reelspot Logo" width="120" height="auto" />
  </a>
  <br />
  <h1>Reelspot</h1>
  <h3>The Ultimate Media Downloader for Creators</h3>
  
  <p>
    <b>High-Performance</b> · <b>Privacy-First</b> · <b>Obsidian Aesthetic</b>
  </p>

  <p>
    <a href="https://reelspot.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/arshverma/REELSPOT/issues/new?template=BUG_REPORT.yml">Report Bug</a>
    ·
    <a href="https://github.com/arshverma/REELSPOT/discussions">Request Feature</a>
  </p>

  <p>
    <!-- CI/CD Status -->
    <a href="https://github.com/arshverma/REELSPOT/actions"><img src="https://img.shields.io/github/actions/workflow/status/arshverma/REELSPOT/ci.yml?style=flat-square&logo=github" alt="Build Status" /></a>
    <!-- License -->
    <a href="LICENSE"><img src="https://img.shields.io/github/license/arshverma/REELSPOT?style=flat-square&color=blue" alt="License" /></a>
    <!-- PRs -->
    <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </p>
</div>

<br />

## ✨ About The Project

**Reelspot** is a premium, high-performance web application designed to simplify media consumption for creators and minimalists. Built with a hyper-polished "obsidian glass" aesthetic, it offers a seamless experience for downloading high-quality videos from major social platforms without the clutter of traditional tools.

We believe in **Software Craftsmanship**. Reelspot isn't just a tool; it's an example of how modern web apps should feel—fast, fluid, and respectful of the user.

### 🔥 Key Features

- **⚡ Multi-Platform Strategy**: Dynamically extensible architecture supporting **Instagram**, **YouTube**, **Facebook**, and **TikTok**.
- **💎 Premium UX/UI**: A stunning interface built with **Tailwind CSS**, featuring glassmorphism, micro-interactions, and fluid 60fps animations.
- **🔒 Privacy First**: Zero tracking. Your data stays yours. secure local storage for preferences.
- **🔌 Developer Ready**: Built with a **Screaming Architecture**. Feature-first folder structure, Strategy Pattern for downloads, and centralized constants make contributing a breeze.
- **📱 Universal**: Fully responsive, PWA-ready design that feels native on any device.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm (v9+)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/arshverma/REELSPOT.git
    cd REELSPOT
    ```
2.  **Install dependencies**
    ```sh
    npm ci
    ```
3.  **Configure Environment**
    Create a `.env` file based on `.env.example`:
    ```env
    VITE_SUPABASE_URL=your_url
    VITE_SUPABASE_ANON_KEY=your_key
    VITE_RAPIDAPI_KEY=your_key
    ```
4.  **Start the server**
    ```sh
    npm run dev
    ```

---

## 🏗️ Project Structure

Reelspot follows a domain-driven, modular architecture designed for scalability.

```
src/
├── components/          # Reusable UI components
│   ├── shared/          # Global atoms (Buttons, Inputs, Modals)
│   ├── layout/          # Layout wrappers (Navbar, Footer)
│   └── [feature]/       # Feature-specific components
├── constants/           # Global constants (Regex, Configs)
├── contexts/            # Global State (Auth, Theme)
├── hooks/               # Custom React Hooks
├── pages/               # Route Components
├── services/            # Business Logic & API Layer
│   └── platforms/       # Strategy Pattern Implementations
└── styles/              # Global Tailwind Styles
```

---

## 📚 Documentation

Detailed guides for developers and users.

### 💻 For Developers

- [**Architecture Guide**](./docs/dev/architecture.md) - Deep dive into usage of Strategy Pattern and directory structure.
- [**Contribution Board**](./CONTRIBUTING.md) - How to add a new platform in 5 steps.
- [**Repository Settings**](./docs/dev/repository-settings.md) - How to configure this repo for perfection.
- [**API Integration**](./docs/dev/api.md) - Adding new endpoints.

### 👤 For Users

- [**Getting Started**](./docs/user/getting-started.md)
- [**Troubleshooting**](./docs/user/troubleshooting.md)
- [**Legal & Privacy**](./docs/user/legal.md)

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

See [**CONTRIBUTING.md**](./CONTRIBUTING.md) for detailed steps on how to:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 🗺️ Roadmap & History

Stay up to date with where Reelspot is headed.

- 🚀 [**Roadmap**](./ROADMAP.md) - Planned features & milestones.
- 📜 [**Changelog**](./CHANGELOG.md) - Track every change.

---

## 👤 Author

**Arsh Verma**

- **Portfolio**: [arshcreates.vercel.app](https://arshcreates.vercel.app)
- **GitHub**: [@ArshVermaGit](https://github.com/ArshVermaGit)
- **LinkedIn**: [Arsh Verma](https://www.linkedin.com/in/arshvermadev/)
- **X (Twitter)**: [@TheArshVerma](https://x.com/TheArshVerma)

---

<div align="center">
  <br />
  <p>Made with ❤️ by Arsh Verma</p>
  <p>
     <a href="#top">Back to Top</a>
  </p>
</div>

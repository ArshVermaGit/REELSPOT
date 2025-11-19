# ReelSpot
A modern, user-friendly web application for downloading media from social platforms like Instagram, TikTok, and more. **Currently in "Coming Soon" mode** – the entire UI is fully functional and polished, but the core download functionality displays a "Coming Soon" modal to build anticipation.

Built with simplicity in mind: no backend required, fully responsive, and optimized for instant deployment. Perfect for developers, creators, and users eager for seamless media extraction.

## 🚀 Features

- ✅ **Fully Functional UI** – All pages navigate smoothly and look great out of the box.
- ✅ **Contact Form** – Users can submit feedback, suggestions, or inquiries directly from the site.
- ✅ **Admin Dashboard** – Securely view, manage, and export contact submissions (stored locally via localStorage).
- ✅ **Coming Soon Modal** – Gracefully interrupts download attempts with an engaging teaser and newsletter signup.
- ✅ **Responsive Design** – Adapts seamlessly to desktops, tablets, and mobiles for a native-like experience.
- ✅ **No Backend Required** – Leverages browser localStorage for persistent data like admin logs – zero server setup.
- ✅ **Ready for Netlify** – Pre-configured for static hosting with redirects, forms, and edge functions.

## 🎯 Quick Start

### Local Development
1. Clone or download the repo:
   ```
   git clone <your-repo-url>
   cd reelspot
   ```
2. Open `index.html` in your browser (e.g., Chrome, Firefox) – no build tools needed!
3. Test the UI: Navigate pages, submit the contact form, and access the admin dashboard at `/admin.html`.

### Deployment to Netlify (Recommended)
1. Push to GitHub/GitLab.
2. Connect your repo to [Netlify](https://netlify.com) – it auto-deploys from the root.
3. The `netlify.toml` handles forms and redirects automatically.
4. Your site is live in minutes: `https://your-site.netlify.app`.

For other hosts (Vercel, GitHub Pages), just point to the `index.html` root.

## 📁 Project Structure

```
reelspot/
├── index.html              # Homepage with hero and quick links
├── about.html              # About page detailing the vision
├── admin.html              # Admin dashboard for managing submissions
├── contact.html            # Contact form for user feedback
├── download.html           # Download page (triggers Coming Soon modal)
├── platforms.html          # Supported platforms overview
├── privacy.html            # Privacy policy page
├── css/
│   ├── style.css           # Global styles (base resets, typography, utilities)
│   ├── index.css           # Homepage-specific styles
│   ├── about.css           # About page styles
│   ├── admin.css           # Admin dashboard styles
│   ├── contact.css         # Contact form styles
│   ├── download.css        # Download page styles
│   ├── platforms.css       # Platforms page styles
│   └── privacy.css         # Privacy page styles
├── js/
│   ├── main.js             # Core functionality (navigation, localStorage utils)
│   ├── index.js            # Homepage scripts (animations, hero interactions)
│   ├── about.js            # About page scripts
│   ├── admin.js            # Admin dashboard scripts (data management, export)
│   ├── contact.js          # Contact form scripts (validation, submission)
│   ├── download.js         # Download scripts (modal trigger – Coming Soon)
│   ├── platforms.js        # Platforms page scripts
│   └── privacy.js          # Privacy page scripts
├── assets/
│   ├── icons/
│   │   └── favicon.ico     # Site favicon
│   └── images/
│       └── developer.jpg   # Placeholder image (e.g., for about page)
├── netlify.toml            # Netlify config (forms, redirects)
├── package.json            # NPM metadata (for future tooling)
└── README.md               # This file
```

## 🛠️ Technologies
- **Frontend**: Vanilla HTML5, CSS3 (with modular files for maintainability), JavaScript (ES6+).
- **Storage**: Browser localStorage for offline persistence.
- **Deployment**: Netlify (static hosting with built-in forms).
- **Design**: Responsive grid/flexbox, modern CSS (no frameworks – lightweight at ~50KB total).

## 🔮 Roadmap
- [ ] **Full Download Engine**: Integrate APIs for Instagram, TikTok, YouTube, etc.
- [ ] **User Accounts**: Auth with Firebase or similar for saved downloads.
- [ ] **Backend Migration**: Optional Node.js/Express for cloud storage.
- [ ] **Analytics**: Track usage with Google Analytics or Plausible.
- [ ] **PWA Support**: Add service workers for offline access.

## 🤝 Contributing
1. Fork the repo and create a feature branch (`git checkout -b feature/amazing-feature`).
2. Commit changes (`git commit -m 'Add some amazing feature'`).
3. Push to the branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request – I'll review promptly!

Feedback? Hit the [contact form](contact.html) or open an issue.

## 📄 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details (or add one if deploying publicly).

---

*Built with ❤️ by [Your Name/Handle]. Star on GitHub if you like it! 🌟*

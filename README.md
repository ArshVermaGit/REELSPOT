# REELSPOT

A modern, premium video downloader for social media platforms. Download videos from Instagram, TikTok, YouTube, Twitter, and Facebook with a beautiful, fast interface.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **Framer Motion**.

![REELSPOT Preview](https://via.placeholder.com/800x400?text=REELSPOT+Preview)

## ✨ Features

- 🎬 **Multi-Platform Support** - Instagram, TikTok, YouTube, Twitter, Facebook
- ⚡ **Lightning Fast** - Optimized for speed with minimal load times
- 🎨 **Beautiful UI** - Clean white/blue/pink theme with smooth animations
- 🔐 **Google Auth** - Secure authentication with NextAuth.js
- 📊 **Download History** - Track your downloads when logged in
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🛡️ **Privacy Focused** - No tracking, no data storage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- RapidAPI account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ArshVermaGit/REELSPOT.git
   cd REELSPOT
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/reelspot"

   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"  # Generate: openssl rand -base64 32

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # RapidAPI Key (for video downloads)
   RAPIDAPI_KEY="your-rapidapi-key"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## 🔑 API Configuration

REELSPOT uses **RapidAPI** for video downloads. You need ONE API key that works for all platforms.

### Getting Your RapidAPI Key

1. Create an account at [RapidAPI](https://rapidapi.com/)
2. Subscribe to these APIs (most have free tiers):

| Platform  | API                        | Link                                                                   |
| --------- | -------------------------- | ---------------------------------------------------------------------- |
| Instagram | Instagram Media Downloader | [Subscribe](https://rapidapi.com/developer/instagram-media-downloader) |
| TikTok    | TikTok Video No Watermark  | [Subscribe](https://rapidapi.com/yi005/api/tiktok-video-no-watermark2) |
| YouTube   | YT-API                     | [Subscribe](https://rapidapi.com/ytdlfree/api/yt-api)                  |
| Twitter   | Twitter Video Downloader   | [Subscribe](https://rapidapi.com/developer/twitter-video-downloader)   |
| Facebook  | Facebook Video Downloader  | [Subscribe](https://rapidapi.com/developer/facebook-video-downloader)  |

3. Copy your RapidAPI key from any subscribed API
4. Add it to your `.env` file as `RAPIDAPI_KEY`

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to your `.env`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── platforms/         # Platforms page
│   ├── contact/           # Contact page
│   ├── admin/             # Admin dashboard
│   ├── downloads/         # Download history
│   ├── privacy/           # Privacy policy
│   └── api/               # API routes
├── components/
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities, auth, prisma
└── types/                 # TypeScript types
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Prisma
- **Auth**: NextAuth.js with Google provider
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to update:

- `NEXTAUTH_URL` to your production URL
- `DATABASE_URL` to your production database
- Add production Google OAuth redirect URI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📬 Contact

- **GitHub**: [@ArshVermaGit](https://github.com/ArshVermaGit)
- **LinkedIn**: [ArshVermaDev](https://linkedin.com/in/arshvermadev)
- **Twitter**: [@TheArshVerma](https://x.com/TheArshVerma)
- **Email**: arshvermadev@gmail.com

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Arsh Verma](https://github.com/ArshVermaGit)

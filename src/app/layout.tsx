import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Reelspot - Download Media, Effortlessly",
  description:
    "Download videos from Instagram, YouTube, TikTok, and Facebook instantly.",
};

import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <ScrollProgress />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

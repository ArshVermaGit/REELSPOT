import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Reelspot - Download Media, Effortlessly",
  description:
    "Download videos from Instagram, YouTube, TikTok, and Facebook instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

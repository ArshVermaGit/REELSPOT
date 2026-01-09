import { useState } from "react";
import { Download, Link2, ArrowDown } from "lucide-react";
import FloatingIcons from "./FloatingIcons";

const HeroSection = () => {
  const [url, setUrl] = useState("");

  const handleDownload = () => {
    if (url.trim()) {
      // Scroll to download section
      document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDownload = () => {
    document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-background">
      {/* Floating social icons */}
      <FloatingIcons />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-12">
        {/* Logo */}
        <h1 className="opacity-0-initial animate-fade-in-up mb-4 text-5xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          Reelspot
        </h1>

        {/* Tagline with gradient */}
        <p className="opacity-0-initial animate-fade-in-up animate-delay-100 text-gradient mb-12 text-xl font-medium sm:text-2xl md:text-3xl">
          Download Media, Effortlessly
        </p>

        {/* Input container */}
        <div className="opacity-0-initial animate-fade-in-up animate-delay-200 w-full max-w-2xl px-4">
          <div className="relative">
            {/* Link icon */}
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <Link2 className="h-6 w-6 text-muted-foreground" />
            </div>

            {/* Input */}
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your link here..."
              className="input-hero pl-14"
              onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            />
          </div>
        </div>

        {/* Download button */}
        <button
          onClick={handleDownload}
          className="opacity-0-initial animate-fade-in-up animate-delay-300 btn-hero mt-8"
        >
          <Download className="h-5 w-5" />
          Download
        </button>

        {/* Supported platforms text */}
        <p className="opacity-0-initial animate-fade-in-up animate-delay-400 mt-12 text-center text-sm text-muted-foreground">
          Supports Instagram, YouTube, Facebook, TikTok & more
        </p>

        {/* Scroll indicator */}
        <button
          onClick={scrollToDownload}
          className="opacity-0-initial animate-fade-in-up animate-delay-500 absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-xs font-medium">Scroll to learn more</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>

      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/30" />
    </section>
  );
};

export default HeroSection;

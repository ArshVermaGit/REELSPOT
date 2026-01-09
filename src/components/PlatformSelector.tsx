import { Instagram, Youtube, Facebook } from "lucide-react";
import { useState } from "react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const platforms = [
  {
    name: "Instagram",
    icon: Instagram,
    formats: ["Reels", "Posts", "Stories", "IGTV"],
    downloads: "2.5M+",
    color: "hover:text-pink-500",
  },
  {
    name: "YouTube",
    icon: Youtube,
    formats: ["Videos", "Shorts", "MP3", "Playlists"],
    downloads: "5.2M+",
    color: "hover:text-red-500",
  },
  {
    name: "Facebook",
    icon: Facebook,
    formats: ["Videos", "Reels", "Stories", "Posts"],
    downloads: "1.8M+",
    color: "hover:text-blue-500",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    formats: ["Videos", "Stories", "No Watermark"],
    downloads: "3.1M+",
    color: "hover:text-foreground",
  },
];

const PlatformSelector = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="platforms" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Supported Platforms
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Download from your favorite social media platforms with just one click
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={platform.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="platform-card group relative overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Ripple effect background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`mb-6 inline-flex rounded-xl bg-secondary p-4 transition-all duration-300 ${
                      isHovered ? platform.color : "text-muted-foreground"
                    } ${isHovered ? "scale-110" : "scale-100"}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {platform.name}
                  </h3>

                  {/* Formats */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {platform.formats.map((format) => (
                      <span
                        key={format}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {format}
                      </span>
                    ))}
                  </div>

                  {/* Download count */}
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {platform.downloads} downloads
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformSelector;

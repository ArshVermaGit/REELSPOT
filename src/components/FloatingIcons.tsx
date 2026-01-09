import { Instagram, Youtube, Facebook } from "lucide-react";

// TikTok icon (not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

interface FloatingIconProps {
  icon: React.ReactNode;
  className?: string;
  animationClass: string;
}

const FloatingIcon = ({ icon, className, animationClass }: FloatingIconProps) => (
  <div
    className={`absolute flex items-center justify-center rounded-2xl border border-border bg-background p-4 shadow-lg ${animationClass} ${className}`}
  >
    {icon}
  </div>
);

const FloatingIcons = () => {
  return (
    <>
      {/* Instagram - Top Left */}
      <FloatingIcon
        icon={<Instagram className="h-8 w-8 text-foreground" />}
        className="left-[5%] top-[15%] md:left-[10%] md:top-[20%] lg:left-[15%]"
        animationClass="animate-float-1"
      />

      {/* YouTube - Top Right */}
      <FloatingIcon
        icon={<Youtube className="h-8 w-8 text-foreground" />}
        className="right-[5%] top-[20%] md:right-[10%] md:top-[15%] lg:right-[15%]"
        animationClass="animate-float-2"
      />

      {/* Facebook - Bottom Left */}
      <FloatingIcon
        icon={<Facebook className="h-8 w-8 text-foreground" />}
        className="bottom-[25%] left-[8%] md:bottom-[30%] md:left-[12%] lg:left-[18%]"
        animationClass="animate-float-3"
      />

      {/* TikTok - Bottom Right */}
      <FloatingIcon
        icon={<TikTokIcon className="h-8 w-8 text-foreground" />}
        className="bottom-[30%] right-[8%] md:bottom-[25%] md:right-[12%] lg:right-[18%]"
        animationClass="animate-float-4"
      />
    </>
  );
};

export default FloatingIcons;

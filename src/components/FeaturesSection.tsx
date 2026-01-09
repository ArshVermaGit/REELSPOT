import { Zap, Shield, Smartphone, Download, Clock, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download your media in seconds with our optimized servers and CDN.",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your privacy matters. We don't store your data or download history.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Works perfectly on any device - desktop, tablet, or smartphone.",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Choose from various quality options and formats including MP3 & MP4.",
  },
  {
    icon: Clock,
    title: "No Registration",
    description: "Start downloading immediately. No sign-up or account required.",
  },
  {
    icon: Globe,
    title: "All Platforms",
    description: "Support for Instagram, YouTube, TikTok, Facebook, and more.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Why Choose Reelspot?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            The simplest and most reliable way to download your favorite content
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card group rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-6 inline-flex rounded-xl bg-secondary p-4 transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

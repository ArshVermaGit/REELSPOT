import { 
  Zap, Shield, Clock, 
  Globe, Smartphone, Layers
} from 'lucide-react';
import styles from './Features.module.css';

const features = [
  {
    icon: <Zap size={32} color="#3B82F6" />,
    bg: "rgba(59, 130, 246, 0.1)",
    title: "Turbo-Speed Downloads",
    description: "Our distributed server architecture ensures you get the maximum bandwidth possible for every single download."
  },
  {
    icon: <Globe size={32} color="#10B981" />,
    bg: "rgba(16, 185, 129, 0.1)",
    title: "Multi-Platform Support",
    description: "Instagram, YouTube, TikTok, Facebook, and more. One unified interface for all your favorite social networks."
  },
  {
    icon: <Shield size={32} color="#F59E0B" />,
    bg: "rgba(245, 158, 11, 0.1)",
    title: "Private & Secure",
    description: "Your downloads and history are yours alone. Secured with Google OAuth 2.0 and industry-standard encryption."
  },
  {
    icon: <Layers size={32} color="#8B5CF6" />,
    bg: "rgba(139, 92, 246, 0.1)",
    title: "Batch Processing",
    description: "Paste multiple links or entire playlists and let ReelSpot handle the queue while you focus on what matters."
  },
  {
    icon: <Smartphone size={32} color="#EC4899" />,
    bg: "rgba(236, 72, 153, 0.1)",
    title: "Mobile Optimized",
    description: "A fully responsive experience that works perfectly on your computer, tablet, or smartphone."
  },
  {
    icon: <Clock size={32} color="#6B7280" />,
    bg: "rgba(107, 114, 128, 0.1)",
    title: "Permanent History",
    description: "Never lose a link again. Every video you download is saved to your personal history for quick access later."
  }
];

import NumberCounter from '@/components/ui/NumberCounter';

const FeaturesPage = () => {
  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <span className={styles.tagline}>Power Features</span>
        <h1 className={styles.title}>Engineered for<br />Perfection.</h1>
        <p className={styles.subtitle}>
          We&apos;ve rebuilt the media downloading experience from the ground up 
          to be faster, safer, and more beautiful than ever before.
        </p>
      </section>

      {/* Features Grid */}
      <div className={styles.grid}>
        {features.map((f, i) => (
          <div 
            key={i} 
            className={`${styles.featureCard} reveal`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className={styles.iconWrapper} style={{ backgroundColor: f.bg }}>
              {f.icon}
            </div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDescription}>{f.description}</p>
          </div>
        ))}
      </div>

      {/* Benefits / Stats */}
      <section className={styles.benefitsSection}>
        <h2 className="text-3xl font-black mb-4">Trusted by over 1M+ creators</h2>
        <p className="text-gray-400 font-medium max-width-xl mx-auto">
          ReelSpot is the go-to tool for digital artists, social media managers, and content lovers worldwide.
        </p>
        
        <div className={styles.benefitGrid}>
          <div className={`${styles.benefitItem} reveal`}>
            <h3><NumberCounter end={99.9} suffix="%" duration={1500} /></h3>
            <p>UPTIME STATUS</p>
          </div>
          <div className={`${styles.benefitItem} reveal`} style={{ transitionDelay: '100ms' }}>
            <h3><NumberCounter end={0.2} suffix="s" duration={1000} /></h3>
            <p>AVG ANALYSIS TIME</p>
          </div>
          <div className={`${styles.benefitItem} reveal`} style={{ transitionDelay: '200ms' }}>
            <h3><NumberCounter end={8} suffix="K" duration={800} /></h3>
            <p>MAX RESOLUTION</p>
          </div>
          <div className={`${styles.benefitItem} reveal`} style={{ transitionDelay: '300ms' }}>
            <h3>24/7</h3>
            <p>SYSTEM MONITORING</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;

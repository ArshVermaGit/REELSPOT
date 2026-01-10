import { 
  Zap, Shield, Clock, 
  Globe, Smartphone, Layers
} from 'lucide-react';
import styles from './Features.module.css';

const features = [
  {
    icon: <Zap size={32} color="#000" />,
    title: "Turbo-Speed Downloads",
    description: "Our distributed server architecture ensures you get the maximum bandwidth possible for every single download."
  },
  {
    icon: <Globe size={32} color="#000" />,
    title: "Multi-Platform Support",
    description: "Instagram, YouTube, TikTok, Facebook, and more. One unified interface for all your favorite social networks."
  },
  {
    icon: <Shield size={32} color="#000" />,
    title: "Private & Secure",
    description: "Your downloads and history are yours alone. Secured with Google OAuth 2.0 and industry-standard encryption."
  },
  {
    icon: <Layers size={32} color="#000" />,
    title: "Batch Processing",
    description: "Paste multiple links or entire playlists and let ReelSpot handle the queue while you focus on what matters."
  },
  {
    icon: <Smartphone size={32} color="#000" />,
    title: "Mobile Optimized",
    description: "A fully responsive experience that works perfectly on your computer, tablet, or smartphone."
  },
  {
    icon: <Clock size={32} color="#000" />,
    title: "Permanent History",
    description: "Never lose a link again. Every video you download is saved to your personal history for quick access later."
  }
];

const FeaturesPage = () => {
  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Engineered for Perfection.</h1>
        <p className={styles.subtitle}>
          We&apos;ve rebuilt the media downloading experience from the ground up 
          to be faster, safer, and more beautiful than ever before.
        </p>
      </section>

      {/* Features Grid */}
      <div className={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              {f.icon}
            </div>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDescription}>{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;

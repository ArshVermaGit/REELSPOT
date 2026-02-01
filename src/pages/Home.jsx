import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import Hero from '../components/home/Hero';
import SEO from '../components/shared/SEO';
import DeveloperSection from '../components/home/DeveloperSection';
import SupportedPlatformsSection from '../components/home/SupportedPlatformsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import FAQSection from '../components/home/FAQSection';
import DisclaimerModal from '../components/modals/DisclaimerModal';

const Home = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [showDisclaimer, setShowDisclaimer] = React.useState(false);

    useEffect(() => {
        // Optional: Redirect authenticated users or keep them on landing
        // if (user) navigate('/dashboard');
        const hasAccepted = localStorage.getItem('reelspot_accepted_disclaimer');
        if (!hasAccepted) {
            // Small delay for better UX
            const timer = setTimeout(() => setShowDisclaimer(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [user, navigate])

    const handleDisclaimerAccept = () => {
        localStorage.setItem('reelspot_accepted_disclaimer', 'true');
        setShowDisclaimer(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white relative">
            <SEO 
                title="Download Social Media Media - Instagram, YouTube, TikTok" 
                description="Reelspot is the fastest online social media media downloader. Save videos, reels, and stories from Instagram, YouTube, TikTok, and Facebook in HD quality. No watermarks, no tracking."
            />
            <DisclaimerModal 
                isOpen={showDisclaimer} 
                onClose={() => setShowDisclaimer(false)} 
                onAccept={handleDisclaimerAccept} 
            />
            <Hero />
            <SupportedPlatformsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <FAQSection />
            <DeveloperSection />
        </div>
    )
}

export default Home

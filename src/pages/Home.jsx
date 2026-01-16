import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import Hero from '../components/home/Hero';
import DeveloperSection from '../components/home/DeveloperSection';
import DisclaimerModal from '../components/shared/DisclaimerModal';

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = React.useState(false);

  useEffect(() => {
    // Optional: Redirect authenticated users or keep them on landing
    // if (user) navigate('/dashboard');
    const hasAccepted = localStorage.getItem('reelspot_disclaimer_accepted');
    if (!hasAccepted) {
        // Small delay for better UX
        const timer = setTimeout(() => setShowDisclaimer(true), 1000);
        return () => clearTimeout(timer);
    }
  }, [user, navigate])

  const handleDisclaimerAccept = () => {
      localStorage.setItem('reelspot_disclaimer_accepted', 'true');
      setShowDisclaimer(false);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white relative">
       <DisclaimerModal 
          isOpen={showDisclaimer} 
          onClose={() => setShowDisclaimer(false)} 
          onAccept={handleDisclaimerAccept} 
       />
       <Hero />
       <DeveloperSection />
    </div>
  )
}

export default Home

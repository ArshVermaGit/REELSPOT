import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Hero from '../components/Hero';
import DownloadForm from '../components/DownloadForm';

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        // We can redirect or keep them on home with partial access
        // navigate('/dashboard');
    }
  }, [user, navigate])


  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
       <Hero />
       
       <div className="container mx-auto px-4 pb-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to download?</h2>
            <DownloadForm />
          </div>
       </div>
    </div>
  )
}

export default Home

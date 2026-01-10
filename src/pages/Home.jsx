import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Hero from '../components/Hero';

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Redirect authenticated users or keep them on landing
    // if (user) navigate('/dashboard');
  }, [user, navigate])


  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] bg-white">
       <Hero />
    </div>
  )
}

export default Home

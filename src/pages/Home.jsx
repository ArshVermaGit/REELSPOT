import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import Hero from '../components/home/Hero';
import DeveloperSection from '../components/home/DeveloperSection';

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
       <DeveloperSection />
    </div>
  )
}

export default Home

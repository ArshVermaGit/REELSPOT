import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import React from 'react';
import Hero from '../components/home/Hero';
// import Features from '../components/home/Features';
// import Footer from '../components/layout/Footer';
// Actually App.jsx uses Layout which has Footer. So Home doesn't need Footer explicitly anymore if it's in Layout.
// Checking previous App.jsx structure... yes, Layout includes Footer.
// So I will remove Footer from here if present to avoid double footer.
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

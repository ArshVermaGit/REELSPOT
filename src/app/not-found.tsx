'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="relative mb-12 animate-bounce">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center relative z-10">
          <Film size={64} className="text-gray-300" />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-xl z-20">
          404
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse" />
      </div>

      <h1 className="text-5xl font-black mb-4 tracking-tighter">This Reel is Lost.</h1>
      <p className="text-gray-500 font-medium text-lg max-w-md mb-12">
        The link you followed might be broken, or the page has been moved to a new storage location.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl"
        >
          <Home size={20} />
          Back to Home
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 text-black rounded-2xl font-bold hover:bg-gray-200 transition-all border border-gray-200"
        >
          <ArrowLeft size={20} />
          Previous Page
        </button>
      </div>

      <div className="mt-16 text-gray-400 font-medium text-sm flex items-center gap-2">
        <Film size={14} /> 
        <span>REELSPOT MEDIA STORAGE v2.0</span>
      </div>
    </div>
  );
};

export default NotFound;

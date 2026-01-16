import React from 'react';
import { Settings, RefreshCw, ExternalLink } from 'lucide-react';
import Button from '../components/shared/Button';

const Maintenance = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-zinc-100 rounded-3xl flex items-center justify-center mb-8 shadow-sm animate-pulse-slow">
        <Settings size={48} className="text-zinc-400 animate-spin-slow" />
      </div>
      
      <h1 className="text-4xl font-[800] tracking-tight text-zinc-900 mb-4">
        Under Maintenance
      </h1>
      
      <p className="text-lg text-zinc-500 max-w-md mb-10 leading-relaxed">
        We are currently upgrading our systems to bring you an even faster experience. 
        Please check back shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <Button 
          variant="primary" 
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto min-w-[160px]"
        >
          <RefreshCw size={20} className="mr-2" />
          Retry Now
        </Button>
        
        <a 
          href="https://twitter.com/TheArshVerma" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button variant="secondary" className="w-full min-w-[160px]">
            <ExternalLink size={20} className="mr-2" />
            Check Updates
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Maintenance;

import { useState } from 'react';
import { Download, Link as LinkIcon } from 'lucide-react';
import { clsx } from 'clsx';
import FloatingIcons from './FloatingIcons';

const Hero = () => {
  const [url, setUrl] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Download:", url);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white text-black">
      {/* Background Elements */}
      <FloatingIcons />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Animated Logo */}
        <h1 
            className="text-5xl md:text-7xl font-[800] tracking-tighter mb-4 animate-slide-down"
            style={{ animationDelay: '0s' }}
        >
            Reelspot
        </h1>

        {/* Tagline */}
        <p 
            className="text-lg md:text-2xl font-medium mb-12 text-zinc-600 bg-clip-text text-transparent bg-gradient-to-br from-black to-zinc-600 animate-fade-in opacity-0"
             style={{ animationDelay: '0.2s' }}
        >
            Download Media, <span className="text-black font-semibold">Effortlessly</span>
        </p>

        {/* Input Form */}
        <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-[600px] flex flex-col items-center gap-6 animate-fade-in opacity-0"
            style={{ animationDelay: '0.4s' }}
        >
            <div className="relative w-full group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-black transition-colors duration-300">
                    <LinkIcon size={20} />
                </div>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your link here..."
                    className="w-full h-16 pl-12 pr-6 rounded-2xl border-2 border-zinc-200 bg-white text-lg placeholder:text-zinc-400 focus:outline-none focus:border-black focus:shadow-xl transition-all duration-300"
                    required
                />
            </div>

            <button
                type="submit"
                className={clsx(
                    "relative overflow-hidden group bg-black text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform",
                    "hover:scale-105 hover:shadow-2xl hover:shadow-black/20",
                    "active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                style={{ animationDelay: '0.6s' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="flex items-center gap-3 relative z-10">
                    <Download size={20} className={clsx("transition-transform duration-300", isHovered ? "translate-y-1" : "")} />
                    <span>Download Now</span>
                </div>
                {/* Subtle sheen effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
        </form>

      </div>
    </div>
  );
};

export default Hero;

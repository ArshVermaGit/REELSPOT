import React from 'react';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';

const FloatingIcons = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* 1. Instagram - Top Left */}
            <div className="absolute top-[10%] left-[8%] opacity-30 animate-float-1 animate-pulse-slow">
                <Instagram size={48} className="text-black rotate-[-12deg]" strokeWidth={1.5} />
            </div>

            {/* 2. YouTube - Top Right */}
            <div className="absolute top-[15%] right-[10%] opacity-25 animate-float-2 animate-pulse-slow delay-300">
                <Youtube size={48} className="text-black rotate-[12deg]" strokeWidth={1.5} />
            </div>

            {/* 3. Facebook - Bottom Left */}
            <div className="absolute bottom-[20%] left-[12%] opacity-20 animate-float-1 animate-pulse-slow delay-700">
                <Facebook size={48} className="text-black rotate-[-8deg]" strokeWidth={1.5} />
            </div>

            {/* 4. TikTok - Bottom Right */}
            <div className="absolute bottom-[18%] right-[15%] opacity-25 animate-float-2 animate-pulse-slow delay-500">
                 <Music2 size={48} className="text-black rotate-[10deg]" strokeWidth={1.5} />
            </div>

            {/* 5. Instagram - Center Right (Offset) */}
            <div className="absolute top-[45%] right-[5%] opacity-20 animate-float-1 animate-pulse-slow delay-200">
                <Instagram size={48} className="text-black rotate-[15deg]" strokeWidth={1.5} />
            </div>

             {/* 6. YouTube - Bottom Center Left */}
             <div className="absolute bottom-[35%] left-[5%] opacity-15 animate-float-2 animate-pulse-slow delay-1000">
                <Youtube size={48} className="text-black rotate-[-5deg]" strokeWidth={1.5} />
            </div>

            {/* 7. Facebook - Top Center Left */}
            <div className="absolute top-[25%] left-[25%] opacity-10 animate-float-1 animate-pulse-slow delay-150">
                <Facebook size={48} className="text-black rotate-[-15deg]" strokeWidth={1.5} />
            </div>

            {/* 8. TikTok - Top Center Right */}
            <div className="absolute top-[30%] right-[30%] opacity-10 animate-float-2 animate-pulse-slow delay-400">
                <Music2 size={48} className="text-black rotate-[8deg]" strokeWidth={1.5} />
            </div>
        </div>
    );
};

export default FloatingIcons;

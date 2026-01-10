import React from 'react';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';

const FloatingIcons = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
            {/* Instagram - Top Left */}
            <div className="absolute top-[15%] left-[10%] opacity-10 animate-float">
                <div className="bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 p-4 rounded-3xl rotate-[-12deg] shadow-2xl">
                    <Instagram size={64} color="white" strokeWidth={1.5} />
                </div>
            </div>

            {/* YouTube - Top Right */}
            <div className="absolute top-[20%] right-[12%] opacity-10 animate-float-reverse delay-100">
                 <div className="bg-red-600 p-4 rounded-3xl rotate-[15deg] shadow-2xl">
                    <Youtube size={72} color="white" strokeWidth={1.5} />
                </div>
            </div>

            {/* TikTok/Music - Bottom Left */}
            <div className="absolute bottom-[20%] left-[15%] opacity-10 animate-float-reverse delay-200">
                <div className="bg-black p-4 rounded-3xl rotate-[8deg] shadow-2xl">
                    <Music2 size={56} color="white" strokeWidth={1.5} />
                </div>
            </div>

            {/* Facebook - Bottom Right */}
            <div className="absolute bottom-[25%] right-[8%] opacity-10 animate-float delay-300">
                <div className="bg-blue-600 p-4 rounded-3xl rotate-[-10deg] shadow-2xl">
                    <Facebook size={60} color="white" strokeWidth={1.5} />
                </div>
            </div>
        </div>
    );
};

export default FloatingIcons;

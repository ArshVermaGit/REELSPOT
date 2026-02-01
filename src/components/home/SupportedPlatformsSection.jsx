import React from 'react';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';

const platforms = [
    {
        name: 'Instagram',
        description: 'Download Reels, Stories, TV, and High-Resolution Posts instantly.',
        icon: Instagram,
        color: 'text-pink-500',
        bgColor: 'bg-pink-50',
        hoverBg: 'hover:bg-pink-500'
    },
    {
        name: 'YouTube',
        description: 'Save Shorts, 4K Videos, and extract high-quality audio files.',
        icon: Youtube,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        hoverBg: 'hover:bg-red-500'
    },
    {
        name: 'Facebook',
        description: 'Extract public videos, Reels, and Watch content in HD quality.',
        icon: Facebook,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        hoverBg: 'hover:bg-blue-500'
    },
    {
        name: 'TikTok',
        description: 'Get watermark-free videos and original sounds from any TikTok.',
        icon: Music2,
        color: 'text-zinc-900',
        bgColor: 'bg-zinc-100',
        hoverBg: 'hover:bg-black'
    }
];

const SupportedPlatformsSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4">Coverage</h2>
                    <h3 className="text-4xl md:text-5xl font-[900] tracking-tight text-zinc-900">
                        Supported Platforms
                    </h3>
                    <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
                        High-speed extraction from the world&apos;s most popular platforms. 
                        We continuously add support for more sources.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {platforms.map((platform) => (
                        <div 
                            key={platform.name}
                            className="p-8 bg-white border-2 border-zinc-100 rounded-[2.5rem] hover:border-black transition-all duration-300 group shadow-sm hover:shadow-xl"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={`p-4 ${platform.bgColor} ${platform.color} rounded-2xl group-hover:${platform.hoverBg} group-hover:text-white transition-all duration-300 mb-6 shadow-sm`}>
                                    <platform.icon size={32} />
                                </div>
                                <h4 className="text-xl font-[800] text-zinc-900 mb-3">{platform.name}</h4>
                                <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                                    {platform.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-10 bg-zinc-900 rounded-[3rem] text-center text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
                    <div className="relative z-10">
                        <h4 className="text-2xl font-[800] mb-3">Missing a platform?</h4>
                        <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                            Our engineering team is working hard to expand our reach every single day.
                        </p>
                        <button className="px-8 py-4 bg-white text-black font-[900] rounded-full hover:bg-zinc-200 transition-all active:scale-95">
                            Request Coverage
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportedPlatformsSection;

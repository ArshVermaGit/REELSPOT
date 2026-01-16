import React from 'react';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';

export const platformsContent = {
    title: 'Global Compatibility',
    body: (
        <div className="space-y-8 text-zinc-600">
            <p className="text-lg font-medium">Reelspot supports high-speed extraction from the world&apos;s most popular platforms. We are constantly adding support for more sources.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-pink-50 text-pink-500 rounded-2xl group-hover:bg-pink-500 group-hover:text-white transition-colors">
                            <Instagram size={32} />
                        </div>
                        <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">Instagram</h4>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">Reels, Stories, TV, and High-Res Posts.</p>
                </div>

                <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-red-50 text-red-500 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                            <Youtube size={32} />
                        </div>
                        <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">YouTube</h4>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">Shorts, 4K Video, and Audio extraction.</p>
                </div>

                <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Facebook size={32} />
                        </div>
                        <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">Facebook</h4>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">Public videos, Reels, and Watch content.</p>
                </div>

                <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-zinc-100 text-zinc-900 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
                            <Music2 size={32} />
                        </div>
                        <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">TikTok</h4>
                    </div>
                    <p className="text-sm font-medium text-zinc-400">No-watermark video & original sounds.</p>
                </div>
            </div>

            <div className="p-8 bg-zinc-900 rounded-[2rem] text-center text-white">
                <h4 className="text-lg font-[800] mb-2">Missing a platform?</h4>
                <p className="text-zinc-400 text-sm mb-6">Our engineers are working to expand our reach every day.</p>
                <button className="px-6 py-3 bg-white text-black font-[900] rounded-full hover:bg-zinc-200 transition-colors">
                    Request Coverage
                </button>
            </div>
        </div>
    )
};

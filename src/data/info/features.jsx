import React from 'react';
import { Zap, Monitor, ShieldCheck, Smartphone } from 'lucide-react';

export const featuresContent = {
    title: 'Pro Features',
    body: (
        <div className="space-y-12 text-zinc-600">
            <p className="text-lg">Reelspot is engineered for users who demand speed, quality, and a clutter-free experience. Here's what makes us the ultimate choice.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-[800] text-zinc-900">Ultrafast Resolution</h3>
                    <p className="font-medium leading-relaxed">Our optimized backend resolves media URLs in milliseconds, ensuring you spend less time waiting and more time creating.</p>
                </div>

                <div className="space-y-4">
                    <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200">
                        <Monitor size={24} />
                    </div>
                    <h3 className="text-xl font-[800] text-zinc-900">4K & HDR Support</h3>
                    <p className="font-medium leading-relaxed">Download media in the highest possible quality. We support up to 4K resolution and high-bitrate audio for crystal clear content.</p>
                </div>

                <div className="space-y-4">
                    <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-[800] text-zinc-900">Privacy First</h3>
                    <p className="font-medium leading-relaxed">No tracking, no invasive ads, and no data selling. Your download history is encrypted and visible only to you.</p>
                </div>

                <div className="space-y-4">
                    <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200">
                        <Smartphone size={24} />
                    </div>
                    <h3 className="text-xl font-[800] text-zinc-900">Mobile Optimized</h3>
                    <p className="font-medium leading-relaxed">The entire Reelspot experience is designed to work flawlessly on your phone, tablet, or desktop with a native app feel.</p>
                </div>
            </div>

            <div className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100">
                <h3 className="text-xl font-[800] text-zinc-900 mb-4">But wait, there's more...</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        "Batch Link Detection",
                        "No Watermarks on TikTok",
                        "High Fidelity MP3 Export",
                        "Unlimited History Sync",
                        "Custom API Integrations",
                        "Cloud Storage API"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 font-bold text-sm text-zinc-700">
                            <div className="w-2 h-2 bg-black rounded-full" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

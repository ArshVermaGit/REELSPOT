import React from 'react';
import { Copy, ClipboardType, DownloadCloud } from 'lucide-react';

const steps = [
    {
        title: 'Copy the Media URL',
        description: 'Navigate to the video or media you want to download on Instagram, YouTube, Facebook, or TikTok. Copy the URL from your browser\'s address bar or use the share button to copy the link.',
        icon: Copy,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50'
    },
    {
        title: 'Paste into Reelspot',
        description: 'Visit Reelspot and paste the copied URL into the input field on our homepage. Our system automatically detects the platform and prepares your download.',
        icon: ClipboardType,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50'
    },
    {
        title: 'Download Your Media',
        description: 'Click the download button. The media will be processed and saved directly to your device. For videos, you can often choose between different quality options.',
        icon: DownloadCloud,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50'
    }
];

const HowItWorksSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4">Process</h2>
                    <h3 className="text-4xl md:text-5xl font-[900] tracking-tight text-zinc-900">
                        How It Works
                    </h3>
                    <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
                        Downloading media with Reelspot is simple and takes just a few seconds. 
                        Follow this step-by-step guide to get started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            {/* Connector Line */}
                            {idx < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-zinc-100 -z-10 group-hover:bg-zinc-200 transition-colors" />
                            )}
                            
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-24 h-24 ${step.bgColor} ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-white`}>
                                    <step.icon size={36} />
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-[900] shadow-xl">
                                        {idx + 1}
                                    </div>
                                </div>
                                <h4 className="text-2xl font-[800] text-zinc-900 mb-4">{step.title}</h4>
                                <p className="text-zinc-500 leading-relaxed font-medium">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tips Card */}
                    <div className="p-10 bg-zinc-50 rounded-[3rem] border border-zinc-100">
                        <h4 className="text-2xl font-[800] text-zinc-900 mb-6">Pro Tips for Best Results</h4>
                        <ul className="space-y-4">
                            {[
                                { title: 'Use Direct Links', text: 'Copy the direct URL of the media rather than sharing links with tracking parameters.' },
                                { title: 'Check Privacy', text: 'Ensure the content you want to download is publicly accessible.' },
                                { title: 'Enable API Keys', text: 'For consistent downloads, consider adding your own API keys in Settings.' },
                                { title: 'Create an Account', text: 'Sign in to track your history and sync preferences across all your devices.' }
                            ].map((tip, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 shrink-0" />
                                    <p className="text-zinc-600 font-medium">
                                        <span className="font-bold text-zinc-900">{tip.title}:</span> {tip.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* URL Formats Card */}
                    <div className="p-10 bg-zinc-900 rounded-[3rem] text-white overflow-hidden shadow-2xl">
                        <h4 className="text-2xl font-[800] mb-6">Supported Formats</h4>
                        <div className="space-y-6 font-mono text-sm">
                            <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                                <p className="text-pink-400 mb-1">Instagram</p>
                                <p className="text-zinc-300 break-all">https://www.instagram.com/reel/ABC123/</p>
                                <p className="text-zinc-300 break-all">https://www.instagram.com/p/ABC123/</p>
                            </div>
                            <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                                <p className="text-red-400 mb-1">YouTube</p>
                                <p className="text-zinc-300 break-all">https://www.youtube.com/watch?v=ABC123</p>
                                <p className="text-zinc-300 break-all">https://youtu.be/ABC123</p>
                            </div>
                            <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                                <p className="text-zinc-400 mb-1">TikTok</p>
                                <p className="text-zinc-300 break-all">https://www.tiktok.com/@user/video/123456</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;

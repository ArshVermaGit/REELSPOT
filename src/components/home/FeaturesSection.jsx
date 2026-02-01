import React from 'react';
import { Zap, Monitor, ShieldCheck, Smartphone, Download, Globe } from 'lucide-react';

const features = [
    {
        title: 'Ultrafast Media Resolution',
        description: 'Our proprietary backend infrastructure is engineered to resolve and extract media URLs from complex social platform architectures in milliseconds. By utilizing global edge nodes and optimized request handling, we ensure you spend virtually no time waiting and can focus entirely on your creative workflow.',
        icon: Zap,
        color: 'text-amber-500',
        bgColor: 'bg-amber-50'
    },
    {
        title: 'Full 4K & HDR Support',
        description: 'Quality is non-negotiable at Reelspot. Our extraction engine is capable of retrieving media in the absolute highest resolution provided by the source, including 4K Ultra HD and HDR video streams. We also ensure 320kbps high-bitrate audio for crystal clear sound fidelity.',
        icon: Monitor,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50'
    },
    {
        title: 'Privacy-First Downloads',
        description: 'We believe that your digital activity is your own business. Reelspot implements a strict privacy-first architecture with zero third-party tracking, no invasive data harvesting, and no unauthorized data sales. Your personal download history is fully encrypted locally for your eyes only.',
        icon: ShieldCheck,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50'
    },
    {
        title: 'Native Mobile Optimization',
        description: 'The entire Reelspot ecosystem has been meticulously crafted to provide a fluid, app-like experience on every device. Whether you are using a smartphone, a high-resolution tablet, or a desktop workstation, our interface adapts perfectly to provide a responsive and premium feel.',
        icon: Smartphone,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50'
    },
    {
        title: 'Clean Watermark-Free Export',
        description: 'Professional content creators deserve clean media. Reelspot specializes in removing intrusive platform watermarks—specifically from TikTok and Instagram—to provide you with a pristine video file that is immediately ready for high-quality repurposing and editing.',
        icon: Download,
        color: 'text-rose-500',
        bgColor: 'bg-rose-50'
    },
    {
        title: 'Global High Accessibility',
        description: 'Accessed and trusted by a global community of millions, Reelspot supports the widest range of international social media variants and regional content types. We are committed to maintaining 99.9% uptime across all geographic locations for our diverse user base.',
        icon: Globe,
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-50'
    }
];

const FeaturesSection = () => {
    return (
        <section className="py-24 bg-zinc-50/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4">Features</h2>
                    <h3 className="text-4xl md:text-5xl font-[900] tracking-tight text-zinc-900">
                        Built for Creators
                    </h3>
                    <p className="mt-4 text-lg text-zinc-500 max-w-2xl mx-auto">
                        Reelspot is engineered for users who demand speed, quality, and a clutter-free experience. 
                        Here&apos;s what makes us the ultimate choice.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div 
                            key={feature.title}
                            className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-[transform,box-shadow] duration-500 will-change-transform"
                        >
                            <div className={`w-14 h-14 ${feature.bgColor} ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform hover:scale-110 will-change-transform`}>
                                <feature.icon size={28} />
                            </div>
                            <h4 className="text-xl font-[800] text-zinc-900 mb-4">{feature.title}</h4>
                            <p className="text-zinc-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-white border border-zinc-100 rounded-[3rem] p-8 md:p-12 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <h4 className="text-2xl font-[800] text-zinc-900 mb-4">But wait, there&apos;s more...</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    "Batch Link Detection",
                                    "High Fidelity MP3 Export",
                                    "Unlimited History Sync",
                                    "Custom API Integrations",
                                    "Secure Local Storage",
                                    "Cloud Storage API"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-black rounded-full" />
                                        <span className="font-bold text-sm text-zinc-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="shrink-0">
                            <div className="p-8 bg-black text-white rounded-[2rem] shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500">
                                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Pro status</p>
                                <p className="text-2xl font-[900]">Always Free.</p>
                                <p className="text-zinc-400 text-sm mt-1">No subscriptions, no hidden fees.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

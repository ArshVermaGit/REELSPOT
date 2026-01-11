import React from 'react';
import { Smartphone, Zap, Shield, Globe } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="p-6 bg-zinc-50 rounded-2xl hover:bg-zinc-100 transition-colors">
        <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-4">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-zinc-500 leading-relaxed">{description}</p>
    </div>
);

const Features = () => {
    const features = [
        {
            icon: Smartphone,
            title: "Mobile Optimized",
            description: "Works perfectly on any device. Install as a PWA for the best experience."
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Powered by edge computing for instant downloads and processing."
        },
        {
            icon: Shield,
            title: "Privacy First",
            description: "We don't track your downloads. Your history is stored securely."
        },
        {
            icon: Globe,
            title: "Universal Support",
            description: "Download from Instagram, YouTube, TikTok, and Facebook seamlessly."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold mb-4">Why use Reelspot?</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        The most advanced media downloader on the web. Built for creators.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <FeatureCard key={i} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

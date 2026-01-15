import React from 'react';
import { Github } from 'lucide-react';

export const aboutContent = {
    title: 'About Reelspot',
    body: (
        <div className="space-y-8 text-zinc-600">
            <div className="bg-gradient-to-br from-zinc-50 to-white p-8 rounded-[2rem] border border-zinc-100">
                <h3 className="text-2xl font-[900] text-zinc-900 mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed">Reelspot was created with a singular vision: to empower content creators, digital marketers, and everyday users with the ability to save and repurpose media from their favorite social platforms. We believe that accessing your own content or content you have permission to use should be simple, fast, and free from frustrating barriers.</p>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">The Story Behind Reelspot</h3>
            <p className="leading-relaxed">Reelspot began as a personal project born out of frustration. Like many content creators, our founder Arsh Verma found himself constantly struggling to download his own videos from Instagram, TikTok, and YouTube. The existing solutions were either plagued with intrusive advertisements, riddled with malware risks, or simply did not work reliably.</p>
            <p className="leading-relaxed">In early 2026, after countless hours of research and development, Reelspot was launched as a clean, privacy-focused alternative. What started as a simple tool has evolved into a comprehensive platform trusted by thousands of users worldwide. Our commitment to user experience, privacy, and reliability has remained unchanged since day one.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">What Makes Us Different</h3>
            <p className="leading-relaxed">In a market saturated with download tools, Reelspot stands apart through our unwavering commitment to three core principles:</p>
            <ul className="list-disc pl-5 space-y-3">
                <li><strong>Privacy First:</strong> We never sell your data. Your download history is encrypted and visible only to you. We use minimal tracking solely to improve our service.</li>
                <li><strong>Speed and Reliability:</strong> Our optimized backend infrastructure resolves media URLs in milliseconds. We continuously monitor platform changes to ensure uninterrupted service.</li>
                <li><strong>Clean User Experience:</strong> No pop-ups, no confusing buttons, no fake download links. Just paste your URL and get your media.</li>
            </ul>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Our Technology</h3>
            <p className="leading-relaxed">Reelspot is built using modern web technologies including React for the frontend, Supabase for secure backend services, and a distributed API infrastructure that ensures 99.9% uptime. We leverage RapidAPI's ecosystem to provide reliable extraction from multiple platforms while maintaining strict compliance with rate limits and usage policies.</p>
            <p className="leading-relaxed">Our platform supports downloads from Instagram (Reels, Stories, Posts, IGTV), YouTube (videos, Shorts, audio extraction), Facebook (public videos, Reels), and TikTok (watermark-free videos). We are constantly expanding our platform support based on user feedback and demand.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Our Commitment to Users</h3>
            <p className="leading-relaxed">We are committed to providing a service that respects both our users and content creators. We encourage all users to respect intellectual property rights and only download content they have permission to use. Reelspot is designed for personal use, content backup, and legitimate repurposing scenarios.</p>
            <p className="leading-relaxed">As we grow, we remain dedicated to keeping Reelspot accessible, reliable, and trustworthy. Your feedback drives our development, and we actively listen to our community to prioritize features and improvements that matter most.</p>

            <div className="bg-zinc-900 text-white p-8 rounded-[2rem] mt-8">
                <h4 className="text-lg font-[800] mb-2">Join Our Community</h4>
                <p className="text-zinc-400 mb-4">Have questions, feedback, or feature requests? We'd love to hear from you.</p>
                <a href="https://github.com/ArshVermaGit/REELSPOT" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-[900] rounded-full hover:bg-zinc-200 transition-colors">
                    <Github size={18} />
                    Visit Our GitHub
                </a>
            </div>
        </div>
    )
};

export const contactContent = {
    title: 'Contact Us',
    body: (
        <div className="space-y-8 text-zinc-600">
            <p className="text-lg leading-relaxed">We value your feedback and are here to help. Whether you have questions about using Reelspot, need technical support, or want to share suggestions for new features, we would love to hear from you.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-3">General Inquiries</h4>
                    <p className="text-sm mb-4">For questions about Reelspot, partnerships, or media inquiries.</p>
                    <a href="mailto:contact@reelspot.app" className="text-blue-600 hover:underline font-medium">contact@reelspot.app</a>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-3">Technical Support</h4>
                    <p className="text-sm mb-4">Experiencing issues or need help with downloads?</p>
                    <a href="mailto:support@reelspot.app" className="text-blue-600 hover:underline font-medium">support@reelspot.app</a>
                </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Response Times</h3>
            <p className="leading-relaxed">We aim to respond to all inquiries within 24-48 hours during business days. For urgent technical issues affecting service availability, we prioritize responses and typically reply within a few hours.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Community & Social</h3>
            <p className="leading-relaxed">Join our growing community of content creators and developers. Follow us on social media for updates, tips, and announcements:</p>
            <div className="flex flex-wrap gap-3 mt-4">
                <a href="https://github.com/ArshVermaGit/REELSPOT" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-bold hover:bg-black transition-colors">
                    <Github size={16} /> GitHub
                </a>
                <a href="https://x.com/TheArshVerma" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors">
                    X (Twitter)
                </a>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Bug Reports & Feature Requests</h3>
            <p className="leading-relaxed">Found a bug or have an idea for a new feature? The best way to report issues or suggest improvements is through our GitHub repository. This allows us to track, prioritize, and implement changes efficiently while keeping our community informed of progress.</p>

            <div className="bg-zinc-900 text-white p-6 rounded-2xl">
                <p className="text-sm text-zinc-400">We read every message and appreciate your patience as we work to make Reelspot better for everyone.</p>
            </div>
        </div>
    )
};

export const changelogContent = {
    title: 'Changelog',
    body: (
        <div className="space-y-8 text-zinc-600">
            <div className="relative pl-8 border-l-2 border-zinc-100">
                <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-black border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-zinc-900 text-lg">v1.2.0 - UI Polish & Settings</h4>
                <p className="text-sm text-zinc-400 mb-2">January 11, 2026</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Complete UI overhaul with "Hyper-Polished" aesthetic.</li>
                    <li>Added History filtering and bulk management.</li>
                    <li>New Settings page with detailed data management.</li>
                    <li>Improved component transparency and animations.</li>
                </ul>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-100">
                <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-zinc-300 border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-zinc-900 text-lg">v1.1.0 - Core Features</h4>
                <p className="text-sm text-zinc-400 mb-2">January 10, 2026</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Added support for TikTok and Facebook.</li>
                    <li>Implemented Supabase backend for history sync.</li>
                    <li>Added API Key management system.</li>
                </ul>
            </div>
             <div className="relative pl-8 border-l-2 border-zinc-100">
                <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-zinc-300 border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-zinc-900 text-lg">v1.0.0 - Initial Release</h4>
                <p className="text-sm text-zinc-400 mb-2">January 1, 2026</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Basic Instagram and YouTube download support.</li>
                    <li>Local history storage.</li>
                </ul>
            </div>
        </div>
    )
};

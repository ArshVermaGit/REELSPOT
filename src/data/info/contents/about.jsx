import React from 'react';
import { Github } from 'lucide-react';

export const content = {
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
            <p className="leading-relaxed">Reelspot is built using modern web technologies including React for the frontend, Supabase for secure backend services, and a distributed API infrastructure that ensures 99.9% uptime. We leverage RapidAPI&apos;s ecosystem to provide reliable extraction from multiple platforms while maintaining strict compliance with rate limits and usage policies.</p>
            <p className="leading-relaxed">Our platform supports downloads from Instagram (Reels, Stories, Posts, IGTV), YouTube (videos, Shorts, audio extraction), Facebook (public videos, Reels), and TikTok (watermark-free videos). We are constantly expanding our platform support based on user feedback and demand.</p>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Our Commitment to Users</h3>
            <p className="leading-relaxed">We are committed to providing a service that respects both our users and content creators. We encourage all users to respect intellectual property rights and only download content they have permission to use. Reelspot is designed for personal use, content backup, and legitimate repurposing scenarios.</p>
            <p className="leading-relaxed">As we grow, we remain dedicated to keeping Reelspot accessible, reliable, and trustworthy. Your feedback drives our development, and we actively listen to our community to prioritize features and improvements that matter most.</p>

            <div className="bg-zinc-900 text-white p-8 rounded-[2rem] mt-8">
                <h4 className="text-lg font-[800] mb-2">Join Our Community</h4>
                <p className="text-zinc-400 mb-4">Have questions, feedback, or feature requests? We&apos;d love to hear from you.</p>
                <a href="https://github.com/ArshVermaGit/REELSPOT" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-[900] rounded-full hover:bg-zinc-200 transition-colors">
                    <Github size={18} />
                    Visit Our GitHub
                </a>
            </div>
        </div>
    )
};

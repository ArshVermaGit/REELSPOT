import React from 'react';
import { Github } from 'lucide-react';

export const content = {
    title: 'Contact Us',
    body: (
        <div className="space-y-8 text-zinc-600">
            <p className="text-lg leading-relaxed">We value your feedback and are here to help. Whether you have questions about using Reelspot, need technical support, or want to share suggestions for new features, we would love to hear from you.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-3">General Inquiries</h4>
                    <p className="text-sm mb-4">For questions about Reelspot, partnerships, or media inquiries.</p>
                    <a href="mailto:arshverma.dev@gmail.com" className="text-blue-600 hover:underline font-medium">arshverma.dev@gmail.com</a>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-3">Technical Support</h4>
                    <p className="text-sm mb-4">Experiencing issues or need help with downloads?</p>
                    <a href="mailto:arshverma.dev@gmail.com" className="text-blue-600 hover:underline font-medium">arshverma.dev@gmail.com</a>
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
                <a href="https://www.linkedin.com/in/arshvermadev/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
                    LinkedIn
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

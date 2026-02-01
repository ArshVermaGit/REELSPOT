import React from 'react';

export const content = {
    title: 'Changelog',
    body: (
        <div className="space-y-8 text-zinc-600">
            <div className="relative pl-8 border-l-2 border-zinc-100">
                <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-black border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-zinc-900 text-lg">v1.2.0 - UI Polish & System Refinement</h4>
                <p className="text-sm text-zinc-400 mb-3">January 11, 2026</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Major visual architecture overhaul using &quot;Hyper-Polished Obsidian Glass&quot; design language for improved aesthetic consistency.</li>
                    <li>Implemented advanced History filtering by platform and media type, along with bulk deletion capabilities.</li>
                    <li>Introduced a comprehensive new Settings module allowing for detailed local and cloud data management.</li>
                    <li>Significantly improved transparency effects and micro-animations throughout the navigation and tool interaction flow.</li>
                    <li>Integrated real-time system status indicators and improved error messaging across the downloader interface.</li>
                </ul>
            </div>
            <div className="relative pl-8 border-l-2 border-zinc-100">
                <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-zinc-300 border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-zinc-900 text-lg">v1.1.0 - Cross-Platform Stability</h4>
                <p className="text-sm text-zinc-400 mb-3">January 10, 2026</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Added full production-ready support for TikTok (watermark-free) and Facebook (High-Definition) media extraction.</li>
                    <li>Migrated state and history management to a robust Supabase backend to enable secure, real-time cross-device synchronization.</li>
                    <li>Implemented a new developer API Key management system with local encryption for enhanced security.</li>
                    <li>Optimized backend resolving strategies to reduce extraction latency by an average of 40% across all platforms.</li>
                </ul>
            </div>
             <div className="relative pl-8 border-l-2 border-zinc-100">
                <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-zinc-300 border-4 border-white shadow-sm"></div>
                <h4 className="font-bold text-zinc-900 text-lg">v1.0.0 - Genesis Release</h4>
                <p className="text-sm text-zinc-400 mb-3">January 1, 2026</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Initial public launch of the Reelspot web platform with core support for Instagram Reels and YouTube standard videos.</li>
                    <li>Fundamental downloader logic established with local history persistence and responsive mobile layout.</li>
                    <li>Established basic branding, security protocols, and initial platform strategy framework.</li>
                </ul>
            </div>
        </div>
    )
};

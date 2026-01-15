import React from 'react';
import { Github } from 'lucide-react';

export const apiContent = {
    title: 'Developer Portal',
    body: (
        <div className="space-y-12 text-zinc-600">
            <div className="space-y-4">
                <h3 className="text-2xl font-[900] text-zinc-900">Build with Reelspot</h3>
                <p className="text-lg">Power your own applications with our robust media extraction technology. Our API is built for scale, performance, and ease of use.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 rounded-2xl space-y-3">
                    <h4 className="font-[800] text-zinc-900">Cloud SDK</h4>
                    <p className="text-sm font-medium">Pre-built libraries for JavaScript, Python, and Ruby to get you started in minutes.</p>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl space-y-3">
                    <h4 className="font-[800] text-zinc-900">99.9% Uptime</h4>
                    <p className="text-sm font-medium">Enterprise-grade infrastructure ensuring your users never experience downtime.</p>
                </div>
            </div>

            <div className="bg-zinc-900 rounded-[2rem] overflow-hidden">
                <div className="p-4 bg-zinc-800 flex items-center justify-between border-b border-zinc-700">
                   <div className="flex gap-1.5">
                       <div className="w-3 h-3 rounded-full bg-red-500/50" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                       <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <span className="text-xs font-mono text-zinc-500">example.js</span>
                </div>
                <div className="p-8 font-mono text-sm overflow-x-auto">
                    <pre className="text-blue-400">
{`const reelspot = require('@reelspot/sdk');

async function download() {
  const media = await reelspot.resolve('https://instagr.am/p/ABC');
  console.log(media.download_url);
}`}
                    </pre>
                </div>
            </div>

            <div className="text-center pt-8">
                <a href="https://github.com/ArshVermaGit/REELSPOT" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-[900] shadow-xl shadow-black/20 hover:scale-[1.02] transition-all active:scale-95">
                    <Github size={20} />
                    Get API Credentials
                </a>
            </div>
        </div>
    )
};

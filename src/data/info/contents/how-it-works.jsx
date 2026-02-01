import React from 'react';

export const content = {
    title: 'How It Works',
    body: (
        <div className="space-y-8 text-zinc-600">
            <p className="text-lg leading-relaxed">Downloading media with Reelspot is simple and takes just a few seconds. Follow this step-by-step guide to get started.</p>

            <div className="space-y-6">
                <div className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center font-[900] shrink-0">1</div>
                    <div>
                        <h4 className="font-[800] text-zinc-900 mb-2">Copy the Media URL</h4>
                        <p>Navigate to the video or media you want to download on Instagram, YouTube, Facebook, or TikTok. Copy the URL from your browser&apos;s address bar or use the share button to copy the link.</p>
                    </div>
                </div>

                <div className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center font-[900] shrink-0">2</div>
                    <div>
                        <h4 className="font-[800] text-zinc-900 mb-2">Paste into Reelspot</h4>
                        <p>Visit Reelspot and paste the copied URL into the input field on our homepage. Our system automatically detects the platform and prepares your download.</p>
                    </div>
                </div>

                <div className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center font-[900] shrink-0">3</div>
                    <div>
                        <h4 className="font-[800] text-zinc-900 mb-2">Download Your Media</h4>
                        <p>Click the download button. The media will be processed and saved directly to your device. For videos, you can often choose between different quality options.</p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Tips for Best Results</h3>
            <ul className="list-disc pl-5 space-y-3">
                <li><strong>Use Direct Links:</strong> For best results, copy the direct URL of the media rather than sharing links with tracking parameters.</li>
                <li><strong>Check Privacy Settings:</strong> Ensure the content you want to download is publicly accessible.</li>
                <li><strong>Enable API Keys:</strong> For consistent downloads, consider adding your own API keys through the Settings page.</li>
                <li><strong>Create an Account:</strong> Sign in to track your download history and sync preferences across devices.</li>
            </ul>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Supported URL Formats</h3>
            <p className="leading-relaxed">Reelspot accepts various URL formats from supported platforms. Here are some examples:</p>
            <div className="bg-zinc-900 text-white p-6 rounded-2xl font-mono text-sm overflow-x-auto">
                <p className="text-zinc-400"># Instagram</p>
                <p>https://www.instagram.com/reel/ABC123/</p>
                <p>https://www.instagram.com/p/ABC123/</p>
                <p className="text-zinc-400 mt-4"># YouTube</p>
                <p>https://www.youtube.com/watch?v=ABC123</p>
                <p>https://youtu.be/ABC123</p>
                <p className="text-zinc-400 mt-4"># TikTok</p>
                <p>https://www.tiktok.com/@user/video/123456</p>
            </div>
        </div>
    )
};

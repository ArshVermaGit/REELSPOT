import React from 'react';

export const faqContent = {
    title: 'Frequently Asked Questions',
    body: (
        <div className="space-y-8 text-zinc-600">
            <p className="text-lg leading-relaxed">Find answers to the most common questions about using Reelspot. If you cannot find what you are looking for, feel free to contact our support team.</p>

            <div className="space-y-6">
                <h3 className="text-xl font-bold text-zinc-900">Getting Started</h3>
                
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">What is Reelspot?</h4>
                    <p>Reelspot is a free online tool that allows you to download videos and media from popular social platforms including Instagram, YouTube, Facebook, and TikTok. Simply paste a URL and get your media in seconds.</p>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Do I need to create an account?</h4>
                    <p>Basic downloads work without an account. However, creating a free account unlocks features like download history sync across devices, saved preferences, and access to premium features.</p>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Is Reelspot free to use?</h4>
                    <p>Yes, Reelspot is completely free for personal use. We sustain our service through non-intrusive advertisements. For developers, we offer API access with various pricing tiers.</p>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-8">Downloads & Platforms</h3>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Which platforms are supported?</h4>
                    <p>We currently support Instagram (Reels, Stories, Posts, IGTV), YouTube (videos, Shorts), Facebook (public videos, Reels), and TikTok (watermark-free). We are continuously adding support for more platforms.</p>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Can I download private videos?</h4>
                    <p>No, Reelspot only works with publicly accessible content. Private or restricted content cannot be downloaded for privacy and legal reasons.</p>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">What quality options are available?</h4>
                    <p>We provide the highest quality available from the source, including up to 4K resolution for YouTube videos and original quality for Instagram and TikTok content.</p>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-8">Privacy & Security</h3>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Is my data safe with Reelspot?</h4>
                    <p>Absolutely. We do not store the videos you download on our servers. Your download history is encrypted and only visible to you. We never sell or share your personal information with third parties.</p>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Do you use cookies?</h4>
                    <p>Yes, we use essential cookies to remember your login state and preferences. We also use analytics cookies to understand how our service is used. You can manage cookie preferences through your browser settings.</p>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-8">Troubleshooting</h3>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Why is my download not working?</h4>
                    <p>Common causes include: the content may be private or deleted, the URL format may be incorrect, or there may be temporary platform restrictions. Try refreshing the page or using a different URL format. If issues persist, contact our support team.</p>
                </div>

                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-2">Why do I need to add an API key?</h4>
                    <p>Some platforms require API access for reliable downloads. We guide you through obtaining free API keys from RapidAPI, which enables faster and more consistent downloads.</p>
                </div>
            </div>
        </div>
    )
};

export const howItWorksContent = {
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

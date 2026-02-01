import React from 'react';

export const content = {
    title: 'Support & Help Center',
    body: (
        <div className="space-y-8 text-zinc-600">
            <p className="text-lg leading-relaxed">We&apos;re here to help you get the most out of Reelspot. If you&apos;re experiencing technical difficulties or have questions about our service, please explore the resources below.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-3">Self-Service Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li>• <a href="/faq" className="text-blue-600 hover:underline">Read the FAQ</a></li>
                        <li>• <a href="/how-it-works" className="text-blue-600 hover:underline">Step-by-Step Guide</a></li>
                        <li>• <a href="/supported-platforms" className="text-blue-600 hover:underline">Platform Capabilities</a></li>
                    </ul>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900 mb-3">Direct Assistance</h4>
                    <p className="text-sm mb-4">Can&apos;t find what you need? Reach out to our team directly.</p>
                    <a href="mailto:arshverma.dev@gmail.com" className="text-blue-600 hover:underline font-bold">arshverma.dev@gmail.com</a>
                </div>
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mt-8">Common Issues</h3>
            <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                    <h5 className="font-bold text-zinc-900 mb-1">Download Fails to Start</h5>
                    <p className="text-sm">Ensure your internet connection is stable and the URL is correct. Some videos may be geo-restricted or private.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                    <h5 className="font-bold text-zinc-900 mb-1">Low Video Quality</h5>
                    <p className="text-sm">We always fetch the highest quality available. If you&apos;re getting low resolution, the source platform might be limiting quality for that specific media.</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-zinc-100 shadow-sm">
                    <h5 className="font-bold text-zinc-900 mb-1">Account Sync Not Working</h5>
                    <p className="text-sm">Try signing out and signing back in. Ensure you&apos;re using the same Google account across all devices.</p>
                </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-[2rem] mt-8 text-center">
                <h4 className="text-xl font-[800] mb-2">Still Need Help?</h4>
                <p className="text-zinc-400 mb-6">Our average response time for support tickets is under 24 hours.</p>
                <a href="/contact" className="inline-flex px-8 py-3 bg-white text-black font-[900] rounded-full hover:bg-zinc-200 transition-colors">
                    Contact Support
                </a>
            </div>
        </div>
    )
};

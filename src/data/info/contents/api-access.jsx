import React from 'react';
import { Github } from 'lucide-react';

export const content = {
    title: 'Developer Portal',
    body: (
        <div className="space-y-12 text-zinc-600">
            <div className="space-y-4">
                <h3 className="text-2xl font-[900] text-zinc-900">Build with Reelspot</h3>
                <p className="text-lg">Power your own applications with our robust media extraction technology. Our API is built for scale, performance, and ease of use.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 rounded-2xl space-y-3 border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900">Cloud-Native SDKs</h4>
                    <p className="text-sm font-medium leading-relaxed">We provide pre-built, high-performance libraries for JavaScript/Node.js, Python 3.x, and Ruby. These SDKs are maintained by our core team and include built-in retry logic, rate-limit handling, and type definitions to get you started in minutes.</p>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl space-y-3 border border-zinc-100">
                    <h4 className="font-[800] text-zinc-900">Enterprise Uptime</h4>
                    <p className="text-sm font-medium leading-relaxed">Our API is hosted on a geo-replicated infrastructure with 99.9% guaranteed uptime. We utilize a global content delivery network and redundant extraction engines to ensure that your integrated applications never experience service interruptions.</p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-[800] text-zinc-900">Advanced Features</h3>
                <ul className="list-disc pl-5 space-y-3">
                    <li className="leading-relaxed"><strong>High-Concurrency Resolution:</strong> Process hundreds of media URLs simultaneously without performance degradation using our parallelized extraction pipeline.</li>
                    <li className="leading-relaxed"><strong>Rich Metadata Extraction:</strong> Get more than just a download link. Retrieve titles, descriptions, view counts, upload dates, and high-resolution thumbnail URLs for every piece of media.</li>
                    <li className="leading-relaxed"><strong>Custom Webhook Support:</strong> Receive real-time notifications about download status and processing results directly at your application endpoints, eliminating the need for constant polling.</li>
                </ul>
            </div>

            <div className="bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="p-4 bg-zinc-800 flex items-center justify-between border-b border-zinc-700">
                   <div className="flex gap-1.5">
                       <div className="w-3 h-3 rounded-full bg-red-500/50" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                       <div className="w-3 h-3 rounded-full bg-green-500/50" />
                   </div>
                   <span className="text-xs font-mono text-zinc-500">integration_example.js</span>
                </div>
                <div className="p-8 font-mono text-sm overflow-x-auto">
                    <pre className="text-blue-400">
{`const reelspot = require('@reelspot/sdk');

// Initialize with your secure API credentials
const client = new reelspot.Client('YOUR_API_KEY');

async function downloadMedia() {
  try {
    const media = await client.resolve('https://instagr.am/p/ABC');
    console.log('Video Quality:', media.quality);
    console.log('Download URL:', media.download_url);
  } catch (err) {
    console.error('Extraction failed:', err.message);
  }
}`}
                    </pre>
                </div>
            </div>

            <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                    <strong>Developer Note:</strong> To maintain the quality of our service for everyone, our API implements standard rate limiting based on your tier. If you are building a high-traffic application or need custom limits, please reach out to our team at arshverma.dev@gmail.com for institutional enterprise solutions.
                </p>
            </div>

            <div className="text-center pt-8">
                <a href="https://github.com/ArshVermaGit/REELSPOT" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white rounded-full font-[900] shadow-xl shadow-black/20 hover:scale-[1.05] transition-all active:scale-95">
                    <Github size={20} />
                    Get API Credentials
                </a>
            </div>
        </div>
    )
};

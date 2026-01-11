import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Monitor, ShieldCheck, Smartphone, Instagram, Youtube, Facebook, Music2, Github } from 'lucide-react';

const InfoPage = ({ pageId: propId }) => {
    const { pageId: paramId } = useParams();
    const pageId = propId || paramId;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageId]);

    const content = {
        'privacy': {
            title: 'Privacy Policy',
            body: (
                <div className="space-y-6 text-zinc-600">
                    <p>Last updated: January 2026</p>
                    <p>At Reelspot, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you use our services.</p>
                    
                    <h3 className="text-xl font-bold text-zinc-900 mt-8">1. Information We Collect</h3>
                    <p>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, and profile picture.</p>
                    <p>We also automatically collect certain information when you use our services, such as your download history (URL, platform, timestamp) which is stored securely to provide you with your history features.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">2. How We Use Your Information</h3>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide, maintain, and improve our services;</li>
                        <li>Process your downloads and manage your history;</li>
                        <li>Communicate with you about new features or support messages;</li>
                        <li>Monitor and analyze trends and usage.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">3. Advertising</h3>
                    <p>We use Google AdSense to display advertisements. Google and its partners use cookies to serve ads based on your prior visits to our website or other websites on the Internet.</p>
                    <p>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">4. Data Security</h3>
                    <p>We implement appropriate security measures to protect your personal information. Your API keys are stored securely, and we do not share your personal data with third parties for marketing purposes.</p>
                </div>
            )
        },
        'terms': {
            title: 'Terms of Service',
            body: (
                <div className="space-y-6 text-zinc-600">
                    <p>By accessing or using Reelspot, you agree to be bound by these Terms of Service.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">1. Acceptable Use</h3>
                    <p>You agree to use Reelspot only for lawful purposes. You must not use our service to infringe intellectual property rights. You represent that you have the right to download the content you access through our service for personal use.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">2. Service Availability</h3>
                    <p>We strive to keep Reelspot up and running, but we cannot guarantee uninterrupted access. We reserve the right to modify or discontinue the service at any time.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">3. Disclaimer</h3>
                    <p>The service is provided "as is". We make no warranties regarding the accuracy or reliability of the content downloaded through third-party platforms.</p>
                </div>
            )
        },
        'cookies': {
            title: 'Cookie Policy',
            body: (
                <div className="space-y-6 text-zinc-600">
                    <p>Reelspot uses cookies to enhance your experience.</p>
                    <h3 className="text-xl font-bold text-zinc-900 mt-8">What are cookies?</h3>
                    <p>Cookies are small text files stored on your device. We use them to remember your preferences (like your theme or login state) and to analyze how our service is used.</p>
                    <p>You can control or delete cookies through your browser settings, but some features of Reelspot may not function properly without them.</p>
                </div>
            )
        },
        'features': {
            title: 'Pro Features',
            body: (
                <div className="space-y-12 text-zinc-600">
                    <p className="text-lg">Reelspot is engineered for users who demand speed, quality, and a clutter-free experience. Here's what makes us the ultimate choice.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-zinc-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-[800] text-zinc-900">Ultrafast Resolution</h3>
                            <p className="font-medium leading-relaxed">Our optimized backend resolves media URLs in milliseconds, ensuring you spend less time waiting and more time creating.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200">
                                <Monitor size={24} />
                            </div>
                            <h3 className="text-xl font-[800] text-zinc-900">4K & HDR Support</h3>
                            <p className="font-medium leading-relaxed">Download media in the highest possible quality. We support up to 4K resolution and high-bitrate audio for crystal clear content.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-[800] text-zinc-900">Privacy First</h3>
                            <p className="font-medium leading-relaxed">No tracking, no invasive ads, and no data selling. Your download history is encrypted and visible only to you.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200">
                                <Smartphone size={24} />
                            </div>
                            <h3 className="text-xl font-[800] text-zinc-900">Mobile Optimized</h3>
                            <p className="font-medium leading-relaxed">The entire Reelspot experience is designed to work flawlessly on your phone, tablet, or desktop with a native app feel.</p>
                        </div>
                    </div>

                    <div className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100">
                        <h3 className="text-xl font-[800] text-zinc-900 mb-4">But wait, there's more...</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Batch Link Detection",
                                "No Watermarks on TikTok",
                                "High Fidelity MP3 Export",
                                "Unlimited History Sync",
                                "Custom API Integrations",
                                "Cloud Storage API"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 font-bold text-sm text-zinc-700">
                                    <div className="w-2 h-2 bg-black rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        },
        'supported-platforms': {
            title: 'Global Compatibility',
            body: (
                <div className="space-y-8 text-zinc-600">
                    <p className="text-lg font-medium">Reelspot supports high-speed extraction from the world's most popular platforms. We are constantly adding support for more sources.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-pink-50 text-pink-500 rounded-2xl group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                    <Instagram size={32} />
                                </div>
                                <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">Instagram</h4>
                            </div>
                            <p className="text-sm font-medium text-zinc-400">Reels, Stories, TV, and High-Res Posts.</p>
                        </div>

                        <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-red-50 text-red-500 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <Youtube size={32} />
                                </div>
                                <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">YouTube</h4>
                            </div>
                            <p className="text-sm font-medium text-zinc-400">Shorts, 4K Video, and Audio extraction.</p>
                        </div>

                        <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Facebook size={32} />
                                </div>
                                <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">Facebook</h4>
                            </div>
                            <p className="text-sm font-medium text-zinc-400">Public videos, Reels, and Watch content.</p>
                        </div>

                        <div className="p-6 bg-white border-2 border-zinc-100 rounded-[2rem] hover:border-black transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-zinc-100 text-zinc-900 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
                                    <Music2 size={32} />
                                </div>
                                <h4 className="text-xl font-[800] text-zinc-900 line-clamp-1">TikTok</h4>
                            </div>
                            <p className="text-sm font-medium text-zinc-400">No-watermark video & original sounds.</p>
                        </div>
                    </div>

                    <div className="p-8 bg-zinc-900 rounded-[2rem] text-center text-white">
                        <h4 className="text-lg font-[800] mb-2">Missing a platform?</h4>
                        <p className="text-zinc-400 text-sm mb-6">Our engineers are working to expand our reach every day.</p>
                        <button className="px-6 py-3 bg-white text-black font-[900] rounded-full hover:bg-zinc-200 transition-colors">
                            Request Coverage
                        </button>
                    </div>
                </div>
            )
        },
        'api-access': {
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
        },
        'changelog': {
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
        }
    };

    const activeContent = content[pageId] || { title: 'Not Found', body: <p>Page not found.</p> };

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-black mb-8 group transition-colors"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
                </button>

                <h1 className="text-4xl font-[900] tracking-tight text-zinc-900 mb-8">{activeContent.title}</h1>
                
                <div className="prose prose-zinc max-w-none">
                    {activeContent.body}
                </div>
            </div>
        </div>
    );
};

export default InfoPage;

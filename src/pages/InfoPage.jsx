import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const InfoPage = () => {
    const { pageId } = useParams();
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
            title: 'Features',
            body: (
                <div className="space-y-6 text-zinc-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">Multi-Platform Support</h3>
                            <p>Seamlessly download content from Instagram (Reels, Stories), YouTube (Videos, Shorts), Facebook, and TikTok.</p>
                        </div>
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">High Quality</h3>
                            <p>Get the best available resolution for your downloads, up to 4K where supported.</p>
                        </div>
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">History & Management</h3>
                            <p>Keep track of everything you save. Search, filter, and organize your download history.</p>
                        </div>
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">Privacy Focused</h3>
                            <p>Your data stays yours. We don't track your activity for ads, and we use secure storage for your credentials.</p>
                        </div>
                    </div>
                </div>
            )
        },
        'supported-platforms': {
            title: 'Supported Platforms',
            body: (
                <div className="space-y-6 text-zinc-600">
                    <p>Reelspot currently supports high-speed downloads from the following major social networks:</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
                            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-zinc-900">Instagram</h4>
                                <p className="text-sm">Reels, Stories, Posts, IGTV</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
                            <div className="w-12 h-12 bg-red-600 rounded-lg shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-zinc-900">YouTube</h4>
                                <p className="text-sm">Videos, Shorts, Audio Extraction</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-zinc-900">Facebook</h4>
                                <p className="text-sm">Public Videos, Reels</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
                            <div className="w-12 h-12 bg-black rounded-lg shrink-0"></div>
                            <div>
                                <h4 className="font-bold text-zinc-900">TikTok</h4>
                                <p className="text-sm">Videos (No Watermark), Slideshows</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        'api-access': {
            title: 'API Access',
            body: (
                <div className="space-y-6 text-zinc-600">
                    <p>Reelspot acts as a client for various third-party APIs available on RapidAPI. We do not host our own public API at this time.</p>
                    <p>However, if you are a developer looking to integrate similar functionality, we recommend checking out the Documentation.</p>
                    <div className="p-6 bg-zinc-900 text-white rounded-2xl mt-4">
                        <h4 className="font-bold mb-2">For Developers</h4>
                        <p className="text-zinc-400 text-sm mb-4">Check out our developer docs to learn how to set up your own instance or contribute to Reelspot.</p>
                        <a href="https://github.com/arshverma/REELSPOT" target="_blank" rel="noreferrer" className="inline-block bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-colors">
                            View on GitHub
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

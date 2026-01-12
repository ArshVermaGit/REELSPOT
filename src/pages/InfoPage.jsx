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
                    <p className="text-lg leading-relaxed">At Reelspot, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you use our services. We are committed to protecting your privacy and ensuring transparency in all our data practices.</p>
                    
                    <h3 className="text-xl font-bold text-zinc-900 mt-8">1. Information We Collect</h3>
                    <p className="leading-relaxed"><strong>Information You Provide:</strong> We collect information you provide directly to us, such as when you create an account using Google Sign-In. This includes your name, email address, and profile picture as provided by Google. We also collect any API keys you choose to store in your account settings.</p>
                    <p className="leading-relaxed"><strong>Automatically Collected Information:</strong> When you use our services, we automatically collect certain technical information including your IP address, browser type, device information, and pages visited on our site. We also collect your download history (URL, platform, timestamp, and download status) which is stored securely in our database to provide you with history and analytics features.</p>
                    <p className="leading-relaxed"><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to maintain your login session, remember your preferences, and analyze how our service is used. For more details, please see our Cookie Policy.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">2. How We Use Your Information</h3>
                    <p className="leading-relaxed">We use the information we collect for the following purposes:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide, maintain, and improve our services and features;</li>
                        <li>Process your downloads and manage your download history;</li>
                        <li>Authenticate your identity and secure your account;</li>
                        <li>Communicate with you about service updates, new features, or support messages;</li>
                        <li>Monitor and analyze usage trends to improve user experience;</li>
                        <li>Detect, prevent, and address technical issues or security threats;</li>
                        <li>Comply with legal obligations and enforce our terms of service.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">3. Third-Party Services and Advertising</h3>
                    <p className="leading-relaxed"><strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google and its advertising partners use cookies to serve ads based on your prior visits to our website or other websites on the Internet. These cookies enable Google to display ads that may be relevant to your interests.</p>
                    <p className="leading-relaxed"><strong>Opting Out:</strong> You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>. You can also visit <a href="https://www.aboutads.info" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline">www.aboutads.info</a> to opt out of third-party vendor cookies.</p>
                    <p className="leading-relaxed"><strong>Authentication Services:</strong> We use Google Sign-In for authentication. When you sign in with Google, Google may collect information according to their privacy policy. We only receive your basic profile information (name, email, profile picture) from Google.</p>
                    <p className="leading-relaxed"><strong>Backend Services:</strong> We use Supabase for secure data storage and authentication. Your data is stored on servers located in secure data centers with appropriate security measures in place.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">4. Data Sharing and Disclosure</h3>
                    <p className="leading-relaxed">We do not sell, trade, or rent your personal information to third parties for marketing purposes. We may share your information in the following limited circumstances:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>With service providers who assist in operating our website and services;</li>
                        <li>To comply with legal obligations, court orders, or government requests;</li>
                        <li>To protect our rights, property, or safety, or that of our users;</li>
                        <li>In connection with a merger, acquisition, or sale of assets (with prior notice).</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">5. Data Security</h3>
                    <p className="leading-relaxed">We implement industry-standard security measures to protect your personal information. This includes encryption of data in transit (HTTPS), secure storage of credentials, and regular security audits. Your API keys are encrypted before storage and are only accessible to you. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">6. Your Rights and Choices</h3>
                    <p className="leading-relaxed">Depending on your location, you may have certain rights regarding your personal data, including:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Access:</strong> Request access to your personal data we hold;</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate data;</li>
                        <li><strong>Deletion:</strong> Request deletion of your data (available in Settings);</li>
                        <li><strong>Data Portability:</strong> Request a copy of your data in a portable format;</li>
                        <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time.</li>
                    </ul>
                    <p className="leading-relaxed mt-4">To exercise any of these rights, please contact us at privacy@reelspot.app or use the data management tools in your Settings page.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">7. Data Retention</h3>
                    <p className="leading-relaxed">We retain your personal information for as long as your account is active or as needed to provide you services. You can delete your download history at any time through the Settings page. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal purposes.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">8. Children's Privacy</h3>
                    <p className="leading-relaxed">Reelspot is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">9. Changes to This Policy</h3>
                    <p className="leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">10. Contact Us</h3>
                    <p className="leading-relaxed">If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                    <p className="leading-relaxed">Email: privacy@reelspot.app</p>
                </div>
            )
        },
        'terms': {
            title: 'Terms of Service',
            body: (
                <div className="space-y-6 text-zinc-600">
                    <p>Last updated: January 2026</p>
                    <p className="text-lg leading-relaxed">By accessing or using Reelspot, you agree to be bound by these Terms of Service. Please read them carefully before using our services. If you do not agree to these terms, you may not use Reelspot.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">1. Acceptance of Terms</h3>
                    <p className="leading-relaxed">These Terms of Service constitute a legally binding agreement between you and Reelspot. By creating an account, accessing our website, or using our services in any way, you acknowledge that you have read, understood, and agree to be bound by these terms. We reserve the right to modify these terms at any time, and your continued use of the service constitutes acceptance of any modifications.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">2. Description of Service</h3>
                    <p className="leading-relaxed">Reelspot provides a web-based platform that enables users to download publicly available media content from various social media platforms including Instagram, YouTube, Facebook, and TikTok. Our service acts as an intermediary tool that processes URLs and retrieves media that is publicly accessible on these platforms.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">3. User Responsibilities and Acceptable Use</h3>
                    <p className="leading-relaxed">You agree to use Reelspot only for lawful purposes and in accordance with these terms. Specifically, you agree:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>To only download content that you own, have created, or have explicit permission to download and use;</li>
                        <li>To respect intellectual property rights, including copyrights, trademarks, and other proprietary rights of content creators;</li>
                        <li>Not to use downloaded content for commercial purposes without proper authorization;</li>
                        <li>Not to use our service to harass, abuse, or harm others or to violate any applicable laws;</li>
                        <li>Not to attempt to circumvent, disable, or interfere with security features of the service;</li>
                        <li>Not to use automated scripts, bots, or other tools to access the service in bulk.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">4. Intellectual Property Rights</h3>
                    <p className="leading-relaxed">Reelspot does not claim ownership of any content downloaded through our service. All media content belongs to its respective content creators and rights holders. Our service is designed to facilitate the downloading of publicly available content for personal, non-commercial use only.</p>
                    <p className="leading-relaxed">The Reelspot name, logo, website design, and all related intellectual property are owned by Reelspot and its creator. You may not use our branding or intellectual property without prior written permission.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">5. Account Security</h3>
                    <p className="leading-relaxed">If you create an account through Google Sign-In, you are responsible for maintaining the security of your account. You agree to notify us immediately of any unauthorized access or use of your account. We are not liable for any loss or damage arising from your failure to protect your account credentials.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">6. API Keys and Third-Party Services</h3>
                    <p className="leading-relaxed">Certain features of Reelspot may require you to provide API keys from third-party services such as RapidAPI. You are solely responsible for obtaining these keys in compliance with the terms of service of those third-party providers. Your use of such keys is subject to the terms and conditions of the respective API providers.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">7. Service Availability and Modifications</h3>
                    <p className="leading-relaxed">We strive to keep Reelspot up and running, but we cannot guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We shall not be liable for any modification, suspension, or discontinuation of the service.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">8. Disclaimer of Warranties</h3>
                    <p className="leading-relaxed">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the service will be uninterrupted, error-free, or completely secure.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">9. Limitation of Liability</h3>
                    <p className="leading-relaxed">TO THE MAXIMUM EXTENT PERMITTED BY LAW, REELSPOT AND ITS CREATOR SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. Our total liability for any claims arising from your use of the service shall not exceed the amount you paid to us (if any) in the twelve months preceding the claim.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">10. Indemnification</h3>
                    <p className="leading-relaxed">You agree to indemnify, defend, and hold harmless Reelspot and its creator from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising from your use of the service, your violation of these terms, or your violation of any rights of a third party.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">11. Termination</h3>
                    <p className="leading-relaxed">We reserve the right to terminate or suspend your access to the service immediately, without prior notice, for any reason, including breach of these terms. Upon termination, your right to use the service will immediately cease.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">12. Governing Law</h3>
                    <p className="leading-relaxed">These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms or your use of the service shall be resolved through binding arbitration.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">13. Contact Information</h3>
                    <p className="leading-relaxed">If you have any questions about these Terms of Service, please contact us at legal@reelspot.app.</p>
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
        },
        'about': {
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
                    <p className="leading-relaxed">Reelspot is built using modern web technologies including React for the frontend, Supabase for secure backend services, and a distributed API infrastructure that ensures 99.9% uptime. We leverage RapidAPI's ecosystem to provide reliable extraction from multiple platforms while maintaining strict compliance with rate limits and usage policies.</p>
                    <p className="leading-relaxed">Our platform supports downloads from Instagram (Reels, Stories, Posts, IGTV), YouTube (videos, Shorts, audio extraction), Facebook (public videos, Reels), and TikTok (watermark-free videos). We are constantly expanding our platform support based on user feedback and demand.</p>

                    <h3 className="text-xl font-bold text-zinc-900 mt-8">Our Commitment to Users</h3>
                    <p className="leading-relaxed">We are committed to providing a service that respects both our users and content creators. We encourage all users to respect intellectual property rights and only download content they have permission to use. Reelspot is designed for personal use, content backup, and legitimate repurposing scenarios.</p>
                    <p className="leading-relaxed">As we grow, we remain dedicated to keeping Reelspot accessible, reliable, and trustworthy. Your feedback drives our development, and we actively listen to our community to prioritize features and improvements that matter most.</p>

                    <div className="bg-zinc-900 text-white p-8 rounded-[2rem] mt-8">
                        <h4 className="text-lg font-[800] mb-2">Join Our Community</h4>
                        <p className="text-zinc-400 mb-4">Have questions, feedback, or feature requests? We'd love to hear from you.</p>
                        <a href="https://github.com/ArshVermaGit/REELSPOT" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-[900] rounded-full hover:bg-zinc-200 transition-colors">
                            <Github size={18} />
                            Visit Our GitHub
                        </a>
                    </div>
                </div>
            )
        },
        'contact': {
            title: 'Contact Us',
            body: (
                <div className="space-y-8 text-zinc-600">
                    <p className="text-lg leading-relaxed">We value your feedback and are here to help. Whether you have questions about using Reelspot, need technical support, or want to share suggestions for new features, we would love to hear from you.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <h4 className="font-[800] text-zinc-900 mb-3">General Inquiries</h4>
                            <p className="text-sm mb-4">For questions about Reelspot, partnerships, or media inquiries.</p>
                            <a href="mailto:contact@reelspot.app" className="text-blue-600 hover:underline font-medium">contact@reelspot.app</a>
                        </div>
                        <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <h4 className="font-[800] text-zinc-900 mb-3">Technical Support</h4>
                            <p className="text-sm mb-4">Experiencing issues or need help with downloads?</p>
                            <a href="mailto:support@reelspot.app" className="text-blue-600 hover:underline font-medium">support@reelspot.app</a>
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
        },
        'faq': {
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
        },
        'how-it-works': {
            title: 'How It Works',
            body: (
                <div className="space-y-8 text-zinc-600">
                    <p className="text-lg leading-relaxed">Downloading media with Reelspot is simple and takes just a few seconds. Follow this step-by-step guide to get started.</p>

                    <div className="space-y-6">
                        <div className="flex gap-4 p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center font-[900] shrink-0">1</div>
                            <div>
                                <h4 className="font-[800] text-zinc-900 mb-2">Copy the Media URL</h4>
                                <p>Navigate to the video or media you want to download on Instagram, YouTube, Facebook, or TikTok. Copy the URL from your browser's address bar or use the share button to copy the link.</p>
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

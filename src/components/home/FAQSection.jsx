import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'What exactly is Reelspot and how does it work?',
        answer: 'Reelspot is a cutting-edge, premium online media utility designed specifically for content creators, digital marketers, and minimalists who value speed and privacy. It functions as a sophisticated intermediary that processes media URLs from popular social platforms—including Instagram, YouTube, Facebook, and TikTok—and retrieves direct download links in the highest available quality. Our streamlined interface ensures that you can save your favorite content for offline use or repurposing in just a few seconds without any complex setup.'
    },
    {
        question: 'Do I need to create an account to use the downloader?',
        answer: 'While basic download functionality is available without any commitment, creating a free Reelspot account significantly enhances your experience. By signing up with your Google account, you unlock powerful features such as cross-device download history synchronization, personalized download preferences, and access to advanced usage analytics. This allows you to maintain a professional workflow across all your devices seamlessly.'
    },
    {
        question: 'Is Reelspot truly free, and how is the service maintained?',
        answer: 'Yes, Reelspot is completely free for standard personal use. We believe in keeping essential digital tools accessible to everyone. To maintain our high-performance server infrastructure and continue development, we sustain our service through a balanced combination of non-intrusive, privacy-respecting advertisements and generous community donations. For professional power users and organizations, we also offer dedicated high-speed API access tiers.'
    },
    {
        question: 'Which specific platforms and content types are supported?',
        answer: 'We currently provide comprehensive support for a wide array of content creators across the digital landscape. This includes Instagram (Videos, Reels, Stories, and IGTV), YouTube (standard Videos and YouTube Shorts), Facebook (public profile videos and Reels), and TikTok (high-definition, watermark-free video extraction). Our development team is constantly monitoring platform changes and user feedback to expand our support to Pinterest, Reddit, and other requested platforms.'
    },
    {
        question: 'Can I use Reelspot to download private or restricted content?',
        answer: 'No, Reelspot is strictly designed to work with content that has been marked as publicly accessible by the original creator. We have built our platform on a foundation of respect for user privacy and intellectual property rights. This means that private account content, age-restricted videos, or content behind paywalls cannot and will not be accessed by our system. We encourage all users to ensure they have the necessary rights or permissions before downloading and repurposing any media.'
    },
    {
        question: 'How does Reelspot protect my data and personal privacy?',
        answer: 'Privacy is not just a feature at Reelspot; it is our primary directive. We do not store the media files you download on our permanent servers; our system simply facilitates the extraction process. Your personal download history is fully encrypted and is exclusively visible to you when you are signed in. We utilize a "Zero Tracking" policy for unauthorized third parties and never sell or exchange your personal information, ensuring your digital footprint remains secure.'
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-zinc-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em] mb-4">Support</h2>
                    <h3 className="text-4xl md:text-5xl font-[900] tracking-tight text-zinc-900">
                        Frequently Asked Questions
                    </h3>
                    <p className="mt-4 text-lg text-zinc-500">
                        Find answers to the most common questions about using Reelspot.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div 
                            key={idx}
                            className={`border-2 rounded-[2rem] transition-all duration-300 overflow-hidden ${
                                openIndex === idx 
                                ? 'bg-white border-black shadow-xl ring-4 ring-black/5' 
                                : 'bg-white/50 border-zinc-100 hover:border-zinc-300'
                            }`}
                        >
                            <button 
                                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl transition-colors ${
                                        openIndex === idx ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-500'
                                    }`}>
                                        <HelpCircle size={20} />
                                    </div>
                                    <span className={`text-xl font-[800] transition-colors ${
                                        openIndex === idx ? 'text-zinc-900' : 'text-zinc-600'
                                    }`}>
                                        {faq.question}
                                    </span>
                                </div>
                                <div className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={24} className={openIndex === idx ? 'text-black' : 'text-zinc-400'} />
                                </div>
                            </button>
                            
                            <div 
                                className={`transition-all duration-300 ease-in-out ${
                                    openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-8 pb-8 pt-0 ml-12">
                                    <p className="text-lg text-zinc-500 leading-relaxed font-medium">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-zinc-500 font-medium mb-6">Still have questions?</p>
                    <a 
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 text-white font-[900] rounded-full hover:bg-black transition-all hover:shadow-lg active:scale-95"
                    >
                        Contact Our Support Team
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

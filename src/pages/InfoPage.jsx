import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Content Imports
import { privacyContent } from '../data/info/privacy';
import { termsContent } from '../data/info/terms';
import { featuresContent } from '../data/info/features';
import { platformsContent } from '../data/info/platforms';
import { apiContent } from '../data/info/api';
import { aboutContent, contactContent, changelogContent } from '../data/info/index';
import { faqContent, howItWorksContent, supportContent } from '../data/info/help';
import { disclaimerContent } from '../data/info/disclaimer';
import { cookiesContent } from '../data/info/cookies';

const InfoPage = ({ pageId: propId }) => {
    const { pageId: paramId } = useParams();
    const pageId = propId || paramId;
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageId]);

    const contentMap = {
        'privacy': privacyContent,
        'terms': termsContent,
        'features': featuresContent,
        'supported-platforms': platformsContent,
        'api-access': apiContent,
        'changelog': changelogContent,
        'about': aboutContent,
        'contact': contactContent,
        'faq': faqContent,
        'how-it-works': howItWorksContent,
        'support': supportContent,
        'disclaimer': disclaimerContent,
        'cookies': cookiesContent
    };

    const activeContent = contentMap[pageId] || { title: 'Not Found', body: <p>Page not found.</p> };

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

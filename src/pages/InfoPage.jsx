import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SEO from '../components/shared/SEO';

const InfoPage = ({ pageId: propId }) => {
    const { pageId: paramId } = useParams();
    const pageId = propId || paramId;
    const navigate = useNavigate();
    
    const [pageContent, setPageContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const loadContent = async () => {
            setLoading(true);
            setError(false);
            try {
                // Standardized dynamic import from modular contents
                const module = await import(`../data/info/contents/${pageId}.jsx`);
                if (module && module.content) {
                    setPageContent(module.content);
                } else {
                    throw new Error('Content not found');
                }
            } catch (err) {
                console.error('Failed to load content for page:', pageId, err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [pageId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={40} className="animate-spin text-zinc-900" />
                    <span className="text-zinc-500 font-medium">Loading content...</span>
                </div>
            </div>
        );
    }

    const activeContent = !error && pageContent ? pageContent : { 
        title: 'Content Not Available', 
        body: <p className="text-zinc-500">We couldn&apos;t load this page. Please try again later or contact support.</p> 
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <SEO 
                title={activeContent.title} 
                description={`Read about ${activeContent.title} on Reelspot. We provide transparent information about our social media media downloader services.`}
            />
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

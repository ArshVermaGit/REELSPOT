import React from 'react';
import { X, HelpCircle } from 'lucide-react';

const HelpModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <HelpCircle size={24} />
                        </div>
                        <h3 className="text-2xl font-bold">Help & Support</h3>
                    </div>
                    <button onClick={onClose} className="p-2 -mr-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="prose prose-zinc">
                    <h4>How do I download?</h4>
                    <p>Simply paste a link from Instagram, YouTube, TikTok, or Facebook into the input box on the home page and hit enter.</p>
                    
                    <h4>My API Key isn&apos;t working?</h4>
                    <p>Go to settings and make sure your API status is &apos;Active&apos;. You can regenerate keys from your provider&apos;s dashboard.</p>
                </div>

                <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-black text-white font-bold rounded-xl hover:bg-zinc-800">
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;

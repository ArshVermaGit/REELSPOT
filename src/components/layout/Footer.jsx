import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-zinc-100 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white transform rotate-90 ml-1"></div>
                            </div>
                            <span className="text-xl font-bold tracking-tight">Reelspot</span>
                        </div>
                        <p className="text-zinc-500 max-w-sm">
                            The ultimate media downloader for content creators and minimalists. 
                            Download high-quality videos from your favorite platforms instantly.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-zinc-500 text-sm">
                            <li><a href="/info/features" className="hover:text-black">Features</a></li>
                            <li><a href="/info/supported-platforms" className="hover:text-black">Supported Platforms</a></li>
                            <li><a href="/info/api-access" className="hover:text-black">API Access</a></li>
                            <li><a href="/info/changelog" className="hover:text-black">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-zinc-500 text-sm">
                            <li><a href="/info/privacy" className="hover:text-black">Privacy Policy</a></li>
                            <li><a href="/info/terms" className="hover:text-black">Terms of Service</a></li>
                            <li><a href="/info/cookies" className="hover:text-black">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-zinc-400">
                        &copy; {new Date().getFullYear()} Reelspot. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/ArshVermaGit/REELSPOT" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-black transition-colors"><Github size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

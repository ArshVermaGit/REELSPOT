import React from 'react';
import { Github, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-zinc-100 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-black blur-lg opacity-20 group-hover:opacity-30 transition-opacity rounded-full" />
                                <img 
                                    src="/logo.png" 
                                    alt="Reelspot" 
                                    className="w-10 h-10 relative z-10 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <span className="text-2xl font-[900] tracking-tight text-zinc-900">Reelspot</span>
                        </div>
                        <p className="text-zinc-500 font-medium text-base leading-relaxed max-w-sm">
                            The ultimate media downloader for content creators. 
                            Built for speed, simplicity, and privacy.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 mb-6">Product</h4>
                        <ul className="space-y-4 text-zinc-500 font-medium">
                            <li><Link to="/features" className="hover:text-black transition-colors">Features</Link></li>
                            <li><Link to="/supported-platforms" className="hover:text-black transition-colors">Supported Platforms</Link></li>
                            <li><Link to="/api-access" className="hover:text-black transition-colors">API Access</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-zinc-500 font-medium">
                            <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-semibold text-zinc-400">
                        &copy; {new Date().getFullYear()} Reelspot. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a 
                            href="https://github.com/ArshVermaGit/REELSPOT" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-50 rounded-full transition-all"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

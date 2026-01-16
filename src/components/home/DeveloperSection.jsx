import React from 'react';
import { Github, Linkedin, Twitter, Globe, Sparkles } from 'lucide-react';

const DeveloperSection = () => {
    const socialLinks = [
        { icon: Github, href: 'https://github.com/ArshVermaGit', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/arshvermadev/', label: 'LinkedIn' },
        { icon: Twitter, href: 'https://x.com/TheArshVerma', label: 'X (Twitter)' },
        { icon: Globe, href: 'https://arshcreates.vercel.app', label: 'Portfolio' },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-zinc-50 relative overflow-hidden">
            {/* Background Decoration */}
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-zinc-100 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zinc-100 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-4">
                        <Sparkles size={16} className="text-amber-500" />
                        <span className="text-sm font-semibold text-zinc-600">Meet the Creator</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-[900] tracking-tight text-zinc-900">
                        Built by a Passionate Developer
                    </h2>
                </div>

                {/* Developer Card */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    
                    {/* Photo */}
                    <div className="lg:w-1/3 flex justify-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                            <img 
                                src="/arsh-verma.jpg" 
                                alt="Arsh Verma" 
                                className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-[2rem] shadow-2xl border-4 border-white"
                            />
                            {/* Floating Badge */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-sm font-bold rounded-full shadow-lg whitespace-nowrap">
                                Full-Stack Creator
                            </div>
                        </div>
                    </div>

                    {/* Bio & Links */}
                    <div className="lg:w-2/3 text-center lg:text-left">
                        <h3 className="text-3xl md:text-4xl font-[800] text-zinc-900 mb-2">
                            Arsh Verma
                        </h3>
                        <p className="text-lg font-medium text-zinc-500 mb-6">
                            Tech Gaming Technology @ VIT Bhopal | Unity Developer | Web & App Creator
                        </p>
                        
                        <div className="prose prose-zinc max-w-none mb-8">
                            <p className="text-zinc-600 leading-relaxed text-lg">
                                My expertise lies in game development with Unity, but I also build dynamic websites and apps. 
                                I&apos;ve earned numerous certifications and treat every project as an opportunity to blend 
                                <span className="font-semibold text-zinc-800"> creative vision with technical precision</span>.
                            </p>
                            <p className="text-zinc-600 leading-relaxed text-lg mt-4">
                                My development philosophy is simple: turn great ideas into polished, engaging digital reality. 
                                I love the challenge of coding and design, focusing on creating 
                                <span className="font-semibold text-zinc-800"> seamless user experiences</span> across all platforms.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-lg hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Icon size={20} className="text-zinc-600 group-hover:text-black transition-colors" />
                                    <span className="font-semibold text-zinc-700 group-hover:text-black transition-colors">{label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeveloperSection;

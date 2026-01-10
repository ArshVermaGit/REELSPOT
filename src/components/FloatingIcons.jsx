import React from 'react';
import { Instagram, Youtube, Facebook, Music2 } from 'lucide-react';
import clsx from 'clsx';

const FloatingIcons = () => {
    // Configuration for 8 icons (2 of each type)
    const icons = [
        { Icon: Instagram, type: 'float-1', delay: '0s', top: '15%', left: '10%' },
        { Icon: Youtube, type: 'float-2', delay: '2s', top: '20%', right: '15%' },
        { Icon: Facebook, type: 'float-1', delay: '4s', bottom: '25%', left: '20%' },
        { Icon: Music2, type: 'float-2', delay: '1s', bottom: '20%', right: '10%' },
        { Icon: Instagram, type: 'float-2', delay: '5s', top: '40%', right: '25%' },
        { Icon: Youtube, type: 'float-1', delay: '3s', top: '50%', left: '15%' },
        { Icon: Facebook, type: 'float-2', delay: '6s', top: '10%', left: '40%' },
        { Icon: Music2, type: 'float-1', delay: '7s', bottom: '10%', right: '35%' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            {icons.map((item, index) => (
                <div
                    key={index}
                    className={clsx(
                        "absolute text-black/10 transition-opacity duration-1000",
                         item.type === 'float-1' ? 'animate-float-1' : 'animate-float-2'
                    )}
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        bottom: item.bottom,
                        animationDelay: item.delay,
                        width: '48px',
                        height: '48px'
                    }}
                >
                    <item.Icon size={48} strokeWidth={1.5} />
                </div>
            ))}
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
        </div>
    );
};

export default FloatingIcons;

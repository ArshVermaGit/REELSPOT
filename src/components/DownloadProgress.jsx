import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

const DownloadProgress = ({ isOpen, progress, onClose, platform }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible && !isOpen) return null;

    return (
        <div className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
        )}>
             {/* Backdrop */}
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

             {/* Card */}
             <div className={clsx(
                 "relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl transform transition-all duration-300",
                 isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
             )}>
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-lg text-zinc-900">
                         Downloading {platform && <span className="capitalize">{platform}</span>} Media
                     </h3>
                     <button onClick={onClose} className="p-1 rounded-full hover:bg-zinc-100 transition-colors">
                        <X size={20} className="text-zinc-500" />
                     </button>
                 </div>

                 <div className="mb-2 flex justify-between text-sm font-medium text-zinc-600">
                     <span>{progress.percentage}%</span>
                     <span>{progress.speed || 'Starting...'}</span>
                 </div>

                 {/* Progress Bar Container */}
                 <div className="h-3 bg-zinc-100 rounded-full overflow-hidden mb-4">
                     {/* Progress Fill */}
                     <div 
                        className="h-full bg-black transition-all duration-200 ease-out"
                        style={{ width: `${progress.percentage}%` }}
                     />
                 </div>

                 <div className="text-center text-xs text-zinc-400">
                    {progress.loaded > 0 ? (
                        <>Downloaded: {(progress.loaded / (1024 * 1024)).toFixed(1)} MB</>
                    ) : (
                        "Preparing download..."
                    )}
                 </div>
             </div>
        </div>
    );
};

export default DownloadProgress;

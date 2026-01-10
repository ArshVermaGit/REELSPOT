import React from 'react';
import { clsx } from 'clsx';
import { Film, Music } from 'lucide-react';

const QualitySelector = ({ formats, selectedFormat, onSelect }) => {
    // formats: [{ id: 'mp4-1080p', label: '1080p MP4', type: 'video', size: 1024... }, ...]

    if (!formats || formats.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
            {formats.map((format) => (
                <button
                    key={format.id}
                    onClick={() => onSelect(format)}
                    className={clsx(
                        "flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left group",
                        selectedFormat?.id === format.id
                            ? "border-black bg-zinc-900 text-white shadow-lg scale-[1.02]"
                            : "border-zinc-100 bg-white hover:border-zinc-200 hover:bg-zinc-50"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            "p-2 rounded-lg",
                            selectedFormat?.id === format.id ? "bg-white/20" : "bg-zinc-100 text-zinc-500"
                        )}>
                            {format.type === 'audio' ? <Music size={18} /> : <Film size={18} />}
                        </div>
                        <div>
                            <div className="font-bold text-sm">{format.quality || format.label}</div>
                            <div className={clsx(
                                "text-xs",
                                selectedFormat?.id === format.id ? "text-zinc-400" : "text-zinc-500"
                            )}>
                                {format.ext?.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    {format.size && (
                        <div className={clsx(
                            "text-xs font-bold px-2 py-1 rounded",
                            selectedFormat?.id === format.id ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-600"
                        )}>
                            {format.size}
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default QualitySelector;

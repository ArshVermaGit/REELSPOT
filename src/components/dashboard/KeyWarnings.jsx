import React from 'react';
import { AlertTriangle } from 'lucide-react';

const KeyWarnings = ({ invalidKeys, onFix }) => {
    if (!invalidKeys || invalidKeys.length === 0) return null;

    return (
        <div className="mb-10 p-5 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 animate-fade-in">
            <div className="p-2.5 bg-red-100/50 rounded-2xl text-red-600">
                <AlertTriangle size={22} />
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-red-900 text-sm">Action Required</h3>
                <p className="text-red-700/80 text-sm font-medium mt-0.5">
                    Re-authenticate keys: <span className="font-bold">{invalidKeys.map(k=>k).join(', ')}</span>
                </p>
            </div>
            <button 
                onClick={onFix}
                className="px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-bold text-red-700 hover:bg-red-50"
            >
                Fix Now
            </button>
        </div>
    );
};

export default KeyWarnings;

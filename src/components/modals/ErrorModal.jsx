import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorModal = ({ isOpen, onClose, title, message, actionText = 'Dismiss' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle size={32} />
                    </div>
                    <h3 className="text-xl font-[900] text-zinc-900 mb-2">{title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8">{message}</p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-600/10 hover:bg-red-700 transition-all active:scale-95"
                    >
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;

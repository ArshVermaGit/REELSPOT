import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message, actionText = 'Okay', onAction }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-[900] text-zinc-900 mb-2">{title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8">{message}</p>
                    <button
                        onClick={() => {
                            if (onAction) onAction();
                            onClose();
                        }}
                        className="w-full py-4 bg-black text-white rounded-2xl font-bold shadow-lg shadow-black/10 hover:scale-[1.02] transition-all active:scale-95"
                    >
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;

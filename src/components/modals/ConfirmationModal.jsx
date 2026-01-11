
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger', confirmText = 'Confirm', cancelText = 'Cancel' }) => {
    if (!isOpen) return null;

    const isDanger = type === 'danger';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full shrink-0 ${isDanger ? 'bg-red-50 text-red-600' : 'bg-zinc-100 text-zinc-900'}`}>
                            {isDanger ? <AlertTriangle size={24} /> : <AlertTriangle size={24} />}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-zinc-900 mb-2">
                                {title}
                            </h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">
                                {message}
                            </p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="text-zinc-400 hover:text-zinc-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-50 px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold text-white shadow-sm transition-transform active:scale-95 ${
                            isDanger 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : 'bg-black hover:bg-zinc-800'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

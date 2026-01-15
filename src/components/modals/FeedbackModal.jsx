import React, { useState } from 'react';
import { Send, X, MessageSquare, Star } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (onSubmit) {
            await onSubmit({ rating, comment });
        }
        setIsSubmitting(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-100 rounded-xl text-zinc-900">
                                <MessageSquare size={20} />
                            </div>
                            <h3 className="text-xl font-[900] text-zinc-900">Feedback</h3>
                        </div>
                        <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-3 text-center uppercase tracking-wider">How are we doing?</label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`p-2 transition-all hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-zinc-200'}`}
                                    >
                                        <Star size={32} fill={rating >= star ? 'currentColor' : 'none'} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Your Message</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="What can we improve? Features you'd like to see?"
                                className="w-full h-32 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all resize-none text-zinc-900 placeholder:text-zinc-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || rating === 0}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold shadow-xl shadow-black/10 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Send size={18} />
                            {isSubmitting ? 'Sending...' : 'Send Feedback'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;

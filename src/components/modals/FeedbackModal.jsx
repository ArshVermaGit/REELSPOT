import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { supabase } from '../../services/supabase';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

const FeedbackModal = ({ isOpen, onClose, onSuccess }) => {
    const { user } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        type: 'feedback',
        message: '',
        email: user?.email || ''
    });

    // Lock scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await supabase.from('feedback').insert({
                user_id: user?.id,
                email: formData.email,
                type: formData.type,
                message: formData.message,
                created_at: new Date().toISOString()
            });

            if (error) throw error;

            toast.success('Thank you! Your feedback has been received.');
            if (onSuccess) onSuccess();
            setFormData({ ...formData, message: '' });
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Failed to send feedback. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop - Click disabled as per user request */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
            
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="p-8 pb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-[900] text-zinc-900 tracking-tight">Send Feedback</h2>
                        <p className="text-zinc-500 text-sm font-medium">Help us make Reelspot better for everyone.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-zinc-100 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-200 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6">
                    {/* Feedback Type */}
                    <div className="flex gap-2">
                        {[
                            { id: 'feedback', label: 'Feature', icon: Sparkles },
                            { id: 'bug', label: 'Bug Report', icon: AlertCircle },
                            { id: 'other', label: 'Other', icon: MessageSquare }
                        ].map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: type.id })}
                                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                                    formData.type === type.id 
                                    ? 'border-black bg-zinc-50 text-black' 
                                    : 'border-zinc-100 text-zinc-400 hover:border-zinc-200'
                                }`}
                            >
                                <type.icon size={20} />
                                <span className="text-xs font-bold">{type.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2 px-1">Your Message</label>
                        <textarea 
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
                            placeholder="Tell us what's on your mind..."
                            required
                        />
                    </div>

                    {/* Email (Optional/Prefilled) */}
                    <div>
                        <label className="block text-sm font-bold text-zinc-900 mb-2 px-1">Email Address (Optional)</label>
                        <input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                            placeholder="To get back to you"
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={submitting || !formData.message}
                        className="w-full py-4 bg-black text-white rounded-2xl font-[900] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 shadow-xl shadow-black/10 mt-4"
                    >
                        <Send size={18} />
                        {submitting ? 'Sending...' : 'Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackModal;

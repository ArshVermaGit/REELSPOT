import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import React from 'react';

const toastStyles = {
    padding: '16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
};

export const showToast = {
    success: (message) => toast.success(message, {
        style: toastStyles,
        icon: <CheckCircle size={20} className="text-green-500" />,
        duration: 4000
    }),
    error: (message, options = {}) => toast.error(message, {
        style: toastStyles,
        icon: <AlertCircle size={20} className="text-red-500" />,
        duration: 5000,
        ...options
    }),
    warning: (message) => toast(message, {
        style: { ...toastStyles, border: '1px solid #fef3c7', background: '#fffbeb' },
        icon: <AlertTriangle size={20} className="text-amber-500" />,
        duration: 6000
    }),
    info: (message) => toast(message, {
        style: { ...toastStyles, border: '1px solid #e0f2fe', background: '#f0f9ff' },
        icon: <Info size={20} className="text-blue-500" />,
        duration: 4000
    }),
    loading: (message) => toast.loading(message, {
        style: toastStyles,
    }),
    dismiss: (id) => toast.dismiss(id)
};

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

/**
 * Utility to display consistent, beautifully styled toast notifications.
 */
export const showToast = {
    /**
     * Shows a success toast.
     * @param {string} message 
     */
    success: (message) => toast.success(message, {
        style: toastStyles,
        icon: <CheckCircle size={20} className="text-green-500" />,
        duration: 4000
    }),
    /**
     * Shows an error toast.
     * @param {string} message 
     * @param {Object} [options] - Additional toast options
     */
    error: (message, options = {}) => toast.error(message, {
        style: toastStyles,
        icon: <AlertCircle size={20} className="text-red-500" />,
        duration: 5000,
        ...options
    }),
    /**
     * Shows a warning toast.
     * @param {string} message 
     */
    warning: (message) => toast(message, {
        style: { ...toastStyles, border: '1px solid #fef3c7', background: '#fffbeb' },
        icon: <AlertTriangle size={20} className="text-amber-500" />,
        duration: 6000
    }),
    /**
     * Shows an info toast.
     * @param {string} message 
     */
    info: (message) => toast(message, {
        style: { ...toastStyles, border: '1px solid #e0f2fe', background: '#f0f9ff' },
        icon: <Info size={20} className="text-blue-500" />,
        duration: 4000
    }),
    /**
     * Shows a loading toast. Returns the toast ID for dismissal.
     * @param {string} message 
     * @returns {string} toastId
     */
    loading: (message) => toast.loading(message, {
        style: toastStyles,
    }),
    /**
     * Dismisses a specific toast.
     * @param {string} id 
     */
    dismiss: (id) => toast.dismiss(id)
};

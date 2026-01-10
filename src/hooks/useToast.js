import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

/**
 * Custom hook for consistent toast notifications.
 * Wraps react-hot-toast with standardized styling and icons.
 */
export const useToast = () => {
    
    // Success Toast
    const success = (message, options = {}) => {
        return toast.success(message, {
            icon: <CheckCircle className="text-green-500" size={20} />,
            style: {
                borderRadius: '12px',
                background: '#fff',
                color: '#333',
                border: '1px solid #f0f0f0',
                padding: '12px 16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            },
            ...options
        });
    };

    // Error Toast
    const error = (message, options = {}) => {
        console.error("Toast Error:", message); // Log for debugging
        return toast.error(message, {
            icon: <XCircle className="text-red-500" size={20} />,
            duration: 5000,
            style: {
                borderRadius: '12px',
                background: '#FEF2F2', // Red-50
                color: '#991B1B', // Red-800
                border: '1px solid #FECACA', // Red-200
                padding: '12px 16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            },
            ...options
        });
    };

    // Warning/Alert Toast (Custom)
    const warning = (message, options = {}) => {
        return toast(message, {
            icon: <AlertCircle className="text-amber-500" size={20} />,
            duration: 4000,
            style: {
                borderRadius: '12px',
                background: '#FFFBEB', // Amber-50
                color: '#92400E', // Amber-800
                border: '1px solid #FDE68A', // Amber-200
                padding: '12px 16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            },
            ...options
        });
    };

    // Info Toast
    const info = (message, options = {}) => {
        return toast(message, {
            icon: <Info className="text-blue-500" size={20} />,
            style: {
                borderRadius: '12px',
                background: '#EFF6FF', // Blue-50
                color: '#1E40AF', // Blue-800
                border: '1px solid #BFDBFE', // Blue-200
                padding: '12px 16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            },
            ...options
        });
    };

    const loading = (message, options = {}) => {
        return toast.loading(message, {
             style: {
                borderRadius: '12px',
                background: '#fff',
                color: '#333',
                border: '1px solid #f0f0f0',
                padding: '12px 16px',
                fontWeight: 500,
             },
             ...options
        });
    };

    const dismiss = (toastId) => toast.dismiss(toastId);

    return { success, error, warning, info, loading, dismiss };
};

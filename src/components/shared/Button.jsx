import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className, 
    isLoading, 
    disabled, 
    ...props 
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    
    const variants = {
        primary: "bg-black text-white hover:bg-zinc-800 shadow-lg shadow-black/10",
        secondary: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-sm",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
        ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3.5 text-base"
    };

    return (
        <button 
            className={twMerge(baseStyles, variants[variant], sizes[size], className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;

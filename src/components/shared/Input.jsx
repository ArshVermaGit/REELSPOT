import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ className, error, label, icon: Icon, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-zinc-700 mb-1.5">{label}</label>}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all",
                        Icon && "pl-10",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;

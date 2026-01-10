import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, noPadding = false, ...props }) => {
    return (
        <div 
            className={twMerge(
                "bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden",
                className
            )} 
            {...props}
        >
            <div className={noPadding ? "" : "p-6"}>
                {children}
            </div>
        </div>
    );
};

export default Card;

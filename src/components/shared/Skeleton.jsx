import React from 'react';
import { twMerge } from 'tailwind-merge';

const Skeleton = ({ className, ...props }) => {
    return (
        <div 
            className={twMerge("animate-pulse rounded-md bg-zinc-200/80", className)}
            {...props}
        />
    );
};

export default Skeleton;

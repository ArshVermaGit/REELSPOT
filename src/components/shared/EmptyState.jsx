import React from 'react';
import { Ghost } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ 
    icon: Icon = Ghost, 
    title = "Nothing here yet", 
    description = "There is no data to display at this time.", 
    action 
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-2">{title}</h3>
            <p className="text-zinc-500 max-w-sm mb-8">{description}</p>
            {action && (
                <Button onClick={action.onClick} variant="primary">
                    {action.label}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;

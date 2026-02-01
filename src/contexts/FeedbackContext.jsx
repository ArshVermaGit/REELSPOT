/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import FeedbackModal from '../components/modals/FeedbackModal';

const FeedbackContext = createContext();

export const useFeedback = () => useContext(FeedbackContext);

export const FeedbackProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [initialType, setInitialType] = useState('feedback');

    const openFeedback = (type = 'feedback') => {
        setInitialType(type);
        setIsOpen(true);
    };

    const closeFeedback = () => setIsOpen(false);

    return (
        <FeedbackContext.Provider value={{ openFeedback, closeFeedback }}>
            {children}
            <FeedbackModal 
                isOpen={isOpen} 
                onClose={closeFeedback} 
                initialType={initialType}
            />
        </FeedbackContext.Provider>
    );
};

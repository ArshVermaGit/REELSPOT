import { Toaster } from 'react-hot-toast';

const Toast = () => {
    return (
        <Toaster 
            position="top-center"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
                className: 'font-sans font-medium',
            }}
        />
    );
};

export default Toast;

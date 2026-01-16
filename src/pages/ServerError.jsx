import React from 'react';
import { AlertTriangle, Home, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/shared/Button';

const ServerError = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-red-50 rounded-3xl flex items-center justify-center mb-8 border border-red-100">
                <AlertTriangle size={48} className="text-red-500" />
            </div>

            <h1 className="text-4xl font-[800] tracking-tight text-zinc-900 mb-4">
                500 - System Error
            </h1>

            <p className="text-lg text-zinc-500 max-w-md mb-10 leading-relaxed">
                Something went wrong on our end. We&apos;ve been notified and are working to fix it immediately.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/" className="w-full sm:w-auto">
                    <Button variant="primary" className="w-full min-w-[160px]">
                        <Home size={20} className="mr-2" />
                        Back to Home
                    </Button>
                </Link>

                <a
                    href="https://github.com/arshverma/REELSPOT/issues/new?template=BUG_REPORT.yml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                >
                    <Button variant="secondary" className="w-full min-w-[160px]">
                        <MessageSquare size={20} className="mr-2" />
                        Report Issue
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default ServerError;

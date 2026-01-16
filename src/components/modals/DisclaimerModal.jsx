import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';
import Button from './Button';

const DisclaimerModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border border-zinc-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-500">
            <ShieldAlert size={32} />
          </div>

          <h3 className="text-2xl font-[800] text-zinc-900 mb-2">
            Usage Disclaimer
          </h3>
          
          <div className="space-y-4 text-zinc-600 mb-8 text-sm leading-relaxed">
            <p>
              Reelspot is a tool designed for educational and personal use only.
            </p>
            <p>
              By continuing, you agree not to infringe on anyone's copyright or intellectual property. You must own the rights or have permission to download any content.
            </p>
            <p className="font-semibold text-zinc-900">
              We do not host any media on our servers.
            </p>
          </div>

          <div className="flex gap-3 w-full">
            <Button 
                variant="secondary" 
                onClick={onClose}
                className="flex-1"
            >
              Cancel
            </Button>
            <Button 
                variant="primary" 
                onClick={onAccept}
                className="flex-1"
            >
              I Agree
            </Button>
          </div>
          
          <p className="mt-4 text-xs text-zinc-400">
             Read our <a href="/terms" className="underline hover:text-zinc-600">Terms of Service</a> for more details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;

import React, { useState } from 'react';
import { Key, Eye, EyeOff, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import Button from '../shared/Button';

const ApiKeyCard = ({ platform, keyData, onUpdate, onDelete, onTestStatus }) => {
    const [showKey, setShowKey] = useState(false);
    const [isTestLoading, setIsTestLoading] = useState(false);
    const [testResult, setTestResult] = useState(null); // { success: true, latency: '45ms' }

    const handleTest = async () => {
        setIsTestLoading(true);
        setTestResult(null);
        
        const start = Date.now();
        const success = await onTestStatus(platform);
        const end = Date.now();
        
        setIsTestLoading(false);
        if (success) {
            setTestResult({ success: true, latency: `${end - start}ms` });
             // Clear success message after 3s
            setTimeout(() => setTestResult(null), 3000);
        }
    };

    const statusColors = {
        active: 'text-green-600 bg-green-50 border-green-100',
        expired: 'text-amber-600 bg-amber-50 border-amber-100',
        invalid: 'text-red-600 bg-red-50 border-red-100',
        missing: 'text-zinc-400 bg-zinc-50 border-zinc-100'
    };
    
    const status = keyData?.status || 'missing';

    return (
        <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", 
                 platform === 'youtube' ? 'bg-red-50 text-red-600' : 
                 platform === 'instagram' ? 'bg-pink-50 text-pink-600' :
                 platform === 'facebook' ? 'bg-blue-50 text-blue-600' : 
                 'bg-black text-white'
            )}>
                <Key size={24} />
            </div>
            
            <div className="flex-1 w-full text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                    <h3 className="tex-lg font-bold capitalize">{platform}</h3>
                    <div className={clsx("px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide flex items-center gap-1", statusColors[status])}>
                         {status === 'active' && <CheckCircle size={10} />}
                         {status === 'invalid' && <AlertCircle size={10} />}
                         {status}
                    </div>
                </div>
                
                {keyData ? (
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                        <code className="bg-zinc-50 px-3 py-1 rounded-lg text-sm text-zinc-600 font-mono">
                            {showKey ? keyData.api_key : '••••••••••••••••••••••••'}
                        </code>
                        <button onClick={() => setShowKey(!showKey)} className="p-1 hover:bg-zinc-100 rounded-md text-zinc-400 hover:text-black transition-colors">
                            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                ) : (
                    <p className="text-zinc-400 text-sm mt-1">No API key configured</p>
                )}

                {/* Test Feedback */}
                {testResult && (
                    <div className="mt-2 text-xs font-bold text-green-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                        <CheckCircle size={12} /> Live • {testResult.latency}
                    </div>
                )}
            </div>

            <div className="flex gap-2 w-full md:w-auto">
                <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={keyData ? handleTest : () => onUpdate(platform)}
                    isLoading={isTestLoading}
                    disabled={!keyData && status !== 'missing'}
                >
                    {keyData ? <RefreshCw size={16} className={isTestLoading ? "animate-spin" : ""} /> : "Add Key"} 
                    {keyData ? "" : ""}
                </Button>
                
                <Button variant="primary" size="sm" onClick={() => onUpdate(platform)}>
                    {keyData ? "Edit" : "Setup"}
                </Button>

                {keyData && (
                    <Button variant="danger" size="sm" onClick={onDelete}>
                        <Trash2 size={16} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ApiKeyCard;

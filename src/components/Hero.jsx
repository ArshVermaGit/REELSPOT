import { useState, useEffect } from 'react';
import FloatingIcons from './FloatingIcons';
import { useApiKeys } from '../contexts/ApiKeyContext';
import ApiKeyModal from './ApiKeyModal';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { downloadMedia } from '../services/mediaDownloader';
import DownloadProgress from './DownloadProgress';
import DownloadForm from './DownloadForm';

const PlatformIcon = ({ platform }) => {
    switch (platform) {
        case 'instagram': return <Instagram size={20} className="text-pink-500" />;
        case 'youtube': return <Youtube size={20} className="text-red-600" />;
        case 'facebook': return <Facebook size={20} className="text-blue-600" />;
        case 'tiktok': return <Music2 size={20} className="text-black" />;
        default: return <LinkIcon size={20} className="text-zinc-400 group-focus-within:text-black transition-colors" />;
    }
};

const Hero = () => {
    const { hasApiKey, getApiKey } = useApiKeys();
    const { user } = useAuth();
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalPlatform, setModalPlatform] = useState(null);

    // Download State
    const [downloadStatus, setDownloadStatus] = useState('idle'); // 'initializing' | 'downloading' | 'processing' | 'success' | 'error'
    const [downloadProgress, setDownloadProgress] = useState({ percentage: 0, loaded: 0, speed: '' });
    const [activeDownloadTitle, setActiveDownloadTitle] = useState('');

    const handleDownloadStart = async (options) => {
        // options: { downloadUrl, platform, format, quality, mediaTitle }
        try {
            setDownloadStatus('initializing');
            setDownloadProgress({ percentage: 0, loaded: 0, speed: '' });
            setActiveDownloadTitle(options.mediaTitle);

            // Fetch apiKey for final check? Not strictly needed if logic is separated, but passed just in case
            // The downloadMedia function now takes downloadUrl directly
            
            // Small delay for UI smoothness "Initializing..."
            await new Promise(r => setTimeout(r, 800));
            setDownloadStatus('downloading');

            const result = await downloadMedia({
                ...options,
                userId: user.id,
                onProgress: (prog) => {
                    setDownloadProgress(prog);
                    if(prog.percentage === 100) setDownloadStatus('processing');
                }
            });

            if (result.success) {
                setDownloadStatus('success');
                toast.success("Download completed successfully!");
            } else {
                setDownloadStatus('error');
                toast.error(`Download failed: ${result.error}`);
            }

        } catch (error) {
            console.error(error);
            setDownloadStatus('error');
            toast.error("Unexpected error occurred.");
        }
    };
    
    return (
        <div className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-white text-black">
            {/* Background Elements */}
            <FloatingIcons />

            {/* API Key Modal */}
            <ApiKeyModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                platform={modalPlatform} 
            />

            {/* Download Progress Modal */}
            <DownloadProgress
                isOpen={downloadStatus !== 'idle'}
                status={downloadStatus}
                progress={downloadProgress}
                onClose={() => setDownloadStatus('idle')}
                onRetry={() => {
                    setDownloadStatus('idle');
                    toast("Please click download again to retry.");
                }}
                fileName={activeDownloadTitle}
            />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Animated Logo */}
                <h1
                    className="text-5xl md:text-7xl font-[800] tracking-tighter mb-4 animate-slide-down"
                    style={{ animationDelay: '0s' }}
                >
                    Reelspot
                </h1>

                {/* Tagline */}
                <p
                    className="text-lg md:text-2xl font-medium mb-12 text-zinc-600 bg-clip-text text-transparent bg-gradient-to-br from-black to-zinc-600 animate-fade-in opacity-0"
                    style={{ animationDelay: '0.2s' }}
                >
                    Download Media, <span className="text-black font-semibold">Effortlessly</span>
                </p>

                {/* Input Form Replacement */}
                <div 
                    className="w-full flex justify-center animate-fade-in opacity-0"
                    style={{ animationDelay: '0.4s' }}
                >
                    <DownloadForm 
                        onDownloadStart={handleDownloadStart}
                        onApiKeyRequired={(plat) => {
                            setModalPlatform(plat);
                            setIsModalOpen(true);
                        }}
                        user={user}
                    />
                </div>

            </div>
        </div>
    );
};

export default Hero;

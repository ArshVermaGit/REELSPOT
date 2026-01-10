import { useState } from 'react';
import { Download } from 'lucide-react';

const DownloadForm = () => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Download requested for:", url);
        // Implement download logic here
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
            <div className="relative flex items-center">
                <input
                    type="url"
                    className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none pr-32"
                    placeholder="Paste Reel, TikTok, or Video URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 bg-primary text-primary-foreground px-4 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <Download className="h-4 w-4" />
                    Download
                </button>
            </div>
        </form>
    );
};

export default DownloadForm;

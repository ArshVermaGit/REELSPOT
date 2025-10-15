class ReelSpotDownloader {
    constructor() {
        this.API_BASE_URL = window.location.origin.includes('localhost') 
            ? 'http://localhost:3000/api' 
            : '/api';
        
        this.platforms = {
            instagram: {
                name: 'Instagram',
                icon: 'instagram',
                subtitle: 'Download Reels, Stories, Posts in HD',
                qualities: ['1080p HD', '720p', '480p', '360p'],
                gradient: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)'
            },
            youtube: {
                name: 'YouTube',
                icon: 'youtube',
                subtitle: 'Download Videos, Shorts & Audio',
                qualities: ['2160p 4K', '1080p HD', '720p', '480p', 'Audio Only'],
                gradient: 'linear-gradient(135deg, #ff0000, #cc0000)'
            },
            facebook: {
                name: 'Facebook',
                icon: 'facebook',
                subtitle: 'Download Videos & Watch Posts',
                qualities: ['1080p HD', '720p', '480p'],
                gradient: 'linear-gradient(135deg, #1877f2, #0c5cbf)'
            },
            tiktok: {
                name: 'TikTok',
                icon: 'tiktok',
                subtitle: 'Download Videos & Sounds',
                qualities: ['1080p HD', '720p', 'No Watermark', 'Audio Only'],
                gradient: 'linear-gradient(135deg, #000000, #ee1d52)'
            },
            twitter: {
                name: 'X (Twitter)',
                icon: 'twitter',
                subtitle: 'Download Videos, GIFs & Photos',
                qualities: ['Original Quality', '720p', '480p'],
                gradient: 'linear-gradient(135deg, #1da1f2, #0c85d0)'
            }
        };

        this.selectedQuality = null;
        this.currentVideoData = null;
        this.currentPlatform = null;
        this.init();
    }

    init() {
        this.loadPlatform();
        this.bindEvents();
    }

    loadPlatform() {
        const urlParams = new URLSearchParams(window.location.search);
        const platform = urlParams.get('platform') || 'instagram';
        
        if (!this.platforms[platform]) {
            window.location.href = 'platforms.html';
            return;
        }

        this.currentPlatform = platform;
        const config = this.platforms[platform];
        
        const headerIcon = document.getElementById('platform-icon-header');
        headerIcon.innerHTML = `<i class="fab fa-${config.icon}"></i>`;
        headerIcon.style.background = config.gradient;
        
        document.getElementById('platform-title').textContent = `${config.name} Downloader`;
        document.getElementById('platform-subtitle').textContent = config.subtitle;
    }

    bindEvents() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const videoUrlInput = document.getElementById('video-url');
        const downloadBtn = document.getElementById('download-btn');

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeURL());
        }

        if (videoUrlInput) {
            videoUrlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.analyzeURL();
                }
            });
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.startDownload());
        }
    }

    async analyzeURL() {
        const urlInput = document.getElementById('video-url');
        const url = urlInput.value.trim();

        if (!url) {
            this.showNotification('Please enter a valid URL', 'error');
            return;
        }

        if (!this.isValidURL(url)) {
            this.showNotification('Please enter a valid video URL', 'error');
            return;
        }

        if (!this.isPlatformURL(url, this.currentPlatform)) {
            this.showNotification(`Please enter a valid ${this.platforms[this.currentPlatform].name} URL`, 'error');
            return;
        }

        this.showLoading();

        try {
            const videoData = await this.fetchVideoInfo(url);
            
            if (videoData.success) {
                this.currentVideoData = videoData;
                this.displayDownloadOptions(videoData);
            } else {
                throw new Error(videoData.error || 'Failed to analyze video');
            }
        } catch (error) {
            this.hideLoading();
            console.error('Analysis error:', error);
            this.showNotification(error.message || 'Failed to analyze video. Please try again.', 'error');
        }
    }

    isValidURL(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }

    isPlatformURL(url, platform) {
        const patterns = {
            instagram: /instagram\.com/i,
            youtube: /youtube\.com|youtu\.be/i,
            facebook: /facebook\.com|fb\.watch/i,
            tiktok: /tiktok\.com/i,
            twitter: /twitter\.com|x\.com/i
        };

        return patterns[platform] ? patterns[platform].test(url) : true;
    }

    async fetchVideoInfo(url) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                    platform: this.currentPlatform
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch video information');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    displayDownloadOptions(videoData) {
        this.hideLoading();
        
        const downloadOptions = document.getElementById('download-options');
        downloadOptions.classList.remove('hidden');

        const videoPreview = document.getElementById('video-preview');
        if (videoData.thumbnail) {
            videoPreview.poster = videoData.thumbnail;
        }
        
        if (videoData.downloadUrl && !videoData.downloadUrl.includes('undefined')) {
            videoPreview.src = videoData.downloadUrl;
        }

        document.getElementById('video-title').textContent = videoData.title || 'Downloaded Video';
        document.getElementById('video-duration').innerHTML = `<i class="fas fa-clock"></i> ${videoData.duration || 'Unknown'}`;
        document.getElementById('video-size').innerHTML = `<i class="fas fa-file"></i> ${videoData.size || 'Calculating...'}`;

        const qualityContainer = document.getElementById('quality-options');
        qualityContainer.innerHTML = '';

        const qualities = videoData.qualities || this.platforms[this.currentPlatform].qualities;

        qualities.forEach((quality, index) => {
            const button = document.createElement('button');
            button.className = 'quality-option';
            
            const isAudio = quality.toLowerCase().includes('audio');
            const isNoWatermark = quality.toLowerCase().includes('watermark');
            
            button.innerHTML = `
                <i class="fas fa-${isAudio ? 'music' : isNoWatermark ? 'droplet-slash' : 'video'}"></i>
                <span>${quality}</span>
            `;
            
            if (index === 0) {
                button.classList.add('selected');
                this.selectedQuality = quality;
            }

            button.addEventListener('click', () => {
                document.querySelectorAll('.quality-option').forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
                this.selectedQuality = quality;
            });

            qualityContainer.appendChild(button);
        });

        downloadOptions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    async startDownload() {
        if (!this.selectedQuality) {
            this.showNotification('Please select a quality', 'error');
            return;
        }

        if (!this.currentVideoData || !this.currentVideoData.downloadUrl) {
            this.showNotification('Video URL not available', 'error');
            return;
        }

        document.getElementById('download-options').classList.add('hidden');
        
        const progressSection = document.getElementById('progress-bar');
        progressSection.classList.remove('hidden');

        try {
            let downloadUrl = this.currentVideoData.downloadUrl;
            
            if (this.selectedQuality.toLowerCase().includes('audio')) {
                downloadUrl = this.currentVideoData.audioUrl || downloadUrl;
            } else if (this.selectedQuality.toLowerCase().includes('watermark')) {
                downloadUrl = this.currentVideoData.videoUrlNoWatermark || downloadUrl;
            }

            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `reelspot_${this.currentPlatform}_${Date.now()}.mp4`;
            link.target = '_blank';
            
            await this.simulateProgress();
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            this.showNotification('Download started! Check your downloads folder.', 'success');

            setTimeout(() => {
                this.resetDownloader();
            }, 2000);

        } catch (error) {
            console.error('Download error:', error);
            this.showNotification('Failed to download video. Please try again.', 'error');
            document.getElementById('progress-bar').classList.add('hidden');
            document.getElementById('download-options').classList.remove('hidden');
        }
    }

    async simulateProgress() {
        return new Promise((resolve) => {
            let progress = 0;
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');

            const progressInterval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 95) {
                    progress = 95;
                }

                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;
            }, 150);

            setTimeout(() => {
                clearInterval(progressInterval);
                progressFill.style.width = '100%';
                progressText.textContent = '100%';
                setTimeout(resolve, 300);
            }, 2000);
        });
    }

    showLoading() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('download-options').classList.add('hidden');
        document.getElementById('progress-bar').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading-state').classList.add('hidden');
    }

    resetDownloader() {
        document.getElementById('video-url').value = '';
        document.getElementById('download-options').classList.add('hidden');
        document.getElementById('progress-bar').classList.add('hidden');
        document.getElementById('loading-state').classList.add('hidden');
        this.selectedQuality = null;
        this.currentVideoData = null;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 600;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            max-width: 90%;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3500);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new ReelSpotDownloader();
});
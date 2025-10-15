// Download Page JavaScript for ReelSpot

class ReelSpotDownloader {
    constructor() {
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

        const config = this.platforms[platform];
        
        // Update platform header
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

        this.showLoading();

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const videoData = await this.fetchVideoInfo(url);
            this.displayDownloadOptions(videoData);
        } catch (error) {
            this.hideLoading();
            this.showNotification('Failed to analyze video. Please try again.', 'error');
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

    async fetchVideoInfo(url) {
        const urlParams = new URLSearchParams(window.location.search);
        const platform = urlParams.get('platform') || 'instagram';
        
        // Simulate video data (In production, this would call your backend API)
        return {
            title: 'Sample Video - Amazing Content',
            duration: '2:30',
            size: '15.2 MB',
            thumbnail: 'https://via.placeholder.com/640x360/6366f1/ffffff?text=Video+Preview',
            qualities: this.platforms[platform].qualities,
            videoUrl: 'https://via.placeholder.com/640x360/6366f1/ffffff?text=Video+Preview'
        };
    }

    displayDownloadOptions(videoData) {
        this.hideLoading();
        
        const downloadOptions = document.getElementById('download-options');
        downloadOptions.classList.remove('hidden');

        // Set video preview
        const videoPreview = document.getElementById('video-preview');
        videoPreview.poster = videoData.thumbnail;
        videoPreview.src = videoData.videoUrl;

        // Set video info
        document.getElementById('video-title').textContent = videoData.title;
        document.getElementById('video-duration').innerHTML = `<i class="fas fa-clock"></i> ${videoData.duration}`;
        document.getElementById('video-size').innerHTML = `<i class="fas fa-file"></i> ${videoData.size}`;

        // Create quality options
        const qualityContainer = document.getElementById('quality-options');
        qualityContainer.innerHTML = '';

        videoData.qualities.forEach((quality, index) => {
            const button = document.createElement('button');
            button.className = 'quality-option';
            button.innerHTML = `
                <i class="fas fa-${quality.includes('Audio') ? 'music' : 'video'}"></i>
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

        // Scroll to options
        downloadOptions.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    async startDownload() {
        if (!this.selectedQuality) {
            this.showNotification('Please select a quality', 'error');
            return;
        }

        // Hide download options
        document.getElementById('download-options').classList.add('hidden');
        
        // Show progress bar
        const progressSection = document.getElementById('progress-bar');
        progressSection.classList.remove('hidden');

        // Animate progress
        let progress = 0;
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        const progressInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 95) {
                progress = 95;
            }

            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
        }, 200);

        // Simulate download
        await new Promise(resolve => setTimeout(resolve, 3000));

        clearInterval(progressInterval);
        
        // Complete progress
        progressFill.style.width = '100%';
        progressText.textContent = '100%';

        await new Promise(resolve => setTimeout(resolve, 500));

        // Show success message
        this.showNotification('Download completed successfully!', 'success');

        // Reset after delay
        setTimeout(() => {
            this.resetDownloader();
        }, 2000);
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
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
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
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Add notification animations
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

// Initialize downloader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ReelSpotDownloader();
});
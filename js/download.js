class ReelSpotDownloader {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPlatform();
    }

    bindEvents() {
        document.getElementById('analyze-btn').addEventListener('click', () => this.analyzeURL());
        document.getElementById('video-url').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.analyzeURL();
        });
        document.getElementById('download-btn').addEventListener('click', () => this.startDownload());
    }

    async loadPlatform() {
        const urlParams = new URLSearchParams(window.location.search);
        const platform = urlParams.get('platform');
        
        if (!platform) return window.location.href = 'platforms.html';
        
        const platformConfig = this.platforms[platform];
        document.getElementById('platform-icon').className = `fab fa-${platformConfig.icon} text-white text-2xl`;
        document.getElementById('platform-title').textContent = `${platformConfig.name} Downloader`;
        document.getElementById('platform-subtitle').textContent = platformConfig.subtitle;
    }

    platforms = {
        instagram: { name: 'Instagram', icon: 'instagram', subtitle: 'Download Reels, Stories, Posts in HD', qualities: ['1080p', '720p', '480p'] },
        youtube: { name: 'YouTube', icon: 'youtube', subtitle: 'Download Videos, Shorts, Audio', qualities: ['1080p', '720p', '480p', 'Audio'] },
        facebook: { name: 'Facebook', icon: 'facebook', subtitle: 'Download Videos, Posts', qualities: ['1080p', '720p'] },
        x: { name: 'X (Twitter)', icon: 'twitter', subtitle: 'Download Videos, Photos', qualities: ['Original'] },
        tiktok: { name: 'TikTok', icon: 'tiktok', subtitle: 'Download Videos, Sounds', qualities: ['1080p', '720p'] }
    };

    async analyzeURL() {
        const url = document.getElementById('video-url').value.trim();
        if (!url) return alert('Please enter a valid URL');

        this.showLoading();
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const videoData = await this.fetchVideoInfo(url);
            this.displayDownloadOptions(videoData);
        } catch (error) {
            alert('Failed to analyze video. Please try again.');
        }
    }

    async fetchVideoInfo(url) {
        const urlParams = new URLSearchParams(window.location.search);
        const platform = urlParams.get('platform');
        return {
            title: "Sample Video",
            duration: "2:30",
            thumbnail: "https://via.placeholder.com/640x360",
            qualities: this.platforms[platform].qualities
        };
    }

    displayDownloadOptions(videoData) {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('download-options').classList.remove('hidden');
        
        document.getElementById('video-preview').poster = videoData.thumbnail;
        document.getElementById('video-title').textContent = videoData.title;
        document.getElementById('video-duration').textContent = videoData.duration;
        
        const qualityContainer = document.getElementById('quality-options');
        qualityContainer.innerHTML = videoData.qualities.map(quality => `
            <button class="bg-white/10 text-white py-2 px-3 rounded-lg border border-gray-700 hover:bg-white/20 transition-all flex items-center justify-center space-x-1 backdrop-blur-sm">
                <i class="fas fa-${quality.includes('Audio') ? 'music' : 'video'}"></i>
                <span>${quality}</span>
            </button>
        `).join('');
    }

    async startDownload() {
        document.getElementById('download-options').classList.add('hidden');
        document.getElementById('progress-bar').classList.remove('hidden');
        
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 95) progress = 95;
            document.getElementById('progress-fill').style.width = `${progress}%`;
            document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
        }, 300);
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        clearInterval(progressInterval);
        
        document.getElementById('progress-fill').style.width = '100%';
        document.getElementById('progress-text').textContent = '100%';
        
        setTimeout(() => {
            alert('Download started! Check your downloads folder.');
        }, 500);
    }

    showLoading() {
        document.getElementById('loading-state').classList.remove('hidden');
        document.getElementById('download-options').classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => new ReelSpotDownloader());
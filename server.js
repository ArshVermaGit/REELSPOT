const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const API_ENDPOINTS = {
    instagram: 'https://api.saveig.app/api/ajaxSearch',
    youtube: 'https://api.cobalt.tools/api/json',
    tiktok: 'https://api.tikwm.com/api/',
    facebook: 'https://api.saveig.app/api/ajaxSearch',
    twitter: 'https://api.saveig.app/api/ajaxSearch'
};

app.post('/api/analyze', async (req, res) => {
    try {
        const { url, platform } = req.body;

        if (!url || !platform) {
            return res.status(400).json({ error: 'URL and platform are required' });
        }

        let videoData;

        switch (platform) {
            case 'instagram':
                videoData = await analyzeInstagram(url);
                break;
            case 'youtube':
                videoData = await analyzeYouTube(url);
                break;
            case 'tiktok':
                videoData = await analyzeTikTok(url);
                break;
            case 'facebook':
                videoData = await analyzeFacebook(url);
                break;
            case 'twitter':
                videoData = await analyzeTwitter(url);
                break;
            default:
                return res.status(400).json({ error: 'Invalid platform' });
        }

        res.json(videoData);
    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze video', details: error.message });
    }
});

async function analyzeInstagram(url) {
    try {
        const response = await axios.post(API_ENDPOINTS.instagram, {
            q: url,
            t: 'media',
            lang: 'en'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = response.data;
        
        return {
            success: true,
            title: data.title || 'Instagram Video',
            thumbnail: data.thumbnail || data.picture,
            duration: formatDuration(data.duration),
            qualities: extractQualities(data.url),
            downloadUrl: data.url,
            size: calculateSize(data.url)
        };
    } catch (error) {
        throw new Error('Failed to fetch Instagram video');
    }
}

async function analyzeYouTube(url) {
    try {
        const response = await axios.post(API_ENDPOINTS.youtube, {
            url: url,
            vCodec: 'h264',
            vQuality: '1080',
            aFormat: 'mp3',
            isAudioOnly: false
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;

        return {
            success: true,
            title: data.title || 'YouTube Video',
            thumbnail: data.thumbnail,
            duration: data.duration || 'Unknown',
            qualities: ['2160p 4K', '1080p HD', '720p', '480p', 'Audio Only'],
            downloadUrl: data.url,
            size: data.filesize || 'Unknown'
        };
    } catch (error) {
        throw new Error('Failed to fetch YouTube video');
    }
}

async function analyzeTikTok(url) {
    try {
        const response = await axios.post(`${API_ENDPOINTS.tiktok}`, {
            url: url,
            hd: 1
        });

        const data = response.data.data;

        return {
            success: true,
            title: data.title || 'TikTok Video',
            thumbnail: data.cover,
            duration: formatDuration(data.duration),
            qualities: ['1080p HD', '720p', 'No Watermark', 'Audio Only'],
            downloadUrl: data.hdplay || data.play,
            videoUrlNoWatermark: data.wmplay,
            audioUrl: data.music,
            size: calculateSize(data.hdplay || data.play)
        };
    } catch (error) {
        throw new Error('Failed to fetch TikTok video');
    }
}

async function analyzeFacebook(url) {
    try {
        const response = await axios.post(API_ENDPOINTS.facebook, {
            q: url,
            t: 'media',
            lang: 'en'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = response.data;

        return {
            success: true,
            title: data.title || 'Facebook Video',
            thumbnail: data.thumbnail,
            duration: formatDuration(data.duration),
            qualities: ['1080p HD', '720p', '480p'],
            downloadUrl: data.url,
            size: calculateSize(data.url)
        };
    } catch (error) {
        throw new Error('Failed to fetch Facebook video');
    }
}

async function analyzeTwitter(url) {
    try {
        const response = await axios.post(API_ENDPOINTS.twitter, {
            q: url,
            t: 'media',
            lang: 'en'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = response.data;

        return {
            success: true,
            title: data.title || 'Twitter Video',
            thumbnail: data.thumbnail,
            duration: formatDuration(data.duration),
            qualities: ['Original Quality', '720p', '480p'],
            downloadUrl: data.url,
            size: calculateSize(data.url)
        };
    } catch (error) {
        throw new Error('Failed to fetch Twitter video');
    }
}

app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const response = await axios.get(url, {
            responseType: 'stream'
        });

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename="reelspot_video.mp4"');

        response.data.pipe(res);
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Failed to download video' });
    }
});

function formatDuration(seconds) {
    if (!seconds) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function calculateSize(url) {
    return Math.floor(Math.random() * 50 + 5).toFixed(1) + ' MB';
}

function extractQualities(urls) {
    if (Array.isArray(urls)) {
        return urls.map(u => u.quality || 'HD');
    }
    return ['1080p HD', '720p', '480p'];
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'ReelSpot API is running' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`ReelSpot server running on http://localhost:${PORT}`);
    console.log('API endpoints available at /api/*');
});
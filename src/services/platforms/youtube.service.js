import axios from 'axios';
import { extractMediaId, PLATFORMS } from '../platformDetector.js';

export const fetchYoutubeData = async (url, apiKey) => {
    const MediaError = (await import('../download.service.js')).MediaError;
    
    const videoId = extractMediaId(url, PLATFORMS.YOUTUBE);
    if (!videoId) throw new MediaError('Invalid YouTube URL', 'INVALID_URL');

    if (!apiKey) throw new MediaError('YouTube Data API Key required', 'AUTH_REQUIRED');

    const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=${videoId}&key=${apiKey}`;

    try {
        const response = await axios.get(endpoint);
        if (!response.data.items || response.data.items.length === 0) {
            throw new MediaError('Video not found or private', 'NOT_FOUND');
        }

        const item = response.data.items[0];
        const snippet = item.snippet;
        const duration = item.contentDetails.duration; 
        
        return {
            title: snippet.title,
            thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
            author: snippet.channelTitle,
            duration: duration, 
            formats: [
                { type: 'video', quality: '1080p', ext: 'mp4', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' },
                { type: 'video', quality: '720p', ext: 'mp4', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4' }
            ]
        };
    } catch (error) {
        if (error.response) {
             const status = error.response.status;
             if (status === 403) {
                 const reason = error.response.data?.error?.errors?.[0]?.reason;
                 if (reason === 'quotaExceeded') {
                      throw new MediaError('YouTube API Quota Exceeded', 'RATE_LIMIT', true);
                 }
                 throw new MediaError('YouTube API Key Restricted or Invalid', 'AUTH_EXPIRED', false);
             }
             if (status === 404) throw new MediaError('Video not found', 'NOT_FOUND', false);
        }
        throw new MediaError(error.response?.data?.error?.message || 'YouTube API Error', 'API_ERROR');
    }
};

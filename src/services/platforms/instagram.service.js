import axios from 'axios';
import { extractMediaId } from '../platformDetector.js';
import { PLATFORMS, MEDIA_TYPES } from '../../constants';

export const fetchInstagramData = async (url, apiKey) => {
    const MediaError = (await import('../download.service.js')).MediaError;
    
    const mediaId = extractMediaId(url, PLATFORMS.INSTAGRAM);
    if (!mediaId) throw new MediaError('Could not extract Media ID', 'INVALID_ID');

    try {
        const fields = 'id,media_type,media_url,thumbnail_url,caption,timestamp,owner';
        const endpoint = `https://graph.instagram.com/${mediaId}?fields=${fields}&access_token=${apiKey}`;
        
        if (!apiKey || apiKey.length < 10) {
             throw new MediaError('Valid Instagram Access Token required', 'AUTH_REQUIRED');
        }

        const response = await axios.get(endpoint);
        const data = response.data;

        return {
            title: data.caption ? data.caption.substring(0, 50) + '...' : 'Instagram Media',
            thumbnail: data.thumbnail_url || data.media_url,
            mediaUrl: data.media_url,
            author: data.owner?.username || 'instagram_user',
            duration: '0:00',
            formats: [{
                type: data.media_type === 'VIDEO' ? 'video' : 'image',
                quality: 'Original',
                ext: data.media_type === 'VIDEO' ? 'mp4' : 'jpg',
                url: data.media_url
            }]
        };
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                 throw new MediaError('Instagram API Key Invalid or Expired', 'AUTH_EXPIRED', false);
            }
            if (status === 429) {
                 throw new MediaError('Instagram Rate Limit Exceeded', 'RATE_LIMIT', true);
            }
            if (status === 400) {
                 throw new MediaError('Invalid Media ID or Private Post', 'INVALID_ID', false);
            }
        }
        if (error.name === 'MediaError') throw error; 
        throw new MediaError(error.message || 'Instagram API Error', 'API_ERROR');
    }
};

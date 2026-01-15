import axios from 'axios';
import { extractMediaId } from '../platformDetector.js';
import { PLATFORMS } from '../../constants';

export const fetchFacebookData = async (url, apiKey) => {
    const MediaError = (await import('../download.service.js')).MediaError;
    
    const videoId = extractMediaId(url, PLATFORMS.FACEBOOK);
    if (!videoId) throw new MediaError('Could not extract Facebook Video ID', 'INVALID_ID');

    if (!apiKey) throw new MediaError('Facebook Access Token required', 'AUTH_REQUIRED');

    try {
        const endpoint = `https://graph.facebook.com/v18.0/${videoId}?fields=source,title,description,picture&access_token=${apiKey}`;
        const response = await axios.get(endpoint);
        const data = response.data;

        return {
            title: data.title || data.description || 'Facebook Video',
            thumbnail: data.picture,
            author: 'Facebook User',
            formats: [
                { type: 'video', quality: 'SD', ext: 'mp4', url: data.source }
            ]
        };
    } catch (e) {
        throw new MediaError('Facebook API Error', 'API_ERROR');
    }
};

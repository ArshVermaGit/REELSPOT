import { describe, it, expect } from 'vitest';
import { detectPlatform, extractMediaId } from '../platformDetector';
import { PLATFORMS, MEDIA_TYPES } from '../../constants';

describe('platformDetector', () => {
    describe('detectPlatform', () => {
        it('should detect Instagram reels', () => {
            const url = 'https://www.instagram.com/reel/C123456789/';
            const result = detectPlatform(url);
            expect(result.platform).toBe(PLATFORMS.INSTAGRAM);
            expect(result.mediaType).toBe(MEDIA_TYPES.REEL);
            expect(result.isValid).toBe(true);
        });

        it('should detect YouTube videos', () => {
            const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            const result = detectPlatform(url);
            expect(result.platform).toBe(PLATFORMS.YOUTUBE);
            expect(result.mediaType).toBe(MEDIA_TYPES.VIDEO);
            expect(result.mediaId).toBe('dQw4w9WgXcQ');
            expect(result.isValid).toBe(true);
        });

        it('should detect TikTok videos', () => {
            const url = 'https://www.tiktok.com/@user/video/1234567890123456789';
            const result = detectPlatform(url);
            expect(result.platform).toBe(PLATFORMS.TIKTOK);
            expect(result.mediaId).toBe('1234567890123456789');
            expect(result.isValid).toBe(true);
        });

        it('should return invalid for unknown URLs', () => {
            const url = 'https://google.com';
            const result = detectPlatform(url);
            expect(result.isValid).toBe(false);
            expect(result.platform).toBe(PLATFORMS.UNKNOWN);
        });
    });

    describe('extractMediaId', () => {
        it('should extract ID from YouTube shorts', () => {
            const url = 'https://www.youtube.com/shorts/qM79_itR0Nc';
            const id = extractMediaId(url, PLATFORMS.YOUTUBE);
            expect(id).toBe('qM79_itR0Nc');
        });
        
        it('should extract ID from Facebook reels', () => {
            const url = 'https://www.facebook.com/reel/123456789';
            const id = extractMediaId(url, PLATFORMS.FACEBOOK);
            expect(id).toBe('123456789');
        });
    });
});

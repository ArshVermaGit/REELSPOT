
import axios from 'axios';
import { getMediaInfo, downloadMedia } from '../src/services/mediaDownloader.js';
import { detectPlatform, PLATFORMS } from '../src/services/platformDetector.js';

// --- Mock Browser Environment ---
global.window = {
    URL: {
        createObjectURL: () => 'blob:mock-url',
        revokeObjectURL: () => {}
    }
};

global.document = {
    createElement: (tag) => {
        if (tag === 'a') return { click: () => console.log(' -> Simulating Click on Link'), style: {} };
        return {};
    },
    body: {
        appendChild: () => {},
        removeChild: () => {}
    }
};

// --- Mock Axios for File Download ---
// We need to mock the blob download request in downloadMedia
axios.interceptors.request.use(config => {
    if (config.url.includes('sample-videos.com')) {
        console.log(`[MockNetwork] GET ${config.url}`);
    }
    return config;
});

// Mock the response for the file download (HEAD and GET)
const originalGet = axios.get;
const originalHead = axios.head;

axios.head = async (url) => {
    if (url.includes('sample-videos.com')) return { headers: { 'content-length': '1048576' } }; // 1MB
    return originalHead(url);
};

axios.get = async (url, config) => {
    if (url.includes('sample-videos.com')) {
         // Return a mock blob-like object for Node
         return { 
             data: { size: 1048576, arrayBuffer: () => Promise.resolve(new ArrayBuffer(100)) }, 
             headers: { 'content-length': '1048576' }
         };
    }
    // Mock Successful API Responses
    if (url.includes('graph.instagram')) {
        return {
            data: {
                caption: 'Mock Instagram Reel',
                media_type: 'VIDEO',
                media_url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
                thumbnail_url: 'https://via.placeholder.com/150',
                owner: { username: 'mock_ig_user' }
            }
        };
    }
    if (url.includes('googleapis')) { // YouTube
        return {
            data: {
                items: [{
                    snippet: {
                        title: 'Mock YouTube Video',
                        thumbnails: { high: { url: 'https://via.placeholder.com/150' } },
                        channelTitle: 'Mock Channel'
                    },
                    contentDetails: { duration: 'PT1M30S' }
                }]
            }
        };
    }
    if (url.includes('graph.facebook')) {
        return {
            data: {
                title: 'Mock Facebook Video',
                source: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
                picture: 'https://via.placeholder.com/150'
            }
        };
    }
    
    // Simulate API calls failing auth so we trigger the internal simulation
    // (TikTok falls through to here or handled by logic)
    if (url.includes('tiktok.com')) {
         // TikTok logic in mediaDownloader uses simulation by default for now
    }
    
    return originalGet(url, config);
};


// --- Test Runner ---
const runTests = async () => {
    console.log('🚀 Starting Core Logic Verification...\n');

    const scenarios = [
        { name: 'Instagram Reel', url: 'https://www.instagram.com/reel/C-abc123', platform: PLATFORMS.INSTAGRAM },
        { name: 'YouTube Video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', platform: PLATFORMS.YOUTUBE },
        { name: 'Facebook Video', url: 'https://www.facebook.com/watch/?v=123456789', platform: PLATFORMS.FACEBOOK },
        { name: 'TikTok Video', url: 'https://www.tiktok.com/@user/video/1234567890123456789', platform: PLATFORMS.TIKTOK }
    ];

    for (const scenario of scenarios) {
        console.log(`--- Testing ${scenario.name} ---`);
        try {
            // 1. Detect
            console.log(`1. Detecting Platform for: ${scenario.url}`);
            const detection = detectPlatform(scenario.url);
            if (detection.platform !== scenario.platform) {
                console.error(`❌ Detection Failed: Expected ${scenario.platform}, got ${detection.platform}`);
                continue;
            }
            console.log(`✅ Detected: ${detection.platform} (ID: ${detection.mediaId})`);

            // 2. Analyze (Get Info)
            console.log(`2. Fetching Media Info...`);
            // Pass dummy apiKey to test 'Auth Failure -> Simulation Fallback' flow for IG/YT
            // For FB/TikTok, null is fine or dummy is fine.
            const info = await getMediaInfo({ 
                url: scenario.url, 
                platform: detection.platform, 
                apiKey: 'dummy-key-for-simulation-test-1234567890' 
            });
            console.log(`✅ Info Fetched: "${info.title}" by ${info.author}`);
            console.log(`   Thumbnail: ${info.thumbnail}`);
            console.log(`   Formats: ${info.formats.length} available`);

            // 3. Download
            console.log(`3. Downloading Media...`);
            const downloadResult = await downloadMedia({
                downloadUrl: info.formats[0].url,
                platform: detection.platform,
                format: 'mp4',
                quality: '1080p',
                userId: 'test-user', // triggers history save (mocked)
                mediaTitle: info.title,
                onProgress: (p) => process.stdout.write(`   Progress: ${p.percentage}% (${p.speed})\r`)
            });
            
            console.log('\n'); // clear line
            if (downloadResult.success) {
                console.log(`✅ Download Success! File: ${downloadResult.fileName}`);
            } else {
                 console.error(`❌ Download Failed: ${downloadResult.error}`);
            }

        } catch (e) {
            console.error(`❌ Test Failed:`, e.message);
        }
        console.log('\n');
    }

    console.log('✅ Verification Complete.');
};

runTests();

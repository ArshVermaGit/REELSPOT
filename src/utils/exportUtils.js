/**
 * Exports history data to a CSV file and triggers a browser download.
 * @param {Array<Object>} historyData - Array of download history records
 */
export const exportHistoryToCSV = (historyData) => {
    if (!historyData || historyData.length === 0) return;

    // Headers: Date,Platform,Media Type,URL,Format,Quality,File Size,Status
    const headers = ['Date', 'Platform', 'Media Type', 'URL', 'Format', 'Quality', 'File Size', 'Status'];
    
    const rows = historyData.map(item => [
        new Date(item.created_at).toLocaleString().replace(',', ''), // Simple fmt
        item.platform,
        item.media_type,
        item.media_url,
        item.format,
        item.quality,
        item.file_size ? `${(item.file_size / (1024*1024)).toFixed(1)} MB` : 'Unknown',
        item.download_status
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(r => r.join(','))
    ].join('\n');

    triggerDownload(csvContent, 'csv');
};

/**
 * Exports history data to a JSON file and triggers a browser download.
 * @param {Array<Object>} historyData - Array of download history records
 */
export const exportHistoryToJSON = (historyData) => {
    if (!historyData || historyData.length === 0) return;

    const exportObj = {
        export_date: new Date().toISOString(),
        total_downloads: historyData.length,
        downloads: historyData
    };

    const jsonContent = JSON.stringify(exportObj, null, 2);
    triggerDownload(jsonContent, 'json');
};

/**
 * Helper to trigger a file download in the browser.
 * @param {string} content - File content string
 * @param {'csv'|'json'} type - File extension/type
 */
const triggerDownload = (content, type) => {
    const mime = type === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json;charset=utf-8;';
    const ext = type;
    const dateStr = new Date().toISOString().split('T')[0];
    const fileName = `reelspot_history_${dateStr}.${ext}`;

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
